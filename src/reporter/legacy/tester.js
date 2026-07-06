import {loadPackageJson} from '@form8ion/javascript-core';

export default async function legacyNodeReporterInUse({projectRoot}) {
  let parsedPackageContents;

  try {
    parsedPackageContents = await loadPackageJson({projectRoot});
  } catch (error) {
    if ('ENOENT' === error.code) {
      return false;
    }

    throw error;
  }

  return !!parsedPackageContents.scripts['coverage:report'];
}
