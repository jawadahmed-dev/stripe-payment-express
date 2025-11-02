import { model, Schema, Types } from "mongoose";

export interface UserDocument extends Document {
   _id: Types.ObjectId; 
   email: string;
  customerId: string;
  deleted:boolean;
  createdAt:Date;
  updatedAt?:Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    customerId: { type: String },
    email: { type: String },
    deleted: { type: "boolean" },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', UserSchema);