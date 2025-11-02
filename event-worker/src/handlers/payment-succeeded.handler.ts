import { inject, injectable } from "tsyringe";
import TYPES from "../config/types";
import { StripeEvent } from "../types/stripe-event";
import { IPaymentRepository } from "../database/repositories/payment.repository";
import { ILoggerService, LoggerService } from "../services/logger.service";

@injectable()
export class PaymentSucceededHandler {
  private readonly paymentRepository: IPaymentRepository;
  private readonly logger: ILoggerService;

  constructor(
    @inject(TYPES.PaymentRepository) paymentRepository: IPaymentRepository,
    @inject(TYPES.LoggerService) logger: LoggerService
  ) {
    this.paymentRepository = paymentRepository;
    this.logger = logger;
  }

  async handle(event: StripeEvent): Promise<void> {
    const paymentIntentInfo = event.data.object;

    await this.logger.logInfo(
      event.type,
      "Handling payment succeeded event",
      { eventId: event.eventId, paymentIntentId: paymentIntentInfo.id }
    );

    const paymentEntity = await this.paymentRepository.findByTrackingId(paymentIntentInfo.id);
    if (!paymentEntity) {
      await this.logger.logError(
        event.type,
        "Payment entity not found during success handling",
        { paymentIntentId: paymentIntentInfo.id }
      );
      return;
    }

    paymentEntity.markSucceeded();
    await this.paymentRepository.update(paymentEntity.id!, paymentEntity);

    await this.logger.logInfo(
      event.type,
      "Payment marked as succeeded",
      { paymentId: paymentEntity.id, trackingId: paymentIntentInfo.id }
    );
  }
}
