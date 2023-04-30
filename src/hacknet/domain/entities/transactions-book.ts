import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';
import { Component } from '/hacknet/domain/entities/component';

export class TransactionsBook {
  readonly #transactions: Map<string, number> = new Map();

  constructor(private readonly nodeAdapter: NodeAdapter) {
    this.#transactions = this.retrieveTransactionsBook();
  }

  get transactions(): Map<string, number> {
    return this.#transactions;
  }

  getBookBalance(): number {
    return Array.from(this.#transactions.values()).reduce((a, b) => a + b, 0);
  }

  private retrieveTransactionsBook(): Map<string, number> {
    return this.nodeAdapter.loadTransactionsBook();
  }

  public saveInvestmentOperation(componentBought: Component): void {
    this.#transactions.set(componentBought.stringify(), componentBought.price.value);
    this.nodeAdapter.saveTransactionsBook(this.#transactions);
  }
}
