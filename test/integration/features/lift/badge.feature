Feature: Badge

  Scenario: Public Project hosted on GitHub
    Given the source code is hosted on "github"
    When the project is lifted
    Then the coverage badge will be defined

  Scenario: Public Project hosted on GitLab
    Given the source code is hosted on "gitlab"
    When the project is lifted
    Then the coverage badge will be defined

  Scenario: Public Project hosted on Bitbucket
    Given the source code is hosted on "bitbucket"
    When the project is lifted
    Then the coverage badge will be defined

  Scenario: Public Project hosted on a service not supported by the shields.io badge
    Given the source code is hosted on "foo"
    When the project is lifted
    Then the coverage badge will not be defined
