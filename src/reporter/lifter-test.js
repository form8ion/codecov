import {promises as fs} from 'fs';

import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

import liftReporting from './lifter';

suite('reporting lifter', () => {
  let sandbox;
  const projectRoot = any.string();
  const pathToPackageJson = `${projectRoot}/package.json`;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'readFile');
    sandbox.stub(fs, 'writeFile');
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

    const {nextSteps} = await liftReporting({projectRoot});

    assert.deepEqual(
      nextSteps,
      [{
        summary: 'Configure modern reporting to Codecov on your CI service',
        description: 'Configure the [Codecov Uploader](https://docs.codecov.com/docs/codecov-uploader) appropriately'
          + ' for your CI Provider. If available for your provider, prefer one of the dedicated wrappers.'
      }]
    );

    assert.calledWith(
      fs.writeFile,
      pathToPackageJson,
      JSON.stringify({...otherTopLevelProperties, scripts: otherScripts})
    );
  });

  test('that the `package.json` is not updated if it did not contain a `coverage:report` script', async () => {
    const existingPackageContents = {...any.simpleObject(), scripts: any.simpleObject()};
    fs.readFile.withArgs(pathToPackageJson, 'utf-8').resolves(JSON.stringify(existingPackageContents));

    assert.deepEqual(await liftReporting({projectRoot}), {});

    assert.neverCalledWith(fs.writeFile, pathToPackageJson);
  });
});