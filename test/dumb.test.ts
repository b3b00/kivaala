

import {Dumb} from '../public/src/types';
import {sum} from '../public/src/logic';


describe('dumb', () => {
    test('test dumb sum', async () => {
        const dumb:Dumb = {x:1,y:1};
        expect(await sum(dumb)).toBe(2);
    });
  });
