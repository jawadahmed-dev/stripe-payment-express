// src/domain/entities/PaymentMethod.ts

export class PaymentMethod {
  private readonly _id?: string;
  private _trackingId: string;
  private userId: string;
  private type: string;
  private last4: string;
  private brand: string;
  private expMonth: number;
  private expYear: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: {
    id?: string;
    trackingId: string;
    userId: string;
    type: string;
    last4: string;
    brand: string;
    expMonth: number;
    expYear: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = props.id;
    this._trackingId = props.trackingId;
    this.userId = props.userId;
    this.type = props.type;
    this.last4 = props.last4;
    this.brand = props.brand;
    this.expMonth = props.expMonth;
    this.expYear = props.expYear;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  // Getters
  get id(): string | undefined {
    return this._id;
  }

   get trackingId(): string{
    return this._trackingId;
  }

  get ownerId(): string {
    return this.userId;
  }

  get cardType(): string {
    return this.type;
  }

  get cardLast4(): string {
    return this.last4;
  }

  get cardBrand(): string {
    return this.brand;
  }

  get expiration(): { month: number; year: number } {
    return { month: this.expMonth, year: this.expYear };
  }

  // Domain behaviors
  isExpired(currentDate: Date = new Date()): boolean {
    return (
      this.expYear < currentDate.getFullYear() ||
      (this.expYear === currentDate.getFullYear() &&
        this.expMonth < currentDate.getMonth() + 1)
    );
  }

  updateCardInfo(props: { last4?: string; brand?: string; expMonth?: number; expYear?: number }): void {
    if (props.last4) this.last4 = props.last4;
    if (props.brand) this.brand = props.brand;
    if (props.expMonth) this.expMonth = props.expMonth;
    if (props.expYear) this.expYear = props.expYear;
    this.touch();
  }

  // Private utility
  private touch(): void {
    this.updatedAt = new Date();
  }
}
