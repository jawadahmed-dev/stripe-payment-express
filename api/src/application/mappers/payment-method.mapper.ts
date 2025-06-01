import PaymentMethod from "../../domain/entities/payment-method";
import { AddPaymentMethodRequest, AddPaymentMethodResponse } from "../use-cases/add-payment-method";
import { GetPaymentMethodsByUserIdResponse } from "../use-cases/get-payment-method-by-userid";

export class PaymentMethodMapper {
  static toEntity(doc: AddPaymentMethodRequest): PaymentMethod {
    return {
      id: "",
      userId: doc.userId,
      type: doc.type,
      last4: doc.last4,
      brand: doc.brand,
      expMonth: doc.expMonth,
      expYear: doc.expYear,
      createdAt: new Date(),
    };
  }

  static toAddPaymentMethodResponse(paymentMethod: PaymentMethod): AddPaymentMethodResponse {
    return {
      id: paymentMethod.id,
      last4: paymentMethod.last4,
      brand: paymentMethod.brand
    };
  }

   static toGetPaymentMethodResponse(entity: PaymentMethod): GetPaymentMethodsByUserIdResponse {
    return {
      id: entity.id,
      last4: entity.last4,
      brand: entity.brand,
      expMonth: entity.expMonth,
      expYear: entity.expYear,
      type: entity.type,
    };
  }
}