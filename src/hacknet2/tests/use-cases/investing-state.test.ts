import { instance, mock, when } from 'ts-mockito';
import { Manager2 } from '../../domain/use-cases/manager2';
import { HacknetAdapter } from '../../infra/hacknet-adapter';
import { SavingState } from '../../domain/use-cases/saving-state';
import { InvestingState } from '../../domain/use-cases/investing-state';
import { SelectingState } from '../../domain/use-cases/selecting-state';

describe('Test investing state object', () => {
  let manager: Manager2;
  let hacknetAdapter: HacknetAdapter;
  beforeEach(() => {
    hacknetAdapter = instance(mock(HacknetAdapter));
    manager = new Manager2(hacknetAdapter);
  });

  test('Next step is SavingState if upgrading has failed', () => {
    const mockedHacknetAdapter: HacknetAdapter = mock(HacknetAdapter);
    when(mockedHacknetAdapter.buyComponent()).thenReturn(false);
    hacknetAdapter = instance(mockedHacknetAdapter);

    const investingState = new InvestingState(manager, hacknetAdapter);

    investingState.performStateOperations();

    expect(investingState.nextState instanceof SavingState).toBe(true);
  });

  test('Next step is SelectingState if upgrading has been successful', () => {
    const mockedHacknetAdapter: HacknetAdapter = mock(HacknetAdapter);
    when(mockedHacknetAdapter.buyComponent()).thenReturn(true);
    hacknetAdapter = instance(mockedHacknetAdapter);

    const investingState = new InvestingState(manager, hacknetAdapter);

    investingState.performStateOperations();

    expect(investingState.nextState instanceof SelectingState).toBe(true);
  });
});
