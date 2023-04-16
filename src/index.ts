import { NS } from '/hacknet/infra/interface/NetscriptDefinitions';
import { replacer, reviver } from '/utils/json-map-serialization';

export async function main(ns: NS) {
  const wallet: Map<string, number> = new Map();

  wallet.set('0.LEVEL', 100);
  wallet.set('0.RAM', 200);
  wallet.set('0.CORES', 300);
  wallet.set('1.LEVEL', 400);

  ns.write('wallet.txt', JSON.stringify(wallet, replacer), 'w');

  const waller2 = JSON.parse(ns.read('wallet.txt'), reviver);

  console.dir(waller2);
}
