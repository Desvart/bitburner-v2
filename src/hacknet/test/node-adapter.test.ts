import { NodeAdapter } from '../infra/driven-side/node-adapter';
import { Id } from '../domain/entities/value-objects/id';
import { HacknetMockLib } from './mock/hacknet-mock-lib';

describe('Node Adapter', () => {
  test('Get node object', () => {
    const expectedNode = HacknetMockLib.fakeNode();
    const mockedNsHacknetNode =
      HacknetMockLib.mockedNsHacknetNodes(expectedNode);

    const node = new NodeAdapter(mockedNsHacknetNode).getNode(new Id(1));

    expect(node).toEqual(expectedNode);
  });
});
