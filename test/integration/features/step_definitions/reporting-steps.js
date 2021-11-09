import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('the reporting steps are defined', async function () {
  const {devDependencies, scripts} = this.scaffoldResult;

  assert.deepEqual(devDependencies, ['codecov']);
  assert.deepEqual(scripts, {'coverage:report': 'c8 report --reporter=text-lcov > coverage.lcov && codecov'});
});
