const base = {
  ...(process.env.CODECOV_TOKEN ? {format: ['progress', 'junit:integration.junit.xml']} : {}),
  formatOptions: {snippetInterface: 'async-await'},
  import: ['test/integration/features/**/*.js']
};

export default base;

export const wip = {
  ...base,
  tags: '@wip and not @skip'
};

export const noWip = {
  ...base,
  tags: 'not @skip and not @wip'
};

export const focus = {
  ...base,
  tags: '@focus'
};
