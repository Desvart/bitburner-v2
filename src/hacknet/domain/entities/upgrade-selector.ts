import { Network } from '/hacknet/domain/entities/network';
import { FormulasHacknetAdapter } from '/hacknet/infra/driven-side/formula-hacknet-adapter';
import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';
import { Node } from '/hacknet/domain/entities/node';

export class UpgradeSelector {
  private formulasAdapter?: FormulasHacknetAdapter;
  private upgradePricesMap: Map<string, number> = new Map();
  private yieldGainMap: Map<string, number> = new Map();

  constructor(
    private readonly network: Network,
    private readonly nodeAdapter: NodeAdapter,
    private checkFormulasAvailability = false
  ) {
    this.getAllUpgradeCosts();
  }

  enableFormulasAvailability(formulasAdapter: FormulasHacknetAdapter) {
    this.checkFormulasAvailability = true;
    this.formulasAdapter = formulasAdapter;
  }

  private getAllUpgradeCosts(): void {
    this.network.nodes.forEach((node) => {
      this.storeLevelUpgradeCosts(node);
      this.storeRamUpgradeCosts(node);
      this.storeCoresUpgradeCosts(node);
    });

    this.storeNewNodeCosts();
  }

  private storeLevelUpgradeCosts(node: Node): void {
    const levelUpgradeId = `${node.id.value}.LEVEL`;
    const levelUpgradeCost = node.level.getUpgradeCost(
      this.nodeAdapter,
      node.id.value
    );
    this.upgradePricesMap.set(levelUpgradeId, levelUpgradeCost.value);
  }

  private storeRamUpgradeCosts(node: Node): void {
    const ramUpgradeId = `${node.id.value}.RAM`;
    const ramUpgradeCost = node.ram.getUpgradeCost(
      this.nodeAdapter,
      node.id.value
    );
    this.upgradePricesMap.set(ramUpgradeId, ramUpgradeCost.value);
  }

  private storeCoresUpgradeCosts(node: Node): void {
    const coresUpgradeId = `${node.id.value}.CORES`;
    const coresUpgradeCost = node.cores.getUpgradeCost(
      this.nodeAdapter,
      node.id.value
    );
    this.upgradePricesMap.set(coresUpgradeId, coresUpgradeCost.value);
  }

  private storeNewNodeCosts(): void {
    const newNodeUpgradeId = '999.NODE';
    const { newNodeCost } = this.network;
    this.upgradePricesMap.set(newNodeUpgradeId, newNodeCost.value);
  }

  pickBestUpgrade() {
    if (this.checkFormulasAvailability) {
      return this.pickBestUpgradeWithFormulas();
    }
    return this.pickBestUpgradeWithoutFormulas();
  }

  private pickBestUpgradeWithoutFormulas() {
    // find the component with the minimal upgrade price
    const pickedComponent = [...this.upgradePricesMap.entries()].reduce(
      (a, b) => {
        return a[1] < b[1] ? a : b;
      }
    );
    return pickedComponent[0];
  }

  private pickBestUpgradeWithFormulas() {
    // find the component with the best yield gain over price ratio
    const yieldPriceRatioMap: Map<string, number> = new Map();
    this.getAllSimulatedYieldGains();

    this.upgradePricesMap.forEach((upgradePrice, upgradeId) => {
      const yieldGain = this.yieldGainMap.get(upgradeId) ?? 0;
      yieldPriceRatioMap.set(upgradeId, yieldGain / upgradePrice);
    });

    const pickedComponent = [...yieldPriceRatioMap.entries()].reduce((a, b) => {
      return a[1] > b[1] ? a : b;
    });
    return pickedComponent[0];
  }

  private getAllSimulatedYieldGains() {
    this.network.nodes.forEach((node) => {
      this.storeLevelSimulatedYieldGain(node);
      this.storeRamSimulatedYieldGain(node);
      this.storeCoresSimulatedYieldGain(node);
    });

    this.storeNewNodeSimulatedYieldGain();
  }

  private storeLevelSimulatedYieldGain(node: Node): void {
    const levelUpgradeId = `${node.id.value}.LEVEL`;

    const nodeActualYield = node.productionYield.value;
    const upgradedNodeSimulatedYield =
      this.formulasAdapter?.getSimulatedYield(
        Math.min(node.level.quantity + 1, node.level.MAX_QUANTITY),
        node.ram.quantity,
        node.cores.quantity
      ).value ?? 0;
    const upgradeNodeSimulatedYieldGain: number =
      upgradedNodeSimulatedYield - nodeActualYield;

    this.yieldGainMap.set(levelUpgradeId, upgradeNodeSimulatedYieldGain);
  }

  private storeRamSimulatedYieldGain(node: Node): void {
    const ramUpgradeId = `${node.id.value}.RAM`;

    const nodeActualYield = node.productionYield.value;
    const upgradedNodeSimulatedYield =
      this.formulasAdapter?.getSimulatedYield(
        node.level.quantity,
        Math.min(node.ram.quantity * 2, node.ram.MAX_QUANTITY),
        node.cores.quantity
      ).value ?? 0;
    const upgradeNodeSimulatedYieldGain: number =
      upgradedNodeSimulatedYield - nodeActualYield;

    this.yieldGainMap.set(ramUpgradeId, upgradeNodeSimulatedYieldGain);
  }

  private storeCoresSimulatedYieldGain(node: Node): void {
    const coresUpgradeId = `${node.id.value}.CORES`;
    const nodeActualYield = node.productionYield.value;
    const upgradedNodeSimulatedYield =
      this.formulasAdapter?.getSimulatedYield(
        node.level.quantity,
        node.ram.quantity,
        Math.min(node.cores.quantity + 1, node.cores.MAX_QUANTITY)
      ).value ?? 0;
    const upgradeNodeSimulatedYieldGain: number =
      upgradedNodeSimulatedYield - nodeActualYield;

    this.yieldGainMap.set(coresUpgradeId, upgradeNodeSimulatedYieldGain);
  }

  private storeNewNodeSimulatedYieldGain(): void {
    const newNodeUpgradeId = '999.NODE';
    const newNodeSimulatedYield =
      this.formulasAdapter?.getSimulatedYield(1, 1, 1).value ?? 0;
    this.upgradePricesMap.set(newNodeUpgradeId, newNodeSimulatedYield);
  }
}
