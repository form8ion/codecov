import {assert} from 'chai';
import {scaffold} from './reporter';

suite('reporter', () => {
  test('that reporter details are scaffolded', () => {
    const {devDependencies, scripts} = scaffold();

    assert.deepEqual(devDependencies, ['codecov']);
    assert.equal(scripts['coverage:report'], 'c8 report --reporter=text-lcov > coverage.lcov && codecov');
  });
});
