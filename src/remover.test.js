import {describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {remove as removeAction, test as githubWorkflowExists} from './reporter/ci-providers/github-workflows/index.js';
import remove from './remover.js';

vi.mock(('./reporter/ci-providers/github-workflows/index.js'));

describe('remover', () => {
  const projectRoot = any.string();

  it('should remove the various parts', async () => {
    when(githubWorkflowExists).calledWith({projectRoot}).thenResolve(true);

    expect(await remove({projectRoot})).toEqual({});
    expect(removeAction).toHaveBeenCalledWith({projectRoot});
  });

  it('should not remove the action if there is no GitHub Actions workflow', async () => {
    when(githubWorkflowExists).calledWith({projectRoot}).thenResolve(false);

    await remove({projectRoot});

    expect(removeAction).not.toHaveBeenCalled();
  });
});
