import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

import * as actionRemover from './reporter/ci-providers/github-workflows/remover.js';
import * as workflowPredicate from './reporter/ci-providers/github-workflows/predicate.js';
import remove from './remover.js';

suite('remover', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(actionRemover, 'default');
    sandbox.stub(workflowPredicate, 'default');
  });

  teardown(() => sandbox.restore());

  test('that the various parts are removed', async () => {
    const projectRoot = any.string();
    workflowPredicate.default.withArgs({projectRoot}).resolves(true);

    assert.deepEqual(await remove({projectRoot}), {});
    assert.calledWith(actionRemover.default, {projectRoot});
  });

  test('that the action is not removed if there is no github workflow', async () => {
    const projectRoot = any.string();
    workflowPredicate.default.withArgs({projectRoot}).resolves(false);

    assert.deepEqual(await remove({projectRoot}), {});
    assert.notCalled(actionRemover.default);
  });
});
