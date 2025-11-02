import * as amqp from "amqplib";

type FixedConnection = amqp.Connection & {
  createChannel: () => Promise<amqp.Channel>;
  createConfirmChannel: () => Promise<amqp.ConfirmChannel>;
};

let connection: FixedConnection | undefined;

const { RABBITMQ_URL } = process.env as { [key: string]: string };

export const getRabbitConnection = async (): Promise<FixedConnection> => {
  if (!connection) {
    connection = (await amqp.connect(RABBITMQ_URL)) as unknown as FixedConnection;
  }
  return connection;
};

export const getRabbitChannel = async (): Promise<amqp.Channel> => {
  const conn = await getRabbitConnection();
  return conn.createChannel();
};
