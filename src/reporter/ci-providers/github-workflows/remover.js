import {loadWorkflowFile, writeWorkflowFile} from '@form8ion/github-workflows-core';
import {removeCodecovActionFrom} from './codecov-action.js';

export default async function ({projectRoot}) {
  const existingConfig = await loadWorkflowFile({projectRoot, name: 'node-ci'});
  existingConfig.jobs.verify.steps = removeCodecovActionFrom(existingConfig.jobs.verify.steps);

  await writeWorkflowFile({projectRoot, name: 'node-ci', config: existingConfig});
}
