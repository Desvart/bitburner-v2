import { isPowerofTwo } from '../maths';

describe('isPowerofTwo', () => {

  test.each([
    [0, false],
    [-2, false],
    [1, true],
    [2, true],
    [3, false],
    [4, true],
    [8, true],
    [2048, true],
  ])('Check value %i', (input, expected) => {

    expect(isPowerofTwo(input)).toEqual(expected);
  });

});
