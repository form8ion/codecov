import {assert} from 'chai';
import any from '@travi/any';

import {findCodecovActionIn, scaffold} from './codecov-action.js';

suite('codecov action', () => {
  test('that the codecov action is scaffolded', () => {
    assert.deepEqual(scaffold(), {uses: 'codecov/codecov-action@v3'});
  });

  test('that the codecov action is returned from the list of steps', async () => {
    const codecovAction = {...any.simpleObject(), uses: 'codecov/codecov-action@v1'};

    assert.equal(
      findCodecovActionIn([
        ...any.listOf(any.simpleObject),
        codecovAction,
        ...any.listOf(any.simpleObject)
      ]),
      codecovAction
    );
  });

  test('that `undefined` is returned when the codecov action is not found in the list of steps', async () => {
    assert.isUndefined(findCodecovActionIn(any.listOf(any.simpleObject)));
  });
});
