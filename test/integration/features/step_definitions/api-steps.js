import {StatusCodes} from 'http-status-codes';
import {Before, Given} from '@cucumber/cucumber';
import any from '@travi/any';
import nock from 'nock';

let codecovScope;

Before(function () {
  codecovScope = nock('https://codecov.io/');
});

Given('an API access token is provided', async function () {
  this.apiToken = any.word();
  this.imageToken = any.word();

  codecovScope
    .matchHeader('Authorization', this.apiToken)
    .get(`/api/gh/${this.vcsOwner}/${this.vcsName}`)
    .reply(StatusCodes.OK, {repo: {image_token: this.imageToken}});
});
