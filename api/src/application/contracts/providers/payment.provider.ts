import { CreatePaymentIntentCommand, CreatePaymentIntentResult } from "../models/create-payment-intent";
import { CreateRefundCommand, CreateRefundResult } from "../models/create-refund";
import { CreateSetupIntentCommand, CreateSetupIntentResult } from "../models/create-setup-intent";
import { MakeWebhookEventCommand, MakeWebhookEventResult, PublishWebhookEventCommand } from "../models/webhook-event";

export interface IPaymentProvider {
  createSetupIntent(command : CreateSetupIntentCommand): Promise<CreateSetupIntentResult>;
  createPaymentIntent(command : CreatePaymentIntentCommand): Promise<CreatePaymentIntentResult>;
  makeWebhookEvent(event: MakeWebhookEventCommand): Promise<MakeWebhookEventResult>;
  publishWebhookEvent(event: PublishWebhookEventCommand): Promise<void>;
  createRefund(command : CreateRefundCommand, paymentId: string): Promise<CreateRefundResult>;

}