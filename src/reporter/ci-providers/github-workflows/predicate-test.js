import workflowsCore from '@form8ion/github-workflows-core';

import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';

import ciWorkflowExists from './predicate.js';

suite('github workflows predicate', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(workflowsCore, 'workflowFileExists');
  });

  teardown(() => sandbox.restore());

  test('that `true` is returned if the ci workflow exists', async () => {
    workflowsCore.workflowFileExists.withArgs({projectRoot, name: 'node-ci'}).resolves(true);

    const value = await ciWorkflowExists({projectRoot});

    assert.isTrue(value);
  });

  test('that `false` is returned if the ci workflow does not exist', async () => {
    workflowsCore.workflowFileExists.withArgs({projectRoot, name: 'node-ci'}).resolves(false);

    assert.isFalse(await ciWorkflowExists({projectRoot}));
  });
});
