import deepmerge from 'deepmerge';

import {scaffold as scaffoldBadge} from './badge';
import {lift as liftReporting} from './reporter';

export async function lift({projectRoot, packageManager, vcs}) {
  const [reportingResults, badgeResults] = await Promise.all([
    liftReporting({projectRoot, packageManager}),
    scaffoldBadge({vcs})
  ]);

  return deepmerge.all([reportingResults, badgeResults]);
}
