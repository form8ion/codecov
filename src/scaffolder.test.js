import {describe, expect, it} from 'vitest';
import any from '@travi/any';

import {scaffold} from './scaffolder.js';

describe('scaffolder', () => {
  it('should simply return empty results', async () => {
    const results = await scaffold(any.simpleObject());

    expect(results).toEqual({});
  });
});
