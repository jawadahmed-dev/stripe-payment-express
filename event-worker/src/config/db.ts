// src/config/db.ts
import mongoose from 'mongoose';
//console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI);

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('✅ MongoDB connected');
};

export default connectDB;
