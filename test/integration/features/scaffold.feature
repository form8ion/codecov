Feature: Scaffolder

  Scenario: Scaffold a project hosted on GitHub
    Given the source code is hosted on "github"
    And the project visibility is "Public"
    When the project is scaffolded
    Then the coverage badge will be defined
    And the reporting steps are defined

  Scenario: Scaffold a project hosted on GitLab
    Given the source code is hosted on "gitlab"
    And the project visibility is "Public"
    When the project is scaffolded
    Then the coverage badge will be defined
    And the reporting steps are defined

  Scenario: Scaffold a project hosted on Bitbucket
    Given the source code is hosted on "bitbucket"
    And the project visibility is "Public"
    When the project is scaffolded
    Then the coverage badge will be defined
    And the reporting steps are defined

  Scenario: Scaffold a project hosted on a service not supported by the shields.io badge
    Given the source code is hosted on "foo"
    And the project visibility is "Public"
    When the project is scaffolded
    Then the coverage badge will not be defined
    And the reporting steps are defined

  Scenario: Scaffold a private project
    Given the source code is hosted on "github"
    And the project visibility is "Private"
    When the project is scaffolded
    Then the coverage badge will not be defined
    And the reporting steps are not defined

  Scenario: Scaffold a private project with an API access token
    Given the source code is hosted on "github"
    And the project visibility is "Private"
    And an API access token is provided
    When the project is scaffolded
    Then the coverage badge will be defined
    And the reporting steps are defined
