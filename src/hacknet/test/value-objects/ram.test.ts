import { Component } from '../../domain/entities/value-objects/component';
import { Ram } from '../../domain/entities/value-objects/ram';

describe('Ram object', () => {
  test('Create and retrieve value', () => {
    const mockedQty = 5;
    const mockedUpgradesCost = 10;

    const ram = new Ram.Builder()
      .withActualQty(mockedQty)
      .withUpgradeCost(mockedUpgradesCost)
      .build();

    expect(ram.type).toEqual(Component.RAM);
    expect(ram.quantity.value).toEqual(mockedQty);
    expect(ram.upgradeCost.value).toEqual(mockedUpgradesCost);
  });

  test('Ram is immutable', () => {
    const mockedQty = 4;
    const mockedUpgradesCost = 10;

    const ram = new Ram.Builder()
      .withActualQty(mockedQty)
      .withUpgradeCost(mockedUpgradesCost)
      .build();

    expect(Object.isFrozen(ram)).toEqual(true);
  });
});
