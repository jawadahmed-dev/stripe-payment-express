// src/domain/entities/Payment.ts

import { PaymentStatusType } from '../enums/payment.enum';

export class Payment {
  private readonly _id?: string; 
  private readonly userId?: string;
  private readonly orderId?: string;
  private readonly stripePaymentIntentId: string;
  private readonly amount: number;
  private readonly currency: string;
  private status: string;
  private paymentMethodId?: string;
  private metadata: Record<string, any>;
  private receiptUrl?: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: {
    id?: string;
    userId?: string;
    orderId?: string;
    stripePaymentIntentId: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethodId?: string;
    metadata?: Record<string, any>;
    receiptUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = props.id;
    this.userId = props.userId;
    this.orderId = props.orderId;
    this.stripePaymentIntentId = props.stripePaymentIntentId;
    this.amount = props.amount;
    this.currency = props.currency;
    this.status = props.status;
    this.paymentMethodId = props.paymentMethodId;
    this.metadata = props.metadata ?? {};
    this.receiptUrl = props.receiptUrl;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  // Getters
  get id(): string | undefined {
    return this._id;
  }

  get paymentIntentId(): string {
    return this.stripePaymentIntentId;
  }

  get paymentStatus(): string {
    return this.status;
  }

  // Domain Behaviors
  markSucceeded(receiptUrl?: string): void {
    this.status = PaymentStatusType.SUCCEEDED;
    if (receiptUrl) this.receiptUrl = receiptUrl;
    this.touch();
  }

  markFailed(): void {
    this.status = PaymentStatusType.REQUIRES_ACTION;
    this.touch();
  }

  markCanceled(): void {
    this.status = PaymentStatusType.CANCELED;
    this.touch();
  }

  updateMetadata(metadata: Record<string, any>): void {
    this.metadata = { ...this.metadata, ...metadata };
    this.touch();
  }

  // Private utility
  private touch(): void {
    this.updatedAt = new Date();
  }
}
