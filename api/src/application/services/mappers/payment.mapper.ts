import { randomUUID } from "crypto";
import { Payment } from "../../../domain/entities/payment.entity";
import { CreatePaymentIntentCommand, CreatePaymentIntentResult } from "../../contracts/models/create-payment-intent";
import { MakeWebhookEventResult, PublishWebhookEventCommand } from "../../contracts/models/webhook-event";
import { WebhookEvent } from "../../../domain/entities/webhook.entity";
import { getPaymentMethodsResult } from "../../contracts/models/get-payment-methods";
import { PaymentMethod } from "../../../domain/entities/payment-method.entity";
import { CreateRefundCommand, CreateRefundResult } from "../../contracts/models/create-refund";
import { Refund } from "../../../domain/entities/refund.entity";

export class PaymentMapper{

  static toPaymentEntity(command: CreatePaymentIntentCommand, result: CreatePaymentIntentResult): Payment {
    return new Payment({
      userId: command.userId,
      orderId: command.orderId,
      stripePaymentIntentId: result.id, // keep Stripe's ID separately
      amount: result.amount,
      currency: result.currency,
      status:  result.status,
      paymentMethodId: result.paymentMethodId,
      metadata: result.metadata,
      receiptUrl: result.receiptUrl,
      createdAt: new Date(result.createdAt * 1000), // Stripe uses Unix timestamps
      updatedAt: undefined
    });
  }

  static toWebhookEventEntity(result: MakeWebhookEventResult): WebhookEvent {
    return new WebhookEvent({
      eventId: result.eventId,
      type: result.eventType, // casting from string to enum
      receivedAt: new Date(result.receivedAt * 1000),
      createdAt: new Date(result.receivedAt * 1000),
      payload: result.payload,
    });
  }
  
  static toRefundEntity(result: CreateRefundResult, paymentId: string): Refund {
    return new Refund({
      paymentId: paymentId,
      amount: result.amount,
      stripeRefundId: result.refundId,
      status: "pending",
      reason: result.reason
    });
  }
  

  static toPublishWebhookEventCommand(event: WebhookEvent): PublishWebhookEventCommand {
    return {
      eventId : event.eventId,
      eventType : event.eventType,
      payload: event.eventPayload
    }
  }

  static toGetPaymentMethodsResult(paymentMethods: PaymentMethod[]): getPaymentMethodsResult[] {
    return paymentMethods.map(pm => ({
      paymentMethodId: pm.trackingId,
      last4: pm.cardLast4,
      brand: pm.cardBrand,
    }));
  }

  
}