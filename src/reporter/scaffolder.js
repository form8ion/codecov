export function scaffold() {
  return {
    devDependencies: ['codecov'],
    scripts: {'coverage:report': 'c8 report --reporter=text-lcov > coverage.lcov && codecov'}
  };
}
