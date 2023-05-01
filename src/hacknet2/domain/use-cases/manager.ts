import { HacknetAdapter } from '/hacknet2/infra/hacknet-adapter';
import { log } from '/hacknet2/infra/hacket-logger';
import { Component, ComponentType } from '/hacknet2/domain/entities/component';
import { Node } from '/hacknet2/domain/entities/node';

enum ManagerState {
  SELECTING = 'SELECTING',
  WAITING = 'WAITING',
  UPGRADING = 'UPGRADING',
}

export class Manager {
  iterator = 3; // todo: scaffold to be removed
  #state: ManagerState = ManagerState.SELECTING;
  #componentToBuy: Component;
  constructor(private readonly nodeAdapter: HacknetAdapter) {}

  run() {
    log().info('Hacknet manager running...');

    let loopExitCondition = false;
    do {
      switch (this.#state) {
        case ManagerState.SELECTING:
          this.selectComponentToBuy();
          break;
        case ManagerState.WAITING:
          this.waitForAvailableCapital();
          break;
        case ManagerState.UPGRADING:
          this.upgradeNetwork();
          loopExitCondition = this.test();
          break;
        default:
          loopExitCondition = true;
      }
    } while (!loopExitCondition);

    log().warning("Hacknet manager exited his loop. It shouldn't have happened.");
  }

  // todo: scaffold to be removed
  test(): boolean {
    this.iterator -= 1;
    log().debug(`iterator: ${this.iterator}`);
    return this.iterator === 0;
  }

  private selectComponentToBuy(): void {
    // todo: implement
    log().debug(`Selecting component to buy...`);
    this.#componentToBuy = new Component(ComponentType.NODE);
    log().debug(`Component to buy: ${this.#componentToBuy.type}`);
    this.switchToState(ManagerState.WAITING);
  }

  private waitForAvailableCapital(): void {
    // todo: implement
    log().debug(`Waiting for available capital to buy ${this.#componentToBuy.type}...`);
    log().debug(`Available capital: 1000000`);
    this.switchToState(ManagerState.UPGRADING);
  }

  private upgradeNetwork(): void {
    // todo: implement
    log().debug(`Upgrading network with component ${this.#componentToBuy.type}`);
    const upgradedNode = new Node(1); // todo: scaffold to be removed
    log().debug(`Upgrade node ${upgradedNode.id} with component ${this.#componentToBuy.type}`);
    this.switchToState(ManagerState.SELECTING);
  }

  private switchToState(state: ManagerState): void {
    this.#state = state;
    log().debug(`Transitioning to state ${this.#state}`);
  }
}
