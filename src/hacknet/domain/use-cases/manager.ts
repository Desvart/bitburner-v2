// eslint-disable-next-line max-classes-per-file
import { Network } from '/hacknet/domain/entities/network';
import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';
import { UpgradeSelector } from '/hacknet/domain/entities/upgrade-selector';
import { Component } from '/hacknet/domain/entities/component';
import { log } from '/utils/logger';
import { Income } from '/hacknet/domain/entities/cash';
import { Wallet } from '/hacknet/domain/entities/wallet';

interface IState {
  performStateActions(): boolean | Promise<boolean>;
}

export class Manager {
  upgradeSelector: UpgradeSelector;
  wallet: Wallet;
  componentToBuy: Component;

  private readonly WAIT_TIME = 1000;
  private state: IState;
  private readonly network: Network;

  constructor(public readonly nodeAdapter: NodeAdapter) {
    this.network = new Network(nodeAdapter);
    this.wallet = new Wallet(this.network, nodeAdapter);
    // eslint-disable-next-line no-use-before-define
    this.state = new SelectingState(this, nodeAdapter);
  }

  transitionTo(state: IState): boolean {
    log().info(
      `Hacknet Manager - Transitioning from state ${this.state.constructor.name} to ${state.constructor.name}`
    );
    this.state = state;
    return true;
  }

  run() {
    let loopCondition: boolean | Promise<boolean> = true;
    do {
      loopCondition = this.state.performStateActions();
    } while (loopCondition);
  }
}

class InvestingState implements IState {
  constructor(private manager: Manager, private nodeAdapter: NodeAdapter) {}

  performStateActions(): boolean {
    const purchaseStatus = this.manager.wallet.instructToInvest(this.manager.componentToBuy);
    if (purchaseStatus) {
      return this.gotoNextState();
    }
    return this.gotoSavingState();
  }

  private gotoNextState(): boolean {
    // eslint-disable-next-line no-use-before-define
    const nextState = new SelectingState(this.manager, this.nodeAdapter);
    return this.manager.transitionTo(nextState);
  }

  private gotoSavingState(): boolean {
    // eslint-disable-next-line no-use-before-define
    const nextState = new SavingState(this.manager, this.nodeAdapter);
    return this.manager.transitionTo(nextState);
  }
}

class SavingState implements IState {
  #networkIncome: Income;

  constructor(private manager: Manager, private nodeAdapter: NodeAdapter) {
    this.#networkIncome = new Network(this.nodeAdapter).getTotalIncome();
  }

  async performStateActions(): Promise<boolean> {
    const missingCash = this.manager.wallet.getMissingCash(this.manager.componentToBuy);
    const waitTimeToGatherMissingCash = missingCash / this.#networkIncome.value;
    await this.manager.nodeAdapter.wait(waitTimeToGatherMissingCash * 1000);
    return this.gotoNextState();
  }

  private gotoNextState(): boolean {
    const nextState = new InvestingState(this.manager, this.nodeAdapter);
    return this.manager.transitionTo(nextState);
  }
}

class SelectingState implements IState {
  private upgradeSelector: UpgradeSelector;
  constructor(private manager: Manager, private nodeAdapter: NodeAdapter) {
    const network = new Network(this.nodeAdapter);
    this.upgradeSelector = new UpgradeSelector(network, nodeAdapter);
  }

  performStateActions(): boolean {
    const [componentId, price] = this.upgradeSelector.pickBestUpgrade();
    this.manager.componentToBuy = new Component(
      componentId.nodeId,
      componentId.componentType,
      price
    );
    return this.gotoNextState();
  }

  private gotoNextState(): boolean {
    const nextState = new SavingState(this.manager, this.nodeAdapter);
    return this.manager.transitionTo(nextState);
  }
}
