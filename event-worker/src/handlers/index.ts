import { StripeEvent } from '../types/stripe-event';
import { WebHookEventType } from '../enums/webhook-event.enum';
import { container } from '../config/container';
import TYPES from '../config/types';

export interface EventHandler {
  handle(event: StripeEvent): Promise<void>;
}

export const handlers: Record<string, EventHandler> = {
  [WebHookEventType.PAYMENT_INTENT_SUCCEEDED]: container.resolve(TYPES.PaymentSucceededHandler),
  [WebHookEventType.PAYMENT_METHOD_ATTACHED]: container.resolve(TYPES.PaymentAttachedHandler),
  [WebHookEventType.CHARGE_REFUNDED]: container.resolve(TYPES.PaymentAttachedHandler),
};
