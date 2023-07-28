Feature: Practice Form
  As a user
  I want to fill out the practice form
  So that I can learn how to use forms

  Scenario: Fill out the practice form with valid data
    Given I am on the Practice Form page
    When I fill out the form with the following details:
      | Field          | Value           |
      | firstName      | John            |
      | lastName       | Doe             |
      | userEmail      | john@doe.com    |
      | gender         | Male            |
      | userNumber     | 1234567890      |
      | dateOfBirth    | 02 July 1995    |
      | subjectsInput  | Math            |
      | hobbies        | Sports          |
      | currentAddress | 123 Main Street |
      | state          | NCR             |
      | city           | Delhi           |
    And I submit the form
    Then I should see a confirmation that the form has been submitted