import {lift as liftCiProvider, test as ciProviderIsLiftable} from './ci-providers/index.js';
import {remove as removeLegacyNodeReporter, test as legacyNodeReporterInUse} from './legacy/index.js';

export default async function liftReporter({projectRoot, packageManager}) {
  const ciProviderCanBeLifted = await ciProviderIsLiftable({projectRoot});

  if (ciProviderCanBeLifted) await liftCiProvider({projectRoot});

  if (await legacyNodeReporterInUse({projectRoot})) {
    await removeLegacyNodeReporter({projectRoot, packageManager});

    return {
      ...!ciProviderCanBeLifted && {
        nextSteps: [{
          summary: 'Configure modern reporting to Codecov on your CI service',
          description: 'Configure the [Codecov Uploader](https://docs.codecov.com/docs/codecov-uploader) appropriately'
            + ' for your CI Provider. If available for your provider, prefer one of the dedicated wrappers.'
        }]
      }
    };
  }

  return {};
}
