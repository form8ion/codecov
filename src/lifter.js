import deepmerge from 'deepmerge';

import {scaffold as scaffoldConfig} from './config/index.js';
import {scaffold as scaffoldBadge} from './badge/index.js';
import {lift as liftReporting} from './reporter/index.js';

export async function lift({projectRoot, packageManager, vcs}) {
  const [reportingResults, badgeResults] = await Promise.all([
    liftReporting({projectRoot, packageManager}),
    scaffoldBadge({vcs}),
    scaffoldConfig({projectRoot})
  ]);

  return deepmerge.all([reportingResults, badgeResults]);
}
