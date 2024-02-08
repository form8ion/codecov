export function findCodecovActionIn(steps) {
  return steps.find(step => step.uses?.startsWith('codecov/codecov-action'));
}

export function scaffold() {
  return {uses: 'codecov/codecov-action@v3'};
}
