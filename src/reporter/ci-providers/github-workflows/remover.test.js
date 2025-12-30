import {loadWorkflowFile, writeWorkflowFile} from '@form8ion/github-workflows-core';

import {describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {removeCodecovActionFrom} from './codecov-action.js';
import remove from './remover.js';

vi.mock('@form8ion/github-workflows-core');
vi.mock('./codecov-action.js');

describe('action remover', () => {
  it('should remove the action from the workflow', async () => {
    const projectRoot = any.string();
    const updatedJobs = any.simpleObject();
    const ciWorkflowName = 'node-ci';
    const existingWorkflowDefinition = {...any.simpleObject(), jobs: any.simpleObject()};
    when(loadWorkflowFile).calledWith({projectRoot, name: ciWorkflowName}).thenResolve(existingWorkflowDefinition);
    when(removeCodecovActionFrom).calledWith(existingWorkflowDefinition.jobs).thenReturn(updatedJobs);

    await remove({projectRoot});

    expect(writeWorkflowFile).toHaveBeenCalledWith({
      projectRoot,
      name: ciWorkflowName,
      config: {...existingWorkflowDefinition, jobs: updatedJobs}
    });
  });
});
