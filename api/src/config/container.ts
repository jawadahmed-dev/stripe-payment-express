// src/config/container.ts
import { IPaymentMethodRepository } from "../application/interfaces/payment-method.repository";
import { IPaymentService } from "../application/interfaces/payment.service";
import { PaymentService } from "../infrastructure/stripe/services/payment.service";
import { PaymentMethodRepository } from "../infrastructure/database/repositories/payment-method.repository";
import AddPaymentMethodUseCase from "../application/use-cases/add-payment-method";
import PaymentMethodsController from "../presentation/controllers/payment-methods.controller";
import GetPaymentMethodsByUserIdUseCase from "../application/use-cases/get-payment-method-by-userid";
import TYPES from "./types";
// src/container.ts
import { container } from 'tsyringe';

// Bind interfaces to implementations
container.register<IPaymentMethodRepository>(
  TYPES.PaymentRepository,
  PaymentMethodRepository
);

container.register<IPaymentService>(
  TYPES.StripeService,
  { useValue: new PaymentService(process.env.STRIPE_SECRET_KEY || '') }
);

// Use a factory for use cases that depend on interfaces
container.register<AddPaymentMethodUseCase>(
  TYPES.AddPaymentMethodUseCase,
  {
    useFactory: (dependencyContainer) =>
      new AddPaymentMethodUseCase(
        dependencyContainer.resolve<IPaymentMethodRepository>(TYPES.PaymentRepository),
        dependencyContainer.resolve<IPaymentService>(TYPES.StripeService)
      ),
  }
);


container.register(TYPES.GetPaymentMethodsByUserIdUseCase, {
  useFactory: (c) => new GetPaymentMethodsByUserIdUseCase(
    c.resolve(TYPES.PaymentRepository)
  ),
});

container.register<PaymentMethodsController>(
  TYPES.PaymentMethodsController,
  PaymentMethodsController
);


export { container };