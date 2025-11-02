import { inject, injectable } from "tsyringe";
import TYPES from "../config/types";
import { StripeEvent } from "../types/stripe-event";
import { IPaymentMethodRepository } from "../database/repositories/payment-method.repository";
import { PaymentMethod } from "../entities/payment-method.entity";
import { IUserRepository } from "../database/repositories/user-repository";
import { ILoggerService, LoggerService } from "../services/logger.service";

@injectable()
export class PaymentAttachedHandler {
  private readonly paymentRepository: IPaymentMethodRepository;
  private readonly userRepository: IUserRepository;
  private readonly logger: ILoggerService;

  constructor(
    @inject(TYPES.PaymentMethodRepository) paymentRepository: IPaymentMethodRepository,
    @inject(TYPES.UserRepository) userRepository: IUserRepository,
    @inject(TYPES.LoggerService) logger: LoggerService
  ) {
    this.paymentRepository = paymentRepository;
    this.userRepository = userRepository;
    this.logger = logger;
  }

  async handle(event: StripeEvent): Promise<void> {
    const paymentMethodInfo = event.data.object;

    await this.logger.logInfo(
      event.type,
      "Handling new payment method attachment",
      { eventId: event.eventId, paymentMethodId: paymentMethodInfo.id }
    );

    let paymentMethodEntity = await this.paymentRepository.findByTrackingId(paymentMethodInfo.id);
    if (paymentMethodEntity) {
      await this.logger.logWarn(
        event.type,
        "Payment method already exists",
        { paymentMethodId: paymentMethodInfo.id }
      );
      return;
    }

    const user = await this.userRepository.findByCustomerId(paymentMethodInfo.customer);
    if (!user) {
      await this.logger.logError(
        event.type,
        "User not found for provided Stripe customer",
        { customerId: paymentMethodInfo.customer }
      );
      return;
    }

    paymentMethodEntity = new PaymentMethod({
      trackingId: paymentMethodInfo.id,
      userId: user.id as string,
      type: paymentMethodInfo.type,
      last4: paymentMethodInfo.card.last4,
      brand: paymentMethodInfo.card.brand,
      expMonth: paymentMethodInfo.card.exp_month,
      expYear: paymentMethodInfo.card.exp_year,
      createdAt: new Date(paymentMethodInfo.created * 1000),
      updatedAt: new Date(),
    });

    await this.paymentRepository.create(paymentMethodEntity);

    await this.logger.logInfo(
      event.type,
      "Created new payment method successfully",
      { paymentMethodId: paymentMethodInfo.id, userId: user.id }
    );
  }
}
