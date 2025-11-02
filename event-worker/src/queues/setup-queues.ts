// src/setup/setupQueues.ts
import { getRabbitChannel } from '../config/rabbitmq';
import dotenv from 'dotenv';
import { Channel } from 'amqplib';

dotenv.config();

export const setupQueues = async (): Promise<void> => {
  const channel: Channel = await getRabbitChannel();

  const {
    EXCHANGE_NAME,
    MAIN_QUEUE,
    RETRY_QUEUE,
    DLQ,
    MAIN_ROUTING_KEY,
    RETRY_ROUTING_KEY,
    DLQ_ROUTING_KEY,
  } = process.env as { [key: string]: string };

  // 1. Create Exchange
  await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });

  // 2. Dead Letter Queue
  await channel.assertQueue(DLQ, { durable: true });
  await channel.bindQueue(DLQ, EXCHANGE_NAME, DLQ_ROUTING_KEY);

  // 3. Retry Queue
  await channel.assertQueue(RETRY_QUEUE, {
    durable: true,
    arguments: {
      'x-message-ttl': 10000,
      'x-dead-letter-exchange': EXCHANGE_NAME,
      'x-dead-letter-routing-key': MAIN_ROUTING_KEY,
    },
  });
  await channel.bindQueue(RETRY_QUEUE, EXCHANGE_NAME, RETRY_ROUTING_KEY);

  // 4. Main Queue
  await channel.assertQueue(MAIN_QUEUE, {
    durable: true,
    arguments: {
      'x-dead-letter-exchange': EXCHANGE_NAME,
      'x-dead-letter-routing-key': DLQ_ROUTING_KEY,
    },
  });
  await channel.bindQueue(MAIN_QUEUE, EXCHANGE_NAME, MAIN_ROUTING_KEY);
};
