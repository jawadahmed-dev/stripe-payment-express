import { IPaymentMethodRepository } from "../../../application/contracts/repositories/payment-method.repository";
import { PaymentMethod } from "../../../domain/entities/payment-method.entity";
import { PaymentMethodDocument, PaymentMethodModel } from "../documents/payment-method.document";
import { BaseRepository } from "./base.repository";

export class PaymentMethodRepository
  extends BaseRepository<PaymentMethod, PaymentMethodDocument>
  implements IPaymentMethodRepository
{
  constructor() {
    super(PaymentMethodModel);
  }

  async get(userId?: string): Promise<PaymentMethod[]> {
    if (userId) {
      return this.findBy({ userId });
    }
    return this.findAll();
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

}
