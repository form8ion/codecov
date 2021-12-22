import {lift as liftReporting} from './reporter';

export function lift({projectRoot}) {
  return liftReporting({projectRoot});
}
