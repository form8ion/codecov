import any from '@travi/any';
import {assert} from 'chai';
import {scaffold} from './badge';

suite('badge', () => {
  test('that badge details are scaffolded for supported vcs hosts', () => {
    const vcsHost = any.fromList(['github', 'gitlab', 'bitbucket']);
    const vcsOwner = any.word();
    const vcsName = any.word();
    const vcs = {
      ...any.simpleObject(),
      host: vcsHost,
      owner: vcsOwner,
      name: vcsName
    };

    const {badges} = scaffold({vcs});

    assert.deepEqual(
      badges.status.coverage,
      {
        img: `https://img.shields.io/codecov/c/${vcsHost}/${vcsOwner}/${vcsName}.svg`,
        link: `https://codecov.io/${vcsHost}/${vcsOwner}/${vcsName}`,
        text: 'Codecov'
      }
    );
  });

  test('that the badge is not defined if shields.io badge does not support the vcs host', () => {
    const {badges} = scaffold({vcs: {host: any.word()}});

    assert.isUndefined(badges);
  });

  test('that the badge is not defined if vcs details are not defined', () => {
    const {badges} = scaffold({});

    assert.isUndefined(badges);
  });
});
