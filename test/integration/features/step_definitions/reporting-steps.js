import {promises as fs} from 'fs';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';

import {assertDependenciesWereRemoved} from './common-steps.js';

Given('the legacy node reporter is configured', async function () {
  this.legacyReporting = true;
});

Then('the reporting steps are not defined', async function () {
  const {devDependencies, scripts} = this.result;

  assert.isUndefined(devDependencies);
  assert.isUndefined(scripts);
});

Then('the legacy node reporter is removed', async function () {
  const {scripts} = JSON.parse(await fs.readFile(`${process.cwd()}/package.json`, 'utf-8'));

  assert.isUndefined(scripts['coverage:report']);
  assertDependenciesWereRemoved(this.execa, this.packageManager, ['codecov']);
});

Then('a next-step is returned for configuring CI reporting', async function () {
  const {nextSteps} = this.result;

  assert.includeDeepMembers(
    nextSteps,
    [{
      summary: 'Configure modern reporting to Codecov on your CI service',
      description: 'Configure the [Codecov Uploader](https://docs.codecov.com/docs/codecov-uploader) appropriately'
        + ' for your CI Provider. If available for your provider, prefer one of the dedicated wrappers.'
    }]
  );
});

Then('no next-step is returned for configuring CI reporting', async function () {
  const {nextSteps} = this.result;

  assert.isUndefined(nextSteps);
});
