// eslint-disable-next-line max-classes-per-file
export class Price {
  readonly #value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Price value must be positive');
    }
    this.#value = value;
  }

  add(other: Price): Price {
    return new Price(this.#value + other.value);
  }

  substract(other: Price): Price {
    const result = Math.max(0, this.#value - other.value);
    return new Price(result);
  }

  get value(): number {
    return this.#value;
  }
}

export class Production {
  readonly #value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Production value must be positive.');
    }
    this.#value = value;
  }

  get value(): number {
    return this.#value;
  }
}
