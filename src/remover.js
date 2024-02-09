import {remove as removeAction} from './reporter/ci-providers/github-workflows/index.js';

export default async function ({projectRoot}) {
  await removeAction({projectRoot});

  return {};
}
