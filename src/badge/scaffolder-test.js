import any from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';
import * as repositoryDetailsFetcher from './repository-details-fetcher';
import {scaffold} from './scaffolder';

suite('badge', () => {
  let sandbox;
  const vcsHost = any.fromList(['github', 'gitlab', 'bitbucket']);
  const vcsOwner = any.word();
  const vcsName = any.word();
  const vcs = {
    ...any.simpleObject(),
    host: vcsHost,
    owner: vcsOwner,
    name: vcsName
  };

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(repositoryDetailsFetcher, 'default');
  });

  teardown(() => sandbox.restore());

  test('that badge details are scaffolded for supported vcs hosts', async () => {
    const {badges} = await scaffold({vcs});

    assert.deepEqual(
      badges.status.coverage,
      {
        img: `https://img.shields.io/codecov/c/${vcsHost}/${vcsOwner}/${vcsName}?logo=codecov`,
        link: `https://codecov.io/${vcsHost}/${vcsOwner}/${vcsName}`,
        text: 'Codecov'
      }
    );
  });

  test('that image token is included in the img url', async () => {
    const apiAccessToken = any.string();
    const token = any.word();
    repositoryDetailsFetcher.default.withArgs({vcs, apiAccessToken}).resolves({image_token: token});

    const {badges} = await scaffold({vcs, apiAccessToken});

    assert.deepEqual(
      badges.status.coverage.img,
      `https://img.shields.io/codecov/c/${vcsHost}/${vcsOwner}/${vcsName}?logo=codecov&token=${token}`
    );
  });

  test('that the badge is not defined if shields.io badge does not support the vcs host', async () => {
    const {badges} = await scaffold({vcs: {host: any.word()}});

    assert.isUndefined(badges);
  });

  test('that the badge is not defined if vcs details are not defined', async () => {
    const {badges} = await scaffold({});

    assert.isUndefined(badges);
  });
});
