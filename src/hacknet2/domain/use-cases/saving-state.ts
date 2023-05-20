import { HacknetAdapter } from '/hacknet2/infra/hacknet-adapter';
import { Manager } from '/hacknet2/domain/use-cases/manager';
import { IState } from '/hacknet2/domain/use-cases/IState';
import { InvestingState } from '/hacknet2/domain/use-cases/investing-state';
import { log } from '/hacknet2/infra/hacket-logger';

export class SavingState implements IState {
  #waitTimeToGatherMissingCash: number;
  #nextState: IState;
  private log = log(this.constructor.name);
  private readonly MAX_WAIT_TIME = 1000; // todo: to fine tune

  constructor(private manager: Manager, private readonly hacknetAdapter: HacknetAdapter) {
    // todo: to implement
  }

  async performStateOperations(): Promise<void> {
    const missingCash: number = this.getMissingCash();
    const incomeRate: number = this.getIncomeRate();
    this.#waitTimeToGatherMissingCash = missingCash / incomeRate;

    this.log.debug(
      `Waiting for available capital to buy ${this.manager.componentToUpgrade.type}...`
    );
    this.log.debug(`Available capital: 1000000`); // todo: scaffold

    // Stryker disable next-line EqualityOperator: > or >= doesn't matter here
    if (this.#waitTimeToGatherMissingCash >= this.MAX_WAIT_TIME) {
      this.gotoStopState();
      return;
    }

    this.gotoNextState();
    await this.hacknetAdapter.waitInSec(this.#waitTimeToGatherMissingCash);
  }

  // eslint-disable-next-line class-methods-use-this
  private getMissingCash(): number {
    return 1000; // todo: scaffold (with eslint-disable)
  }

  private getIncomeRate(): number {
    return this.hacknetAdapter.getIncomeRate();
  }

  private gotoStopState(): void {
    this.manager.stopLoop = true;
  }

  private gotoNextState(): void {
    const nextState = new InvestingState(this.manager, this.hacknetAdapter);
    this.#nextState = nextState;
    this.manager.transitionTo(nextState);
  }

  // For testing purposes
  get waitTimeToGatherMissingCash(): number {
    return this.#waitTimeToGatherMissingCash;
  }

  // For testing purposes
  get nextState(): IState {
    return this.#nextState;
  }
}
