function stepIsCodecovAction(step) {
  if (!step.uses) return false;

  const [actionName] = step.uses.split('@');

  return 'codecov/codecov-action' === actionName;
}

export function findCodecovActionIn(steps) {
  return steps.find(step => stepIsCodecovAction(step));
}

export function removeCodecovActionFrom(steps) {
  return steps.filter(step => !stepIsCodecovAction(step));
}

export function scaffold() {
  return {uses: 'codecov/codecov-action@v5.5.2'};
}
