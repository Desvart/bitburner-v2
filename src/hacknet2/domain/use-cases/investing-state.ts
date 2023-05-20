import { HacknetAdapter } from '/hacknet2/infra/hacknet-adapter';
import { Manager2 } from '/hacknet2/domain/use-cases/manager2';
import { IState } from '/hacknet2/domain/use-cases/IState';
import { SelectingState } from '/hacknet2/domain/use-cases/selecting-state';
import { SavingState } from '/hacknet2/domain/use-cases/saving-state';

export class InvestingState implements IState {
  #nextState: IState;
  constructor(private manager: Manager2, private readonly hacknetAdapter: HacknetAdapter) {}

  performStateOperations(): void {
    const purchaseStatus = this.upgradingComponent(); // todo: scaffold
    if (purchaseStatus) {
      return this.gotoNextState();
    }
    return this.gotoSavingState();
  }

  private upgradingComponent(): boolean {
    return this.hacknetAdapter.buyComponent(); // todo: scaffold
  }

  private gotoNextState(): void {
    const nextState = new SelectingState(this.manager, this.hacknetAdapter);
    this.#nextState = nextState;
    this.manager.transitionTo(nextState);
  }

  private gotoSavingState(): void {
    const nextState = new SavingState(this.manager, this.hacknetAdapter);
    this.#nextState = nextState;
    this.manager.transitionTo(nextState);
  }

  // For testing purposes
  get nextState(): IState {
    return this.#nextState;
  }
}
