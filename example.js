// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {scaffold} from './lib/index.cjs';

// remark-usage-ignore-next
stubbedFs();

// #### Execute

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
