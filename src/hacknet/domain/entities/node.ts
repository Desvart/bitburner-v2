import { ComponentType, NodeId } from '/hacknet/domain/entities/component';
import { Level } from '/hacknet/domain/entities/level';
import { Ram } from '/hacknet/domain/entities/ram';
import { Cores } from '/hacknet/domain/entities/cores';
import { Income, Production } from '/hacknet/domain/entities/cash';
import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';

export class Node {
  readonly id = new NodeId(0);
  level = new Level(this.id, 1);
  ram = new Ram(this.id, 1);
  cores = new Cores(this.id, 1);
  income = new Income(0);
  production = new Production(0);

  constructor(id: number, private readonly nodeAdapter: NodeAdapter) {
    this.id = new NodeId(id);
  }

  update(): void {
    const node: Node = this.nodeAdapter.getNode(this.id.value);
    this.level = node.level;
    this.ram = node.ram;
    this.cores = node.cores;
    this.income = node.income;
    this.production = node.production;
  }

  upgrade(component: ComponentType) {
    this.nodeAdapter.buyUpgrade(this.id, component);
    this.update();
  }
}

export class NodeBuilder {
  private readonly node: Node;

  constructor(id: number, nodeAdapter: NodeAdapter) {
    this.node = new Node(id, nodeAdapter);
  }

  setLevel(quantity: number): this {
    this.node.level = new Level(this.node.id, quantity);
    return this;
  }

  setRam(quantity: number): this {
    this.node.ram = new Ram(this.node.id, quantity);
    return this;
  }

  setCores(quantity: number): this {
    this.node.cores = new Cores(this.node.id, quantity);
    return this;
  }

  setIncome(income: number): this {
    this.node.income = new Income(income);
    return this;
  }

  setProduction(production: number): this {
    this.node.production = new Production(production);
    return this;
  }

  build(): Node {
    return this.node;
  }
}
