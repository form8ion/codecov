import {describe, it, expect} from 'vitest';

import {ACTION_NAME} from '../codecov-action.js';
import scaffoldAction from './scaffolder.js';

describe('codecov action scaffolder', () => {
  it('should scaffold the codecov action', async () => {
    expect(scaffoldAction()).toEqual({
      uses: `${ACTION_NAME}@v5.5.2`,
      with: {
        // eslint-disable-next-line no-template-curly-in-string
        token: '${{ secrets.CODECOV_TOKEN }}'
      }
    });
  });
});
