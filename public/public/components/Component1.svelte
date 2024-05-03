<script lang="ts">
    import {onMount} from 'svelte'
    import {Result} from '../src/types'

    let x : number;

    let y : number;

    let sum : number;

    let text: string = undefined;

    $: {
        fetch(`/sum/${x}/${y}`)
        .then(response =>  response.json())
        .then((data:Result) => {
            sum = data.sum;
            text = data.text;
        });
    }

</script>
<div>
<div>This is component 1 : {text ? text : "no content for now"}</div>
<label for="xx">X :</label>
    <input id="xx" type="number" bind:value={x}/>
    <label for="yy">Y :</label>
    <input id="yy" type="number" bind:value={y}/>
<b>Somme : {sum}</b>

</div>