import {lift as liftReporting} from './reporter';

export async function lift({projectRoot}) {
  await liftReporting({projectRoot});
}
