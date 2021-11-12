import any from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';
import * as reporter from './reporter';
import * as badge from './badge';
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
  const reporterResults = any.simpleObject();
  const badgeResults = any.simpleObject();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(reporter, 'scaffold');
    sandbox.stub(badge, 'scaffold');
  });

  teardown(() => sandbox.restore());

  test('that codecov details are scaffolded', async () => {
    reporter.scaffold.returns(reporterResults);
    badge.scaffold.withArgs({vcs}).returns(badgeResults);

    const results = await scaffold({vcs, visibility: 'Public'});

    assert.deepEqual(results, {...reporterResults, ...badgeResults});
  });

  test('that details are not defined if the project is private', async () => {
    assert.deepEqual(await scaffold({visibility: 'Private'}), {});
  });

  test('that codecov details are scaffolded for private projects when an api access token is provided', async () => {
    const apiAccessToken = any.word();
    reporter.scaffold.returns(reporterResults);
    badge.scaffold.withArgs({vcs, apiAccessToken}).returns(badgeResults);

    const results = await scaffold({vcs, visibility: 'Private', apiAccessToken});

    assert.deepEqual(results, {...reporterResults, ...badgeResults});
  });
});
