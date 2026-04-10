import {sourceHostedOnGitHub} from '@form8ion/github-core';

import {describe, it, vi, expect} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import vcsHostIsSupportedByCodecov from './vcs-host-checker.js';

vi.mock('@form8ion/github-core');

describe('Supported VCS Host Checker', () => {
  const projectRoot = any.string();

  it('should return `false` for unsupported VCS hosts', async () => {
    when(sourceHostedOnGitHub).calledWith({projectRoot}).thenResolve(false);

    expect(await vcsHostIsSupportedByCodecov({projectRoot})).toBe(false);
  });

  it('should return `true` for GitHub', async () => {
    when(sourceHostedOnGitHub).calledWith({projectRoot}).thenResolve(true);

    expect(await vcsHostIsSupportedByCodecov({projectRoot})).toBe(true);
  });
});
