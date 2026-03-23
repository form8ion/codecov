Feature: lift config

  Scenario: no existing config file
    Given there is no .codecov.yml in the repository
    When the project is lifted
    Then the config file is created

  Scenario: existing config file
    Given the .codecov.yml file exists in the root of the repository
    When the project is lifted
    Then the config file is created
