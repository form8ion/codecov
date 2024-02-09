import core from '@form8ion/core';

import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';

import * as workflow from './workflow.js';
import ciWorkflowExists from './predicate.js';

suite('github workflows predicate', () => {
  let sandbox;
  const projectRoot = any.string();
  const pathToWorkflowFile = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(core, 'fileExists');
    sandbox.stub(workflow, 'getPathToWorkflowFile');

    workflow.getPathToWorkflowFile.withArgs(projectRoot).returns(pathToWorkflowFile);
  });

  teardown(() => sandbox.restore());

  test('that `true` is returned if the ci workflow exists', async () => {
    core.fileExists.withArgs(pathToWorkflowFile).resolves(true);

    const value = await ciWorkflowExists({projectRoot});

    assert.isTrue(value);
  });

  test('that `false` is returned if the ci workflow does not exist', async () => {
    core.fileExists.withArgs(pathToWorkflowFile).resolves(false);

    assert.isFalse(await ciWorkflowExists({projectRoot}));
  });
});
