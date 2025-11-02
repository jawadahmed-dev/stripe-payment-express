import { handlers } from '../handlers';
import { StripeEvent } from '../types/stripe-event';

export async function dispatchStripeEvent(event: StripeEvent): Promise<void> {
  const handler = handlers[event.type];

  if (!handler) {
    console.warn(`No handler found for event type: ${event.type}`);
    return;
  }

  await handler.handle(event);
}