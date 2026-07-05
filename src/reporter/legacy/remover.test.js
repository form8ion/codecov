import {execa} from 'execa';
import {loadPackageJson, writePackageJson} from '@form8ion/javascript-core';

import {describe, it, vi, expect} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import removeLegacyNodeReporter from './remover.js';

vi.mock('execa');
vi.mock('@form8ion/javascript-core');

describe('legacy node reporter remover', () => {
  const projectRoot = any.string();
  const packageManager = any.word();
  const otherScripts = any.simpleObject();
  const otherTopLevelProperties = any.simpleObject();

  it('should remove the legacy node reporter', async () => {
    const existingPackageContents = {
      ...otherTopLevelProperties,
      scripts: {...otherScripts, 'coverage:report': any.string()}
    };
    when(loadPackageJson).calledWith({projectRoot}).thenResolve(existingPackageContents);

    expect(await removeLegacyNodeReporter({projectRoot, packageManager})).toEqual({});

    expect(execa).toHaveBeenCalledWith(packageManager, ['remove', 'codecov']);
    expect(writePackageJson).toHaveBeenCalledWith({
      projectRoot,
      config: {...otherTopLevelProperties, scripts: otherScripts}
    });
  });
});
