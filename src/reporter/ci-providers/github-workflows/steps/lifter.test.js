import {describe, it, expect, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import {scaffold as scaffoldAction, lift as liftAction, test as stepIsCodecovAction} from '../action/index.js';
import codecovActionExistsInSteps from './tester.js';
import liftSteps from './lifter.js';

vi.mock('../action/index.js');
vi.mock('./tester.js');

describe('steps lifter', () => {
  const codecovAction = any.simpleObject();

  it('should append the CodeCov step if it doesnt already exist', async () => {
    const steps = any.listOf(any.simpleObject);
    when(codecovActionExistsInSteps).calledWith(steps).thenReturn(false);
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
    when(codecovActionExistsInSteps).calledWith(steps).thenReturn(false);
    when(scaffoldAction).calledWith().thenReturn(codecovAction);

    expect(liftSteps(steps)).toEqual([...stepsBeforeLegacy, ...stepsAfterLegacy, codecovAction]);
  });

  it('should lift the existing action, if present', async () => {
    const stepsBeforeExisting = any.listOf(any.simpleObject);
    const stepsAfterExisting = any.listOf(any.simpleObject);
    const existingAction = any.simpleObject();
    const steps = [...stepsBeforeExisting, existingAction, ...stepsAfterExisting];
    when(codecovActionExistsInSteps).calledWith(steps).thenReturn(true);
    when(stepIsCodecovAction).calledWith(existingAction).thenReturn(true);
    when(liftAction).calledWith(existingAction).thenReturn(codecovAction);

    expect(liftSteps(steps)).toEqual([...stepsBeforeExisting, codecovAction, ...stepsAfterExisting]);
  });
});
