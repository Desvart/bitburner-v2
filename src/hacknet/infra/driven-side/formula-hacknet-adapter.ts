import {
  NS,
  HacknetMultipliers,
} from '/hacknet/infra/interface/NetscriptDefinitions';
import { Price } from '/hacknet/domain/entities/value-objects/cash';
import { Yield } from '/hacknet/domain/entities/value-objects/yield';

export class FormulasHacknetAdapter {
  constructor(private readonly ns: NS) {}

  private get hacknetMultipliers(): HacknetMultipliers {
    return this.ns.getHacknetMultipliers();
  }

  newNodeCost(networkSize: number): Price {
    const newNodeCost = this.ns.formulas.hacknetNodes.hacknetNodeCost(
      networkSize,
      this.hacknetMultipliers.purchaseCost
    );
    return new Price(newNodeCost);
  }

  getSimulatedYield(levelQty: number, ramQty: number, coreQty: number): Yield {
    const simulateYield = this.ns.formulas.hacknetNodes.moneyGainRate(
      levelQty,
      ramQty,
      coreQty,
      this.hacknetMultipliers.production
    );
    return new Yield(simulateYield);
  }
}
