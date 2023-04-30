// eslint-disable-next-line max-classes-per-file
import { Network } from '/hacknet/domain/entities/network';
import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';
import { Node } from '/hacknet/domain/entities/node';
import { ComponentType, ComponentId, NodeId } from '/hacknet/domain/entities/component';
import { Income, Price } from '/hacknet/domain/entities/cash';

export class PricesExtractor {
  #upgradePrices: Map<ComponentId, Price> = new Map();

  constructor(private readonly network: Network, private readonly nodeAdapter: NodeAdapter) {}

  private getAllUpgradeCosts(): void {
    this.network.nodes.forEach((node) => {
      this.storeLevelUpgradeCosts(node);
      this.storeRamUpgradeCosts(node);
      this.storeCoresUpgradeCosts(node);
    });

    this.storeNewNodeCosts();
  }

  private storeLevelUpgradeCosts(node: Node): void {
    const levelUpgradeCost = this.nodeAdapter.getUpgradeCost(node.id, ComponentType.LEVEL);
    this.#upgradePrices.set(node.level.id, levelUpgradeCost);
  }

  private storeRamUpgradeCosts(node: Node): void {
    const ramUpgradeCost = this.nodeAdapter.getUpgradeCost(node.id, ComponentType.RAM);
    this.#upgradePrices.set(node.ram.id, ramUpgradeCost);
  }

  private storeCoresUpgradeCosts(node: Node): void {
    const coresUpgradeCost = this.nodeAdapter.getUpgradeCost(node.id, ComponentType.CORES);
    this.#upgradePrices.set(node.cores.id, coresUpgradeCost);
  }

  private storeNewNodeCosts(): void {
    const newNodeId = new ComponentId(new NodeId(999), ComponentType.NODE);
    const nodeCost = this.nodeAdapter.getNodeCost();
    this.#upgradePrices.set(newNodeId, nodeCost);
  }

  getUpgradePrices(): Map<ComponentId, Price> {
    this.getAllUpgradeCosts();
    return this.#upgradePrices;
  }
}

export class IncomeGainCalculator {
  #incomeGains: Map<ComponentId, Income> = new Map();
  constructor(private readonly network: Network, private readonly nodeAdapter: NodeAdapter) {}

  private getAllSimulatedIncomeGains() {
    this.network.nodes.forEach((node) => {
      this.storeLevelSimulatedIncomeGain(node);
      this.storeRamSimulatedIncomeGain(node);
      this.storeCoresSimulatedIncomeGain(node);
    });

    this.storeNewNodeSimulatedIncomeGain();
  }

  private storeLevelSimulatedIncomeGain(node: Node): void {
    const upgradedNodeSimulatedIncome = this.nodeAdapter.getSimulatedIncome(
      Math.min(node.level.quantity + 1, node.level.MAX_QUANTITY),
      node.ram.quantity,
      node.cores.quantity
    );
    const upgradeNodeSimulatedYieldGain = upgradedNodeSimulatedIncome.substract(node.income);
    this.#incomeGains.set(node.level.id, upgradeNodeSimulatedYieldGain);
  }

  private storeRamSimulatedIncomeGain(node: Node): void {
    const upgradedNodeSimulatedIncome = this.nodeAdapter.getSimulatedIncome(
      node.level.quantity,
      Math.min(node.ram.quantity * 2, node.ram.MAX_QUANTITY),
      node.cores.quantity
    );
    const upgradeNodeSimulatedYieldGain = upgradedNodeSimulatedIncome.substract(node.income);
    this.#incomeGains.set(node.ram.id, upgradeNodeSimulatedYieldGain);
  }

  private storeCoresSimulatedIncomeGain(node: Node): void {
    const upgradedNodeSimulatedIncome = this.nodeAdapter.getSimulatedIncome(
      node.level.quantity,
      node.ram.quantity,
      Math.min(node.cores.quantity + 1, node.cores.MAX_QUANTITY)
    );
    const upgradeNodeSimulatedYieldGain = upgradedNodeSimulatedIncome.substract(node.income);
    this.#incomeGains.set(node.cores.id, upgradeNodeSimulatedYieldGain);
  }

  private storeNewNodeSimulatedIncomeGain(): void {
    const newNodeId = new ComponentId(new NodeId(999), ComponentType.NODE);
    const newNodeSimulatedIncome = this.nodeAdapter.getSimulatedIncome(1, 1, 1);
    this.#incomeGains.set(newNodeId, newNodeSimulatedIncome);
  }

  getSimulatedIncomeGains(): Map<ComponentId, Income> {
    this.getAllSimulatedIncomeGains();
    return this.#incomeGains;
  }
}

export class RoICalculator {
  #rois: Map<ComponentId, number> = new Map();
  private pricesExtractor: PricesExtractor;
  private IncomeGainCalculator: IncomeGainCalculator;

  constructor(private readonly network: Network, private readonly nodeAdapter: NodeAdapter) {
    this.pricesExtractor = new PricesExtractor(network, nodeAdapter);
    this.IncomeGainCalculator = new IncomeGainCalculator(network, nodeAdapter);
  }

  private getAllRoIs() {
    const upgradePrices = this.pricesExtractor.getUpgradePrices();
    const incomeGains = this.IncomeGainCalculator.getSimulatedIncomeGains();

    upgradePrices.forEach((price, componentId) => {
      const incomeGain = incomeGains.get(componentId) ?? new Income(0);
      const roi = incomeGain.value / price.value;
      this.#rois.set(componentId, roi);
    });
  }

  getRoIs(): Map<ComponentId, number> {
    this.getAllRoIs();
    return this.#rois;
  }
}

export class UpgradeSelector {
  private pricesExtractor: PricesExtractor;
  private roiCalculator: RoICalculator;
  constructor(private readonly network: Network, private readonly nodeAdapter: NodeAdapter) {
    this.pricesExtractor = new PricesExtractor(network, nodeAdapter);
    this.roiCalculator = new RoICalculator(network, nodeAdapter);
  }

  pickBestUpgrade() {
    if (this.nodeAdapter.checkFormulasAvailability()) {
      return this.pickBestUpgradeWithFormulas();
    }
    return this.pickBestUpgradeWithoutFormulas();
  }

  private pickBestUpgradeWithoutFormulas() {
    const upgradePrices = this.pricesExtractor.getUpgradePrices();
    return UpgradeSelector.extractCheapestUpgrade(upgradePrices);
  }

  private static extractCheapestUpgrade(upgradePrices: Map<ComponentId, Price>) {
    return [...upgradePrices.entries()].reduce((a, b) => {
      return a[1] < b[1] ? a : b;
    });
  }

  private pickBestUpgradeWithFormulas() {
    const upgradePrices = this.pricesExtractor.getUpgradePrices();
    const rois = this.roiCalculator.getRoIs();
    const componentWithBestRoi = UpgradeSelector.extractComponentWithBestRoI(rois)[0];
    const componentUpgradeCost = upgradePrices.get(componentWithBestRoi);
    if (componentUpgradeCost === undefined) {
      throw new Error(`No upgrade cost found for component ${componentWithBestRoi}`);
    }
    return [componentWithBestRoi, componentUpgradeCost] as [ComponentId, Price];
  }

  private static extractComponentWithBestRoI(rois: Map<ComponentId, number>) {
    return [...rois.entries()].reduce((a, b) => {
      return a[1] < b[1] ? a : b;
    });
  }
}
