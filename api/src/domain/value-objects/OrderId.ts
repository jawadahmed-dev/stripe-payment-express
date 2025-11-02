import { InvalidValueObjectError } from "../exceptions/InvalidValueObjectError";

export class OrderId {
  constructor(private readonly value: string) {
    if (!value) throw new InvalidValueObjectError("OrderId cannot be empty");
  }
  toString() { return this.value; }
}