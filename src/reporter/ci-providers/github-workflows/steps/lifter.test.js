import {describe, it, expect, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import {scaffold as scaffoldAction} from '../action/index.js';
import liftSteps from './lifter.js';

vi.mock('../action/index.js');

describe('steps lifter', () => {
  const codecovAction = any.simpleObject();

  it('should append the CodeCov step if it doesnt already exist', async () => {
    const steps = any.listOf(any.simpleObject);
    when(scaffoldAction).calledWith().thenReturn(codecovAction);

    expect(liftSteps(steps)).toEqual([...steps, codecovAction]);
  });

  it('should remove the legacy reporting step, if present', async () => {
    const stepsBeforeLegacy = any.listOf(any.simpleObject);
    const stepsAfterLegacy = any.listOf(any.simpleObject);
    const steps = [
      ...stepsBeforeLegacy,
      {...any.simpleObject(), run: 'npm run coverage:report'},
      ...stepsAfterLegacy
    ];
    when(scaffoldAction).calledWith().thenReturn(codecovAction);

    expect(liftSteps(steps)).toEqual([...stepsBeforeLegacy, ...stepsAfterLegacy, codecovAction]);
  });
});
