export function coverageShouldBeReportedToCodecov({vcs, visibility, apiAccessToken}) {
  return !!('Public' === visibility || (apiAccessToken && 'github' === vcs.host));
}
