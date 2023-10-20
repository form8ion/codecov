import fetchRepositoryDetails from './repository-details-fetcher.js';

export async function scaffold({vcs, apiAccessToken}) {
  return {
    ...['github', 'gitlab', 'bitbucket'].includes(vcs?.host) && {
      badges: {
        status: {
          coverage: {
            img: `https://img.shields.io/codecov/c/${vcs.host}/${vcs.owner}/${vcs.name}?logo=codecov${
              apiAccessToken
                ? `&token=${(await fetchRepositoryDetails({vcs, apiAccessToken})).image_token}`
                : ''
            }`,
            link: `https://codecov.io/${vcs.host}/${vcs.owner}/${vcs.name}`,
            text: 'Codecov'
          }
        }
      }
    }
  };
}
