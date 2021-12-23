import {promises as fs} from 'fs';
import {dump} from 'js-yaml';
import * as core from '@form8ion/core';

import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';

import {lift as configureGithubWorkflow} from './github-workflow';

suite('github workflow', () => {
  let sandbox;
  const projectRoot = any.string();
  const pathToWorkflowFile = `${projectRoot}/.github/workflows/node-ci.yml`;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'readFile');
    sandbox.stub(fs, 'writeFile');
    sandbox.stub(core, 'fileExists');
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
    core.fileExists.withArgs(pathToWorkflowFile).resolves(true);

    await configureGithubWorkflow({projectRoot});

    assert.calledWith(
      fs.writeFile,
      pathToWorkflowFile,
      dump({
        ...otherTopLevelProperties,
        jobs: {
          ...otherJobs,
          verify: {...otherVerifyProperties, steps: [...existingVerifySteps, {uses: 'codecov/codecov-action@v2'}]}
        }
      })
    );
  });

  test('that the codecov action is not added if it is already included', async () => {
    fs.readFile.withArgs(pathToWorkflowFile, 'utf-8').resolves(dump({
      ...(any.simpleObject()),
      jobs: {
        ...(any.simpleObject()),
        verify: {
          ...(any.simpleObject()),
          steps: [...any.listOf(any.simpleObject), {uses: 'codecov/codecov-action@v2'}]
        }
      }
    }));
    core.fileExists.withArgs(pathToWorkflowFile).resolves(true);

    await configureGithubWorkflow({projectRoot});

    assert.neverCalledWith(fs.writeFile, pathToWorkflowFile);
  });

  test('that the workflow is not processed if not defined', async () => {
    core.fileExists.withArgs(pathToWorkflowFile).resolves(false);

    await configureGithubWorkflow({projectRoot});

    assert.neverCalledWith(fs.readFile, pathToWorkflowFile);
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
    core.fileExists.withArgs(pathToWorkflowFile).resolves(true);

    await configureGithubWorkflow({projectRoot});

    assert.calledWith(
      fs.writeFile,
      pathToWorkflowFile,
      dump({
        ...otherTopLevelProperties,
        jobs: {
          ...otherJobs,
          verify: {...otherVerifyProperties, steps: [...otherVerifySteps, {uses: 'codecov/codecov-action@v2'}]}
        }
      })
    );
  });
});
