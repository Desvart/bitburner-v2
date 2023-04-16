// eslint-disable-next-line max-classes-per-file
import { DefaultNode } from '/hacknet/domain/entities/node-default';
import { Component } from '/hacknet/domain/entities/value-objects/component';
import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';
import { Level } from '/hacknet/domain/entities/value-objects/level';
import { Ram } from '/hacknet/domain/entities/value-objects/ram';
import { Cores } from '/hacknet/domain/entities/value-objects/cores';
import { Yield } from '/hacknet/domain/entities/value-objects/yield';
import { Id } from '/hacknet/domain/entities/value-objects/id';
import { Production } from '/hacknet/domain/entities/value-objects/cash';

export class Node {
  public readonly id: Id;
  public level = DefaultNode.level;
  public ram = DefaultNode.ram;
  public cores = DefaultNode.cores;
  public productionYield: Yield = DefaultNode.productionYield;
  public totalProduction: Production = DefaultNode.totalProduction;

  constructor(id: number, private readonly nodeAdapter: NodeAdapter) {
    this.id = new Id(id);
  }

  update(): void {
    const node: Node = this.nodeAdapter.getNode(this.id.value);
    this.level = node.level;
    this.ram = node.ram;
    this.cores = node.cores;
    this.productionYield = node.productionYield;
    this.totalProduction = node.totalProduction;
  }

  upgrade(component: Component) {
    this.nodeAdapter.buyNodeUpgrade(this.id.value, component);
    this.update();
  }
}

export class NodeBuilder {
  private readonly node: Node;

  constructor(id: number, nodeAdapter: NodeAdapter) {
    this.node = new Node(id, nodeAdapter);
  }

  setLevel(levelQuantity: number): this {
    this.node.level = new Level(levelQuantity);
    return this;
  }

  setRam(ramQuantity: number): this {
    this.node.ram = new Ram(ramQuantity);
    return this;
  }

  setCores(coresQuantity: number): this {
    this.node.cores = new Cores(coresQuantity);
    return this;
  }

  setProductionYield(productionYield: number): this {
    this.node.productionYield = new Yield(productionYield);
    return this;
  }

  setTotalProduction(totalProduction: number): this {
    this.node.totalProduction = new Production(totalProduction);
    return this;
  }

  build(): Node {
    return this.node;
  }
}
