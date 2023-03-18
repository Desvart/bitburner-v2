import { INsHacknetPort } from '@/hacknet/app/ns-hacknet-port';

export class Manager {
  performance: number;

  constructor(ns: INsHacknetPort) {
    this.performance = 0;
  }

  start() {}

  upgradeNetwork() {}

  identifyBestUpgrade() {}

  upgradeChecks() {}
}
