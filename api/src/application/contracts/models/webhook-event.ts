export interface PublishWebhookEventCommand{
  eventId: string;
  eventType: string;
  payload: object;
}

export interface MakeWebhookEventCommand{
    rawBody: Buffer;
    signature: string
}

export interface HandleWebhookEventCommand{
    rawBody: Buffer;
    signature: string
}

export interface MakeWebhookEventResult{
  eventId: string;
  eventType: string;
  receivedAt: number;
  payload: object;
}