import { Component } from '../../domain/entities/value-objects/component';
import { Level } from '../../domain/entities/value-objects/level';

describe('Level object', () => {
  test('Create and retrieve value', () => {
    const mockedQty = 5;
    const mockedUpgradesCost = 10;

    const level = new Level.Builder()
      .withActualQty(mockedQty)
      .withUpgradeCost(mockedUpgradesCost)
      .build();

    expect(level.type).toEqual(Component.LEVEL);
    expect(level.quantity.value).toEqual(mockedQty);
    expect(level.upgradeCost.value).toEqual(mockedUpgradesCost);
  });

  test('Level is immutable', () => {
    const mockedQty = 4;
    const mockedUpgradesCost = 10;

    const level = new Level.Builder()
      .withActualQty(mockedQty)
      .withUpgradeCost(mockedUpgradesCost)
      .build();

    expect(Object.isFrozen(level)).toEqual(true);
  });
});
