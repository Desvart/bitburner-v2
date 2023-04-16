export class Id {
  readonly #value: number;

  constructor(value: number) {
    if (value < 0 || !Number.isInteger(value)) {
      throw new Error(`Ids must be positive integers.`);
    }
    this.#value = value;
  }

  public get value(): number {
    return this.#value;
  }
}
