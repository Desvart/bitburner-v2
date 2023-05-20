import { instance, mock, when } from 'ts-mockito';
import { Manager } from '../../domain/use-cases/manager';
import { NS } from '../../infra/INetscript';
import { HacknetAdapter } from '../../infra/hacknet-adapter';

describe('Test manager object', () => {
  let manager: Manager;

  beforeEach(() => {
    const mockedNS: NS = mock<NS>();
    const ns: NS = instance(mockedNS);
    const hacknetAdapter = new HacknetAdapter(ns);

    manager = new Manager(hacknetAdapter);
  });

  test('Initial state is "Selecting"', () => {
    // expect(manager.state.toString()).toBe('SELECTING');
    expect(manager.state).toBe('SELECTING');
  });

  test('Selecting state always lead to Waiting state', () => {
    manager.run(true);

    expect(manager.state.toString()).toBe('WAITING');
  });

  test('Waiting state always lead to Investing state', () => {
    manager.run(true);
    manager.run(true);

    expect(manager.state.toString()).toBe('UPGRADING');
  });

  test('Investing state leads to selecting or waiting state', () => {
    manager.run(true);
    manager.run(true);
    manager.run(true);

    expect(manager.state.toString()).toBe('SELECTING');
  });

  function setTheSavingDurationTo(savingDuration: number): HacknetAdapter {
    const mockedHacknetAdapter: HacknetAdapter = mock<HacknetAdapter>();
    when(mockedHacknetAdapter.getTotalProduction()).thenReturn(savingDuration);
    return instance(mockedHacknetAdapter);
  }

  test('If saving duration is too long, manager stops', () => {
    const hacknetAdapter = setTheSavingDurationTo(11);

    manager = new Manager(hacknetAdapter);

    manager.run(true);
    manager.run(true);
    manager.run(true);

    expect(manager.state.toString()).toBe('STOP');
  });
});
