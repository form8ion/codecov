Feature: Badge

  Scenario: Public Project hosted on GitHub.com
    Given the source code is hosted on "github.com"
    When the project is lifted
    Then the coverage badge will be defined

  Scenario: Public Project hosted on GitLab.com
    Given the source code is hosted on "gitlab.com"
    When the project is lifted
    Then the coverage badge will be defined

  Scenario: Public Project hosted on Bitbucket.org
    Given the source code is hosted on "bitbucket.org"
    When the project is lifted
    Then the coverage badge will be defined

  Scenario: Public Project hosted on a service not supported by the shields.io badge
    Given the source code is hosted on "foo.com"
    When the project is lifted
    Then the coverage badge will not be defined
