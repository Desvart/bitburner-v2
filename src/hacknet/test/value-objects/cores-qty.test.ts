import { CoresQty } from '../../domain/entities/value-objects/cores-qty';
import { LevelQty } from '../../domain/entities/value-objects/level-qty';

describe('CoresQty value object', () => {
  test('Create and retrieve value', () => {
    const value = 5;
    const cores = new CoresQty(value);
    expect(cores.value).toEqual(value);
  });

  test.each([
    ['negative', -5],
    ['floating', 5.5],
    ['below 1', 0],
    ['above 16', 17],
  ])('CoresQty cannot be %s', (_, value) => {
    expect(() => new CoresQty(value)).toThrow();
  });

  test('CoresQty can be added to CoresQty', () => {
    const value1 = 5;
    const value2 = 6;
    const cores1 = new CoresQty(value1);
    const cores2 = new CoresQty(value2);
    const cores3 = cores1.add(cores2);
    expect(cores3.value).toEqual(value1 + value2);
  });

  test('CoresQty is immutable', () => {
    const cores = new CoresQty(5);

    expect(Object.getOwnPropertyDescriptor(cores, 'value')?.writable).toBe(
      undefined
    );
  });
});
