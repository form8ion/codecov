import {Given} from '@cucumber/cucumber';

Given('the source code is hosted on {string}', async function (vcsHost) {
  this.vcsHost = vcsHost;
});

Given('the project visibility is {string}', async function (visibility) {
  this.visibility = visibility;
});
