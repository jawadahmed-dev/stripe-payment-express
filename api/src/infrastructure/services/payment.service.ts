import Stripe from "stripe";
import { IPaymentService } from "../../application/interfaces/payment.service";
import PaymentMethod from "../../domain/entities/payment-method";
import { PaymentMethodMapper } from "../mappers/payment-method.mapper";
import { injectable } from "inversify";

@injectable()
export class PaymentService implements IPaymentService {
  private readonly stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, { apiVersion: "2022-11-15" });
  }
  async attachPaymentMethod(customerId : string, paymentMethodToken : string): Promise<PaymentMethod> {

    let stripePaymentMethod = await this.stripe.paymentMethods.attach(paymentMethodToken, { customer: customerId });
    
    let paymentMethodEntity = PaymentMethodMapper.fromStripeToEntity(stripePaymentMethod, customerId);
    
    return paymentMethodEntity;
  }
}