import { HacknetAdapter } from '/hacknet2/infra/hacknet-adapter';
import { Component, ComponentType } from '/hacknet2/domain/entities/component';
import { Manager2 } from '/hacknet2/domain/use-cases/manager2';
import { IState } from '/hacknet2/domain/use-cases/IState';
import { SavingState } from '/hacknet2/domain/use-cases/saving-state';

export class SelectingState implements IState {
  #componentToUpgrade: Component;
  #nextState: IState;
  private upgradeSelector: string; // todo: scaffold to be removed => not string but object
  constructor(private manager: Manager2, private readonly hacknetAdapter: HacknetAdapter) {}

  performStateOperations(): void {
    this.manager.componentToBuy = this.selectComponentToUpgrade();
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
