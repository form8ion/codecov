import deepmerge from 'deepmerge';

import {expect, it, vi, describe} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {scaffold as scaffoldBadge} from './badge/index.js';
import {lift as liftReporting} from './reporter/index.js';
import {lift} from './lifter.js';

vi.mock('deepmerge');
vi.mock('./badge/index.js');
vi.mock('./reporter/index.js');

describe('lifter', () => {
  it('should lift the reporting process', async () => {
    const projectRoot = any.string();
    const packageManager = any.word();
    const vcs = any.simpleObject();
    const reportingResults = any.simpleObject();
    const badgeResults = any.simpleObject();
    const mergedResults = any.simpleObject();
    when(liftReporting).calledWith({projectRoot, packageManager}).thenResolve(reportingResults);
    when(scaffoldBadge).calledWith({vcs}).thenResolve(badgeResults);
    when(deepmerge.all).calledWith([reportingResults, badgeResults]).thenReturn(mergedResults);

    expect(await lift({projectRoot, packageManager, vcs})).toEqual(mergedResults);
  });
});
