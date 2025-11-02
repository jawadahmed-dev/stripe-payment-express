// src/infrastructure/repositories/refund.repository.ts
import { Model } from "mongoose";
import { Refund } from "../../entities/refund.entity";
import { RefundDocument } from "../documents/refund.document";
import { IBaseRepository, BaseRepository } from "./base-repository";
export interface IRefundRepository extends IBaseRepository<Refund> {

}

export class RefundRepository extends BaseRepository<Refund, RefundDocument> implements IRefundRepository{
  constructor(model: Model<RefundDocument>) {
    super(model);
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
