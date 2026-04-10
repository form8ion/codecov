import {sourceHostedOnGitHub} from '@form8ion/github-core';

export default function vcsHostIsSupportedByCodecov({projectRoot}) {
  return sourceHostedOnGitHub({projectRoot});
}
