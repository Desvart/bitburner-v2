import { Cash } from '../../domain/entities/cash';

describe('Cash value object', () => {

  test('Create and retrieve value', () => {
    const value = 5;
    const cash = new Cash(value);
    expect(cash.value).toEqual(value);
  });

  test('Cash cannot be negative', () => {
    expect(() => new Cash(-5)).toThrow();
  });

  test('Cash can be floating', () => {
    const value = 5.5;
    const cash = new Cash(value);
    expect(cash.value).toEqual(value);
  });

  test('Cash can be added to cash', () => {
    const value1 = 5;
    const value2 = 6;
    const cash1 = new Cash(value1);
    const cash2 = new Cash(value2);
    const cash3 = cash1.add(cash2);
    expect(cash3.value).toEqual(value1 + value2);
  });

  test('Cash can be added to floating cash', () => {
    const value1 = 5;
    const value2 = 6.2;
    const cash1 = new Cash(value1);
    const cash2 = new Cash(value2);
    const cash3 = cash1.add(cash2);
    expect(cash3.value).toEqual(value1 + value2);
  });

  test('Cash can be subtracted to cash', () => {
    const value1 = 5;
    const value2 = 4;
    const cash1 = new Cash(value1);
    const cash2 = new Cash(value2);
    const cash3 = cash1.substract(cash2);
    expect(cash3.value).toEqual(value1 - value2);
  });

  test('Cash can be subtracted to floating cash', () => {
    const value1 = 5;
    const value2 = 4.5;
    const cash1 = new Cash(value1);
    const cash2 = new Cash(value2);
    const cash3 = cash1.substract(cash2);
    expect(cash3.value).toEqual(value1 - value2);
  });

  test('Cash subtraction is limited to 0.', () => {
    const value1 = 5;
    const value2 = 6;
    const cash1 = new Cash(value1);
    const cash2 = new Cash(value2);
    const cash3 = cash1.substract(cash2);
    expect(cash3.value).toEqual(0);
  });

});
