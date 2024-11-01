Feature: Signup functionality

  Scenario: User Creates a New Account
    Given User is on the Mailchimp Signup Page
    And  User Enters all mandatory inputs: [email, username, password], and submits form
    Then User should be redirected to the signup success page
    When User clicks on "Activate Account" from email body
    Then The system should authenticate user, and put them into the signup setup flow