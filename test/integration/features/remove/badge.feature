Feature: Remove Codecov badge

  @wip
  Scenario: remove existing badge from readme
    Given the Codecov badge already exists in the readme
    When Codecov is removed from the project
    Then the Codecov badge is not shown in the readme
