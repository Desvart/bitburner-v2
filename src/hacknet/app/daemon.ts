import { NS } from '/hacknet/infra/interface/NetscriptDefinitions';
import { Manager } from '/hacknet/domain/use-cases/manager';
import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';

/** @param {NS} ns */
export async function main(ns: NS) {
  const hacknetAdapter = new NodeAdapter(ns);
  const hacknetManager = new Manager(hacknetAdapter);
  hacknetManager.run();
}
