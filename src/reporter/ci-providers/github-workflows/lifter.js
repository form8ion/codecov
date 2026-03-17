import {loadWorkflowFile, writeWorkflowFile} from '@form8ion/github-workflows-core';

import {lift as liftSteps} from './steps/index.js';

export async function lift({projectRoot}) {
  const ciWorkflowName = 'node-ci';

  const workflowDetails = await loadWorkflowFile({projectRoot, name: ciWorkflowName});
  const {jobs: {verify: {steps}}} = workflowDetails;

  await writeWorkflowFile({
    projectRoot,
    name: ciWorkflowName,
    config: {
      ...workflowDetails,
      jobs: {
        ...workflowDetails.jobs,
        verify: {
          ...workflowDetails.jobs.verify,
          steps: liftSteps(steps)
        }
      }
    }
  });
}
