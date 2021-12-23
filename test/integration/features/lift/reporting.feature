Feature: Lift Reporting

  Scenario: Legacy node reporter
    Given the legacy node reporter is configured
    When the project is lifted
    Then the legacy node reporter is removed
    And a next-step is returned for configuring CI reporting

  Scenario: GitHub Workflow as CI
    Given CI is a GitHub workflow
    When the project is lifted
    Then the workflow is configured to report using the GitHub Action
    And no next-step is returned for configuring CI reporting

  Scenario: GitHub Workflow as CI with legacy node reporter
    Given CI is a GitHub workflow
    And the legacy node reporter is configured
    When the project is lifted
    Then the workflow is configured to report using the GitHub Action
    And the step to call the legacy uploader script is removed from the workflow
#    And no next-step is returned for configuring CI reporting

  Scenario: GitHub Workflow as CI with Action configured
    Given CI is a GitHub workflow
    And the GitHub Action is configured
    When the project is lifted
    Then the workflow is configured to report using the GitHub Action
    And no next-step is returned for configuring CI reporting
