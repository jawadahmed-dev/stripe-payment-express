// src/server.ts
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
import paymentMethodRoutes from './presentation/routes/payment-method.routes';
import { globalErrorHandler } from './presentation/middlewares/exception-handler';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/payment-methods', paymentMethodRoutes);

// Optional: 404 handler before error handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// ✅ Global error handler — MUST be before app.listen()
app.use(globalErrorHandler);

// ✅ Start server AFTER middleware is fully registered
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});
