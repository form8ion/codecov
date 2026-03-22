export default function liftAction(action) {
  return {
    name: 'Upload unit test coverage to Codecov',
    ...action,
    with: {
      // eslint-disable-next-line no-template-curly-in-string
      token: '${{ secrets.CODECOV_TOKEN }}',
      flags: 'unit',
      report_type: 'coverage'
    }
  };
}
