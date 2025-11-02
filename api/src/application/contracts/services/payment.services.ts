import { CreatePaymentIntentCommand, CreatePaymentIntentResult } from "../models/create-payment-intent";
import { CreateRefundCommand, CreateRefundResult } from "../models/create-refund";
import { CreateSetupIntentCommand, CreateSetupIntentResult } from "../models/create-setup-intent";
import { getPaymentMethodsResult } from "../models/get-payment-methods";
import { HandleWebhookEventCommand } from "../models/webhook-event";

export interface IPaymentService {
  createSetupIntent(command : CreateSetupIntentCommand): Promise<CreateSetupIntentResult>;
  createPaymentIntent(command : CreatePaymentIntentCommand): Promise<CreatePaymentIntentResult>;
  createRefund(command : CreateRefundCommand): Promise<CreateRefundResult | null>;
  getPaymentMethods(userId?: string): Promise<getPaymentMethodsResult[]>;
  handleWebhookEvent(HandleWebhookEventCommand: HandleWebhookEventCommand): Promise<void>;
}