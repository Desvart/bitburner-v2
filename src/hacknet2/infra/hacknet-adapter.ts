import { NS } from './INetscript';

export class HacknetAdapter {
  constructor(private readonly ns: NS) {}

  getProduction() {
    return 0;
  }
}
