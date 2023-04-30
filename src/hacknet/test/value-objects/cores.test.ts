import { Cores } from '../../domain/entities/cores';
import { ComponentType } from '../../domain/entities/component';

describe('Cores object', () => {
  test('Create and retrieve value', () => {
    const mockedQty = 5;
    const mockedUpgradesCost = 10;

    const cores = new Cores.Builder()
      .withActualQty(mockedQty)
      .withUpgradeCost(mockedUpgradesCost)
      .build();

    expect(cores.type).toEqual(ComponentType.CORES);
    expect(cores.quantity.value).toEqual(mockedQty);
    expect(cores.upgradeCost.value).toEqual(mockedUpgradesCost);
  });

  test('Cores is immutable', () => {
    const mockedQty = 4;
    const mockedUpgradesCost = 10;

    const cores = new Cores.Builder()
      .withActualQty(mockedQty)
      .withUpgradeCost(mockedUpgradesCost)
      .build();

    expect(Object.isFrozen(cores)).toEqual(true);
  });
});
