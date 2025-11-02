import { LoggerService } from "../services/logger.service";

const TYPES = {
  WebhookEventRepository: Symbol.for("WebhookEventRepository"),
  PaymentRepository: Symbol.for("PaymentRepository"),
  PaymentMethodRepository: Symbol.for("PaymentMethodRepository"),
  UserRepository: Symbol.for("UserRepository"),
  LogRepository: Symbol.for("LogRepository"),
  RefundRepository: Symbol.for("RefundRepository"),
  LoggerService: Symbol.for("LoggerService"),
  PaymentSucceededHandler: Symbol.for("PaymentSucceededHandler"),
  PaymentAttachedHandler: Symbol.for("PaymentAttachedHandler"),
  ChargeRefundedHandler: Symbol.for("ChargeRefundedHandler"),
};

export default TYPES;