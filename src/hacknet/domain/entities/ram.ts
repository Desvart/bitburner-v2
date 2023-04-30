import { ComponentType, ComponentId, NodeId } from '/hacknet/domain/entities/component';

export class Ram {
  readonly id: ComponentId;
  readonly quantity: number;

  readonly POSSIBLE_QUANTITY = [1, 2, 4, 8, 16, 32, 64];
  readonly MAX_QUANTITY = this.POSSIBLE_QUANTITY[this.POSSIBLE_QUANTITY.length - 1];

  constructor(nodeId: NodeId, quantity = 1) {
    this.id = new ComponentId(nodeId, ComponentType.RAM);
    this.quantity = this.checkQuantity(quantity);
  }

  private checkQuantity(quantity: number): number {
    if (!this.POSSIBLE_QUANTITY.includes(quantity)) {
      throw new Error(`RAM quantity ${quantity} is outside its authorized range (2^0 - 2^6).`);
    }
    return quantity;
  }
}
