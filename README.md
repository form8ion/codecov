# codecov

code coverage service plugin for form8ion

<!--status-badges start -->

[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]
[![Codecov][coverage-badge]][coverage-link]
![SLSA Level 2][slsa-badge]

<!--status-badges end -->

## Table of Contents

* [Features](#features)
  * [Lift](#lift)
* [Usage](#usage)
  * [Installation](#installation)
  * [Example](#example)
    * [Import](#import)
    * [Execute](#execute)
  * [API](#api)
    * [scaffold](#scaffold)
    * [lift](#lift-1)
      * [`projectRoot` __string__ (_required_)](#projectroot-string-required)
      * [`packageManager` __string__ (_required_)](#packagemanager-string-required)
      * [`vcs` __object__ (_required_)](#vcs-object-required)
* [Contributing](#contributing)
  * [Dependencies](#dependencies)
  * [Verification](#verification)

## Features

### Lift

* Define a coverage status badge to communicate current coverage details
* Link from the status badge to further details on the [Codecov](https://codecov.io/)
  site
* Migrate from the [legacy node uploader](https://github.com/codecov/codecov-node)
  to the [modern uploader](https://docs.codecov.com/docs/codecov-uploader)
  * Currently supports the following CI Providers:
    * [GitHub Action](https://github.com/marketplace/actions/codecov)

## Usage

<!--consumer-badges start -->

[![MIT license][license-badge]][license-link]
[![npm][npm-badge]][npm-link]
[![Try @form8ion/codecov on RunKit][runkit-badge]][runkit-link]
![node][node-badge]

<!--consumer-badges end -->

### Installation

```sh
$ npm install @form8ion/codecov --save
```

### Example

#### Import

```javascript
import {packageManagers} from '@form8ion/javascript-core';
import {scaffold, lift} from '@form8ion/codecov';
```

#### Execute

```javascript
(async () => {
  await scaffold();

  await lift({
    projectRoot: process.cwd(),
    packageManager: packageManagers.NPM,
    vcs: {
      host: 'github',
      owner: 'foo',
      name: 'bar'
    }
  });
})();
```

### API

#### scaffold

The scaffolder of this plugin is currently a no-op since the work is all done
as part of the lifting process

#### lift

Migrates [Codecov](https://codecov.io/) details from legacy conventions to
modern conventions.

Takes a single options object as an argument, containing:

##### `projectRoot` __string__ (_required_)

path to the root of the project

##### `packageManager` __string__ (_required_)

chosen [package manager](https://github.com/form8ion/javascript-core#packagemanagers)
to be used for the project

##### `vcs` __object__ (_required_)

* `host` __string__ (_required_)
  VCS hosting service
* `owner` __string__ (_required_)
  account name on the host service for the repository
* `name` __string__ (_required_)
  repository name

## Contributing

<!--contribution-badges start -->

[![PRs Welcome][PRs-badge]][PRs-link]
[![Commitizen friendly][commitizen-badge]][commitizen-link]
[![Conventional Commits][commit-convention-badge]][commit-convention-link]
[![semantic-release][semantic-release-badge]][semantic-release-link]
[![Renovate][renovate-badge]][renovate-link]

<!--contribution-badges end -->

### Dependencies

```sh
$ nvm install
$ npm install
```

### Verification

```sh
$ npm test
```

[PRs-link]: http://makeapullrequest.com

[PRs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg

[commitizen-link]: http://commitizen.github.io/cz-cli/

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

[commit-convention-link]: https://conventionalcommits.org

[commit-convention-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg

[semantic-release-link]: https://github.com/semantic-release/semantic-release

[semantic-release-badge]: https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release

[renovate-link]: https://renovatebot.com

[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovatebot

[github-actions-ci-link]: https://github.com/form8ion/codecov/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://img.shields.io/github/actions/workflow/status/form8ion/codecov/node-ci.yml.svg?branch=master&logo=github

[coverage-link]: https://codecov.io/github/form8ion/codecov

[coverage-badge]: https://img.shields.io/codecov/c/github/form8ion/codecov?logo=codecov

[license-link]: LICENSE

[license-badge]: https://img.shields.io/github/license/form8ion/codecov.svg?logo=opensourceinitiative

[npm-link]: https://www.npmjs.com/package/@form8ion/codecov

[npm-badge]: https://img.shields.io/npm/v/@form8ion/codecov?logo=npm

[runkit-link]: https://npm.runkit.com/@form8ion/codecov

[runkit-badge]: https://badge.runkitcdn.com/@form8ion/codecov.svg

[node-badge]: https://img.shields.io/node/v/@form8ion/codecov?logo=node.js

[slsa-badge]: https://slsa.dev/images/gh-badge-level2.svg
