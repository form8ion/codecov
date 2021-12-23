import {coverageShouldBeReportedToCodecov} from './predicates';
import {scaffold as scaffoldBadge} from './badge';

export async function scaffold({vcs, visibility, apiAccessToken}) {
  if (!coverageShouldBeReportedToCodecov({vcs, visibility, apiAccessToken})) return {};

  return {
    ...await scaffoldBadge({vcs, apiAccessToken})
  };
}
