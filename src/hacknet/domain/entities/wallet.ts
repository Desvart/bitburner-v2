import { Network } from '/hacknet/domain/entities/network';
import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';

export class Wallet {
  private readonly transactionsBook: Map<string, number> = new Map();
  private readonly PROFIT_MARGIN: number = 0.5;

  constructor(
    private readonly network: Network,
    private readonly nodeAdapter: NodeAdapter
  ) {
    this.transactionsBook = this.retrieveTransactionsBook();
  }

  public saveInvestmentOperation(componentId: string, price: number): void {
    this.transactionsBook.set(componentId, price);
    this.nodeAdapter.saveTransactionsBook(this.transactionsBook);
  }

  private retrieveTransactionsBook(): Map<string, number> {
    return this.nodeAdapter.retrieveTransactionsBook();
  }

  private get invested(): number {
    let totalInvested = 0;
    this.transactionsBook.forEach((value) => {
      totalInvested += value;
    });
    return totalInvested;
  }

  private get totalProduction(): number {
    let networkTotalProduction = 0;
    this.network.nodes.forEach((node) => {
      networkTotalProduction += node.totalProduction.value;
    });
    return networkTotalProduction;
  }

  private get turnover(): number {
    return this.totalProduction - this.invested;
  }

  private get profit(): number {
    return this.turnover * this.PROFIT_MARGIN;
  }

  public get availableCapex(): number {
    return this.turnover * (1 - this.PROFIT_MARGIN);
  }
}
