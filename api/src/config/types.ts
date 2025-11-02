
const TYPES = {
  RabbitMQPublisher: Symbol.for("RabbitMQPublisher"),
  PaymentProvider: Symbol.for("PaymentProvider"),
  PaymentService: Symbol.for("PaymentService"),
  LogService: Symbol.for("LogService"),
  PaymentsController: Symbol.for("PaymentsController"),
  UsersController: Symbol.for("UsersController"),
  WebhookController: Symbol.for("WebhookController"),
  PaymentRepository: Symbol.for("PaymentRepository"),
  PaymentMethodRepository: Symbol.for("PaymentMethodRepository"),
  WebhookEventRepository: Symbol.for("WebhookEventRepository"),
  UserRepository: Symbol.for("UserRepository"),
  LogRepository: Symbol.for("LogRepository"),
  RefundRepository: Symbol.for("RefundRepository"),
};

export default TYPES;