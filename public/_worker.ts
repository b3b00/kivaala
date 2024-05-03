// NOTE : _worker.js must be place at the root of the output dir == ./public for this app

import { Router, withParams, withContent, error, IRequest } from 'itty-router'
import {KVNamespace, ExecutionContext } from '@cloudflare/workers-types'
import {Dumb} from './src/types';
import { sum } from './src/logic';


// declare what's available in our env
type Env = {
  KV: KVNamespace
}

type PRequest = {    
    params: any;
    postQuery:any;
  } & IRequest
  
  // create a convenient duple
  type CF = [env: Env, context: ExecutionContext]

const router = Router()

async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
    let r = new Response(stream);
    return await r.text()
}

const withPostQuery = async (request:PRequest) => {
    let body = await streamToText(request.body);
    console.log(body);
    var params = new URLSearchParams(body);
    request.postQuery={};
    params.forEach((value,key,parent) => {
        request.postQuery[key] = value;
    })    
  }


export function errorResult(errors:string[],result:any) {
    return {
        ok:false,
        errors:errors,
        result:result
    };
}

export function okResult(result:any) {
    return {
        ok:true,
        result:result
    };
}


async function renderOkJson(env : Env, request : PRequest, data) {
    let response = await renderJson(env,request,data);     
    return response;
}

async function renderInternalServorErrorJson(env : Env, request : PRequest, data: any) {
    return error(500,data);
}

async function renderBadPRequestJson(env:Env, request:PRequest, data) {
    return error(400,data);
}

async function renderJson(env:Env, request:PRequest, data:any) {
    const payload = JSON.stringify(data);
    var response = new Response(payload);
    response.headers.set('Content-Type', 'application/json')
    return response
}
 
router.get<PRequest, CF>('/sum/:x/:y', async (request:PRequest, env:any) => {
    try {
        const x:number = parseInt(request.params.x);
        const y : number = parseInt(request.params.y);
        const dumb:Dumb = {x,y};
        const s = await sum(dumb);
        return await renderOkJson(env, request, {sum:s,text:env.VARIABLE+'_'+s});        
    }
    catch(e) {
        return await renderInternalServorErrorJson(env,request,            
            errorResult([`error while getting sum :>${request.params.x}< and :>${request.params.y}<`,e.message],null));
    }
});





router.all('*', (request, env) => {
    console.log('assets handler')
    return env.ASSETS.fetch(request)
})

export default {
    async fetch(request, environment, context) {
        return router.handle(request, environment, context)
    },
    async scheduled(controller, environment, context) {
        // await doATask();
    },
}
