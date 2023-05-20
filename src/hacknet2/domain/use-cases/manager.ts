import { HacknetAdapter } from '/hacknet2/infra/hacknet-adapter';
import { log } from '/hacknet2/infra/hacket-logger';
import { Component } from '/hacknet2/domain/entities/component';
import { IState } from '/hacknet2/domain/use-cases/IState';
import { SelectingState } from '/hacknet2/domain/use-cases/selecting-state';

export class Manager {
  #state: IState;
  stopLoop = false;
  componentToUpgrade: Component;
  private log = log(this.constructor.name);

  constructor(private readonly hacknetAdapter: HacknetAdapter) {
    this.#state = new SelectingState(this, hacknetAdapter);
  }

  transitionTo(state: IState): void {
    this.log.info(
      `Manager - Transitioning from state ${this.#state.constructor.name} to ${
        state.constructor.name
      }`
    );
    this.#state = state;
  }

  run(): void {
    this.log.info('Manager running...');

    do {
      this.#state.performStateOperations();
    } while (!this.stopLoop);

    this.log.info('Manager has stopped.');
  }

  // For testing purposes
  get nextState(): IState {
    return this.#state;
  }
}
