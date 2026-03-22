Feature: Scaffolder

  Scenario: Scaffold a project
    When the project is scaffolded
    Then the config file is created
    And empty results are returned
