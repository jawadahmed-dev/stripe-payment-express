import { Schema, Document, model, Types } from "mongoose";

export interface RefundDocument extends Document {
  _id: Types.ObjectId;
  paymentId: string;   // link back to Payment
  stripeRefundId: string;      // Stripe refund ID
  amount: number;              // refunded amount
  reason?: string;             // optional reason
  status: "pending" | "succeeded" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const RefundSchema = new Schema<RefundDocument>(
  {
    paymentId: { type: String, ref: "Payments", required: true },
    stripeRefundId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    reason: { type: String },
    status: { type: String, enum: ["pending", "succeeded", "failed"], required: true },
  },
  { timestamps: true }
);

export const RefundModel = model<RefundDocument>("Refund", RefundSchema);
