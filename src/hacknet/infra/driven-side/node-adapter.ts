import { HacknetMultipliers, NodeStats, NS } from '../interface/NetscriptDefinitions';
import { ComponentType, NodeId } from '/hacknet/domain/entities/component';
import { NodeBuilder, Node } from '/hacknet/domain/entities/node';
import { Income, Price } from '/hacknet/domain/entities/cash';
import { replacer, reviver } from '/utils/json-map-serialization';

export class NodeAdapter {
  private readonly SAVE_FILE: string = '/hacknet/app/transactions-book.txt';

  constructor(private readonly ns: NS) {}

  getNode(nodeId: number): Node {
    const nodeStat: NodeStats = this.ns.hacknet.getNodeStats(nodeId);
    const id: number = NodeAdapter.getIdFromNodeName(nodeStat.name);
    return new NodeBuilder(id, this)
      .setLevel(nodeStat.level)
      .setRam(nodeStat.ram)
      .setCores(nodeStat.cores)
      .setIncome(nodeStat.production)
      .setProduction(nodeStat.totalProduction)
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

  getNodeCost(): Price {
    return new Price(this.ns.hacknet.getPurchaseNodeCost());
  }

  getNetworkSize(): number {
    return this.ns.hacknet.numNodes();
  }

  purchaseNode(): Node {
    const nodeId: number = this.ns.hacknet.purchaseNode();
    if (nodeId === -1) {
      throw new Error('Could not purchase node');
    }
    return this.getNode(nodeId);
  }

  getUpgradeCost(nodeId: NodeId, component: ComponentType): Price {
    switch (component) {
      case ComponentType.LEVEL:
        return new Price(this.ns.hacknet.getLevelUpgradeCost(nodeId.value, 1));
      case ComponentType.RAM:
        return new Price(this.ns.hacknet.getRamUpgradeCost(nodeId.value, 1));
      case ComponentType.CORES:
        return new Price(this.ns.hacknet.getCoreUpgradeCost(nodeId.value, 1));
      default:
        throw new Error(`Unknown component ${component}`);
    }
  }

  buyUpgrade(nodeId: NodeId, component: ComponentType): Node {
    switch (component) {
      case ComponentType.LEVEL:
        this.ns.hacknet.upgradeLevel(nodeId.value, 1);
        break;
      case ComponentType.RAM:
        this.ns.hacknet.upgradeRam(nodeId.value, 1);
        break;
      case ComponentType.CORES:
        this.ns.hacknet.upgradeCore(nodeId.value, 1);
        break;
      default:
        throw new Error(`Unknown component ${component}`);
    }
    return this.getNode(nodeId.value);
  }

  saveTransactionsBook(transactionsBook: Map<string, number>) {
    this.ns.write(this.SAVE_FILE, JSON.stringify(transactionsBook, replacer), 'w');
  }

  loadTransactionsBook(): Map<string, number> {
    const fileContent: string = this.ns.read(this.SAVE_FILE);
    if (fileContent === '') {
      return new Map<string, number>();
    }
    return JSON.parse(fileContent, reviver);
  }

  getAvailableCash(): number {
    return this.ns.getPlayer().money;
  }

  checkFormulasAvailability(): boolean {
    return this.ns.fileExists('formulas.exe', 'home');
  }

  private get hacknetMultipliers(): HacknetMultipliers {
    return this.ns.getHacknetMultipliers();
  }

  getSimulatedIncome(levelQty: number, ramQty: number, coreQty: number): Income {
    if (!this.checkFormulasAvailability()) {
      throw new Error('Formulas are not available');
    }

    const simulateIncome = this.ns.formulas.hacknetNodes.moneyGainRate(
      levelQty,
      ramQty,
      coreQty,
      this.hacknetMultipliers.production
    );
    return new Income(simulateIncome);
  }

  async wait(timeToWaitInSeconds: number) {
    await this.ns.sleep(timeToWaitInSeconds * 1000);
  }
}
