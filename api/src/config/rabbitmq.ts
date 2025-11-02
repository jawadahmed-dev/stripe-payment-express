import { container } from "tsyringe";
import { RabbitMQPublisher } from "../infrastructure/messaging/rabbitmq-publisher";
import TYPES from "./types";

export const connectRabbitmq = async () => {
    console.log("connecting rabbitmq!");
    const publisher = container.resolve<RabbitMQPublisher>(TYPES.RabbitMQPublisher);
    await publisher.connect();
    console.log("RabbitMQ Connected!");
}