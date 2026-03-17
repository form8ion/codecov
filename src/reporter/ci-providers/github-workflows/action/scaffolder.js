import {ACTION_NAME} from '../codecov-action.js';

export default function scaffoldAction() {
  return {
    uses: `${ACTION_NAME}@v5.5.2`,
    with: {
      // eslint-disable-next-line no-template-curly-in-string
      token: '${{ secrets.CODECOV_TOKEN }}'
    }
  };
}
