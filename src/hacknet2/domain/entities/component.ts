export enum ComponentType {
  NODE = 'NODE',
  LEVEL = 'LEVEL',
  RAM = 'RAM',
  CORES = 'CORES',
}

// todo: implement
export class Component {
  constructor(public readonly type: ComponentType) {}
}
