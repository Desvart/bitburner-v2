import { Cash, Yield } from '@/hacknet/domain/entity/value-objects';

export interface IComponent {
  max: number;
  actual: number;
  min: number;
  upgradeCost: Cash;
  upgradeGain: Yield;
}
