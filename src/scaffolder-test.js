import any from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';
import * as reporter from './reporter';
import * as badge from './badge';
import {scaffold} from './scaffolder';

suite('codecov', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(reporter, 'scaffold');
    sandbox.stub(badge, 'scaffold');
  });

  teardown(() => sandbox.restore());

  test('that codecov details are scaffolded', () => {
    const vcsHost = any.fromList(['github', 'gitlab', 'bitbucket']);
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
    reporter.scaffold.returns(reporterResults);
    badge.scaffold.returns(badgeResults);

    const results = scaffold({vcs, visibility: 'Public'});

    assert.deepEqual(results, {...reporterResults, ...badgeResults});
  });

  test('that details are not defined if the project is private', () => {
    assert.deepEqual(scaffold({visibility: 'Private'}), {});
  });
});
