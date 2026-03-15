import {removeActionFromJobs} from '@form8ion/github-workflows-core';

export const ACTION_NAME = 'codecov/codecov-action';

export function removeCodecovActionFrom(jobs) {
  return removeActionFromJobs(jobs, ACTION_NAME);
}

export function scaffold() {
  return {uses: `${ACTION_NAME}@v5.5.2`};
}
