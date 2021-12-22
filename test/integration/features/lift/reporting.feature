Feature: Lift Reporting

  Scenario: Legacy node reporter
    Given the legacy node reporter is configured
    When the project is lifted
    Then the legacy node reporter is removed
    And a next-step is returned for configuring CI reporting
