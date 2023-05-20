import { instance, mock, when } from 'ts-mockito';
import { Manager2 } from '../../domain/use-cases/manager2';
import { HacknetAdapter } from '../../infra/hacknet-adapter';
import { SavingState } from '../../domain/use-cases/saving-state';
import { InvestingState } from '../../domain/use-cases/investing-state';

describe('Test saving state object', () => {
  let manager: Manager2;
  let hacknetAdapter: HacknetAdapter;
  beforeEach(() => {
    const mockedHacknetAdapter: HacknetAdapter = mock(HacknetAdapter);
    when(mockedHacknetAdapter.getIncomeRate()).thenReturn(1000);
    hacknetAdapter = instance(mockedHacknetAdapter);
    manager = new Manager2(hacknetAdapter);
  });

  test('Waiting time is correct', () => {
    const savingState = new SavingState(manager, hacknetAdapter);

    savingState.performStateOperations();

    expect(savingState.waitTimeToGatherMissingCash).toEqual(1);
  });

  test('Set the stopLoop trigger if waiting time is too long', () => {
    const mockedHacknetAdapter: HacknetAdapter = mock(HacknetAdapter);
    when(mockedHacknetAdapter.getIncomeRate()).thenReturn(0.1);
    hacknetAdapter = instance(mockedHacknetAdapter);

    const savingState = new SavingState(manager, hacknetAdapter);

    savingState.performStateOperations();

    expect(manager.stopLoop).toBe(true);
  });

  test('Next step is InvestingState if waiting time is short enough', () => {
    const mockedHacknetAdapter: HacknetAdapter = mock(HacknetAdapter);
    when(mockedHacknetAdapter.getIncomeRate()).thenReturn(500);
    hacknetAdapter = instance(mockedHacknetAdapter);

    const savingState = new SavingState(manager, hacknetAdapter);

    savingState.performStateOperations();

    expect(savingState.nextState instanceof InvestingState).toBe(true);
  });
});
