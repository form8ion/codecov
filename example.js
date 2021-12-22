// #### Import
// remark-usage-ignore-next 3
import stubbedFs from 'mock-fs';
import nock from 'nock';
import {StatusCodes} from 'http-status-codes';
import {scaffold, lift} from './lib/index.cjs';

// remark-usage-ignore-next 5
stubbedFs({'package.json': JSON.stringify({scripts: {}})});
nock.disableNetConnect();
nock('https://codecov.io/')
  .get('/api/gh/foo/bar')
  .reply(StatusCodes.OK, {repo: {image_token: 'baz'}});

// #### Execute

(async () => {
  await scaffold({
    visibility: 'Public',
    vcs: {
      host: 'github',
      owner: 'foo',
      name: 'bar'
    }
  });

  await scaffold({
    visibility: 'Private',
    vcs: {
      host: 'github',
      owner: 'foo',
      name: 'bar'
    },
    apiAccessToken: 'XXXXXX'
  });

  await lift({projectRoot: process.cwd()});
})();
