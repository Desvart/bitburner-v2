import assert from 'assert';
import { Given, Then, When } from '@cucumber/cucumber';
import { instance, mock, when } from 'ts-mockito';
import { Manager } from '../domain/use-case/manager';
import { INsHacknetPort } from '../app/ns-hacknet-port';

Given(/^the network contains no node$/, function gGiven() {
  const mockedINsHacknetPort: INsHacknetPort = mock<INsHacknetPort>();
  when(mockedINsHacknetPort.getNetworkSize()).thenReturn(0);
  this.nsHacknetAdapter = instance(mockedINsHacknetPort);
});

When(/^the manager starts$/, function gWhen() {
  this.manager = new Manager(this.nsHacknetAdapter);
  this.manager.start();
});

Then(/^the manager next component to upgrade is a new node$/, function gThen() {
  assert.equal(this.manager.nextUpgradeId, 1);
});

Then(
  /^the manager status is "([^"]*)"$/,
  function gThen(expectedStatus: string) {
    assert.equal(this.manager.status, expectedStatus);
  }
);
