import {describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import vcsHostIsSupportedByCodecov from './vcs-host-checker.js';
import {scaffold as scaffoldConfig} from './config/index.js';
import {scaffold} from './scaffolder.js';

vi.mock('./vcs-host-checker.js');
vi.mock('./config/index.js');

describe('scaffolder', () => {
  const projectRoot = any.string();

  it('should configure codecov when the vcs host is supported by codecov', async () => {
    when(vcsHostIsSupportedByCodecov).calledWith({projectRoot}).thenResolve(true);

    const results = await scaffold({projectRoot});

    expect(results).toEqual({});
    expect(scaffoldConfig).toHaveBeenCalledWith({projectRoot});
  });

  it('should simply return empty results when the vcs host is not supported by codecov', async () => {
    when(vcsHostIsSupportedByCodecov).calledWith({projectRoot}).thenResolve(false);

    const results = await scaffold({projectRoot});

    expect(results).toEqual({});
    expect(scaffoldConfig).not.toHaveBeenCalled();
  });
});
