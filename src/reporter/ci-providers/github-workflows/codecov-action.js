import {removeActionFromJobs} from '@form8ion/github-workflows-core';

export const ACTION_NAME = 'codecov/codecov-action';

function stepIsCodecovAction(step) {
  if (!step.uses) return false;

  const [actionName] = step.uses.split('@');

  return ACTION_NAME === actionName;
}

export function findCodecovActionIn(steps) {
  return steps.find(step => stepIsCodecovAction(step));
}

export function removeCodecovActionFrom(jobs) {
  return removeActionFromJobs(jobs, ACTION_NAME);
}

export function scaffold() {
  return {uses: `${ACTION_NAME}@v5.5.2`};
}
