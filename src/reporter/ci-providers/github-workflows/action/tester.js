import {ACTION_NAME} from './constants.js';

export default function stepIsCodecovAction(step) {
  if (!step.uses) return false;

  const [actionName] = step.uses.split('@');

  return ACTION_NAME === actionName;
}
