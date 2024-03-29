Feature: Remove GitHub Action

  Scenario: Remove Codecov action from verify workflow
    Given CI is a GitHub workflow
    And the GitHub Action is configured
    When Codecov is removed from the project
    Then the codecov action is not used in the workflow

  Scenario: CI workflow does not exist
    Given a CI workflow is not defined
    When Codecov is removed from the project
