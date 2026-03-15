import {loadWorkflowFile, writeWorkflowFile} from '@form8ion/github-workflows-core';

import {test as codecovActionExistsInSteps} from './action/index.js';
import {scaffold as scaffoldCodecov} from './codecov-action.js';

export async function lift({projectRoot}) {
  const ciWorkflowName = 'node-ci';

  const workflowDetails = await loadWorkflowFile({projectRoot, name: ciWorkflowName});
  const {jobs: {verify: {steps}}} = workflowDetails;

  if (!codecovActionExistsInSteps(steps)) {
    const stepsWithLegacyReportingRemoved = steps.filter(({run}) => 'npm run coverage:report' !== run);

    await writeWorkflowFile({
      projectRoot,
      name: ciWorkflowName,
      config: {
        ...workflowDetails,
        jobs: {
          ...workflowDetails.jobs,
          verify: {
            ...workflowDetails.jobs.verify,
            steps: [...stepsWithLegacyReportingRemoved, scaffoldCodecov()]
          }
        }
      }
    });
  }
}
