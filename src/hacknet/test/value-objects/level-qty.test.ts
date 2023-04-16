import { LevelQty } from '../../domain/entities/value-objects/level-qty';

describe('LevelQty value object', () => {
  test('Create and retrieve value', () => {
    const value = 5;
    const level = new LevelQty(value);
    expect(level.value).toEqual(value);
  });

  test.each([
    ['negative', -5],
    ['floating', 5.5],
    ['below 1', 0],
    ['above 200', 201],
  ])('LevelQty cannot be %s', (_, value) => {
    expect(() => new LevelQty(value)).toThrow();
  });

  test('LevelQty can be added to LevelSize', () => {
    const value1 = 5;
    const value2 = 6;
    const level1 = new LevelQty(value1);
    const level2 = new LevelQty(value2);
    const level3 = level1.add(level2);
    expect(level3.value).toEqual(value1 + value2);
  });

  test('LevelQty is immutable', () => {
    const level = new LevelQty(5);

    expect(Object.getOwnPropertyDescriptor(level, 'value')?.writable).toBe(
      undefined
    );
  });
});
