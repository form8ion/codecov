import {describe, it, expect} from 'vitest';
import any from '@travi/any';

import {ACTION_NAME} from '../codecov-action.js';
import codecovActionExistsInSteps from './tester.js';

describe('codecov action tester', () => {
  it('should return `true` if the codecov action is found in the list of provided steps', async () => {
    const codecovAction = {...any.simpleObject(), uses: `${ACTION_NAME}@v5.5.2`};

    expect(codecovActionExistsInSteps([
      ...any.listOf(any.simpleObject),
      codecovAction,
      ...any.listOf(any.simpleObject)
    ])).toBe(true);
  });

  it('should return `false` if no codecov action is found in the list of provided steps', async () => {
    expect(codecovActionExistsInSteps(any.listOf(any.simpleObject))).toBe(false);
  });
});
