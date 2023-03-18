import { Cash, Yield } from '@/hacknet/domain/entity/value-objects';

export interface IMultiplier {
  coreCost: Cash;
  levelCost: Cash;
  production: Yield;
  purchaseCost: Cash;
  ramCost: Cash;
}
