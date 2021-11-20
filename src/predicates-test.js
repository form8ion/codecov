import {assert} from 'chai';
import any from '@travi/any';

import {coverageShouldBeReportedToCodecov} from './predicates';

suite('predicates', () => {
  test('that coverage should be reported when the project is public', () => {
    assert.isTrue(coverageShouldBeReportedToCodecov({visibility: 'Public'}));
  });

  test('that coverage should be reported when an API token is provided and GitHub is the VCS host', () => {
    assert.isTrue(coverageShouldBeReportedToCodecov({apiAccessToken: any.word(), vcs: {host: 'github'}}));
  });

  test('that coverage should not be reported when the project is not public and no API token is provided', () => {
    assert.isFalse(coverageShouldBeReportedToCodecov({}));
  });

  test('that coverage should not be reported when an API token is provided but the VCS host is not GitHub', () => {
    assert.isFalse(coverageShouldBeReportedToCodecov({apiAccessToken: any.word(), vcs: {host: any.word()}}));
  });
});
