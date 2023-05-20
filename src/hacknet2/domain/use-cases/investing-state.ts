import { HacknetAdapter } from '/hacknet2/infra/hacknet-adapter';
import { Manager } from '/hacknet2/domain/use-cases/manager';
import { IState } from '/hacknet2/domain/use-cases/IState';
import { SelectingState } from '/hacknet2/domain/use-cases/selecting-state';
import { SavingState } from '/hacknet2/domain/use-cases/saving-state';
import { log } from '/hacknet2/infra/hacket-logger';

export class InvestingState implements IState {
  #nextState: IState;
  private log = log(this.constructor.name);
  constructor(private manager: Manager, private readonly hacknetAdapter: HacknetAdapter) {}

  performStateOperations(): void {
    this.log.debug(
      `Upgrading node {node.id} network with component ${this.manager.componentToUpgrade.type}...`
    );

    const purchaseStatus = this.upgradingComponent(); // todo: scaffold

    if (purchaseStatus) {
      this.log.debug(
        `Upgrade node {upgradedNode.id} with component ${this.manager.componentToUpgrade.type}`
      );
      return this.gotoNextState();
    }
    this.log.warning(
      `Upgrade node {upgradedNode.id} with component ${this.manager.componentToUpgrade.type} couldn't be done.`
    );
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
