import "reflect-metadata";
import { setupQueues } from './queues/setup-queues';
import connectDB from './config/db';
import { startMainConsumer } from './config/consumers';

const start = async (): Promise<void> => {
  await connectDB();
  await setupQueues();
  await startMainConsumer();
};

start().catch(console.error);
