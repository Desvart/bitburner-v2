import { Component } from '/hacknet/domain/entities/value-objects/component';
import { Price } from '/hacknet/domain/entities/value-objects/cash';
import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';

export class Ram {
  readonly type = Component.RAM;
  readonly #quantity: number;

  readonly POSSIBLE_QUANTITY = [1, 2, 4, 8, 16, 32, 64];
  readonly MAX_QUANTITY =
    this.POSSIBLE_QUANTITY[this.POSSIBLE_QUANTITY.length - 1];

  constructor(quantity = 1) {
    this.#quantity = this.checkQuantity(quantity);
  }

  private checkQuantity(quantity: number): number {
    if (!this.POSSIBLE_QUANTITY.includes(quantity)) {
      throw new Error(
        `RAM quantity ${quantity} is outside its authorized range (2^0 - 2^6).`
      );
    }
    return quantity;
  }

  get quantity(): number {
    return this.#quantity;
  }

  getUpgradeCost(nodeAdapter: NodeAdapter, nodeId: number): Price {
    return nodeAdapter.getUpgradeCost(nodeId, this.type);
  }
}
