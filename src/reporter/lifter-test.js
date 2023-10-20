import {promises as fs} from 'fs';

import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

import * as execa from '../../thirdparty-wrappers/execa.js';
import * as githubWorkflow from './ci-providers/github-workflows/lifter.js';
import liftReporting from './lifter.js';

suite('reporting lifter', () => {
  let sandbox;
  const projectRoot = any.string();
  const packageManager = any.word();
  const pathToPackageJson = `${projectRoot}/package.json`;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'readFile');
    sandbox.stub(fs, 'writeFile');
    sandbox.stub(execa, 'default');
    sandbox.stub(githubWorkflow, 'lift');
    sandbox.stub(githubWorkflow, 'test');
  });

  teardown(() => sandbox.restore());

  test('that the legacy node reporter is removed', async () => {
    const otherScripts = any.simpleObject();
    const otherTopLevelProperties = any.simpleObject();
    const existingPackageContents = {
      ...otherTopLevelProperties,
      scripts: {...otherScripts, 'coverage:report': any.string()}
    };
    fs.readFile.withArgs(pathToPackageJson, 'utf-8').resolves(JSON.stringify(existingPackageContents));
    githubWorkflow.test.resolves(false);

    const {nextSteps} = await liftReporting({projectRoot, packageManager});

    assert.deepEqual(
      nextSteps,
      [{
        summary: 'Configure modern reporting to Codecov on your CI service',
        description: 'Configure the [Codecov Uploader](https://docs.codecov.com/docs/codecov-uploader) appropriately'
          + ' for your CI Provider. If available for your provider, prefer one of the dedicated wrappers.'
      }]
    );

    assert.calledWith(execa.default, packageManager, ['remove', 'codecov']);
    assert.calledWith(
      fs.writeFile,
      pathToPackageJson,
      JSON.stringify({...otherTopLevelProperties, scripts: otherScripts})
    );
    assert.notCalled(githubWorkflow.lift);
  });

  test('that the CI provider is lifted when supported', async () => {
    fs.readFile
      .withArgs(pathToPackageJson, 'utf-8')
      .resolves(JSON.stringify({
        ...any.simpleObject(),
        scripts: {...any.simpleObject(), 'coverage:report': any.string()}
      }));
    githubWorkflow.test.withArgs({projectRoot}).resolves(true);

    const {nextSteps} = await liftReporting({projectRoot, packageManager});

    assert.calledOnce(githubWorkflow.test);
    assert.calledWith(githubWorkflow.lift, {projectRoot});
    assert.isUndefined(nextSteps);
  });

  test('that the `package.json` is not updated if it did not contain a `coverage:report` script', async () => {
    const existingPackageContents = {...any.simpleObject(), scripts: any.simpleObject()};
    fs.readFile.withArgs(pathToPackageJson, 'utf-8').resolves(JSON.stringify(existingPackageContents));

    assert.deepEqual(await liftReporting({projectRoot}), {});

    assert.neverCalledWith(fs.writeFile, pathToPackageJson);
  });
});
