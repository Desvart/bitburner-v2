import { instance, mock } from 'ts-mockito';
import { Manager } from '../../domain/use-cases/manager';
import { NS } from '../../infra/INetscript';
import { HacknetAdapter } from '../../infra/hacknet-adapter';
import { SelectingState } from '../../domain/use-cases/selecting-state';
import { Component, ComponentType } from '../../domain/entities/component';
import { SavingState } from '../../domain/use-cases/saving-state';

describe('Test selecting state object', () => {
  let manager: Manager;
  let hacknetAdapter: HacknetAdapter;
  beforeEach(() => {
    const mockedNS: NS = mock<NS>();
    const ns: NS = instance(mockedNS);
    hacknetAdapter = new HacknetAdapter(ns);
    manager = new Manager(hacknetAdapter);
  });

  test('Selected component is correct', () => {
    const selectingState = new SelectingState(manager, hacknetAdapter);

    selectingState.performStateOperations();

    expect(selectingState.componentToUpgrade).toEqual(new Component(ComponentType.NODE));
  });

  test('Next step is correct', () => {
    const selectingState = new SelectingState(manager, hacknetAdapter);

    selectingState.performStateOperations();

    expect(selectingState.nextState instanceof SavingState).toBe(true);
  });
});
