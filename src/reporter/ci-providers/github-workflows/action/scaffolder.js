import {ACTION_NAME} from './constants.js';

export default function scaffoldAction() {
  return {
    name: 'Upload unit test coverage to Codecov',
    uses: `${ACTION_NAME}@v5.5.2`,
    with: {
      // eslint-disable-next-line no-template-curly-in-string
      token: '${{ secrets.CODECOV_TOKEN }}',
      flags: 'unit',
      report_type: 'coverage'
    }
  };
}
