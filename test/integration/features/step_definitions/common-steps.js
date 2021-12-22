import {resolve} from 'path';
import {After, Before, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';
import nock from 'nock';

const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'node_modules'));

Before(function () {
  this.vcsName = any.word();
  this.vcsOwner = any.word();

  nock.disableNetConnect();
});

After(function () {
  stubbedFs.restore();
  nock.enableNetConnect();
  nock.cleanAll();
});

When('the project is scaffolded', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {scaffold} = require('@form8ion/codecov');

  stubbedFs({
    node_modules: stubbedNodeModules
  });

  this.scaffoldResult = await scaffold({
    vcs: {host: this.vcsHost, owner: this.vcsOwner, name: this.vcsName},
    visibility: this.visibility,
    apiAccessToken: this.apiToken
  });
});

When('the project is lifted', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {lift} = require('@form8ion/codecov');

  stubbedFs({
    node_modules: stubbedNodeModules
  });

  await lift({});
});
