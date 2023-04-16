// import { Network } from '/hacknet/domain/entities/network';
// import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';
//
// export enum ManagerStatus {
//   UNKNOWN = 'unknown',
//   INVESTING = 'investing',
//   WAITING = 'wait',
//   REFUNDING = 'refunding',
//   PERFORMING = 'performing',
//   SAVING = 'saving',
// }
//
// export class Manager {
//   status: ManagerStatus = ManagerStatus.UNKNOWN;
//   private network: Network;
//
//   constructor(nodeAdapter: NodeAdapter) {
//     this.network = new Network(nodeAdapter);
//   }
//
//   // if the network has no node, then buy one
//   initNetwork() {
//     if (this.network.nodes.length === 0) {
//       this.status = ManagerStatus.INVESTING;
//
//       this.purchaseCheck(this.network.newNodeCost.value);
//       this.network.purchaseNewNode();
//     }
//   }
//
//   private purchaseCheck(requiredAmount: number) {
//     throw new Error('Method not implemented.');
//   }
//
//   // Determine the best element to improve the network yield
//
//   // Buy the best element
//
//   // Wait to have enough cash to buy the best element
//
//   start() {
//     this.updateNetworkState();
//     if (this.network.length === 0) {
//       this.status = ManagerStatus.Investing;
//       this.buyANode();
//     }
//   }
//
//   private updateNetworkState() {
//     this.network.forEach((node) => {});
//   }
//   private buyANode() {
//     console.log('Node bought.');
//     this.status = ManagerStatus.Refunding;
//   }
// }
