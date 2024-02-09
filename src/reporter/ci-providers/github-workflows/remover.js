import {promises as fs} from 'node:fs';
import {dump, load} from 'js-yaml';

import {getPathToWorkflowFile} from './workflow.js';
import {removeCodecovActionFrom} from './codecov-action.js';

export default async function ({projectRoot}) {
  const pathToWorkflowFile = getPathToWorkflowFile(projectRoot);

  const existingConfig = load(await fs.readFile(pathToWorkflowFile, 'utf-8'));
  existingConfig.jobs.verify.steps = removeCodecovActionFrom(existingConfig.jobs.verify.steps);

  await fs.writeFile(pathToWorkflowFile, dump(existingConfig));
}
