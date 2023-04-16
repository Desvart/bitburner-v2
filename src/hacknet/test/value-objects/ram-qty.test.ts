import { RamQty } from '../../domain/entities/value-objects/ram-qty';
import { LevelQty } from "../../domain/entities/value-objects/level-qty";

describe('RamQty value object', () => {
  test('Create and retrieve value', () => {
    const value = 4;
    const ram = new RamQty(value);
    expect(ram.value).toEqual(value);
  });

  test.each([
    ['negative', -5],
    ['floating', 5.5],
    ['below 1', 0],
    ['above 64', 128],
  ])('RamQty cannot be %s', (_, value) => {
    expect(() => new RamQty(value)).toThrow();
  });

  test.each([1, 2, 4, 8, 16, 32, 64])(
    'RamQty can only be powers of 2',
    (value) => {
      const ram = new RamQty(value);
      expect(ram.value).toEqual(value);
    }
  );

  test.each([6, 10, 12, 14, 18])(
    'RamQty cannot be outside powers of 2',
    (value) => {
      expect(() => new RamQty(value)).toThrow();
    }
  );

  test('RamQty can be added to RamQty', () => {
    const value1 = 4;
    const value2 = 4;
    const ram1 = new RamQty(value1);
    const ram2 = new RamQty(value2);
    const ram3 = ram1.add(ram2);
    expect(ram3.value).toEqual(value1 + value2);
  });

  test('RamQty is immutable', () => {
    const ram = new RamQty(4);

    expect(Object.getOwnPropertyDescriptor(ram, 'value')?.writable).toBe(
      undefined
    );
  });
});
