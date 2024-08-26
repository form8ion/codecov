import {promises as fs} from 'node:fs';
import {writePackageJson} from '@form8ion/javascript-core';

import execa from '../../thirdparty-wrappers/execa.js';
import {lift as liftCiProvider, test as ciProviderIsLiftable} from './ci-providers/index.js';

export default async function ({projectRoot, packageManager}) {
  const pathToPackageJson = `${projectRoot}/package.json`;

  const [ciProviderCanBeLifted, existingPackageContents] = await Promise.all([
    ciProviderIsLiftable({projectRoot}),
    fs.readFile(pathToPackageJson, 'utf-8')
  ]);
  const parsedPackageContents = JSON.parse(existingPackageContents);
  const {scripts} = parsedPackageContents;
  const {'coverage:report': reportCoverageScript, ...otherScripts} = scripts;

  if (ciProviderCanBeLifted) await liftCiProvider({projectRoot});

  if (scripts['coverage:report']) {
    parsedPackageContents.scripts = otherScripts;
    await writePackageJson({projectRoot, config: parsedPackageContents});

    await execa(packageManager, ['remove', 'codecov']);

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
