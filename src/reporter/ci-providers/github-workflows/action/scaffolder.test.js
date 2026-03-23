import {describe, it, expect} from 'vitest';

import scaffoldAction from './scaffolder.js';
import {ACTION_NAME} from './constants.js';

describe('codecov action scaffolder', () => {
  it('should scaffold the codecov action', async () => {
    expect(scaffoldAction()).toEqual({
      name: 'Upload unit test coverage to Codecov',
      uses: `${ACTION_NAME}@v5.5.2`,
      with: {
        // eslint-disable-next-line no-template-curly-in-string
        token: '${{ secrets.CODECOV_TOKEN }}',
        flags: 'unit',
        report_type: 'coverage'
      }
    });
  });
});
