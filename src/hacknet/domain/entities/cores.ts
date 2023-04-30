import { ComponentType, ComponentId, NodeId } from '/hacknet/domain/entities/component';

export class Cores {
  readonly id: ComponentId;
  readonly quantity: number;

  private readonly MIN_QUANTITY: number = 1;
  readonly MAX_QUANTITY: number = 16;

  constructor(nodeId: NodeId, quantity = 1) {
    this.id = new ComponentId(nodeId, ComponentType.CORES);
    this.quantity = this.checkQuantity(quantity);
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
}
