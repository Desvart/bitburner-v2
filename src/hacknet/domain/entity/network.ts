import { Node } from '@/hacknet/domain/entity/node';
import { Cash, Yield } from '@/hacknet/domain/entity/value-objects';

export class Network extends Array<Node> {
  production: Yield;

  profits: Cash;

  newNodeCost: Cash;

  constructor() {
    super();
  }
}
