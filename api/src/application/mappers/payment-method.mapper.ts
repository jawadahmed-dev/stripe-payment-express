import PaymentMethod from "../../domain/entities/payment-method";
import { PaymentMethodType } from "../../domain/enums/payment-method.enum";
import { PaymentMethodDTO } from "../dtos/payment-method.dto";
import { AddPaymentMethodRequest, AddPaymentMethodResponse } from "../use-cases/add-payment-method";
import { GetPaymentMethodsByUserIdResponse } from "../use-cases/get-payment-method-by-userid";

export class PaymentMethodMapper {
  
  static toAddPaymentMethodResponse(paymentMethod: PaymentMethod): AddPaymentMethodResponse {
    return {
      id: paymentMethod.id as string,
      last4: paymentMethod.last4,
      brand: paymentMethod.brand
    };
  }

   static toGetPaymentMethodResponse(entity: PaymentMethod): GetPaymentMethodsByUserIdResponse {
    return {
      id: entity.id as string,
      last4: entity.last4,
      brand: entity.brand,
      expMonth: entity.expMonth,
      expYear: entity.expYear,
      type: entity.type,
    };
  }

    static fromDTO(dto: PaymentMethodDTO, userId: string): PaymentMethod {
    return new PaymentMethod({
      id: dto.id,
      userId,
      customerId: dto.customerId,
      type: dto.type as PaymentMethodType,
      last4: dto.last4,
      brand: dto.brand,
      expMonth: dto.expMonth,
      expYear: dto.expYear,
      createdAt: dto.createdAt
    });
  }
  
}