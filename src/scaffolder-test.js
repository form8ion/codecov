import any from '@travi/any';
import {assert} from 'chai';

import {scaffold} from './scaffolder.js';

suite('codecov', () => {
  test('that the scaffold step simply returns empty results', async () => {
    const results = await scaffold(any.simpleObject());

    assert.deepEqual(results, {});
  });
});
