import { InvalidValueObjectError } from "../exceptions/InvalidValueObjectError";

export class PaymentId {
  protected readonly value: string | null;

  protected constructor(value: string | null) {
    this.value = value;
  }

  toString(): string {
    if (!this.value) {
      throw new InvalidValueObjectError("PaymentId is not assigned");
    }
    return this.value;
  }

  hasValue(): boolean {
    return this.value !== null;
  }
}

export class HasPaymentId extends PaymentId {
  constructor(value: string) {
    if (!value) {
      throw new InvalidValueObjectError("PaymentId cannot be empty");
    }
    super(value);
  }
}

export class NoPaymentId extends PaymentId {
  constructor() {
    super(null);
  }
}
