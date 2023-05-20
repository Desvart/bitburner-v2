import { Log, LogMode } from '../logger';

describe('logger', () => {
  test.each([
    [LogMode.ERROR, true],
    [LogMode.WARNING, true],
    [LogMode.INFO, true],
    [LogMode.DEBUG, true],
    [LogMode.UNDEFINED, false],
  ])('Check if error logs are logged with LogMode as %s', (input, expected) => {
    const log = new Log(input);
    expect(log.error('test') !== 'skip').toBe(expected);
  });

  test.each([
    [LogMode.ERROR, false],
    [LogMode.WARNING, true],
    [LogMode.INFO, true],
    [LogMode.DEBUG, true],
    [LogMode.UNDEFINED, false],
  ])('Check if warning logs are logged with LogMode as %s', (input, expected) => {
    const log = new Log(input);
    expect(log.warning('test') !== 'skip').toBe(expected);
  });

  test.each([
    [LogMode.ERROR, false],
    [LogMode.WARNING, false],
    [LogMode.INFO, true],
    [LogMode.DEBUG, true],
    [LogMode.UNDEFINED, false],
  ])('Check if info logs are logged with LogMode as %s', (input, expected) => {
    const log = new Log(input);
    expect(log.info('test') !== 'skip').toBe(expected);
  });

  test.each([
    [LogMode.ERROR, false],
    [LogMode.WARNING, false],
    [LogMode.INFO, false],
    [LogMode.DEBUG, true],
    [LogMode.UNDEFINED, false],
  ])('Check if debug logs are logged with LogMode as %s', (input, expected) => {
    const log = new Log(input);
    expect(log.debug('test') !== 'skip').toBe(expected);
  });

  test('Check if default context is empty', () => {
    const log = new Log();
    log.info('test');
    expect(log.lastMessage).toBe('INFO - test');
  });

  test('Check if default context is correctly propagate', () => {
    const log = new Log(LogMode.INFO, 'CONTEXT');
    log.info('test');
    expect(log.lastMessage).toBe('CONTEXT - INFO - test');
  });
});
