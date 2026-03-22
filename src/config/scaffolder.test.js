import {fileTypes, writeConfigFile} from '@form8ion/core';

import {describe, it, expect, vi} from 'vitest';
import any from '@travi/any';

import scaffoldConfig from './scaffolder.js';

vi.mock('@form8ion/core');

describe('config scaffolder', () => {
  it('should create the config file', async () => {
    const projectRoot = any.string();

    await scaffoldConfig({projectRoot});

    expect(writeConfigFile).toHaveBeenCalledWith({
      format: fileTypes.YAML,
      path: projectRoot,
      name: '.codecov',
      config: {comment: {layout: 'reach,diff,flags,tree'}}
    });
  });
});
