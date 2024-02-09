import {fileExists} from '@form8ion/core';

import {getPathToWorkflowFile} from './workflow.js';

export default function ({projectRoot}) {
  return fileExists(getPathToWorkflowFile(projectRoot));
}
