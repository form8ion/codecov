import {scaffold as scaffoldAction, lift as liftAction, test as stepIsCodecovAction} from '../action/index.js';
import codecovActionExistsInSteps from './tester.js';

export default function liftSteps(steps) {
  if (!codecovActionExistsInSteps(steps)) {
    const stepsWithLegacyReportingRemoved = steps.filter(({run}) => 'npm run coverage:report' !== run);

    return [...stepsWithLegacyReportingRemoved, scaffoldAction()];
  }

  return steps.map(step => {
    if (stepIsCodecovAction(step)) return liftAction(step);

    return step;
  });
}
