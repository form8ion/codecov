import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Given('the Codecov badge already exists in the readme', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the coverage badge will be defined', async function () {
  const {badges} = this.result;

  assert.deepEqual(
    badges.status.coverage,
    {
      img: `https://img.shields.io/codecov/c/${this.vcsHost}/${this.vcsOwner}/${this.vcsName}?logo=codecov${
        'Private' === this.visibility ? `&token=${this.imageToken}` : ''
      }`,
      link: `https://codecov.io/${this.vcsHost}/${this.vcsOwner}/${this.vcsName}`,
      text: 'Codecov'
    }
  );
});

Then('the coverage badge will not be defined', async function () {
  const {badges} = this.result;

  assert.isUndefined(badges);
});

Then('the Codecov badge is not shown in the readme', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
