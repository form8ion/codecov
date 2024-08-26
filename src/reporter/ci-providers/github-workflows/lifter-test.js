import workflowsCore from '@form8ion/github-workflows-core';

import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';

import * as codecovAction from './codecov-action.js';
import {lift as configureGithubWorkflow} from './lifter.js';

suite('github workflow lifter', () => {
  let sandbox;
  const projectRoot = any.string();
  const codecovActionDefinition = any.simpleObject();
  const ciWorkflowName = 'node-ci';

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(workflowsCore, 'loadWorkflowFile');
    sandbox.stub(workflowsCore, 'writeWorkflowFile');
    sandbox.stub(codecovAction, 'scaffold');
    sandbox.stub(codecovAction, 'findCodecovActionIn');

    codecovAction.scaffold.returns(codecovActionDefinition);
  });

  teardown(() => sandbox.restore());

  test('that the codecov action is added to the verify job', async () => {
    const otherTopLevelProperties = any.simpleObject();
    const otherJobs = any.simpleObject();
    const otherVerifyProperties = any.simpleObject();
    const existingVerifySteps = any.listOf(any.simpleObject);
    const existingWorkflowContents = {
      ...otherTopLevelProperties,
      jobs: {...otherJobs, verify: {...otherVerifyProperties, steps: existingVerifySteps}}
    };
    workflowsCore.loadWorkflowFile.withArgs({projectRoot, name: ciWorkflowName}).resolves(existingWorkflowContents);

    await configureGithubWorkflow({projectRoot});

    assert.calledWith(
      workflowsCore.writeWorkflowFile,
      {
        projectRoot,
        name: ciWorkflowName,
        config: {
          ...otherTopLevelProperties,
          jobs: {
            ...otherJobs,
            verify: {...otherVerifyProperties, steps: [...existingVerifySteps, codecovActionDefinition]}
          }
        }
      }
    );
  });

  test('that the codecov action is not added if it is already included', async () => {
    const existingSteps = any.listOf(any.simpleObject);
    workflowsCore.loadWorkflowFile
      .withArgs({projectRoot, name: ciWorkflowName})
      .resolves({
        ...(any.simpleObject()),
        jobs: {
          ...(any.simpleObject()),
          verify: {
            ...(any.simpleObject()),
            steps: existingSteps
          }
        }
      });
    codecovAction.findCodecovActionIn.withArgs(existingSteps).returns(any.simpleObject());

    await configureGithubWorkflow({projectRoot});

    assert.notCalled(workflowsCore.writeWorkflowFile);
  });

  test('that the legacy reporting step is removed, if present', async () => {
    const otherTopLevelProperties = any.simpleObject();
    const otherJobs = any.simpleObject();
    const otherVerifyProperties = any.simpleObject();
    const otherVerifySteps = any.listOf(any.simpleObject);
    const existingWorkflowContents = {
      ...otherTopLevelProperties,
      jobs: {
        ...otherJobs,
        verify: {...otherVerifyProperties, steps: [...otherVerifySteps, {run: 'npm run coverage:report'}]}
      }
    };
    workflowsCore.loadWorkflowFile.withArgs({projectRoot, name: ciWorkflowName}).resolves(existingWorkflowContents);
    codecovAction.findCodecovActionIn.returns(undefined);

    await configureGithubWorkflow({projectRoot});

    assert.calledWith(
      workflowsCore.writeWorkflowFile,
      {
        projectRoot,
        name: ciWorkflowName,
        config: {
          ...otherTopLevelProperties,
          jobs: {
            ...otherJobs,
            verify: {
              ...otherVerifyProperties,
              steps: [...otherVerifySteps, codecovActionDefinition]
            }
          }
        }
      }
    );
  });
});
