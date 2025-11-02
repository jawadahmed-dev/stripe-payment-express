import amqp, { Channel, Connection } from 'amqplib';
import { injectable } from 'tsyringe';

@injectable()
export class RabbitMQPublisher {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private readonly exchange: string;
  private readonly url: string;

  constructor(exchange: string, url: string = 'amqp://localhost') {
    this.exchange = exchange;
    this.url = url;
  }

async connect(): Promise<void> {
  try {
    console.log('url for rabbit: '+ this.url);
    this.connection = await amqp.connect(this.url) as any;
    console.log('connection : ' + this.connection);
    this.channel = await (this.connection as any).createChannel() as any; // Correct usage
    console.log('channel : ' + this.channel);
    await (this.channel as any).assertExchange(this.exchange, 'direct', { durable: true });
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error;
  }
}

  async publish(routingKey: string, message: any): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel not initialized. Call connect() first.');
    }

    try {
      const messageBuffer = Buffer.from(JSON.stringify(message));
      this.channel.publish(this.exchange, routingKey, messageBuffer);
      console.log(`Message published to exchange ${this.exchange} with routing key ${routingKey}`);
    } catch (error) {
      console.error('Failed to publish message:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await (this.connection as any).close();
      }
    } catch (error) {
      console.error('Error closing RabbitMQ connection:', error);
      throw error;
    }
  }
}