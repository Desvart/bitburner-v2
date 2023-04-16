import { Component } from '../../domain/entities/value-objects/component';
import { Level } from '../../domain/entities/value-objects/level';
import { Ram } from '../../domain/entities/value-objects/ram';
import { Cores } from '../../domain/entities/value-objects/cores';
import { NodeBuilder } from '../../domain/entities/node-builder';
import { HacknetMockLib } from '../mock/hacknet-mock-lib';

describe('Node object', () => {
  // unit test to create a node object and retrieve some of its properties
  test('Create and retrieve value', () => {
    const node = new NodeBuilder(1, HacknetMockLib.fakeNodeAdapter())
      .setLevel(HacknetMockLib.mockedLevel())
      .setRam(HacknetMockLib.mockedRam())
      .setCores(HacknetMockLib.mockedCores())
      .build();

    expect(node.level).toEqual(HacknetMockLib.mockedLevel());
    expect(node.ram).toEqual(HacknetMockLib.mockedRam());
    expect(node.cores).toEqual(HacknetMockLib.mockedCores());
  });

  // test('Create and retrieve value', () => {
  //   const mockedQty = 5;
  //   const mockedUpgradesCost = 10;
  //
  //   const level = new Level.Builder()
  //     .withActualQty(mockedQty)
  //     .withUpgradeCost(mockedUpgradesCost)
  //     .build();
  //
  //   expect(level.type).toEqual(Component.LEVEL);
  //   expect(level.quantity.value).toEqual(mockedQty);
  //   expect(level.upgradeCost.value).toEqual(mockedUpgradesCost);
  // });
  //
  // test('Level is immutable', () => {
  //   const mockedQty = 4;
  //   const mockedUpgradesCost = 10;
  //
  //   const level = new Level.Builder()
  //     .withActualQty(mockedQty)
  //     .withUpgradeCost(mockedUpgradesCost)
  //     .build();
  //
  //   expect(Object.isFrozen(level)).toEqual(true);
  // });
});
