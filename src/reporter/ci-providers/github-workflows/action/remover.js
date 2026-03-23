import {removeActionFromJobs} from '@form8ion/github-workflows-core';
import {ACTION_NAME} from './constants.js';

export default function removeCodecovActionFrom(jobs) {
  return removeActionFromJobs(jobs, ACTION_NAME);
}
