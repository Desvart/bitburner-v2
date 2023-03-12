Feature: As a user, I want to add and substract two numbers

  Scenario: Add two positive numbers
    Given
    When I add 2 and 3
    Then the result of the addition is 5

  Scenario: Add a number and 0
    Given
    When I add 2 and 0
    Then the result of the addition is 2

  Scenario: Add a positive number and a negative number
    Given
    When I add 2 and -5
    Then the result of the addition is -3

  Scenario: Add two negative numbers
    Given
    When I add -2 and -2
    Then the result of the addition is -4

  Scenario: Sub two positive numbers
    Given
    When I sub 2 and 2
    Then the result of the substraction is 0