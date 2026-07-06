import {loadPackageJson} from '@form8ion/javascript-core';

import {describe, it, vi, expect} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import legacyNodeReporterInUse from './tester.js';

vi.mock('@form8ion/javascript-core');

describe('legacy node reporter predicate', () => {
  const projectRoot = any.string();

  it('should return `true` if the legacy npm script exists', async () => {
    when(loadPackageJson)
      .calledWith({projectRoot})
      .thenResolve({...any.simpleObject(), scripts: {...any.simpleObject(), 'coverage:report': any.string()}});

    expect(await legacyNodeReporterInUse({projectRoot})).toBe(true);
  });

  it('should return `false` if the legacy npm script does not exist', async () => {
    when(loadPackageJson)
      .calledWith({projectRoot})
      .thenResolve({...any.simpleObject(), scripts: any.simpleObject()});

    expect(await legacyNodeReporterInUse({projectRoot})).toBe(false);
  });

  it('should return `false` if there is no `package.json`', async () => {
    const error = Object.assign(
      new Error(`ENOENT: no such file or directory, open '${projectRoot}/package.json'`),
      {
        code: 'ENOENT',
        errno: -2,
        syscall: 'open',
        path: `${projectRoot}/package.json`
      }
    );
    when(loadPackageJson).calledWith({projectRoot}).thenThrow(error);

    expect(await legacyNodeReporterInUse({projectRoot})).toBe(false);
  });

  it('should throw if other errors occur when loading the `package.json`', async () => {
    const error = Object.assign(new Error('Some other error'), {code: 'EOTHER'});
    when(loadPackageJson).calledWith({projectRoot}).thenThrow(error);

    await expect(legacyNodeReporterInUse({projectRoot})).rejects.toThrow(error);
  });
});
