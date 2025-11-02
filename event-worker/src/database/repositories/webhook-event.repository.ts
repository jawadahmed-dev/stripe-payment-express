import { WebhookEvent } from "../../entities/webhook.entity";
import { WebhookEventDocument, WebhookEventModel } from "../documents/webhook-event.document";
import { IBaseRepository, BaseRepository } from "./base-repository";

export interface IWebhookEventRepository extends IBaseRepository<WebhookEvent>
{
    findByEventId(id: string): Promise<WebhookEvent | null>;
}

export class WebhookEventRepository extends BaseRepository<WebhookEvent, WebhookEventDocument> implements IWebhookEventRepository  {
  constructor() {
    super(WebhookEventModel);
  }

  async findByEventId(eventId: string): Promise<WebhookEvent | null> {
    const doc = await this.model
      .findOne({ eventId })
      .lean<WebhookEventDocument>()
      .exec();

    return doc ? this.toEntity(doc) : null;
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
      eventId: entity.id,
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