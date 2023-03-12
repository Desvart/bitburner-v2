import assert from 'assert';
import { When, Then } from '@cucumber/cucumber';
import Calculator from '../domain/entity/calculator';

When(/^I add (-?\d+) and (-?\d+)$/, function when(a: number, b: number) {
  this.a = a;
  this.b = b;
});

Then(
  /^the result of the addition is (-?\d+)$/,
  function then(expectedResponse: number) {
    const calc = new Calculator();
    assert.equal(calc.add(this.a, this.b), expectedResponse);
  }
);

When(/^I sub (-?\d+) and (-?\d+)$/, function when(a: number, b: number) {
  this.a = a;
  this.b = b;
});

Then(
  /^the result of the substraction is (-?\d+)$/,
  function then(expectedResponse: number) {
    const calc = new Calculator();
    assert.equal(calc.sub(this.a, this.b), expectedResponse);
  }
);
