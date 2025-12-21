import {promises as fs} from 'node:fs';
import execa from 'execa';
import {writePackageJson} from '@form8ion/javascript-core';

import {it, describe, vi, expect} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {lift as liftCiProvider, test as ciProviderIsLiftable} from './ci-providers/index.js';
import liftReporting from './lifter.js';

vi.mock('node:fs');
vi.mock('execa');
vi.mock('@form8ion/javascript-core');
vi.mock('./ci-providers/index.js');

describe('reporting lifter', () => {
  const projectRoot = any.string();
  const packageManager = any.word();
  const pathToPackageJson = `${projectRoot}/package.json`;

  it('should remove the legacy node reporter', async () => {
    const otherScripts = any.simpleObject();
    const otherTopLevelProperties = any.simpleObject();
    const existingPackageContents = {
      ...otherTopLevelProperties,
      scripts: {...otherScripts, 'coverage:report': any.string()}
    };
    when(fs.readFile).calledWith(pathToPackageJson, 'utf-8').thenResolve(JSON.stringify(existingPackageContents));
    when(ciProviderIsLiftable).calledWith({projectRoot}).thenResolve(false);

    const {nextSteps} = await liftReporting({projectRoot, packageManager});

    expect(nextSteps).toEqual([{
      summary: 'Configure modern reporting to Codecov on your CI service',
      description: 'Configure the [Codecov Uploader](https://docs.codecov.com/docs/codecov-uploader) appropriately'
        + ' for your CI Provider. If available for your provider, prefer one of the dedicated wrappers.'
    }]);

    expect(execa).toHaveBeenCalledWith(packageManager, ['remove', 'codecov']);
    expect(writePackageJson).toHaveBeenCalledWith({
      projectRoot,
      config: {...otherTopLevelProperties, scripts: otherScripts}
    });
    expect(liftCiProvider).not.toHaveBeenCalled();
  });

  it('should lift the ci provider when supported', async () => {
    when(fs.readFile)
      .calledWith(pathToPackageJson, 'utf-8')
      .thenResolve(JSON.stringify({
        ...any.simpleObject(),
        scripts: {...any.simpleObject(), 'coverage:report': any.string()}
      }));
    when(ciProviderIsLiftable).calledWith({projectRoot}).thenResolve(true);

    const {nextSteps} = await liftReporting({projectRoot, packageManager});

    expect(liftCiProvider).toHaveBeenCalledWith({projectRoot});
    expect(nextSteps).toBeUndefined();
  });

  it('should not update the `package.json` if it did not contain a `coverage:report` script', async () => {
    const existingPackageContents = {...any.simpleObject(), scripts: any.simpleObject()};
    when(fs.readFile).calledWith(pathToPackageJson, 'utf-8').thenResolve(JSON.stringify(existingPackageContents));

    expect(await liftReporting({projectRoot})).toEqual({});
    expect(writePackageJson).not.toHaveBeenCalled();
  });
});
