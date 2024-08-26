import {promises as fs} from 'node:fs';
import {load} from 'js-yaml';
import {writeWorkflowFile} from '@form8ion/github-workflows-core';

import {getPathToWorkflowFile} from './workflow.js';
import {removeCodecovActionFrom} from './codecov-action.js';

export default async function ({projectRoot}) {
  const pathToWorkflowFile = getPathToWorkflowFile(projectRoot);

  const existingConfig = load(await fs.readFile(pathToWorkflowFile, 'utf-8'));
  existingConfig.jobs.verify.steps = removeCodecovActionFrom(existingConfig.jobs.verify.steps);

  await writeWorkflowFile({projectRoot, name: 'node-ci', config: existingConfig});
}
