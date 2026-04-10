import vcsHostIsSupportedByCodecov from './vcs-host-checker.js';
import {scaffold as scaffoldConfig} from './config/index.js';

export async function scaffold({projectRoot}) {
  if (await vcsHostIsSupportedByCodecov({projectRoot})) {
    await scaffoldConfig({projectRoot});
  }

  return {};
}
