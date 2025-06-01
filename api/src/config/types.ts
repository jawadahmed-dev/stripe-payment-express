const TYPES = {
  PaymentRepository: Symbol.for("PaymentRepository"),
  StripeService: Symbol.for("StripeService"),
  AddPaymentMethodUseCase: Symbol.for("AddPaymentMethodUseCase"),
  GetPaymentMethodsByUserIdUseCase: Symbol.for("GetPaymentMethodsByUserIdUseCase"),
  PaymentMethodsController: Symbol.for("PaymentMethodsController"),
};

export default TYPES;