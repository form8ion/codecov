import {promises as fs} from 'node:fs';
import {dump} from 'js-yaml';

import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';

import * as codecovAction from './codecov-action.js';
import * as workflow from './workflow.js';
import {lift as configureGithubWorkflow} from './lifter.js';

suite('github workflow lifter', () => {
  let sandbox;
  const projectRoot = any.string();
  const pathToWorkflowFile = any.string();
  const codecovActionDefinition = any.simpleObject();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'readFile');
    sandbox.stub(fs, 'writeFile');
    sandbox.stub(codecovAction, 'scaffold');
    sandbox.stub(codecovAction, 'findCodecovActionIn');
    sandbox.stub(workflow, 'getPathToWorkflowFile');

    codecovAction.scaffold.returns(codecovActionDefinition);
    workflow.getPathToWorkflowFile.withArgs(projectRoot).returns(pathToWorkflowFile);
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
    fs.readFile.withArgs(pathToWorkflowFile, 'utf-8').resolves(dump(existingWorkflowContents));

    await configureGithubWorkflow({projectRoot});

    assert.calledWith(
      fs.writeFile,
      pathToWorkflowFile,
      dump({
        ...otherTopLevelProperties,
        jobs: {
          ...otherJobs,
          verify: {...otherVerifyProperties, steps: [...existingVerifySteps, codecovActionDefinition]}
        }
      })
    );
  });

  test('that the codecov action is not added if it is already included', async () => {
    const existingSteps = any.listOf(any.simpleObject);
    fs.readFile.withArgs(pathToWorkflowFile, 'utf-8').resolves(dump({
      ...(any.simpleObject()),
      jobs: {
        ...(any.simpleObject()),
        verify: {
          ...(any.simpleObject()),
          steps: existingSteps
        }
      }
    }));
    codecovAction.findCodecovActionIn.withArgs(existingSteps).returns(any.simpleObject());

    await configureGithubWorkflow({projectRoot});

    assert.neverCalledWith(fs.writeFile, pathToWorkflowFile);
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
    fs.readFile.withArgs(pathToWorkflowFile, 'utf-8').resolves(dump(existingWorkflowContents));
    codecovAction.findCodecovActionIn.returns(undefined);

    await configureGithubWorkflow({projectRoot});

    assert.calledWith(
      fs.writeFile,
      pathToWorkflowFile,
      dump({
        ...otherTopLevelProperties,
        jobs: {
          ...otherJobs,
          verify: {
            ...otherVerifyProperties,
            steps: [...otherVerifySteps, codecovActionDefinition]
          }
        }
      })
    );
  });
});
