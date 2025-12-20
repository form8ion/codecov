import {describe, expect, it} from 'vitest';
import any from '@travi/any';

import {findCodecovActionIn, removeCodecovActionFrom, scaffold} from './codecov-action.js';

describe('codecov action', () => {
  const codecovAction = {...any.simpleObject(), uses: 'codecov/codecov-action@v5.5.2'};

  describe('scaffold', () => {
    it('should scaffold the codecov action', async () => {
      expect(scaffold()).toEqual({uses: 'codecov/codecov-action@v5.5.2'});
    });
  });

  describe('find in steps', () => {
    it('should return the codecov action from the list of steps', async () => {
      expect(
        findCodecovActionIn([
          ...any.listOf(any.simpleObject),
          codecovAction,
          ...any.listOf(any.simpleObject)
        ])
      ).toEqual(codecovAction);
    });

    it('should return `undefined` when the codecov action is not found in the list of steps', async () => {
      expect(findCodecovActionIn(any.listOf(any.simpleObject))).toBeUndefined();
    });
  });

  describe('remove from steps', () => {
    it('should remove the codecov action from the provided steps', async () => {
      const stepsBefore = any.listOf(any.simpleObject);
      const stepsAfter = any.listOf(any.simpleObject);

      expect(removeCodecovActionFrom([...stepsBefore, codecovAction, ...stepsAfter]))
        .toEqual([...stepsBefore, ...stepsAfter]);
    });
  });
});
