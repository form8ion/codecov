import {promises as fs} from 'fs';

import execa from '../../thirdparty-wrappers/execa';
import {lift as liftCiProvider, test as ciProviderIsLiftable} from './ci-providers';

export default async function ({projectRoot, packageManager}) {
  const pathToPackageJson = `${projectRoot}/package.json`;

  const [ciProviderCanBeLifted, existingPackageContents] = await Promise.all([
    ciProviderIsLiftable({projectRoot}),
    fs.readFile(pathToPackageJson, 'utf-8')
  ]);
  const {scripts, ...otherTopLevelProperties} = JSON.parse(existingPackageContents);
  const {'coverage:report': reportCoverageScript, ...otherScripts} = scripts;

  if (ciProviderCanBeLifted) await liftCiProvider({projectRoot});

  if (scripts['coverage:report']) {
    await fs.writeFile(pathToPackageJson, JSON.stringify({...otherTopLevelProperties, scripts: otherScripts}));

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
