import { Id } from '../../domain/entities/value-objects/id';

describe('Id value object', () => {
  test('Create and retrieve value', () => {
    const value = 5;
    const level = new Id(value);
    expect(level.value).toEqual(value);
  });

  test('Id can be 0', () => {
    const value = 0;
    const id = new Id(value);
    expect(id.value).toEqual(value);
  });

  test.each([
    ['negative', -5],
    ['floating', 5.5],
  ])('Id cannot be %s', (_, value) => {
    expect(() => new Id(value)).toThrow();
  });
});
