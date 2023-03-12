import Calculator from '../domain/entity/calculator';

describe('Cover the calculator', () => {
  test('should be able to compare numbers', () => {
    expect(2).toEqual(2);
  });

  test('should be able to add numbers', () => {
    const s = new Calculator();
    expect(s.add(1, 3)).toEqual(4);
  });

  test('should be able to substract numbers', () => {
    const s = new Calculator();
    expect(s.sub(1, 1)).toEqual(0);
  });
});
