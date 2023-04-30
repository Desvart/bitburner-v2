// eslint-disable-next-line max-classes-per-file
import { Price } from '/hacknet/domain/entities/cash';

export enum ComponentType {
  LEVEL = 'LEVEL',
  RAM = 'RAM',
  CORES = 'CORES',
  NODE = 'NODE',
}

export class NodeId {
  readonly #value: number;

  constructor(value: number) {
    if (value < 0 || !Number.isInteger(value)) {
      throw new Error(`Ids must be positive integers.`);
    }
    this.#value = value;
  }

  public get value(): number {
    return this.#value;
  }
}

export class ComponentId {
  readonly #nodeId: NodeId;
  readonly #componentType: ComponentType;

  constructor(nodeId: NodeId, componentType: ComponentType) {
    this.#nodeId = nodeId;
    this.#componentType = componentType;
  }

  public get nodeId(): NodeId {
    return this.#nodeId;
  }

  public get componentType(): ComponentType {
    return this.#componentType;
  }

  stringify(): string {
    return `${this.#nodeId.value}-${this.#componentType}`;
  }
}

export class Component extends ComponentId {
  readonly #price: Price;

  constructor(nodeId: NodeId, componentType: ComponentType, price: Price) {
    super(nodeId, componentType);
    this.#price = price;
  }

  get price(): Price {
    return this.#price;
  }
}
