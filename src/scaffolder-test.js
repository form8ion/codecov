import any from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';
import * as predicates from './predicates';
import * as reporter from './reporter';
import * as badge from './badge/scaffolder';
import {scaffold} from './scaffolder';

suite('codecov', () => {
  let sandbox;
  const vcsHost = any.word();
  const vcsOwner = any.word();
  const vcsName = any.word();
  const vcs = {
    ...any.simpleObject(),
    host: vcsHost,
    owner: vcsOwner,
    name: vcsName
  };
  const visibility = any.word();
  const apiAccessToken = any.word();
  const reporterResults = any.simpleObject();
  const badgeResults = any.simpleObject();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(reporter, 'scaffold');
    sandbox.stub(badge, 'scaffold');
    sandbox.stub(predicates, 'coverageShouldBeReportedToCodecov');

    predicates.coverageShouldBeReportedToCodecov.withArgs({vcs, visibility, apiAccessToken}).returns(true);
  });

  teardown(() => sandbox.restore());

  test('that codecov details are scaffolded', async () => {
    reporter.scaffold.returns(reporterResults);
    badge.scaffold.withArgs({vcs, apiAccessToken}).returns(badgeResults);

    const results = await scaffold({vcs, visibility, apiAccessToken});

    assert.deepEqual(results, {...reporterResults, ...badgeResults});
  });

  test('that details are not defined if coverage should not be reported', async () => {
    predicates.coverageShouldBeReportedToCodecov.withArgs({vcs, visibility, apiAccessToken}).returns(false);

    assert.deepEqual(await scaffold({vcs, visibility, apiAccessToken}), {});
  });
});
