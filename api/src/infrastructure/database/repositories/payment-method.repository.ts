import { injectable } from "tsyringe";
import { IPaymentMethodRepository } from "../../../application/interfaces/payment-method.repository";
import PaymentMethod from "../../../domain/entities/payment-method";
import { PaymentMethodMapper } from "../../mappers/payment-method.mapper";
import { PaymentMethodDocument } from "../schemas/payment-method.schema";
import { BaseRepository } from "./base.repository";

@injectable()
export class PaymentMethodRepository
  extends BaseRepository<PaymentMethod, PaymentMethodDocument>
  implements IPaymentMethodRepository {
  constructor() {
    super(PaymentMethodDocument);
  }


  async findByUserId(userId: string): Promise<PaymentMethod[]> {
    const docs = await PaymentMethodDocument.find({ userId }).exec();
    return docs.map(PaymentMethodMapper.toEntity);
  }

  protected toEntity(doc: PaymentMethodDocument): PaymentMethod {
    return PaymentMethodMapper.toEntity(doc);
  }

  protected toDocument(entity: PaymentMethod): PaymentMethodDocument {
    return PaymentMethodMapper.toPersistence(entity) as PaymentMethodDocument;
  }

}
