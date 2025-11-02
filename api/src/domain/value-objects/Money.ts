import { InvalidValueObjectError } from "../exceptions/InvalidValueObjectError";

export class Money {
  constructor(private readonly amount: number, private readonly currency: string) {
    if (amount <= 0) throw new InvalidValueObjectError("Amount must be positive");
    if (!currency) throw new InvalidValueObjectError("Currency is required");
  }
  getAmount() { return this.amount; }
  getCurrency() { return this.currency; }
}
