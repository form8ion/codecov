import {fileTypes, writeConfigFile} from '@form8ion/core';

export default async function scaffoldConfig({projectRoot}) {
  await writeConfigFile({
    format: fileTypes.YAML,
    path: projectRoot,
    name: '.codecov',
    config: {comment: {layout: 'reach,diff,flags,tree'}}
  });
}
