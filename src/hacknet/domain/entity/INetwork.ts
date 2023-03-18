import { INode } from '@/hacknet/domain/entity/INode';
import { Cash, Yield } from '@/hacknet/domain/entity/value-objects';

export interface INetwork extends Array<INode> {
  maxSize: number;

  getNewNodeCost(): Cash;

  getNewNodeProductivity(): Yield;

  refresh(): void;
}
