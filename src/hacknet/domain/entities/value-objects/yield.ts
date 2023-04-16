export class Yield {
  readonly #value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Yield value must be positive.');
    }
    this.#value = value;
  }

  add(other: Yield): Yield {
    return new Yield(this.#value + other.value);
  }

  public get value(): number {
    return this.#value;
  }
}
