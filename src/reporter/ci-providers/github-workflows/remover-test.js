import workflowsCore from '@form8ion/github-workflows-core';

import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';

import * as action from './codecov-action.js';
import * as workflow from './workflow.js';
import remove from './remover.js';

suite('action remover', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(workflowsCore, 'loadWorkflowFile');
    sandbox.stub(workflowsCore, 'writeWorkflowFile');
    sandbox.stub(workflow, 'getPathToWorkflowFile');
    sandbox.stub(action, 'removeCodecovActionFrom');
  });

  teardown(() => sandbox.restore());

  test('that the action is removed from the workflow', async () => {
    const projectRoot = any.string();
    const pathToWorkflowFile = any.string();
    const existingSteps = any.listOf(any.simpleObject);
    const updatedSteps = any.listOf(any.simpleObject);
    const ciWorkflowName = 'node-ci';
    const existingWorkflowDefinition = {
      ...any.simpleObject(),
      jobs: {
        ...any.simpleObject(),
        verify: {
          ...any.simpleObject(),
          steps: existingSteps
        }
      }
    };
    workflow.getPathToWorkflowFile.withArgs(projectRoot).returns(pathToWorkflowFile);
    workflowsCore.loadWorkflowFile.withArgs({projectRoot, name: ciWorkflowName}).resolves(existingWorkflowDefinition);
    action.removeCodecovActionFrom.withArgs(existingSteps).returns(updatedSteps);

    await remove({projectRoot});

    assert.calledWith(
      workflowsCore.writeWorkflowFile,
      {
        projectRoot,
        name: ciWorkflowName,
        config: {
          ...existingWorkflowDefinition,
          jobs: {
            ...existingWorkflowDefinition.jobs,
            verify: {
              ...existingWorkflowDefinition.jobs.verify,
              steps: updatedSteps
            }
          }
        }
      }
    );
  });
});
