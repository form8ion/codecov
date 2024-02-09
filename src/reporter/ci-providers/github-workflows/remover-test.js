import {promises as fs} from 'node:fs';
import {dump} from 'js-yaml';

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

    sandbox.stub(fs, 'readFile');
    sandbox.stub(fs, 'writeFile');
    sandbox.stub(workflow, 'getPathToWorkflowFile');
    sandbox.stub(action, 'removeCodecovActionFrom');
  });

  teardown(() => sandbox.restore());

  test('that the action is removed from the workflow', async () => {
    const projectRoot = any.string();
    const pathToWorkflowFile = any.string();
    const existingSteps = any.listOf(any.simpleObject);
    const updatedSteps = any.listOf(any.simpleObject);
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
    fs.readFile.withArgs(pathToWorkflowFile).resolves(dump(existingWorkflowDefinition), 'utf-8');
    action.removeCodecovActionFrom.withArgs(existingSteps).returns(updatedSteps);

    await remove({projectRoot});

    assert.calledWith(
      fs.writeFile,
      pathToWorkflowFile,
      dump({
        ...existingWorkflowDefinition,
        jobs: {
          ...existingWorkflowDefinition.jobs,
          verify: {
            ...existingWorkflowDefinition.jobs.verify,
            steps: updatedSteps
          }
        }
      })
    );
  });
});
