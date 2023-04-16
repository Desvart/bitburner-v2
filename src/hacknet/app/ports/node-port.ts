import { Component } from '/hacknet/domain/entities/value-objects/component';
import { Node } from '/hacknet/domain/entities/node';
import { Price } from '/hacknet/domain/entities/value-objects/cash';

export interface INodePort {
  getNode(nodeId: number): Node;

  getNewNodeCost(): Price;

  purchaseNewNode(): Node;

  getNodeQuantity(): number;

  getUpgradeCost(nodeId: number, component: Component): Price;

  buyNodeUpgrade(nodeId: number, component: Component): Node;
}
