import { IWebhookEventRepository } from "../../../application/contracts/repositories/webhook-event.repository";
import { WebhookEvent } from "../../../domain/entities/webhook.entity";
import { WebhookEventDocument, WebhookEventModel } from "../documents/webhook-event.document";
import { BaseRepository } from "./base.repository";

export class WebhookEventRepository extends BaseRepository<WebhookEvent, WebhookEventDocument> implements IWebhookEventRepository  {
  constructor() {
    super(WebhookEventModel);
  }

  protected toEntity(doc: WebhookEventDocument): WebhookEvent {
    return new WebhookEvent({
            eventId: doc.eventId,
            type: doc.type, 
            receivedAt: doc.receivedAt,
            createdAt: doc.createdAt,
            payload: doc.payload,
        });
    }

  protected toDocument(entity: Partial<WebhookEvent>): Partial<WebhookEventDocument> {
    return {
      eventId: entity.eventId,
      type: entity.eventType,
      receivedAt: entity.eventReceivedAt,
      processed: entity.isProcessed,
      processingAttempts: entity.attempts,
      lastError: entity.error,
      payload: entity.eventPayload,
      createdAt: entity.eventCreatedAt,
      updatedAt: entity.eventUpdatedAt,
    };
  }
}
