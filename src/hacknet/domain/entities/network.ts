import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';
import { Node } from '/hacknet/domain/entities/node';
import { Price } from '/hacknet/domain/entities/value-objects/cash';

export class Network {
  nodes: Array<Node> = [];

  constructor(private readonly nodeAdapter: NodeAdapter) {
    this.create();
  }

  get size(): number {
    return this.nodes.length;
  }

  private create(): void {
    for (let nodeId = 0; nodeId < this.size; nodeId++) {
      this.nodes[nodeId] = this.nodeAdapter.getNode(nodeId);
    }
  }

  update() {
    this.updateNodeArray();
    this.nodes.forEach((node) => node.update());
  }

  private updateNodeArray() {
    const actualSize = this.nodes.length;
    const numMissingNodes = this.size - actualSize;
    if (numMissingNodes < 0) {
      throw new Error('More nodes in the network than expected');
    }
    if (numMissingNodes === 0) {
      return;
    }
    for (let i = 0; i < numMissingNodes; i++) {
      const newNodeId = actualSize + i;
      const newNode = new Node(newNodeId, this.nodeAdapter);
      this.nodes.push(newNode);
    }
  }

  get newNodeCost(): Price {
    return this.nodeAdapter.getNewNodeCost();
  }

  purchaseNewNode(): void {
    const newNode = this.nodeAdapter.purchaseNewNode();
    if (newNode === null) {
      throw new Error('Could not purchase node');
    }
    this.update();
  }
}
