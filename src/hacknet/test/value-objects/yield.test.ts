import { Yield } from '../../domain/entities/yield';

describe('Yield value object', () => {

  test('Create and retrieve value', () => {
    const value = 5;
    const yield0 = new Yield(value);
    expect(yield0.value).toEqual(value);
  });

  test('Yield cannot be negative', () => {
    expect(() => new Yield(-5)).toThrow();
  });

  test('Yield can be floating', () => {
    const value = 5.5;
    const yield0 = new Yield(value);
    expect(yield0.value).toEqual(value);
  });

  test('Yield can be added to Yield', () => {
    const value1 = 5;
    const value2 = 6;
    const yield1 = new Yield(value1);
    const yield2 = new Yield(value2);
    const yield3 = yield1.add(yield2);
    expect(yield3.value).toEqual(value1 + value2);
  });

  test('Yield can be added to floating Yield', () => {
    const value1 = 5;
    const value2 = 6.2;
    const yield1 = new Yield(value1);
    const yield2 = new Yield(value2);
    const yield3 = yield1.add(yield2);
    expect(yield3.value).toEqual(value1 + value2);
  });

});
