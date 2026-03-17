import {describe, it, expect} from 'vitest';
import any from '@travi/any';

import {ACTION_NAME} from '../codecov-action.js';
import stepIsCodecovAction from './tester.js';

describe('action tester', () => {
  it('should return `false` if the step does not use an action', async () => {
    expect(stepIsCodecovAction(any.simpleObject())).toBe(false);
  });

  it('should return `false` if the step does not use the CodeCov action', async () => {
    const otherAction = {...any.simpleObject(), uses: 'something-else@v1.2.3'};

    expect(stepIsCodecovAction(otherAction)).toBe(false);
  });

  it('should return `true` if the step uses the CodeCov action', async () => {
    const codecovAction = {...any.simpleObject(), uses: `${ACTION_NAME}@v5.5.2`};

    expect(stepIsCodecovAction(codecovAction)).toBe(true);
  });
});
