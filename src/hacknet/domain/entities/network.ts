import { NodeAdapter } from '/hacknet/infra/driven-side/node-adapter';
import { Node } from '/hacknet/domain/entities/node';
import { Income, Production } from '/hacknet/domain/entities/cash';

export class Network {
  nodes: Node[];

  constructor(private readonly nodeAdapter: NodeAdapter) {
    const networkSize = this.nodeAdapter.getNetworkSize();
    const nodes = new Array<Node>(networkSize);
    this.nodes = nodes.map((_node, id) => this.nodeAdapter.getNode(id));
  }

  get size(): number {
    return this.nodes.length;
  }

  update() {
    this.updateNodes();
    this.nodes.forEach((node) => node.update());
  }

  private updateNodes() {
    const actualSize = this.nodes.length;
    const realSize = this.nodeAdapter.getNetworkSize();
    const numMissingNodes = realSize - actualSize;

    if (numMissingNodes === 0) {
      return;
    }

    if (numMissingNodes < 0) {
      throw new Error('More nodes in the network than expected');
    }

    let missingNodes = new Array<Node>(numMissingNodes);
    missingNodes = missingNodes.map((_, id) => new Node(actualSize + id, this.nodeAdapter));
    this.nodes = this.nodes.concat(missingNodes);
  }

  getTotalIncome(): Income {
    const totalIncome = this.nodes.reduce((acc, curr) => acc + curr.income.value, 0);
    return new Income(totalIncome);
  }

  get turnover(): Production {
    return new Production(this.nodes.reduce((acc, currNode) => acc + currNode.production.value, 0));
  }
}
