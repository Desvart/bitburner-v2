import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';
import { TransactionsBook } from '/hacknet/domain/entities/transactions-book';
import { Network } from '/hacknet/domain/entities/network';
import { log } from '/utils/logger';
import { ComponentType, ComponentId, Component } from '/hacknet/domain/entities/component';
import { Node } from '/hacknet/domain/entities/node';

export class Wallet {
  private capex: number;
  private transactionsBook: TransactionsBook;

  constructor(private readonly network: Network, private readonly nodeAdapter: NodeAdapter) {
    this.transactionsBook = new TransactionsBook(nodeAdapter);
    this.capex = this.transactionsBook.getBookBalance();
  }

  private getTurnover(): number {
    return this.network.turnover.value;
  }

  private getAvailableCapital(): number {
    const turnover = this.getTurnover();
    const marginProfit = Wallet.computeMarginProfit(turnover);
    return Math.max(0, turnover - this.capex * marginProfit);
  }

  private static computeMarginProfit(turnover: number): number {
    const scale = [1, 1, 2];
    const gate = [0, 1000000, 10000000];

    if (turnover >= gate[0] && turnover < gate[1]) {
      return scale[0];
    }

    const a = (scale[2] - scale[1]) / (gate[2] - gate[1]);
    const b = scale[2] - a * gate[2];
    const marginProfit = turnover * a + b;
    return Math.round(marginProfit * 100) / 100;
  }

  private registerTransaction(componentBought: Component): void {
    this.capex -= componentBought.price.value;
    this.transactionsBook.saveInvestmentOperation(componentBought);
  }

  private buyComponent(componentId: ComponentId): Node {
    if (componentId.componentType === ComponentType.NODE) {
      return this.nodeAdapter.purchaseNode();
    }
    return this.nodeAdapter.buyUpgrade(componentId.nodeId, componentId.componentType);
  }

  private invest(componentToBuy: Component): boolean {
    const upgradeNode = this.buyComponent(componentToBuy);
    if (upgradeNode === null) {
      throw new Error('Could not buy component.');
    }
    this.registerTransaction(componentToBuy);
    return true;
  }

  instructToInvest(componentToBuy: Component): boolean {
    if (!this.checkInstructionValidity(componentToBuy.price.value)) {
      return false;
    }
    return this.invest(componentToBuy);
  }

  private checkInstructionValidity(amount: number): boolean {
    const availableCash = this.nodeAdapter.getAvailableCash();

    if (amount > availableCash) {
      log().info('Not enough available cash.');
      return false;
    }

    if (amount > this.getAvailableCapital()) {
      log().info('Not enough available capital.');
      return false;
    }

    return true;
  }

  getMissingCash(componentToBuy: Component) {
    const turnover = this.getTurnover();
    const marginProfit = Wallet.computeMarginProfit(turnover);
    const expectedMinTurnover = this.capex * marginProfit + componentToBuy.price.value;
    const availableCash = this.nodeAdapter.getAvailableCash();

    const missingInvestmentCapital = Math.max(0, expectedMinTurnover - turnover);
    const missingCash = Math.max(0, componentToBuy.price.value - availableCash);

    return Math.max(missingInvestmentCapital, missingCash);
  }
}
