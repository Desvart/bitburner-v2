// import { loadFeature, defineFeature } from 'jest-cucumber';
// import { instance, mock, when as When } from 'ts-mockito';
// import assert from 'assert';
// import { Manager, ManagerStatus } from '../domain/use-case/manager';
// import { INsHacknetPort } from '../app/ns-hacknet-port';
//
// const feature = loadFeature('./src/hacknet/domain/feature/hacknet2.feature');
//
// defineFeature(feature, (test) => {
//   let nsHacknetAdapter: INsHacknetPort;
//   let manager: Manager;
//
//   test('Start by buying a new node', ({ given, when, then }) => {
//     given(/^the network contains no node$/, function gGiven() {
//       const mockedINsHacknetPort: INsHacknetPort = mock<INsHacknetPort>();
//       When(mockedINsHacknetPort.getNetworkSize()).thenReturn(0);
//       nsHacknetAdapter = instance(mockedINsHacknetPort);
//     });
//
//     when(/^the manager starts$/, function gWhen() {
//       manager = new Manager(nsHacknetAdapter);
//       manager.start();
//     });
//
//     then(
//       /^the manager next component to upgrade is a new node$/,
//       function gThen() {
//         assert.equal(manager.nextUpgradeId.value, 1);
//       }
//     );
//
//     then(
//       /^the manager status is "([^"]*)"$/,
//       function gThen(expectedStatus: string) {
//         assert.equal(ManagerStatus[manager.status], expectedStatus);
//       }
//     );
//   });
//
//   test('Once an investment has been refund, make profit',
//     ({ given, when, then, * }) => {
//       given(/^the manager status is "(.*)"$/, (arg0) => {
//         return null;
//       });
//
//       when('the network has refund the upgrade', () => {
//         return null;
//       });
//
//       then('the manager is not allowed to upgrade yet', () => {
//         return null;
//       });
//
//     *
//       (/^the manager status is "(.*)"$/, (arg0) => {
//         return null;
//       });
//     });
//
//   test('Once profitable, save for the next upgrade', ({ given, when, then, * }) => {
//     given(/^the manager status is "(.*)"$/, (arg0) => {
//
//     });
//
//     when(/^the network has generated (\d+)% of its total value$/, (arg0) => {
//
//     });
//
//     then('the manager selects the next component to upgrade', () => {
//
//     });
//
//   *
//     ('this component should have the shorter RoI', () => {
//
//     });
//
//   *
//     (/^the manager status is "(.*)"$/, (arg0) => {
//
//     });
//   });
//
//   test('Once the investment funds are ready, upgrade', ({ given, when, then, * }) => {
//     given(/^the manager status is "(.*)"$/, (arg0) => {
//
//     });
//
//     when('the network has generated enough savings to cover the costs of the next upgrade', () => {
//
//     });
//
//     then('the manager is allowed to request an upgrade', () => {
//
//     });
//
//   *
//     (/^the manager status is "(.*)"$/, (arg0) => {
//
//     });
//   });
//
//   test('If cheap enough, upgrade without saving', ({ given, when, then, * }) => {
//     given(/^the manager status is "(.*)"$/, (arg0) => {
//
//     });
//
//     when(/^the next upgrade cost is less that (\d+)% of the total cash available$/, (arg0) => {
//
//     });
//
//     then('the manager is allowed to request an upgrade', () => {
//
//     });
//
//   *
//     (/^the manager status is "(.*)"$/, (arg0) => {
//
//     });
//   });
//
//   test('If not enough money, wait for it', ({ given, when, then, * }) => {
//     given(/^the manager status is "(.*)"$/, (arg0) => {
//
//     });
//
//     when('there is not enough cash available', () => {
//
//     });
//
//     then('the manager waits for the cash to be enough', () => {
//
//     });
//
//   *
//     (/^the manager status is "(.*)"$/, (arg0) => {
//       return null;
//     });
//   });
//
// });
