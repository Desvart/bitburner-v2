import { ComponentType } from '../../domain/entities/component';
import { Level } from '../../domain/entities/level';

describe('Level object', () => {
  test('Create and retrieve value', () => {
    const mockedQty = 5;
    const mockedUpgradesCost = 10;

    const level = new Level.Builder()
      .withActualQty(mockedQty)
      .withUpgradeCost(mockedUpgradesCost)
      .build();

    expect(level.type).toEqual(ComponentType.LEVEL);
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
