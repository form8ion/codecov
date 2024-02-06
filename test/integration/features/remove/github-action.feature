Feature: Remove GitHub Action

  @wip
  Scenario: Remove Codecov action from verify workflow
    Given the codecov action is used in the verify workflow
    When Codecov is removed from the project
    Then the codecov action is not used in the workflow
