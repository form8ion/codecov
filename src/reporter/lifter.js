import {promises as fs} from 'fs';

export default async function ({projectRoot}) {
  const pathToPackageJson = `${projectRoot}/package.json`;

  const existingPackageContents = await fs.readFile(pathToPackageJson, 'utf-8');
  const {scripts, ...otherTopLevelProperties} = JSON.parse(existingPackageContents);
  const {'coverage:report': reportCoverageScript, ...otherScripts} = scripts;

  if (scripts['coverage:report']) {
    await fs.writeFile(pathToPackageJson, JSON.stringify({...otherTopLevelProperties, scripts: otherScripts}));
  }
}
