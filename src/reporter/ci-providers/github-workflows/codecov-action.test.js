import {removeActionFromJobs} from '@form8ion/github-workflows-core';

import {describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {findCodecovActionIn, removeCodecovActionFrom, scaffold, ACTION_NAME} from './codecov-action.js';

vi.mock('@form8ion/github-workflows-core');

describe('codecov action', () => {
  const codecovAction = {...any.simpleObject(), uses: `${ACTION_NAME}@v5.5.2`};

  describe('scaffold', () => {
    it('should scaffold the codecov action', async () => {
      expect(scaffold()).toEqual({uses: `${ACTION_NAME}@v5.5.2`});
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

  describe('remove from jobs', () => {
    it('should remove the codecov action from the provided jobs', async () => {
      const jobs = any.listOf(any.simpleObject);
      const updatedJobs = any.listOf(any.simpleObject);
      when(removeActionFromJobs).calledWith(jobs, ACTION_NAME).thenReturn(updatedJobs);

      expect(removeCodecovActionFrom(jobs)).toEqual(updatedJobs);
    });
  });
});
