// eslint-disable-next-line max-classes-per-file
export class Price {
  readonly value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Price value must be positive');
    }
    this.value = value;
  }

  add(other: Price): Price {
    return new Price(this.value + other.value);
  }

  substract(other: Price): Price {
    const result = Math.max(0, this.value - other.value);
    return new Price(result);
  }
}

export class Production {
  readonly value: number; // in $

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Production value must be positive.');
    }
    this.value = value;
  }
}

export class Income {
  readonly value: number; // in $/s

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Income value must be positive.');
    }
    this.value = value;
  }

  add(other: Income): Income {
    return new Income(this.value + other.value);
  }

  substract(other: Income): Income {
    const result = Math.max(0, this.value - other.value);
    return new Income(result);
  }
}
