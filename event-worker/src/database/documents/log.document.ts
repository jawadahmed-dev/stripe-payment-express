import { Schema, model, Document, Types } from "mongoose";

export interface LogDocument extends Document {
  _id: Types.ObjectId; 
  level: "info" | "warn" | "error";   // error severity
  event: string;                      // e.g. "payment_intent.failed"
  message: string;                    // short human-readable message
  details?: any;                      // raw Stripe payload or error stack
  userId?: string;                    // link to your user (if available)
  customerId?: string;                // Stripe customer id
  createdAt: Date;
}

const LogSchema = new Schema<LogDocument>(
  {
    level: { type: String, enum: ["info", "warn", "error"], required: true },
    event: { type: String, required: true },
    message: { type: String, required: true },
    details: { type: Schema.Types.Mixed },  // flexible field
    userId: { type: String },
    customerId: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const LogModel = model<LogDocument>("Log", LogSchema);
