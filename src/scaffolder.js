import {scaffold as scaffoldReporter} from './reporter';
import {scaffold as scaffoldBadge} from './badge';

export function scaffold({vcs, visibility}) {
  if ('Public' !== visibility) return {};

  return {
    ...scaffoldReporter(),
    ...scaffoldBadge({vcs})
  };
}
