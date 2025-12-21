import {loadWorkflowFile, writeWorkflowFile} from '@form8ion/github-workflows-core';

import {it, describe, vi, expect, beforeEach} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {findCodecovActionIn, scaffold as scaffoldCodecov} from './codecov-action.js';
import {lift as configureGithubWorkflow} from './lifter.js';

vi.mock('@form8ion/github-workflows-core');
vi.mock('./codecov-action.js');

describe('github workflow lifter', () => {
  const projectRoot = any.string();
  const codecovActionDefinition = any.simpleObject();
  const ciWorkflowName = 'node-ci';

  beforeEach(() => {
    when(scaffoldCodecov).calledWith().thenReturn(codecovActionDefinition);
  });

  it('should add the codecov action to the verify job', async () => {
    const otherTopLevelProperties = any.simpleObject();
    const otherJobs = any.simpleObject();
    const otherVerifyProperties = any.simpleObject();
    const existingVerifySteps = any.listOf(any.simpleObject);
    const existingWorkflowContents = {
      ...otherTopLevelProperties,
      jobs: {...otherJobs, verify: {...otherVerifyProperties, steps: existingVerifySteps}}
    };
    when(loadWorkflowFile).calledWith({projectRoot, name: ciWorkflowName}).thenResolve(existingWorkflowContents);

    await configureGithubWorkflow({projectRoot});

    expect(writeWorkflowFile).toHaveBeenCalledWith({
      projectRoot,
      name: ciWorkflowName,
      config: {
        ...otherTopLevelProperties,
        jobs: {
          ...otherJobs,
          verify: {
            ...otherVerifyProperties,
            steps: [...existingVerifySteps, codecovActionDefinition]
          }
        }
      }
    });
  });

  it('should not add the codecov action if it is already included', async () => {
    const existingSteps = any.listOf(any.simpleObject);
    when(loadWorkflowFile)
      .calledWith({projectRoot, name: ciWorkflowName})
      .thenResolve({
        ...(any.simpleObject()),
        jobs: {
          ...(any.simpleObject()),
          verify: {
            ...(any.simpleObject()),
            steps: existingSteps
          }
        }
      });
    when(findCodecovActionIn).calledWith(existingSteps).thenReturn(any.simpleObject());

    await configureGithubWorkflow({projectRoot});

    expect(writeWorkflowFile).not.toHaveBeenCalled();
  });

  it('should remove the legacy reporting step, if present', async () => {
    const otherTopLevelProperties = any.simpleObject();
    const otherJobs = any.simpleObject();
    const otherVerifyProperties = any.simpleObject();
    const otherVerifySteps = any.listOf(any.simpleObject);
    const existingWorkflowContents = {
      ...otherTopLevelProperties,
      jobs: {
        ...otherJobs,
        verify: {...otherVerifyProperties, steps: [...otherVerifySteps, {run: 'npm run coverage:report'}]}
      }
    };
    when(loadWorkflowFile).calledWith({projectRoot, name: ciWorkflowName}).thenResolve(existingWorkflowContents);
    when(findCodecovActionIn).calledWith().thenReturn(undefined);

    await configureGithubWorkflow({projectRoot});

    expect(writeWorkflowFile).toHaveBeenCalledWith({
      projectRoot,
      name: ciWorkflowName,
      config: {
        ...otherTopLevelProperties,
        jobs: {
          ...otherJobs,
          verify: {
            ...otherVerifyProperties,
            steps: [...otherVerifySteps, codecovActionDefinition]
          }
        }
      }
    });
  });
});
