import Stripe from "stripe";
import { CreatePaymentIntentResult } from "../../../application/contracts/models/create-payment-intent";
import { CreateSetupIntentResult } from "../../../application/contracts/models/create-setup-intent";
import { MakeWebhookEventResult } from "../../../application/contracts/models/webhook-event";
import { CreateRefundResult } from "../../../application/contracts/models/create-refund";

export class PaymentMapper
{
    static toCreatePaymentIntentResult(createdPaymentIntent: Stripe.PaymentIntent): CreatePaymentIntentResult {
        return {
          id: createdPaymentIntent.id,
          clientSecret: createdPaymentIntent.client_secret!,
          status: createdPaymentIntent.status,
          currency: createdPaymentIntent.currency,
          amount: createdPaymentIntent.amount,
          paymentMethodId: createdPaymentIntent.payment_method as string | undefined,
          metadata: createdPaymentIntent.metadata,
          createdAt: createdPaymentIntent.created
        };
    }

    static toCreateSetupIntentResult(clientSecret: string, setupIntentId: string): CreateSetupIntentResult{
        return { clientSecret: clientSecret, setupIntentId: setupIntentId}
    }

    static toHandleWebhookEventResult(event : Stripe.Event): MakeWebhookEventResult{
        return { eventId : event.id, payload: event.data, eventType: event.type, receivedAt: event.created }
    }

      static toCreateRefundResult(refund : Stripe.Refund): CreateRefundResult{
        return { amount : refund.amount, reason: refund.reason as string, refundId: refund.id }
    }
}