import {scaffold as scaffoldAction} from '../action/index.js';

export default function liftSteps(steps) {
  const stepsWithLegacyReportingRemoved = steps.filter(({run}) => 'npm run coverage:report' !== run);

  return [...stepsWithLegacyReportingRemoved, scaffoldAction()];
}
