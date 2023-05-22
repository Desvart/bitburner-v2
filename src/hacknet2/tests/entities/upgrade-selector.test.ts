import { instance, mock, when } from 'ts-mockito';
import { HacknetAdapter } from '../../infra/hacknet-adapter';
import { UpgradeSelector } from '../../domain/entities/upgrade-selector';
import { Network } from '../../domain/entities/network';

describe('Test upgrade-selector object', () => {
  test('At instantiation has all upgrades price retrieved', () => {
    const network = instance(mock(Network));
    const hacknetAdapter = instance(mock(HacknetAdapter));

    const upgradeSelector = new UpgradeSelector(network, hacknetAdapter);

    expect(upgradeSelector.allUpgradesPrices.size).toBe(2);
  });

  test('If formula is false, is able to identify the component with the cheapest upgrade', () => {
    const network = instance(mock(Network));
    const mockHacknetAdapter = mock(HacknetAdapter);
    when(mockHacknetAdapter.checkFormulasAvailability()).thenReturn(false);
    const hacknetAdapter = instance(mockHacknetAdapter);
    const upgradeSelector = new UpgradeSelector(network, hacknetAdapter);

    const cheapestUpgrade = upgradeSelector.pickBestUpgrade();

    expect(cheapestUpgrade).toEqual(['1,Level', 10]);
  });

  test('If formula is true, is able to identify the component with the shorter RoI', () => {
    const network = instance(mock(Network));
    const mockHacknetAdapter = mock(HacknetAdapter);
    when(mockHacknetAdapter.checkFormulasAvailability()).thenReturn(true);
    const hacknetAdapter = instance(mockHacknetAdapter);
    const upgradeSelector = new UpgradeSelector(network, hacknetAdapter);

    const cheapestUpgrade = upgradeSelector.pickBestUpgrade();

    expect(cheapestUpgrade).toEqual(['1,ram', 15]);
  });
});
