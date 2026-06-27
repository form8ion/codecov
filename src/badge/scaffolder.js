import fetchRepositoryDetails from './repository-details-fetcher.js';

const supportedVcsHosts = {
  'github.com': 'github',
  'gitlab.com': 'gitlab',
  'bitbucket.org': 'bitbucket'
};

export async function scaffold({vcs, apiAccessToken}) {
  const host = supportedVcsHosts[vcs?.host];

  return {
    ...host && {
      badges: {
        status: {
          coverage: {
            img:
              `https://img.shields.io/codecov/c/${host}/${vcs.owner}/${vcs.name}/${vcs.defaultBranch}?logo=codecov${
                apiAccessToken
                  ? `&token=${(await fetchRepositoryDetails({
                    vcs,
                    apiAccessToken
                  })).image_token}`
                  : ''
              }`,
            link: `https://codecov.io/${host}/${vcs.owner}/${vcs.name}`,
            text: 'Codecov'
          }
        }
      }
    }
  };
}
