import {loadWorkflowFile, writeWorkflowFile} from '@form8ion/github-workflows-core';

import {test as codecovActionExistsInSteps, lift as liftSteps} from './steps/index.js';

export async function lift({projectRoot}) {
  const ciWorkflowName = 'node-ci';

  const workflowDetails = await loadWorkflowFile({projectRoot, name: ciWorkflowName});
  const {jobs: {verify: {steps}}} = workflowDetails;

  if (!codecovActionExistsInSteps(steps)) {
    const jobs = {
      ...workflowDetails.jobs,
      verify: {...workflowDetails.jobs.verify, steps: liftSteps(steps)}
    };

    await writeWorkflowFile({
      projectRoot,
      name: ciWorkflowName,
      config: {...workflowDetails, jobs}
    });
  }
}
