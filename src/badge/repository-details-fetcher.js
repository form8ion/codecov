import got from 'got';

export default async function ({vcs, apiAccessToken}) {
  const {body: {repo}} = await got(
    `https://codecov.io/api/gh/${vcs.owner}/${vcs.name}`,
    {headers: {Authorization: apiAccessToken}, responseType: 'json'}
  );

  return repo;
}
