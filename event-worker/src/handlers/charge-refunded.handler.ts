import { inject, injectable } from "tsyringe";
import TYPES from "../config/types";
import { StripeEvent } from "../types/stripe-event";
import { ILoggerService, LoggerService } from "../services/logger.service";
import { IRefundRepository } from "../database/repositories/refund.repository";

@injectable()
export class ChargeRefundedHandler {
  private readonly refundRepository: IRefundRepository;
  private readonly logger: ILoggerService;

  constructor(
    @inject(TYPES.PaymentRepository) refundRepository: IRefundRepository,
    @inject(TYPES.LoggerService) logger: LoggerService
  ) {
    this.refundRepository = refundRepository;
    this.logger = logger;
  }

  async handle(event: StripeEvent): Promise<void> {
    const charge = event.data.object;

    console.log("handling charge.refunded : ", JSON.stringify(event));
    // await this.logger.logInfo(
    //   event.type,
    //   "Handling charge.refunded event",
    //   { eventId: event.eventId, chargeId: charge.id }
    // );

    // // `charge.payment_intent` links the refund back to the PaymentIntent
    // const trackingId = charge.payment_intent as string;
    // if (!trackingId) {
    //   await this.logger.logError(
    //     event.type,
    //     "Charge missing payment_intent reference",
    //     { chargeId: charge.id }
    //   );
    //   return;
    // }

    // const paymentEntity = await this.refundRepository.findByTrackingId(trackingId);
    // if (!paymentEntity) {
    //   await this.logger.logError(
    //     event.type,
    //     "Payment entity not found during refund handling",
    //     { paymentIntentId: trackingId, chargeId: charge.id }
    //   );
    //   return;
    // }

    // // Update entity state
    // paymentEntity.markRefunded(); // <-- You’ll need to add this method in your Payment entity
    // await this.refundRepository.update(paymentEntity.id!, paymentEntity);

    // await this.logger.logInfo(
    //   event.type,
    //   "Payment marked as refunded",
    //   { paymentId: paymentEntity.id, trackingId }
    // );
  }
}
