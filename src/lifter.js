import {lift as liftReporting} from './reporter';

export function lift({projectRoot, packageManager}) {
  return liftReporting({projectRoot, packageManager});
}
