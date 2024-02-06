import {promises as fs} from 'fs';
import {load} from 'js-yaml';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Given('CI is a GitHub workflow', async function () {
  this.githubWorkflow = true;
});

Given('the GitHub Action is configured', async function () {
  this.githubAction = true;
});

Given('the codecov action is used in the verify workflow', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the workflow is configured to report using the GitHub Action', async function () {
  const {jobs: {verify: {steps}}} = load(await fs.readFile(`${process.cwd()}/.github/workflows/node-ci.yml`, 'utf-8'));

  const codecovActionOccurances = steps.filter(step => step.uses?.startsWith('codecov/codecov-action')).length;

  assert.equal(
    codecovActionOccurances,
    1,
    'Expected the Codecov action to be included in the `steps` list 1 time, '
     + `but was included ${codecovActionOccurances} times`
  );
});

Then('the step to call the legacy uploader script is removed from the workflow', async function () {
  const {jobs: {verify: {steps}}} = load(await fs.readFile(`${process.cwd()}/.github/workflows/node-ci.yml`, 'utf-8'));

  assert.isFalse(
    !!steps.find(({run}) => 'npm run coverage:report' === run),
    'The legacy step for reporting coverage has not been removed from the workflow steps'
  );
});

Then('the codecov action is not used in the workflow', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
