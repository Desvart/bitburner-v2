export default class Calculator {
  op1 = 0;

  op2 = 0;

  add(a: number, b: number): number {
    this.op1 = a;
    this.op2 = b;
    return this.op1 + this.op2;
  }

  sub(a: number, b: number): number {
    this.op1 = a;
    this.op2 = b;
    return this.op1 - this.op2;
  }
}
