import {expect, it, describe} from 'vitest';
import any from '@travi/any';

import {coverageShouldBeReportedToCodecov} from './predicates.js';

describe('predicates', () => {
  it('should determine that coverage should be reported when the project is public', () => {
    expect(coverageShouldBeReportedToCodecov({visibility: 'Public'})).toBe(true);
  });

  it(
    'should determine that coverage should be reported when an API token is provided and GitHub is the VCS host',
    async () => {
      expect(coverageShouldBeReportedToCodecov({apiAccessToken: any.word(), vcs: {host: 'github'}})).toBe(true);
    }
  );

  it(
    'should determine that coverage should not be reported when the project is not public and no API token is provided',
    async () => {
      expect(coverageShouldBeReportedToCodecov({})).toBe(false);
    }
  );

  it(
    "should determine that coverage should not be reported when an API token is provided but the VCS host isn't GitHub",
    async () => {
      expect(coverageShouldBeReportedToCodecov({apiAccessToken: any.word(), vcs: {host: any.word()}})).toBe(false);
    }
  );
});
