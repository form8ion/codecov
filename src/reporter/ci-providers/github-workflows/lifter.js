import {promises as fs} from 'fs';
import {dump, load} from 'js-yaml';
import {fileExists} from '@form8ion/core';

function getPathToWorkflowFile(projectRoot) {
  return `${projectRoot}/.github/workflows/node-ci.yml`;
}

export function test({projectRoot}) {
  return fileExists(getPathToWorkflowFile(projectRoot));
}

export async function lift({projectRoot}) {
  const pathToWorkflowFile = getPathToWorkflowFile(projectRoot);

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
            steps: [...stepsWithLegacyReportingRemoved, {uses: 'codecov/codecov-action@v3'}]
          }
        }
      })
    );
  }
}
