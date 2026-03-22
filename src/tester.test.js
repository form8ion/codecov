import {fileExists} from '@form8ion/core';

import {describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import codecovInUse from './tester.js';

vi.mock('@form8ion/core');

describe('codecov predicate', () => {
  const projectRoot = any.string();

  it('should return `true` if the config file exists', async () => {
    when(fileExists).calledWith(`${projectRoot}/.codecov.yml`).thenResolve(true);

    expect(await codecovInUse({projectRoot})).toBe(true);
  });

  it('should return `false` if the config file exists', async () => {
    when(fileExists).calledWith(`${projectRoot}/.codecov.yml`).thenResolve(false);

    expect(await codecovInUse({projectRoot})).toBe(false);
  });
});
