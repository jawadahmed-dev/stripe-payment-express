import Stripe from "stripe";
import { IPaymentService } from "../../../application/interfaces/payment.service";
import { PaymentMethodMapper } from "../../mappers/payment-method.mapper";
import { injectable } from "tsyringe";
import { PaymentMethodDTO } from "../../../application/dtos/payment-method.dto";

@injectable()
export class PaymentService implements IPaymentService {
  private readonly stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, { apiVersion: "2022-11-15" });
  }

  async attachPaymentMethod(customerId: string, paymentMethodId: string): Promise<PaymentMethodDTO> {
    // Attach payment method to customer (safe even if already attached)
    const stripePaymentMethod = await this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Map Stripe object to domain entity
    return PaymentMethodMapper.fromStripe(stripePaymentMethod);
  }
}