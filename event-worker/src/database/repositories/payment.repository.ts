import { Payment } from "../../entities/payment.entity";
import { PaymentDocument, PaymentModel } from "../documents/payment.document";
import { IBaseRepository, BaseRepository } from "./base-repository";

export interface IPaymentRepository extends IBaseRepository<Payment>{
  findByTrackingId(trackingId: string): Promise<Payment | null>;
}

export class PaymentRepository extends BaseRepository<Payment, PaymentDocument> implements IPaymentRepository  {
  constructor() {
    super(PaymentModel);
  }

    async findByTrackingId(trackingId: string): Promise<Payment | null> {
      const doc = await this.model
        .findOne({ stripePaymentIntentId: trackingId })
        .lean<PaymentDocument>()
        .exec();
  
      return doc ? this.toEntity(doc) : null;
    }

  protected toEntity(doc: PaymentDocument): Payment {
    return new Payment({
      id: doc._id.toString(),
      userId: doc.userId,
      orderId: doc.orderId,
      stripePaymentIntentId: doc.stripePaymentIntentId,
      amount: doc.amount,
      currency: doc.currency,
      status: doc.status,
      paymentMethodId: doc.paymentMethodId,
      metadata: doc.metadata as Record<string, any>,
      receiptUrl: doc.receiptUrl,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  protected toDocument(entity: Partial<Payment>): Partial<PaymentDocument> {
    return {
      userId: (entity as any).userId,
      orderId: (entity as any).orderId,
      stripePaymentIntentId: (entity as any).paymentIntentId,
      amount: (entity as any).amount,
      currency: (entity as any).currency,
      status: (entity as any).paymentStatus,
      paymentMethodId: (entity as any).paymentMethodId,
      metadata: (entity as any).metadata,
      receiptUrl: (entity as any).receiptUrl,
      createdAt: (entity as any).createdAt,
      updatedAt: (entity as any).updatedAt,
    };
  }
}
