import {test as stepIsCodecovAction} from '../action/index.js';

export default function codecovActionExistsInSteps(steps) {
  return !!steps.find(step => stepIsCodecovAction(step));
}
