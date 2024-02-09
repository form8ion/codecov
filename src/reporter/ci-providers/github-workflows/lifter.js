import {promises as fs} from 'node:fs';
import {dump, load} from 'js-yaml';

import {findCodecovActionIn, scaffold as scaffoldCodecov} from './codecov-action.js';
import {getPathToWorkflowFile} from './workflow.js';

export async function lift({projectRoot}) {
  const pathToWorkflowFile = getPathToWorkflowFile(projectRoot);

  const workflowDetails = load(await fs.readFile(pathToWorkflowFile, 'utf-8'));
  const {jobs: {verify: {steps}}} = workflowDetails;

  if (!findCodecovActionIn(steps)) {
    const stepsWithLegacyReportingRemoved = steps.filter(({run}) => 'npm run coverage:report' !== run);

    await fs.writeFile(
      pathToWorkflowFile,
      dump({
        ...workflowDetails,
        jobs: {
          ...workflowDetails.jobs,
          verify: {
            ...workflowDetails.jobs.verify,
            steps: [...stepsWithLegacyReportingRemoved, scaffoldCodecov()]
          }
        }
      })
    );
  }
}
