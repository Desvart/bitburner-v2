import { HacknetAdapter } from '/hacknet2/infra/hacknet-adapter';
import { Component, ComponentType } from '/hacknet2/domain/entities/component';
import { Manager } from '/hacknet2/domain/use-cases/manager';
import { IState } from '/hacknet2/domain/use-cases/IState';
import { SavingState } from '/hacknet2/domain/use-cases/saving-state';
import { log } from '/hacknet2/infra/hacket-logger';

export class SelectingState implements IState {
  #componentToUpgrade: Component;
  #nextState: IState;
  private upgradeSelector: string; // todo: scaffold to be removed => not string but object
  private log = log(this.constructor.name);
  constructor(private manager: Manager, private readonly hacknetAdapter: HacknetAdapter) {}

  performStateOperations(): void {
    this.log.debug(`Selecting component to upgrade...`);

    this.manager.componentToUpgrade = this.selectComponentToUpgrade();

    this.log.debug(`Component selected: ${this.manager.componentToUpgrade.type}`);

    this.gotoNextState();
  }

  private selectComponentToUpgrade(): Component {
    const componentToUpgrade = new Component(ComponentType.NODE); // todo: scaffold to be removed => method to get the correct comp.
    this.#componentToUpgrade = componentToUpgrade;
    return componentToUpgrade;
  }

  private gotoNextState(): void {
    const nextState = new SavingState(this.manager, this.hacknetAdapter);
    this.#nextState = nextState;
    this.manager.transitionTo(nextState);
  }

  // For testing purposes
  get componentToUpgrade(): Component {
    return this.#componentToUpgrade;
  }

  // For testing purposes
  get nextState(): IState {
    return this.#nextState;
  }
}
