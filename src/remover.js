import {remove as removeAction, test as githubWorkflowExists} from './reporter/ci-providers/github-workflows/index.js';

export default async function removeCodecov({projectRoot}) {
  if (await githubWorkflowExists({projectRoot})) {
    await removeAction({projectRoot});
  }

  return {};
}
