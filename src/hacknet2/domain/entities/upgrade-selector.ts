import { Network } from '/hacknet2/domain/entities/network';
import { HacknetAdapter } from '/hacknet2/infra/hacknet-adapter';

export class UpgradeSelector {
  #allUpgradesPrices = new Map<string, number>();
  constructor(private readonly network: Network, private readonly hacknetAdapter: HacknetAdapter) {
    // const networkUpgrades = new NetworkUpgrades(network, hacknetAdapter);
    // this.allUpgradesPrices = networkUpgrades.getPrice();
    this.#allUpgradesPrices.set('1,Level', 10); // todo: scaffold
    this.#allUpgradesPrices.set('1,ram', 15); // todo: scaffold
  }

  pickBestUpgrade() {
    if (this.hacknetAdapter.checkFormulasAvailability()) {
      return this.pickBestUpgradeWithFormulas();
    }
    return this.pickBestUpgradeWithoutFormulas();
  }

  private pickBestUpgradeWithoutFormulas() {
    return UpgradeSelector.extractCheapestUpgrade(this.#allUpgradesPrices);
  }

  private static extractCheapestUpgrade(upgradePrices: Map<string, number>) {
    return [...upgradePrices.entries()].reduce((a, b) => {
      return a[1] < b[1] ? a : b;
    });
  }

  private pickBestUpgradeWithFormulas() {
    // const rois = this.roiCalculator.getRoIs();
    const allUpgradesRoI = new Map<string, number>();
    // allUpgradesRoI = networkUpgrades.getRoI();
    allUpgradesRoI.set('1,Level', 2); // todo: scaffold
    allUpgradesRoI.set('1,ram', 1.5); // todo: scaffold
    const componentWithBestRoi = UpgradeSelector.extractComponentWithBestRoI(allUpgradesRoI)[0];
    const componentUpgradeCost = this.#allUpgradesPrices.get(componentWithBestRoi);
    if (componentUpgradeCost === undefined) {
      throw new Error(`No upgrade cost found for component ${componentWithBestRoi}`);
    }
    return [componentWithBestRoi, componentUpgradeCost] as [string, number];
  }

  private static extractComponentWithBestRoI(rois: Map<string, number>) {
    return [...rois.entries()].reduce((a, b) => {
      return a[1] < b[1] ? a : b;
    });
  }

  // For testing purposes
  get allUpgradesPrices() {
    return this.#allUpgradesPrices;
  }
}
