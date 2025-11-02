import { Schema, Document, model, Types } from 'mongoose';
import { PaymentStatusType } from '../../../domain/enums/payment.enum';

export interface PaymentDocument extends Document {
   _id: Types.ObjectId; 
  userId?: string;
  orderId?: string;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  status: PaymentStatusType;
  paymentMethodId?: string;
  metadata: object;
  receiptUrl?: string;   // from Stripe charge
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<PaymentDocument>(
  {
    userId: { type: String },
    orderId: { type: String },
    stripePaymentIntentId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    paymentMethodId: { type: String },
    metadata: { type: Schema.Types.Mixed, default: {} },
    receiptUrl: { type: String },
  },
  { timestamps: true }
);

export const PaymentModel = model<PaymentDocument>('Payment', PaymentSchema);
