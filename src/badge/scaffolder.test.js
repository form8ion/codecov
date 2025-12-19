import {it, vi, describe, expect} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import fetchRepositoryDetails from './repository-details-fetcher.js';
import {scaffold} from './scaffolder.js';

vi.mock('./repository-details-fetcher.js');

describe('badge scaffolder', () => {
  const vcsHost = any.fromList(['github', 'gitlab', 'bitbucket']);
  const vcsOwner = any.word();
  const vcsName = any.word();
  const vcs = {
    ...any.simpleObject(),
    host: vcsHost,
    owner: vcsOwner,
    name: vcsName
  };

  it('should scaffold badge details for supported vcs hosts', async () => {
    const {badges} = await scaffold({vcs});

    expect(badges.status.coverage).toEqual({
      img: `https://img.shields.io/codecov/c/${vcsHost}/${vcsOwner}/${vcsName}?logo=codecov`,
      link: `https://codecov.io/${vcsHost}/${vcsOwner}/${vcsName}`,
      text: 'Codecov'
    });
  });

  it('should include the image token in the img url', async () => {
    const apiAccessToken = any.string();
    const token = any.word();
    when(fetchRepositoryDetails).calledWith({vcs, apiAccessToken}).thenResolve({image_token: token});

    const {badges} = await scaffold({vcs, apiAccessToken});

    expect(badges.status.coverage.img)
      .toEqual(`https://img.shields.io/codecov/c/${vcsHost}/${vcsOwner}/${vcsName}?logo=codecov&token=${token}`);
  });

  it('should not define the badge if shields.io badge does not support the host', async () => {
    const {badges} = await scaffold({vcs: {host: any.word()}});

    expect(badges).toBe(undefined);
  });

  it('should not define the badge if vcs details are not defined', async () => {
    const {badges} = await scaffold({});

    expect(badges).toBe(undefined);
  });
});
