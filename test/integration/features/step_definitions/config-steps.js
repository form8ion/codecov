import {fileTypes, loadConfigFile} from '@form8ion/core';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Given('there is no .codecov.yml in the repository', async function () {
  this.configExists = false;
});

Given('the .codecov.yml file exists in the root of the repository', async function () {
  this.configExists = true;
});

Then('the .codecov.yml does not exist in the repository', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the config file is created', async function () {
  const {comment: {layout}} = await loadConfigFile({path: this.projectRoot, name: '.codecov', format: fileTypes.YAML});

  assert.equal(layout, 'reach,diff,flags,tree');
});
