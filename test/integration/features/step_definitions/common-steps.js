import {resolve} from 'path';
import {After, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';

const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'node_modules'));

After(function () {
  stubbedFs.restore();
});

When('the project is scaffolded', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {scaffold} = require('@form8ion/codecov');

  stubbedFs({
    node_modules: stubbedNodeModules
  });

  this.vcsName = any.word();
  this.vcsOwner = any.word();

  this.scaffoldResult = await scaffold({
    vcs: {host: this.vcsHost, owner: this.vcsOwner, name: this.vcsName},
    visibility: this.visibility
  });
});
