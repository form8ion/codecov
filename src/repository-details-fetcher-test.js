import sinon from 'sinon';
import any from '@travi/any';
import {assert} from 'chai';

import * as got from '../thirdparty-wrappers/got';
import fetchRepositoryDetails from './repository-details-fetcher';

suite('repository details fetcher', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(got, 'default');
  });

  teardown(() => sandbox.restore());

  test('that repository details are fetched from the codecov api', async () => {
    const apiAccessToken = any.string();
    const vcsHost = any.word();
    const vcsOwner = any.word();
    const vcsName = any.word();
    const vcs = {
      ...any.simpleObject(),
      host: vcsHost,
      owner: vcsOwner,
      name: vcsName
    };
    const repoDetails = any.simpleObject();
    got.default
      .withArgs(
        `https://codecov.io/api/gh/${vcsOwner}/${vcsName}`,
        {headers: {Authorization: apiAccessToken}, responseType: 'json'}
      )
      .resolves({body: {repo: repoDetails}});

    assert.equal(await fetchRepositoryDetails({vcs, apiAccessToken}), repoDetails);
  });
});
