import PaymentMethod from "../../domain/entities/payment-method";

export interface IPaymentService {
  attachPaymentMethod(customerId : string, paymentMethodToken : string): Promise<any>;
}