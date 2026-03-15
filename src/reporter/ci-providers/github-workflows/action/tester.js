import {ACTION_NAME} from '../codecov-action.js';

function stepIsCodecovAction(step) {
  if (!step.uses) return false;

  const [actionName] = step.uses.split('@');

  return ACTION_NAME === actionName;
}

export default function codecovActionExistsInSteps(steps) {
  return !!steps.find(step => stepIsCodecovAction(step));
}
