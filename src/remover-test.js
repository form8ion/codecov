import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

import * as actionRemover from './reporter/ci-providers/github-workflows/remover.js';
import remove from './remover.js';

suite('remover', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(actionRemover, 'default');
  });

  teardown(() => sandbox.restore());
  test('that the various parts are removed', async () => {
    const projectRoot = any.string();

    assert.deepEqual(await remove({projectRoot}), {});
    assert.calledWith(actionRemover.default, {projectRoot});
  });
});
