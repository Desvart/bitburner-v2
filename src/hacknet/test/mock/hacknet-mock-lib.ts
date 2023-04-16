// import { instance, mock, when } from 'ts-mockito';
// import { Level } from '/hacknet/domain/entities/value-objects/level';
// import { Ram } from '/hacknet/domain/entities/value-objects/ram';
// import { Cores } from '/hacknet/domain/entities/value-objects/cores';
// import { Node } from '/hacknet/domain/entities/node';
// import {
//   Hacknet,
//   NodeStats,
//   NS,
// } from '/hacknet/infra/interface/NetscriptDefinitions';
// import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';
//
//
// export class HacknetMockLib {
//
//   static mockedLevelQty(): LevelQty {
//     const mockedLevelQty: LevelQty = mock<LevelQty>();
//     when(mockedLevelQty.value).thenReturn(5);
//     return instance(mockedLevelQty);
//   }
//
//   static mockedLevel(): Level {
//     const mockedILevel: IComponent = mock<IComponent>();
//     when(mockedILevel.quantity.value).thenReturn(5);
//     when(mockedILevel.upgradeCost.value).thenReturn(10);
//     return <Level>instance(mockedILevel);
//   }
//
//   static mockedRam(): Ram {
//     const mockedIRam: Ram = mock<IComponent>() as Ram;
//     when(mockedIRam.quantity.value).thenReturn(4);
//     when(mockedIRam.upgradeCost.value).thenReturn(10);
//     return instance(mockedIRam);
//   }
//
//   static mockedCores(): Cores {
//     const mockedICores: Cores = mock<IComponent>() as Cores;
//     when(mockedICores.quantity.value).thenReturn(3);
//     when(mockedICores.upgradeCost.value).thenReturn(10);
//     return instance(mockedICores);
//   }
//
//   static fakeNodeAdapter(): NodeAdapter {
//     const mockedINodeAdapter: NodeAdapter = mock<NodeAdapter>();
//     return instance(mockedINodeAdapter);
//   }
//
//   static mockedNode(): Node {
//     const mockedINode: INode = mock<INode>();
//     when(mockedINode.id.value).thenReturn(1);
//     when(mockedINode.level).thenReturn(HacknetMockLib.mockedLevel());
//     when(mockedINode.ram).thenReturn(HacknetMockLib.mockedRam());
//     when(mockedINode.cores).thenReturn(HacknetMockLib.mockedCores());
//     when(mockedINode.productionRate.value).thenReturn(2);
//     when(mockedINode.totalProduction.value).thenReturn(10);
//     return <Node>instance(mockedINode);
//   }
//
//   static mockedNsHacknetNodes(nodeToInject: INode): NS {
//     const mockedINsNodeStats: NodeStats = mock<NodeStats>();
//     when(mockedINsNodeStats.name).thenReturn('hacknet-node-1');
//     when(mockedINsNodeStats.level).thenReturn(
//       nodeToInject.level.quantity.value
//     );
//     when(mockedINsNodeStats.ram).thenReturn(nodeToInject.ram.quantity.value);
//     when(mockedINsNodeStats.cores).thenReturn(
//       nodeToInject.cores.quantity.value
//     );
//     when(mockedINsNodeStats.production).thenReturn(
//       nodeToInject.productionRate.value
//     );
//     when(mockedINsNodeStats.totalProduction).thenReturn(
//       nodeToInject.totalProduction.value
//     );
//     const mockedNodeStats = instance(mockedINsNodeStats);
//
//     const mockedIHacknet: Hacknet = mock<Hacknet>();
//     when(mockedIHacknet.getNodeStats(1)).thenReturn(mockedNodeStats);
//     const mockedHacknet = instance(mockedIHacknet);
//
//     const mockedINs: NS = mock<NS>();
//     when(mockedINs.hacknet).thenReturn(mockedHacknet);
//     const mockedNs = instance(mockedINs);
//     return mockedNs;
//   }
// }
