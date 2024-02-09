import any from '@travi/any';
import {assert} from 'chai';

import {getPathToWorkflowFile} from './workflow.js';

suite('github workflow', () => {
  test('that the path to the ci workflow file is returned', () => {
    const projectRoot = any.string();

    assert.equal(getPathToWorkflowFile(projectRoot), `${projectRoot}/.github/workflows/node-ci.yml`);
  });
});
