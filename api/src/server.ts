// src/server.ts
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
import paymentMethodRoutes from './presentation/routes/payment-method.routes'


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/payment-methods', paymentMethodRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});
