import { InvalidValueObjectError } from "../exceptions/InvalidValueObjectError";

export class UserId {
  constructor(private readonly value: string) {
    if (!value) throw new InvalidValueObjectError("UserId cannot be empty");
  }
  toString() { return this.value; }
}