Feature: Remove Codecov YAML

  @wip
  Scenario: Remove config from the root of the repository
    Given the codecov.yml file exists in the root of the repository
    When Codecov is removed from the project
    Then the codecov.yml does not exist in the repository

  @wip
  Scenario: codecov.yml does not exist in the repository
    Given there is no codecov.yml in the repository
    When Codecov is removed from the project
    Then the codecov.yml does not exist in the repository
