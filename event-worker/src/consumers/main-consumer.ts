import { injectable, inject } from "tsyringe";
import { Channel, ConsumeMessage } from "amqplib";
import { getRabbitChannel } from "../config/rabbitmq";
import { IWebhookEventRepository } from "../database/repositories/webhook-event.repository";
import { dispatchStripeEvent } from "../dispatachers/stripe-event-dispatcher";
import TYPES from "../config/types";
import { WebhookEvent } from "../entities/webhook.entity";

@injectable()
export class MainConsumer {
  private channel!: Channel;
  private readonly queue: string;
  private readonly exchange: string;
  private readonly retryRoutingKey: string;

  constructor(
    @inject(TYPES.WebhookEventRepository)
    private readonly webhookRepo: IWebhookEventRepository
  ) {
    const { MAIN_QUEUE, EXCHANGE_NAME, RETRY_ROUTING_KEY } = process.env as {
      [key: string]: string;
    };

    this.queue = MAIN_QUEUE;
    this.exchange = EXCHANGE_NAME;
    this.retryRoutingKey = RETRY_ROUTING_KEY;
  }

  private getRetryCount(msg: ConsumeMessage): number {
    const headers = msg.properties?.headers ?? {};
    return (headers["x-retry-count"] as number) || 0;
  }

  private async handleMessage(msg: ConsumeMessage): Promise<void> {
    const data = JSON.parse(msg.content.toString());
    console.log("[Main Queue] Received:", data);

    let webhookEvent = await this.webhookRepo.findByEventId(data.eventId);
    if (!webhookEvent) {
      throw new Error(`Webhook event not found for id=${data.eventId}`);
    }

    if (webhookEvent?.isProcessed) {
      console.log(`[Main Queue] Event ${data.id} already processed, skipping...`);
      this.channel.ack(msg);
      return;
    }

    try {
      // Process event
      await dispatchStripeEvent(data);

      // ✅ Mark success
      await this.updateWebhookEvent(webhookEvent, true);
      this.channel.ack(msg);

    } catch (err: any) {
      const retryCount = this.getRetryCount(msg);
      console.error(`Failed [Retry Count: ${retryCount}]`, err.message);

      // ❌ Mark failed (increments attempts & updates lastError)
      await this.updateWebhookEvent(webhookEvent, false, err.message);

      if (retryCount < 3) {
        this.channel.publish(this.exchange, this.retryRoutingKey, msg.content, {
          headers: { "x-retry-count": retryCount + 1 },
          persistent: true,
        });
        this.channel.ack(msg);
      } else {
        this.channel.nack(msg);
      }
    }
  }


  async start(): Promise<void> {
    this.channel = await getRabbitChannel();
    await this.channel.consume(this.queue, (msg) => msg && this.handleMessage(msg));
    console.log(`[Main Queue] Listening on ${this.queue}`);
  }

  //private helpers 
  private async updateWebhookEvent(
  webhookEvent: WebhookEvent,
  success: boolean,
  errorMessage?: string
  ): Promise<void> 
  {
    if (success) {
      webhookEvent.markProcessed();
    } else {
      webhookEvent.markFailed(errorMessage ?? "Unknown error");
    }

    await this.webhookRepo.update(webhookEvent.id as string, webhookEvent);
  }

}
