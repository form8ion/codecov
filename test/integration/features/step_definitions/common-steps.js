import {resolve} from 'node:path';
import {dump} from 'js-yaml';
import {packageManagers} from '@form8ion/javascript-core';

import {After, Before, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';
import nock from 'nock';
import td from 'testdouble';

const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'node_modules'));

export function assertDependenciesWereRemoved(execa, packageManager, dependencyNames) {
  td.verify(execa(packageManager, ['remove', ...dependencyNames]));
}

Before(function () {
  this.vcsName = any.word();
  this.vcsOwner = any.word();

  this.execa = td.replace('execa');

  nock.disableNetConnect();
});

After(function () {
  stubbedFs.restore();
  nock.enableNetConnect();
  nock.cleanAll();
});

When('the project is scaffolded', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {scaffold} = require('@form8ion/codecov');

  stubbedFs({
    node_modules: stubbedNodeModules
  });

  this.scaffoldResult = await scaffold({
    vcs: {host: this.vcsHost, owner: this.vcsOwner, name: this.vcsName},
    visibility: this.visibility,
    apiAccessToken: this.apiToken
  });
});

When('the project is lifted', async function () {
  this.packageManager = any.fromList(Object.values(packageManagers));

  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {lift} = require('@form8ion/codecov');

  stubbedFs({
    ...this.githubWorkflow && {
      '.github': {
        workflows: {
          'node-ci.yml': dump({
            jobs: {
              verify: {
                steps: [
                  ...any.listOf(any.simpleObject),
                  ...this.legacyReporting ? [{run: 'npm run coverage:report'}] : [],
                  ...this.githubAction ? [{uses: `codecov/codecov-action@v${any.integer()}`}] : []
                ]
              }
            }
          })
        }
      }
    },
    node_modules: stubbedNodeModules,
    'package.json': JSON.stringify({
      scripts: {...this.legacyReporting && {'coverage:report': any.string()}}
    })
  });

  this.liftResults = await lift({projectRoot: process.cwd(), packageManager: this.packageManager});
});
