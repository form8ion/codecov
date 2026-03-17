import {ACTION_NAME} from '../codecov-action.js';

export default function stepIsCodecovAction(step) {
  if (!step.uses) return false;

  const [actionName] = step.uses.split('@');

  return ACTION_NAME === actionName;
}
