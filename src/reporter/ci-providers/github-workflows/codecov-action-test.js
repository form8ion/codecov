import {assert} from 'chai';
import any from '@travi/any';

import {findCodecovActionIn, removeCodecovActionFrom, scaffold} from './codecov-action.js';

suite('codecov action', () => {
  const codecovAction = {...any.simpleObject(), uses: 'codecov/codecov-action@v4.5.0'};

  suite('scaffold', () => {
    test('that the codecov action is scaffolded', () => {
      assert.deepEqual(scaffold(), {uses: 'codecov/codecov-action@v4.5.0'});
    });
  });

  suite('find in steps', () => {
    test('that the codecov action is returned from the list of steps', async () => {
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

  suite('remove from steps', () => {
    test('that the codecov action is removed from the provided steps', async () => {
      const stepsBefore = any.listOf(any.simpleObject);
      const stepsAfter = any.listOf(any.simpleObject);

      assert.deepEqual(
        removeCodecovActionFrom([...stepsBefore, codecovAction, ...stepsAfter]),
        [...stepsBefore, ...stepsAfter]
      );
    });
  });
});
