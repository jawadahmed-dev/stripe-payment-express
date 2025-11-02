import { Schema, Document, model, Types } from 'mongoose';
import { WebHookEventType } from '../../../domain/enums/webhook-event.enum';

export interface WebhookEventDocument extends Document {
  _id: Types.ObjectId; 
  eventId: string;
  type: string;
  receivedAt: Date;
  processed: boolean;
  processingAttempts: number;
  lastError?: string;
  payload: object;
  createdAt: Date;
  updatedAt: Date;
}

const WebhookEventSchema = new Schema<WebhookEventDocument>({
  eventId: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  receivedAt: { type: Date, required: true },
  processed: { type: Boolean, required: true },
  processingAttempts: { type: Number, required: true },
  lastError: { type: String },
  payload: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const WebhookEventModel = model<WebhookEventDocument>('WebhookEvent', WebhookEventSchema);
