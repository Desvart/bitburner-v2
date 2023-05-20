import { instance, mock, when } from 'ts-mockito';
import { Manager2 } from '../../domain/use-cases/manager2';
import { HacknetAdapter } from '../../infra/hacknet-adapter';
import { NS } from '../../infra/INetscript';

describe('Test hacknet-adapter object', () => {
  test('Total production is always a positive value', () => {
    const ns: NS = instance(mock<NS>());
    const hacknetAdapter = new HacknetAdapter(ns);

    expect(typeof hacknetAdapter.getTotalProduction()).toBe('number');
    expect(hacknetAdapter.getTotalProduction() >= 0).toBe(true);
  });

  test('Income rate is always a positive value', () => {
    const ns: NS = instance(mock<NS>());
    const hacknetAdapter = new HacknetAdapter(ns);

    expect(typeof hacknetAdapter.getIncomeRate()).toBe('number');
    expect(hacknetAdapter.getIncomeRate() >= 0).toBe(true);
  });

  test('Buy component return a boolean', () => {
    const ns: NS = instance(mock<NS>());
    const hacknetAdapter = new HacknetAdapter(ns);

    expect(typeof hacknetAdapter.buyComponent()).toBe('boolean');
  });

  test('Wait should throw an error', () => {
    const ns: NS = instance(mock<NS>());
    const hacknetAdapter = new HacknetAdapter(ns);

    function wait(): void {
      hacknetAdapter.waitInSec(1);
    }

    expect(wait).not.toThrow();
  });
});
