import { container } from 'tsyringe';
import TYPES from './types';
import dotenv from 'dotenv';
import { IWebhookEventRepository, WebhookEventRepository } from '../database/repositories/webhook-event.repository';
import { IPaymentRepository, PaymentRepository } from '../database/repositories/payment.repository';
import { PaymentSucceededHandler } from '../handlers/payment-succeeded.handler';
import { PaymentAttachedHandler } from '../handlers/payment-attached.handler';
import { IPaymentMethodRepository, PaymentMethodRepository } from '../database/repositories/payment-method.repository';
import { IUserRepository, UserRepository } from '../database/repositories/user-repository';
import { ILogRepository, LogRepository } from '../database/repositories/log.repository';
import { ILoggerService, LoggerService } from '../services/logger.service';
import { IRefundRepository, RefundRepository } from '../database/repositories/refund.repository';
import { ChargeRefundedHandler } from '../handlers/charge-refunded.handler';

dotenv.config();

container.register<IWebhookEventRepository>(
  TYPES.WebhookEventRepository,
  WebhookEventRepository
);

container.register<IPaymentRepository>(
  TYPES.PaymentRepository,
  PaymentRepository
);

container.register<IPaymentMethodRepository>(
  TYPES.PaymentMethodRepository,
  PaymentMethodRepository
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

container.registerSingleton<ILoggerService>(
  TYPES.LoggerService,
  LoggerService
);


container.register<PaymentSucceededHandler>(
  TYPES.PaymentSucceededHandler,
  PaymentSucceededHandler
);

container.register<PaymentAttachedHandler>(
  TYPES.PaymentAttachedHandler,
  PaymentAttachedHandler
);

container.register<ChargeRefundedHandler>(
  TYPES.ChargeRefundedHandler,
  ChargeRefundedHandler
);


export { container };

