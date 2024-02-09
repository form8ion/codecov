import {promises as fs} from 'fs';
import {load} from 'js-yaml';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';

async function assertCodecovActionFoundTimes(expectedOccurrences) {
  const {jobs: {verify: {steps}}} = load(await fs.readFile(`${process.cwd()}/.github/workflows/node-ci.yml`, 'utf-8'));

  const codecovActionOccurrences = steps.filter(step => step.uses?.startsWith('codecov/codecov-action')).length;

  assert.equal(
    codecovActionOccurrences,
    expectedOccurrences,
    'Expected the Codecov action to be included in the `steps` list 1 time, '
    + `but was included ${codecovActionOccurrences} times`
  );
}

Given('CI is a GitHub workflow', async function () {
  this.githubWorkflow = true;
});

Given('the GitHub Action is configured', async function () {
  this.githubAction = true;
});

Given('a CI workflow is not defined', async function () {
  this.githubWorkflow = true;
});

Then('the workflow is configured to report using the GitHub Action', async function () {
  await assertCodecovActionFoundTimes(1);
});

Then('the codecov action is not used in the workflow', async function () {
  const originalWorkflowContents = load(this.githubWorkflows['.github'].workflows['node-ci.yml']);
  const {jobs: {verify: {steps}}} = load(await fs.readFile(`${process.cwd()}/.github/workflows/node-ci.yml`, 'utf-8'));

  await assertCodecovActionFoundTimes(0);
  assert.deepEqual(
    steps,
    originalWorkflowContents.jobs.verify.steps.filter(step => !step.uses?.startsWith('codecov/codecov-action'))
  );
});

Then('the step to call the legacy uploader script is removed from the workflow', async function () {
  const {jobs: {verify: {steps}}} = load(await fs.readFile(`${process.cwd()}/.github/workflows/node-ci.yml`, 'utf-8'));

  assert.isFalse(
    !!steps.find(({run}) => 'npm run coverage:report' === run),
    'The legacy step for reporting coverage has not been removed from the workflow steps'
  );
});
