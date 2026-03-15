import {removeActionFromJobs} from '@form8ion/github-workflows-core';

import {describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {ACTION_NAME, removeCodecovActionFrom} from './codecov-action.js';

vi.mock('@form8ion/github-workflows-core');

describe('codecov action', () => {
  describe('remove from jobs', () => {
    it('should remove the codecov action from the provided jobs', async () => {
      const jobs = any.listOf(any.simpleObject);
      const updatedJobs = any.listOf(any.simpleObject);
      when(removeActionFromJobs).calledWith(jobs, ACTION_NAME).thenReturn(updatedJobs);

      expect(removeCodecovActionFrom(jobs)).toEqual(updatedJobs);
    });
  });
});
