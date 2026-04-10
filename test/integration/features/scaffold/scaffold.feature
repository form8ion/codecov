Feature: Scaffolder
  See https://docs.codecov.com/docs/quick-start#prerequisites for supported VCS hosts

  Scenario: Configure Codecov for a GitHub repository
    Given the source code is hosted on "github"
    When the project is scaffolded
    Then the config file is created
    And empty results are returned

  @wip
  Scenario: Configure Codecov for a GitLab repository
    Given the source code is hosted on "gitlab"
    When the project is scaffolded
    Then the config file is created
    And empty results are returned

  @wip
  Scenario: Configure Codecov for a Bitbucket repository
    Given the source code is hosted on "bitbucket"
    When the project is scaffolded
    Then the config file is created
    And empty results are returned

  Scenario: Configure Codecov for a repository hosted on an unsupported VCS
    Given the source code is hosted on "foo"
    When the project is scaffolded
    Then no config is created
    And empty results are returned
