import PaymentMethod from "../../domain/entities/payment-method";
import { PaymentMethodDTO } from "../dtos/payment-method.dto";

export interface IPaymentService {
  attachPaymentMethod(customerId : string, paymentMethodToken : string): Promise<PaymentMethodDTO>;
}