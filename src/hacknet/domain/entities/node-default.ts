import { Level } from '/hacknet/domain/entities/value-objects/level';
import { Yield } from '/hacknet/domain/entities/value-objects/yield';
import { Production } from '/hacknet/domain/entities/value-objects/cash';
import { Cores } from '/hacknet/domain/entities/value-objects/cores';
import { Ram } from '/hacknet/domain/entities/value-objects/ram';

export class DefaultNode {
  static readonly level = new Level(10);
  static readonly ram = new Ram(1);
  static readonly cores = new Cores(1);
  static readonly productionYield = new Yield(0);
  static readonly totalProduction = new Production(0);
}
