import { HacknetAdapter } from '/hacknet2/infra/hacknet-adapter';
import { log } from '/hacknet2/infra/hacket-logger';
import { Component, ComponentType } from '/hacknet2/domain/entities/component';
import { Node } from '/hacknet2/domain/entities/node';

enum ManagerState {
  SELECTING = 'SELECTING',
  WAITING = 'WAITING',
  UPGRADING = 'UPGRADING',
  STOP = 'STOP',
}

export class Manager {
  #state: ManagerState = ManagerState.SELECTING;
  #componentToBuy: Component;
  private MAX_SAVING_DURATION = 10; // days
  constructor(private readonly hacknetAdapter: HacknetAdapter) {}

  run(stepByStep = false) {
    log().info('Hacknet manager running...');

    let loopExitCondition = false;
    do {
      loopExitCondition = this.executeStateOperations(this.#state);
    } while (!loopExitCondition && !stepByStep);

    log().warning("Hacknet manager exited his loop. It shouldn't have happened.");
  }

  // todo: scaffold to be removed
  private executeStateOperations(state: ManagerState): boolean {
    switch (state) {
      case ManagerState.SELECTING:
        this.selectComponentToBuy();
        break;
      case ManagerState.WAITING:
        this.waitForAvailableCapital();
        break;
      case ManagerState.UPGRADING:
        this.upgradeNetwork();
        break;
      default:
        return false;
    }
    return true;
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

    const savingDuration = this.getSavingDuration(); // todo: scaffold to be removed
    if (savingDuration > this.MAX_SAVING_DURATION) {
      this.switchToState(ManagerState.STOP);
      return;
    }

    this.switchToState(ManagerState.UPGRADING);
  }

  private getSavingDuration(): number {
    return this.hacknetAdapter.getProduction(); // todo: scaffold to be removed
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

  // For testing purposes only
  get state(): ManagerState {
    return this.#state;
  }
}
