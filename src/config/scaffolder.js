import {fileTypes, writeConfigFile} from '@form8ion/core';

export default async function scaffoldConfig({projectRoot}) {
  await writeConfigFile({format: fileTypes.YAML, config: {}, path: projectRoot, name: '.codecov'});
}
