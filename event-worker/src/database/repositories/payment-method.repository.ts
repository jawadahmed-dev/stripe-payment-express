// src/domain/repositories/payment-method.repository.ts

import { PaymentMethod } from "../../entities/payment-method.entity";
import { PaymentMethodDocument, PaymentMethodModel } from "../documents/payment-method.document";
import { IBaseRepository, BaseRepository } from "./base-repository";

export interface IPaymentMethodRepository extends IBaseRepository<PaymentMethod> {
  findByTrackingId(paymentMethodId: string): Promise<PaymentMethod | null>;
}

export class PaymentMethodRepository
  extends BaseRepository<PaymentMethod, PaymentMethodDocument>
  implements IPaymentMethodRepository
{
  constructor() {
    super(PaymentMethodModel);
  }

  protected toEntity(doc: PaymentMethodDocument): PaymentMethod {
    return new PaymentMethod({
      trackingId: doc.trackingId,
      userId: doc.userId,
      type: doc.type,
      last4: doc.last4,
      brand: doc.brand,
      expMonth: doc.expMonth,
      expYear: doc.expYear,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  protected toDocument(entity: Partial<PaymentMethod>): Partial<PaymentMethodDocument> {
    return {
      userId: (entity as any).userId,
      trackingId: (entity as any).trackingId,
      type: (entity as any).type,
      last4: (entity as any).last4,
      brand: (entity as any).brand,
      expMonth: (entity as any).expMonth,
      expYear: (entity as any).expYear,
      createdAt: (entity as any).createdAt,
      updatedAt: (entity as any).updatedAt,
    };
  }

  async findByTrackingId(trackingId: string): Promise<PaymentMethod | null> {
    const doc = await this.model.findOne({ trackingId }).lean<PaymentMethodDocument>().exec();
    return doc ? this.toEntity(doc) : null;
  }
}
