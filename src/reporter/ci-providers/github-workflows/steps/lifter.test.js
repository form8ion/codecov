import {describe, it, expect, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import {scaffold as scaffoldAction} from '../action/index.js';
import liftSteps from './lifter.js';

vi.mock('../action/index.js');

describe('steps lifter', () => {
  it('should append the CodeCov step if it doesnt already exist', async () => {
    const steps = any.listOf(any.simpleObject);
    const codecovAction = any.simpleObject();
    when(scaffoldAction).calledWith().thenReturn(codecovAction);

    expect(liftSteps(steps)).toEqual([...steps, codecovAction]);
  });
});
