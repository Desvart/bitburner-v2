import { NS } from './INetscript';

export class HacknetAdapter {
  constructor(private readonly ns: NS) {}

  // eslint-disable-next-line class-methods-use-this
  getTotalProduction(): number {
    return 0; // TODO: implement
  }

  // eslint-disable-next-line class-methods-use-this
  getIncomeRate(): number {
    return 1000;
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  async waitInSec(durationInSec: number): Promise<void> {
    const durationInMilisec = durationInSec * 1000;
    // TODO: implement
  }

  // eslint-disable-next-line class-methods-use-this
  buyComponent(): boolean {
    // TODO: implement (with eslint-disable)
    return true;
  }
}
