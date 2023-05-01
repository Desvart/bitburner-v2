import { NS } from '/hacknet2/infra/INetscript';
import { Manager } from '/hacknet2/domain/use-cases/manager';
import { HacknetAdapter } from '/hacknet2/infra/hacknet-adapter';

/** @param {NS} ns */
export async function main(ns: NS) {
  const hacknetAdapter = new HacknetAdapter(ns);
  const hacknetManager = new Manager(hacknetAdapter);
  hacknetManager.run();
}
