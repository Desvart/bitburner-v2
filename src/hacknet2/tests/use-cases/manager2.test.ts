import { instance, mock, when } from 'ts-mockito';
import { Manager2 } from '../../domain/use-cases/manager2';
import { HacknetAdapter } from '../../infra/hacknet-adapter';
import { SelectingState } from '../../domain/use-cases/selecting-state';

describe('Test manager object', () => {
  test('Initial state is "Selecting"', () => {
    const hacknetAdapter: HacknetAdapter = instance(mock(HacknetAdapter));
    const manager = new Manager2(hacknetAdapter);

    expect(manager.nextState instanceof SelectingState).toBe(true);
  });

  test('Manager starts with stopLoop = false', () => {
    const hacknetAdapter: HacknetAdapter = instance(mock(HacknetAdapter));
    const manager = new Manager2(hacknetAdapter);

    expect(manager.stopLoop).toBe(false);
  });

  test('A full loop should end with stopLoop = true', () => {
    const mockedHacknetAdapter: HacknetAdapter = mock(HacknetAdapter);
    when(mockedHacknetAdapter.getIncomeRate()).thenReturn(0.1);
    const hacknetAdapter: HacknetAdapter = instance(mockedHacknetAdapter);

    const manager = new Manager2(hacknetAdapter);
    manager.run();

    expect(manager.stopLoop).toBe(true);
  });
});
