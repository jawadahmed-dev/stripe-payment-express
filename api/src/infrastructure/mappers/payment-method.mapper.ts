// src/infrastructure/mappers/paymentMethodMapper.ts
import Stripe from 'stripe';
import PaymentMethod from '../../domain/entities/payment-method';

export class PaymentMethodMapper {
  static toEntity(doc: any): PaymentMethod {
    return new PaymentMethod({
      id: doc.id,
      userId: doc.userId,
      type: doc.type,
      last4: doc.last4,
      brand: doc.brand,
      expMonth: doc.expMonth,
      expYear: doc.expYear,
      createdAt: doc.createdAt,
    });
  }

  static toPersistence(paymentMethod: PaymentMethod): any {
    return {
      id: paymentMethod.id,
      userId: paymentMethod.userId,
      type: paymentMethod.type,
      last4: paymentMethod.last4,
      brand: paymentMethod.brand,
      expMonth: paymentMethod.expMonth,
      expYear: paymentMethod.expYear,
      createdAt: paymentMethod.createdAt,
    };
  }

    static fromStripeToEntity(stripePaymentMethod: Stripe.PaymentMethod, userId: string): PaymentMethod {
    if (!stripePaymentMethod.card) {
      throw new Error('Stripe PaymentMethod does not contain card information');
    }

    return new PaymentMethod({
      id: stripePaymentMethod.id,
      userId: userId, // Use the provided customerId as userId
      type: stripePaymentMethod.type,
      last4: stripePaymentMethod.card.last4,
      brand: stripePaymentMethod.card.brand,
      expMonth: stripePaymentMethod.card.exp_month,
      expYear: stripePaymentMethod.card.exp_year,
      createdAt: stripePaymentMethod.created,
    });
  }
}