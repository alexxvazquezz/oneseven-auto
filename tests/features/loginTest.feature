Feature: Login functionality

  Scenario: User Logs in successfully
    Given I am on the login page
    When I enter my username, password and click login
    Then I am redirected to the user dashboard