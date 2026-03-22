import {describe, expect, it, vi} from 'vitest';
import any from '@travi/any';

import {scaffold as scaffoldConfig} from './config/index.js';
import {scaffold} from './scaffolder.js';

vi.mock('./config/index.js');

describe('scaffolder', () => {
  it('should simply return empty results', async () => {
    const projectRoot = any.string();

    const results = await scaffold({projectRoot});

    expect(results).toEqual({});
    expect(scaffoldConfig).toHaveBeenCalledWith({projectRoot});
  });
});
