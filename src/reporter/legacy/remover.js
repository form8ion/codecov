import {loadPackageJson, writePackageJson} from '@form8ion/javascript-core';
import {execa} from 'execa';

export default async function removeLegacyNodeReporter({projectRoot, packageManager}) {
  const parsedPackageContents = await loadPackageJson({projectRoot});
  const {scripts} = parsedPackageContents;
  const {'coverage:report': reportCoverageScript, ...otherScripts} = scripts;

  parsedPackageContents.scripts = otherScripts;
  await writePackageJson({projectRoot, config: parsedPackageContents});
  await execa(packageManager, ['remove', 'codecov']);

  return {};
}
