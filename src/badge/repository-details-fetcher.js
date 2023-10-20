import got from '../../thirdparty-wrappers/got.js';

export default async function ({vcs, apiAccessToken}) {
  const {body: {repo}} = await got(
    `https://codecov.io/api/gh/${vcs.owner}/${vcs.name}`,
    {headers: {Authorization: apiAccessToken}, responseType: 'json'}
  );

  return repo;
}
