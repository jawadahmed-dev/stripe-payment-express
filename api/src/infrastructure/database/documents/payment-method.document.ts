// infrastructure/schemas/PaymentMethodSchema.ts

import { Schema, Types, model } from 'mongoose';

export interface PaymentMethodDocument extends Document {
  _id: Types.ObjectId; 
  trackingId: string;
  userId: string;
  type: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  createdAt: Date;
  updatedAt: Date;
}


const PaymentMethodSchema = new Schema<PaymentMethodDocument>({
  trackingId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  last4: { type: String, required: true },
  brand: { type: String, required: true },
  expMonth: { type: Number, required: true },
  expYear: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const PaymentMethodModel = model<PaymentMethodDocument>('PaymentMethod', PaymentMethodSchema);
