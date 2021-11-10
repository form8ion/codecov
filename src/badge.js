export function scaffold({vcs}) {
  return {
    ...['github', 'gitlab', 'bitbucket'].includes(vcs?.host) && {
      badges: {
        status: {
          coverage: {
            img: `https://img.shields.io/codecov/c/${vcs.host}/${vcs.owner}/${vcs.name}.svg`,
            link: `https://codecov.io/${vcs.host}/${vcs.owner}/${vcs.name}`,
            text: 'Codecov'
          }
        }
      }
    }
  };
}
