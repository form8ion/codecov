import {describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {test as stepIsCodecovAction} from '../action/index.js';
import codecovActionExistsInSteps from './tester.js';

vi.mock('../action/index.js');

describe('codecov action tester', () => {
  it('should return `true` if the codecov action is found in the list of provided steps', async () => {
    const codecovAction = any.simpleObject();
    when(stepIsCodecovAction).calledWith(codecovAction).thenReturn(true);

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
