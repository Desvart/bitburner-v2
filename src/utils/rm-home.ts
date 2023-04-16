import { NS } from '../hacknet/infra/interface/NetscriptDefinitions';

function eraseAFile(ns: NS, fileName: string, hostname: string) {
  if (ns.rm(fileName, hostname)) {
    ns.tprint(`SUCCESS - File ${fileName} deleted on ${hostname}.`);
  } else {
    ns.tprint(`ERROR - Couldn't delete file ${fileName} on ${hostname}.`);
  }
}
export function main(ns: NS) {
  const files = ns.ls('home');
  files.forEach((fileName) => eraseAFile(ns, fileName, 'home'));
}
