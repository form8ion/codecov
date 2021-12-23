import {promises as fs} from 'fs';
import {dump, load} from 'js-yaml';
import {fileExists} from '@form8ion/core';

export async function lift({projectRoot}) {
  const pathToWorkflowFile = `${projectRoot}/.github/workflows/node-ci.yml`;

  if (!await fileExists(pathToWorkflowFile)) return;

  const workflowDetails = load(await fs.readFile(pathToWorkflowFile, 'utf-8'));
  const {jobs: {verify: {steps}}} = workflowDetails;

  if (!steps.find(step => step.uses?.startsWith('codecov/codecov-action'))) {
    const stepsWithLegacyReportingRemoved = steps.filter(({run}) => 'npm run coverage:report' !== run);

    await fs.writeFile(
      pathToWorkflowFile,
      dump({
        ...workflowDetails,
        jobs: {
          ...workflowDetails.jobs,
          verify: {
            ...workflowDetails.jobs.verify,
            steps: [...stepsWithLegacyReportingRemoved, {uses: 'codecov/codecov-action@v2'}]
          }
        }
      })
    );
  }
}
