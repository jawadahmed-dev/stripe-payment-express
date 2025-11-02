import { container } from 'tsyringe';
import TYPES from './types';
import { IPaymentProvider } from "../application/contracts/providers/payment.provider";
import { StripePaymentProvider } from "../infrastructure/providers/implementations/stripe-payment.provider";
import { IPaymentService } from '../application/contracts/services/payment.services';
import { PaymentService } from '../application/services/implementations/payment-service';
import { RabbitMQPublisher } from '../infrastructure/messaging/rabbitmq-publisher';
import { PaymentsController } from '../presentation/controllers/payments.controller';
import { WebhookController } from '../presentation/controllers/webhook.controller';
import dotenv from 'dotenv';
import { IPaymentRepository } from '../application/contracts/repositories/payment.repository';
import { PaymentRepository } from '../infrastructure/database/repositories/payment.repository';
import { IWebhookEventRepository } from '../application/contracts/repositories/webhook-event.repository';
import { WebhookEventRepository } from '../infrastructure/database/repositories/webhook.repository';
import {  UsersController } from '../presentation/controllers/users.controller';
import { PaymentMethodRepository } from '../infrastructure/database/repositories/payment-method.repository';
import { IPaymentMethodRepository } from '../application/contracts/repositories/payment-method.repository';
import { IUserRepository } from '../application/contracts/repositories/user.repository';
import { UserRepository } from '../infrastructure/database/repositories/user.repository';
import { ILoggerService } from '../application/contracts/services/logger.service';
import { LoggerService } from '../application/services/implementations/logger-service';
import { ILogRepository } from '../application/contracts/repositories/logs.repository';
import { LogRepository } from '../infrastructure/database/repositories/log.repository';
import { IRefundRepository } from '../application/contracts/repositories/refund.repository';
import { RefundRepository } from '../infrastructure/database/repositories/refund.repository';
dotenv.config();

// publisher
const publisher = new RabbitMQPublisher(
  process.env.RABBITMQ_EXCHANGE!,
  process.env.RABBITMQ_URL!
);
container.registerInstance<RabbitMQPublisher>(
  TYPES.RabbitMQPublisher,
  publisher
);

// payment provider
container.register<IPaymentProvider>(TYPES.PaymentProvider, {
  useFactory: (dependencyContainer) =>
    new StripePaymentProvider(
      process.env.STRIPE_SECRET_KEY || "",
      dependencyContainer.resolve<RabbitMQPublisher>(TYPES.RabbitMQPublisher)
    ),
});

container.register<IPaymentRepository>(
  TYPES.PaymentRepository,
  PaymentRepository
);

container.register<IPaymentMethodRepository>(
  TYPES.PaymentMethodRepository,
  PaymentMethodRepository
);

container.register<IWebhookEventRepository>(
  TYPES.WebhookEventRepository,
  WebhookEventRepository
);

container.register<IUserRepository>(
  TYPES.UserRepository,
  UserRepository
);

container.register<ILogRepository>(
  TYPES.LogRepository,
  LogRepository
);


container.register<IRefundRepository>(
  TYPES.RefundRepository,
  RefundRepository
);

// payment service
container.register<IPaymentService>(
  TYPES.PaymentService,
  PaymentService
);

container.registerSingleton<ILoggerService>(
  TYPES.LogService,
  LoggerService
);

// controllers
container.register<PaymentsController>(
  TYPES.PaymentsController,
  PaymentsController
);

// controllers
container.register<UsersController>(
  TYPES.UsersController,
  UsersController
);

container.register<WebhookController>(
  TYPES.WebhookController,
  WebhookController
);

export { container };
