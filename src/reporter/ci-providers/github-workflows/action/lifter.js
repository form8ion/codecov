export default function liftAction(action) {
  return {
    ...action,
    with: {
      // eslint-disable-next-line no-template-curly-in-string
      token: '${{ secrets.CODECOV_TOKEN }}'
    }
  };
}
