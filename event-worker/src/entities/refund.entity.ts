// src/domain/entities/refund.entity.ts
export class Refund {
  private readonly _id?: string;
  private readonly _paymentId: string;
  private readonly _stripeRefundId?: string;
  private readonly _amount: number;
  private readonly _status: "pending" | "succeeded" | "failed";
  private readonly _reason?: string;
  private readonly _metadata?: any;
  private readonly _createdAt: Date;
  private readonly _updatedAt?: Date;

  constructor(props: {
    id?: string;
    paymentId: string;
    stripeRefundId?: string;
    amount: number;
    status: "pending" | "succeeded" | "failed";
    reason?: string;
    metadata?: any;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = props.id;
    this._paymentId = props.paymentId;
    this._stripeRefundId = props.stripeRefundId;
    this._amount = props.amount;
    this._status = props.status;
    this._reason = props.reason;
    this._metadata = props.metadata ?? {};
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt;
  }

  // ✅ Getters
  get id(): string | undefined {
    return this._id;
  }

  get paymentId(): string {
    return this._paymentId;
  }

  get stripeRefundId(): string | undefined {
    return this._stripeRefundId;
  }

  get amount(): number {
    return this._amount;
  }


  get status(): "pending" | "succeeded" | "failed" {
    return this._status;
  }

  get reason(): string | undefined {
    return this._reason;
  }

  get metadata(): any {
    return this._metadata;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }
}
