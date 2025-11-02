import Stripe from 'stripe';
import { CreatePaymentIntentCommand, CreatePaymentIntentResult } from '../../../application/contracts/models/create-payment-intent';
import { CreateSetupIntentCommand, CreateSetupIntentResult } from '../../../application/contracts/models/create-setup-intent';
import {IPaymentProvider } from '../../../application/contracts/providers/payment.provider'
import { inject, injectable } from 'tsyringe';
import TYPES from '../../../config/types';
import { RabbitMQPublisher } from '../../messaging/rabbitmq-publisher';
import { PaymentMapper } from '../mappers/payment.mapper';
import { PaymentMethodType } from '../../../domain/enums/payment-method.enum';
import { MakeWebhookEventCommand, MakeWebhookEventResult, PublishWebhookEventCommand } from '../../../application/contracts/models/webhook-event';
import { CreateRefundCommand, CreateRefundResult } from '../../../application/contracts/models/create-refund';

@injectable()
export class StripePaymentProvider implements IPaymentProvider
{
    private readonly stripe: Stripe;
    private readonly messageBroker: RabbitMQPublisher;

    constructor(apiKey: string, @inject(TYPES.RabbitMQPublisher) messageBroker: RabbitMQPublisher) {
    this.stripe = new Stripe(apiKey, { apiVersion: "2022-11-15" });
    this.messageBroker = messageBroker;
    }

    async createRefund(command: CreateRefundCommand, paymentId: string): Promise<CreateRefundResult> {
        console.log("creating refund handler : "+ paymentId);
        const stripeResponse =  await this.stripe.refunds.create({
        payment_intent: paymentId,
        amount: command.amount,
        reason: command.reason,
      });

      const result = PaymentMapper.toCreateRefundResult(stripeResponse);
      return result;
      
    }

    async createSetupIntent(command: CreateSetupIntentCommand): Promise<CreateSetupIntentResult> {
        
        const setupIntent = await this.stripe.setupIntents.create(
            {
                customer: command.customerId,
                payment_method_types: [PaymentMethodType.CARD], 
            }, 
            { 
                idempotencyKey: command.idempotencyKey
            }
        );

        let result = PaymentMapper.toCreateSetupIntentResult(setupIntent.client_secret!, setupIntent.id);
        return result;
    }

    async createPaymentIntent(command: CreatePaymentIntentCommand): Promise<CreatePaymentIntentResult> {
        
        const paymentIntent = await this.stripe.paymentIntents.create(
            {
                amount: command.amount,
                currency: command.currency,
                customer: 'cus_SwOi6VdwuBQnZi',
                metadata: {
                    orderId: command.orderId ?? null,
                    userId: command.userId ?? null
                },
                setup_future_usage: 'off_session'
            },
            {
                idempotencyKey: command.idempotencyKey
            }
        );

        let result = PaymentMapper.toCreatePaymentIntentResult(paymentIntent);
        return result;
    }

    async makeWebhookEvent(command: MakeWebhookEventCommand): Promise<MakeWebhookEventResult> {
       
        let event: Stripe.Event;
        event = this.stripe.webhooks.constructEvent(
            command.rawBody,
            command.signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
        
        let HandleWebhookEventResult = PaymentMapper.toHandleWebhookEventResult(event);
        return HandleWebhookEventResult;
    }

    async publishWebhookEvent(command: PublishWebhookEventCommand): Promise<void> {
        await this.messageBroker.publish(process.env.RABBITMQ_ROUTING_KEY!, {
            eventId: command.eventId,
            type: command.eventType,
            data: command.payload,
        });
    }

}




