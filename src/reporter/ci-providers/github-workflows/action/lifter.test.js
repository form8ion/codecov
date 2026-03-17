import {describe, it, expect} from 'vitest';
import any from '@travi/any';

import liftAction from './lifter.js';

describe('action lifter', () => {
  it('should expose the token secret to the action', async () => {
    const existingAction = any.simpleObject();

    expect(liftAction(existingAction)).toEqual({
      ...existingAction,
      with: {
        // eslint-disable-next-line no-template-curly-in-string
        token: '${{ secrets.CODECOV_TOKEN }}'
      }
    });
  });
});
