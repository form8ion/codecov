import {Given} from '@cucumber/cucumber';

Given('the project is not a JavaScript project', async function () {
  this.nonJsLanguage = true;
});
