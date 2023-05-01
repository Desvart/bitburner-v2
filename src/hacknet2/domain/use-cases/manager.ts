import { HacknetAdapter } from '/hacknet2/infra/hacknet-adapter';
import { log } from '/hacknet2/infra/hacket-logger';

export class Manager {
  iterator = 0; // todo: scaffold to be removed

  constructor(private readonly nodeAdapter: HacknetAdapter) {}

  run() {
    log().info('Hacknet manager running...');

    let loopExitCondition: boolean;
    do {
      loopExitCondition = this.test(); // todo: scaffold to be removed
    } while (!loopExitCondition);

    log().warning("Hacknet manager exited his loop. It shouldn't have happened.");
  }

  // todo: scaffold to be removed
  test(): boolean {
    this.iterator += 1;
    log().debug(`iterator: ${this.iterator}`);
    return this.iterator >= 10;
  }
}
