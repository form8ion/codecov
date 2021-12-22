import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

import * as reportingLifter from './reporter/lifter';
import {lift} from './lifter';

suite('lifter', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(reportingLifter, 'default');
  });

  teardown(() => sandbox.restore());

  test('that reporting is lifted', async () => {
    const projectRoot = any.string();

    await lift({projectRoot});

    assert.calledWith(reportingLifter.default, {projectRoot});
  });
});
