import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('the coverage badge will be defined', async function () {
  const {badges} = this.scaffoldResult;

  assert.deepEqual(
    badges.status.coverage,
    {
      img: `https://img.shields.io/codecov/c/${this.vcsHost}/${this.vcsOwner}/${this.vcsName}.svg`,
      link: `https://codecov.io/${this.vcsHost}/${this.vcsOwner}/${this.vcsName}`,
      text: 'Codecov'
    }
  );
});

Then('the coverage badge will be not defined', async function () {
  const {badges} = this.scaffoldResult;

  assert.isUndefined(badges);
});
