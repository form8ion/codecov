import {removeActionFromJobs} from '@form8ion/github-workflows-core';
import {ACTION_NAME} from './action/constants.js';

export function removeCodecovActionFrom(jobs) {
  return removeActionFromJobs(jobs, ACTION_NAME);
}
