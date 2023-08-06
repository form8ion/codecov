import deepmerge from 'deepmerge';

import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

import * as reportingLifter from './reporter/lifter';
import * as badge from './badge/scaffolder';
import {lift} from './lifter';

suite('lifter', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(reportingLifter, 'default');
    sandbox.stub(badge, 'scaffold');
    sandbox.stub(deepmerge, 'all');
  });

  teardown(() => sandbox.restore());

  test('that reporting is lifted', async () => {
    const projectRoot = any.string();
    const packageManager = any.word();
    const vcs = any.simpleObject();
    const reportingResults = any.simpleObject();
    const badgeResults = any.simpleObject();
    const mergedResults = any.simpleObject();
    reportingLifter.default.withArgs({projectRoot, packageManager}).resolves(reportingResults);
    badge.scaffold.withArgs({vcs}).resolves(badgeResults);
    deepmerge.all.withArgs([reportingResults, badgeResults]).returns(mergedResults);

    assert.equal(await lift({projectRoot, packageManager, vcs}), mergedResults);
  });
});
