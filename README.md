# codecov

code coverage service plugin for form8ion

<!--status-badges start -->

[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]
[![Codecov][coverage-badge]][coverage-link]

<!--status-badges end -->

## Table of Contents

* [Usage](#usage)
  * [Installation](#installation)
  * [Example](#example)
    * [Import](#import)
    * [Execute](#execute)
  * [API](#api)
    * [scaffold](#scaffold)
      * [`vcs` __object__ (_required_)](#vcs-object-required)
      * [`visibility` __string__ (_required_)](#visibility-string-required)
* [Contributing](#contributing)
  * [Dependencies](#dependencies)
  * [Verification](#verification)

## Usage

<!--consumer-badges start -->

[![MIT license][license-badge]][license-link]
[![npm][npm-badge]][npm-link]
[![Try @form8ion/codecov on RunKit][runkit-badge]][runkit-link]

<!--consumer-badges end -->

### Installation

```sh
$ npm install @form8ion/codecov --save
```

### Example

#### Import

```javascript
import {scaffold} from './lib/index.cjs';
```

#### Execute

```javascript
(async () => {
  await scaffold({
    visibility: 'Public',
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

Scaffolder for configuring reporting of coverage data to [Codecov](https://codecov.io/)
and providing visibility to the current coverage status through a README badge

Takes a single options object as an argument, containing:

##### `vcs` __object__ (_required_)

* `host` __string__ (_required_)
  VCS hosting service
* `owner` __string__ (_required_)
  account name on the host service for the repository
* `name` __string__ (_required_)
  repository name

##### `visibility` __string__ (_required_)

visibility of the project (`Public` or `Private`)

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

[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[renovate-link]: https://renovatebot.com

[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovatebot

[github-actions-ci-link]: https://github.com/form8ion/codecov/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://github.com/form8ion/codecov/workflows/Node.js%20CI/badge.svg

[coverage-link]: https://codecov.io/github/form8ion/codecov

[coverage-badge]: https://img.shields.io/codecov/c/github/form8ion/codecov.svg

[license-link]: LICENSE

[license-badge]: https://img.shields.io/github/license/form8ion/codecov.svg

[npm-link]: https://www.npmjs.com/package/@form8ion/codecov

[npm-badge]: https://img.shields.io/npm/v/@form8ion/codecov.svg

[runkit-link]: https://npm.runkit.com/@form8ion/codecov

[runkit-badge]: https://badge.runkitcdn.com/@form8ion/codecov.svg
