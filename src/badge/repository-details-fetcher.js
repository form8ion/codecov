import got from 'got';

export default async function fetchRepositoryDetails({vcs, apiAccessToken}) {
  const {body: {repo}} = await got(
    `https://codecov.io/api/gh/${vcs.owner}/${vcs.name}`,
    {headers: {Authorization: apiAccessToken}, responseType: 'json'}
  );

  return repo;
}
