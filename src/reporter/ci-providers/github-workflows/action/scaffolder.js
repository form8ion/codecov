import {ACTION_NAME} from '../codecov-action.js';

export default function scaffoldAction() {
  return {uses: `${ACTION_NAME}@v5.5.2`};
}
