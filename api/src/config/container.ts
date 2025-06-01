// src/config/container.ts

import { Container } from "inversify";
import { IPaymentMethodRepository } from "../application/interfaces/payment-method.repository";
import { IPaymentService } from "../application/interfaces/payment.service";
import { PaymentService } from "../infrastructure/services/payment.service";
import { PaymentMethodRepository } from "../infrastructure/database/repositories/payment-method.repository";
import AddPaymentMethodUseCase from "../application/use-cases/add-payment-method";
import PaymentMethodsController from "../presentation/controllers/payment-methods.controller";
import GetPaymentMethodsUseCase from "../application/use-cases/get-payment-method-by-userid";
import GetPaymentMethodsByUserIdUseCase from "../application/use-cases/get-payment-method-by-userid";
import TYPES from "./types";

const container = new Container();

container.bind<IPaymentMethodRepository>(TYPES.PaymentRepository).to(PaymentMethodRepository).inSingletonScope();

container
  .bind<IPaymentService>(TYPES.StripeService)
  .toDynamicValue(() => new PaymentService(process.env.STRIPE_SECRET_KEY || ""))
  .inSingletonScope();

container.bind<AddPaymentMethodUseCase>(TYPES.AddPaymentMethodUseCase).to(AddPaymentMethodUseCase);
container.bind<GetPaymentMethodsByUserIdUseCase>(TYPES.GetPaymentMethodsByUserIdUseCase).to(GetPaymentMethodsByUserIdUseCase);
container.bind<PaymentMethodsController>(TYPES.PaymentMethodsController).to(PaymentMethodsController);

export default container;