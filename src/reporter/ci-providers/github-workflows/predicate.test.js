import {workflowFileExists} from '@form8ion/github-workflows-core';

import {expect, describe, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import ciWorkflowExists from './predicate.js';

vi.mock('@form8ion/github-workflows-core');

describe('github workflows predicate', () => {
  const projectRoot = any.string();

  it('should determine whether the verification workflow exists', async () => {
    const workflowExists = any.boolean();
    when(workflowFileExists).calledWith({projectRoot, name: 'node-ci'}).thenResolve(workflowExists);

    expect(await ciWorkflowExists({projectRoot})).toEqual(workflowExists);
  });
});
