import { Cash, Id, Yield } from '@/hacknet/domain/entity/value-objects';
import { IComponent } from '@/hacknet/domain/entity/IComponent';

export interface INode {
  id: Id;
  level: IComponent;
  ram: IComponent;
  cores: IComponent;
  production(): Yield;
  totalProduction(): Cash;
}
