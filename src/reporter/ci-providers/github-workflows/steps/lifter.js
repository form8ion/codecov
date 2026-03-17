import {scaffold as scaffoldAction} from '../action/index.js';

export default function liftSteps(steps) {
  return [...steps, scaffoldAction()];
}
