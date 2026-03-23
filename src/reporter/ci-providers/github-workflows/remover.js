import {loadWorkflowFile, writeWorkflowFile} from '@form8ion/github-workflows-core';
import {remove as removeCodecovActionFrom} from './action/index.js';

export default async function removeCodecovAction({projectRoot}) {
  const existingConfig = await loadWorkflowFile({projectRoot, name: 'node-ci'});
  existingConfig.jobs = removeCodecovActionFrom(existingConfig.jobs);

  await writeWorkflowFile({projectRoot, name: 'node-ci', config: existingConfig});
}
