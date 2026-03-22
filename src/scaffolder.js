import {scaffold as scaffoldConfig} from './config/index.js';

export async function scaffold({projectRoot}) {
  await scaffoldConfig({projectRoot});

  return {};
}
