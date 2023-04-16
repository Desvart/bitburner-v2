import { INodePort } from '/hacknet/app/ports/node-port';
import { NodeStats, NS } from '../interface/NetscriptDefinitions';
import { Component } from '/hacknet/domain/entities/value-objects/component';
import { NodeBuilder, Node } from '/hacknet/domain/entities/node';
import { Price } from '/hacknet/domain/entities/value-objects/cash';
import { replacer, reviver } from '/utils/json-map-serialization';

export class NodeAdapter implements INodePort {
  private readonly SAVE_FILE: string = 'transactions-book.txt';

  constructor(private readonly ns: NS) {}

  getNode(nodeId: number): Node {
    const nodeStat: NodeStats = this.ns.hacknet.getNodeStats(nodeId);
    const id: number = NodeAdapter.getIdFromNodeName(nodeStat.name);
    return new NodeBuilder(id, this)
      .setLevel(nodeStat.level)
      .setRam(nodeStat.ram)
      .setCores(nodeStat.cores)
      .setProductionYield(nodeStat.production)
      .setTotalProduction(nodeStat.totalProduction)
      .build();
  }

  private static getIdFromNodeName(nodeName: string): number {
    const regex = /hacknet-node-(\d+)/;
    const match = regex.exec(nodeName);
    if (!match) {
      throw new Error(`Node name ${nodeName} does not match expected format`);
    }
    return parseInt(match[1], 10);
  }

  getNewNodeCost(): Price {
    return new Price(this.ns.hacknet.getPurchaseNodeCost());
  }

  getNodeQuantity(): number {
    return this.ns.hacknet.numNodes();
  }

  purchaseNewNode(): Node {
    const nodeId: number = this.ns.hacknet.purchaseNode();
    if (nodeId === -1) {
      throw new Error('Could not purchase node');
    }
    return this.getNode(nodeId);
  }

  getUpgradeCost(nodeId: number, component: Component): Price {
    switch (component) {
      case Component.LEVEL:
        return new Price(this.ns.hacknet.getLevelUpgradeCost(nodeId, 1));
      case Component.RAM:
        return new Price(this.ns.hacknet.getRamUpgradeCost(nodeId, 1));
      case Component.CORES:
        return new Price(this.ns.hacknet.getCoreUpgradeCost(nodeId, 1));
      default:
        throw new Error(`Unknown component ${component}`);
    }
  }

  buyNodeUpgrade(nodeId: number, component: Component): Node {
    switch (component) {
      case Component.LEVEL:
        this.ns.hacknet.upgradeLevel(nodeId, 1);
        break;
      case Component.RAM:
        this.ns.hacknet.upgradeRam(nodeId, 1);
        break;
      case Component.CORES:
        this.ns.hacknet.upgradeCore(nodeId, 1);
        break;
      default:
        throw new Error(`Unknown component ${component}`);
    }
    return this.getNode(nodeId);
  }

  saveTransactionsBook(transactionsBook: Map<string, number>) {
    this.ns.write(
      this.SAVE_FILE,
      JSON.stringify(transactionsBook, replacer),
      'w'
    );
  }

  retrieveTransactionsBook(): Map<string, number> {
    const fileContent: string = this.ns.read(this.SAVE_FILE);
    if (!fileContent) {
      return JSON.parse(fileContent, reviver);
    }

    throw new Error('Could not retrieve transactions book');
  }
}
