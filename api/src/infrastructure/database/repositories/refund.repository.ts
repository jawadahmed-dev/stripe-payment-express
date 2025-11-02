import { Refund } from "../../../domain/entities/refund.entity";
import { RefundDocument, RefundModel } from "../documents/refund.document";
import { BaseRepository } from "./base.repository";
import { IRefundRepository } from "../../../application/contracts/repositories/refund.repository";

export class RefundRepository extends BaseRepository<Refund, RefundDocument> implements IRefundRepository {
  constructor() {
    super(RefundModel);
  }

  protected toEntity(doc: RefundDocument): Refund {
    return new Refund({
      id: doc._id.toString(),
      paymentId: doc.paymentId,
      stripeRefundId: doc.stripeRefundId,
      amount: doc.amount,
      status: doc.status as "pending" | "succeeded" | "failed",
      reason: doc.reason,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  protected toDocument(entity: Partial<Refund>): Partial<RefundDocument> {
    return {
      paymentId: entity.paymentId!,
      stripeRefundId: entity.stripeRefundId!,
      amount: entity.amount!,
      status: entity.status!,
      reason: entity.reason,
    };
  }
}
