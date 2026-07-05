import {describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {lift as liftCiProvider, test as ciProviderIsLiftable} from './ci-providers/index.js';
import {remove as removeLegacyNodeReporter, test as legacyNodeReporterInUse} from './legacy/index.js';
import liftReporting from './lifter.js';

vi.mock('./ci-providers/index.js');
vi.mock('./legacy/index.js');

describe('reporting lifter', () => {
  const projectRoot = any.string();
  const packageManager = any.word();

  it('should remove the legacy node reporter', async () => {
    when(legacyNodeReporterInUse).calledWith({projectRoot}).thenResolve(true);
    when(ciProviderIsLiftable).calledWith({projectRoot}).thenResolve(false);

    const {nextSteps} = await liftReporting({projectRoot, packageManager});

    expect(nextSteps).toEqual([{
      summary: 'Configure modern reporting to Codecov on your CI service',
      description: 'Configure the [Codecov Uploader](https://docs.codecov.com/docs/codecov-uploader) appropriately'
        + ' for your CI Provider. If available for your provider, prefer one of the dedicated wrappers.'
    }]);

    expect(removeLegacyNodeReporter).toHaveBeenCalledWith({projectRoot, packageManager});
    expect(liftCiProvider).not.toHaveBeenCalled();
  });

  it('should lift the ci provider when supported', async () => {
    when(legacyNodeReporterInUse).calledWith({projectRoot}).thenResolve(true);
    when(ciProviderIsLiftable).calledWith({projectRoot}).thenResolve(true);

    const {nextSteps} = await liftReporting({projectRoot, packageManager});

    expect(liftCiProvider).toHaveBeenCalledWith({projectRoot});
    expect(nextSteps).toBeUndefined();
  });

  it('should not update the `package.json` if it did not contain a `coverage:report` script', async () => {
    when(legacyNodeReporterInUse).calledWith({projectRoot}).thenResolve(false);

    expect(await liftReporting({projectRoot})).toEqual({});
    expect(removeLegacyNodeReporter).not.toHaveBeenCalled();
  });
});
