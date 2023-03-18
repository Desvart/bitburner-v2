import {Cash, CoresQty, LevelSize, RamQty, Yield} from "@/hacknet/domain/entity/value-objects";

export class Node {
  id: number;

  production: Yield;

  profits: Cash;

  levelSize: LevelSize;

  levelUpgradeCost: Cash;

  levelProfitabiltyUpgrade: Yield;

  ramSize: RamQty;

  ramUpgradeCost: Cash;

  ramProfitabiltyUpgrade: Yield;

  coresSize: CoresQty;

  coresUpgradeCost: Cash;

  coresProfitabiltyUpgrade: Yield;

  constructor() {}
}
