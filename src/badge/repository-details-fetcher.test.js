import got from 'got';

import {expect, describe, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import fetchRepositoryDetails from './repository-details-fetcher.js';

vi.mock('got');

describe('repository-details-fetcher', () => {
  it('should fetch repository details from the codecov api', async () => {
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
    when(got)
      .calledWith(
        `https://codecov.io/api/gh/${vcsOwner}/${vcsName}`,
        {headers: {Authorization: apiAccessToken}, responseType: 'json'}
      )
      .thenResolve({body: {repo: repoDetails}});

    expect(await fetchRepositoryDetails({vcs, apiAccessToken})).toEqual(repoDetails);
  });
});
