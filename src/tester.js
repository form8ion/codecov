import {fileExists} from '@form8ion/core';

export default async function codecovInUse({projectRoot}) {
  return fileExists(`${projectRoot}/.codecov.yml`);
}
