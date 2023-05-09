import { Log, LogMode } from '../logger';

describe('logger', () => {
  test.each([
    [LogMode.ERROR, true],
    [LogMode.WARNING, true],
    [LogMode.INFO, true],
    [LogMode.DEBUG, true],
  ])('Check if error logs are logged', (input, expected) => {
    const log = new Log(input);
    expect(log.error('test') !== '').toBe(expected);
  });

  test.each([
    [LogMode.ERROR, false],
    [LogMode.WARNING, true],
    [LogMode.INFO, true],
    [LogMode.DEBUG, true],
  ])('Check if error logs are logged', (input, expected) => {
    const log = new Log(input);
    expect(log.warning('test') !== '').toBe(expected);
  });

  test.each([
    [LogMode.ERROR, false],
    [LogMode.WARNING, false],
    [LogMode.INFO, true],
    [LogMode.DEBUG, true],
  ])('Check if error logs are logged', (input, expected) => {
    const log = new Log(input);
    expect(log.info('test') !== '').toBe(expected);
  });

  test.each([
    [LogMode.ERROR, false],
    [LogMode.WARNING, false],
    [LogMode.INFO, false],
    [LogMode.DEBUG, true],
  ])('Check if error logs are logged', (input, expected) => {
    const log = new Log(input);
    expect(log.debug('test') !== '').toBe(expected);
  });
});
