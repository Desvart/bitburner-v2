Feature: Manage a Hacknet network
  The goal is to manage the Hacknet network to make profits. The management rules aim to balance investments to increase
  Hacknet profitability over time and the absolute profitability itself.
  The Hacknet manager is designed to generate an average 200% performance.
  The Hacknet manager goes through a cycle of different steps:
  ... -> Investing -> (Waiting for cash) -> Refunding -> Performing -> Saving -> ...

  @test
  Scenario: Start by buying a new node

    Given the network contains no node
    When the manager starts
    Then the manager next component to upgrade is a new node
    * the manager status is "Investing"

  Scenario: Once an investment has been refund, make profit

    Given the manager status is "Refunding"
    When the network has refund the upgrade
    Then the manager is not allowed to upgrade yet
    * the manager status is "Performing"

  Scenario: Once profitable, save for the next upgrade

    Given the manager status is "Performing"
    When the network has generated 200% of its total value
    Then the manager selects the next component to upgrade
    * this component should have the shorter RoI
    * the manager status is "Saving"

  Scenario: Once the investment funds are ready, upgrade

    Given the manager status is "Saving"
    When the network has generated enough savings to cover the costs of the next upgrade
    Then the manager is allowed to request an upgrade
    * the manager status is "Investing"

  Scenario: If cheap enough, upgrade without saving

    Given the manager status is "Saving"
    When the next upgrade cost is less that 1% of the total cash available
    Then the manager is allowed to request an upgrade
    * the manager status is "Investing"

  Scenario: If not enough money, wait for it

    Given the manager status is "Investing"
    When there is not enough cash available
    Then the manager waits for the cash to be enough
    * the manager status is "Investing - Waiting for cash"
