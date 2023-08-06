// #### Import
// remark-usage-ignore-next 3
import stubbedFs from 'mock-fs';
import nock from 'nock';
import {StatusCodes} from 'http-status-codes';
import {packageManagers} from '@form8ion/javascript-core';
import {scaffold, lift} from './lib/index';

// remark-usage-ignore-next 5
stubbedFs({'package.json': JSON.stringify({scripts: {}})});
nock.disableNetConnect();
nock('https://codecov.io/')
  .get('/api/gh/foo/bar')
  .reply(StatusCodes.OK, {repo: {image_token: 'baz'}});

// #### Execute

(async () => {
  await scaffold();

  await lift({
    projectRoot: process.cwd(),
    packageManager: packageManagers.NPM,
    vcs: {
      host: 'github',
      owner: 'foo',
      name: 'bar'
    }
  });
})();
