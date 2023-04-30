import { ComponentType, ComponentId, NodeId } from '/hacknet/domain/entities/component';

export class Level {
  readonly id: ComponentId;
  readonly quantity: number;

  private readonly MIN_QUANTITY: number = 1;
  readonly MAX_QUANTITY: number = 200;

  constructor(nodeId: NodeId, quantity = 1) {
    this.id = new ComponentId(nodeId, ComponentType.LEVEL);
    this.quantity = this.checkQuantity(quantity);
  }

  private checkQuantity(quantity: number): number {
    if (quantity < this.MIN_QUANTITY) {
      throw new Error(`Minimum level quantity is ${this.MIN_QUANTITY}.`);
    }
    if (quantity > this.MAX_QUANTITY) {
      throw new Error(`Maximum level quantity is ${this.MAX_QUANTITY}.`);
    }
    if (!Number.isInteger(quantity)) {
      throw new Error(`Level quantity must be an integer.`);
    }
    return quantity;
  }
}
