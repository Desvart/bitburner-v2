import { Component } from '/hacknet/domain/entities/value-objects/component';
import { Price } from '/hacknet/domain/entities/value-objects/cash';
import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';

export class Cores {
  readonly type = Component.RAM;
  readonly #quantity: number;

  private readonly MIN_QUANTITY: number = 1;
  readonly MAX_QUANTITY: number = 16;

  constructor(quantity = 1) {
    this.#quantity = this.checkQuantity(quantity);
  }

  private checkQuantity(quantity: number): number {
    if (quantity < this.MIN_QUANTITY) {
      throw new Error(`Minimum cores quantity is ${this.MIN_QUANTITY}.`);
    }
    if (quantity > this.MAX_QUANTITY) {
      throw new Error(`Maximum cores quantity is ${this.MAX_QUANTITY}.`);
    }
    if (!Number.isInteger(quantity)) {
      throw new Error(`Cores quantity must be an integer.`);
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
