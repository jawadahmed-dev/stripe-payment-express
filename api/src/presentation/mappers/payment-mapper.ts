import { HandleWebhookEventCommand } from "../../application/contracts/models/webhook-event"
import { PaymentStatusType } from "../../domain/enums/payment.enum";
import { Payment } from "../../domain/Payment";
import { InvalidPaymentStatusError } from "../../domain/exceptions/InvalidPaymentStatusError";
import { Money } from "../../domain/value-objects/Money";
import { OrderId } from "../../domain/value-objects/OrderId";
import { HasPaymentId } from "../../domain/value-objects/PaymentId";
import { UserId } from "../../domain/value-objects/UserId";
import { PaymentDTO } from "../dtos/PaymentDTO";

// export class PaymentMapper
// {
//     public static ToHandleWebhookEventCommand(rawBody: Buffer, signature: string): HandleWebhookEventCommand
//     {
//         return {
//             rawBody: rawBody,
//             signature: signature
//         }
//     }
// }

// src/presentation/dto/PaymentMapper.ts

export class PaymentMapper {
  static fromDomain(payment: Payment) {
    const money = payment.getMoney();
    return {
      id: payment.getId().toString(),
      userId: payment.getUserId().toString(),
      orderId: payment.getOrderId().toString(),
      amount: money.getAmount(),
      currency: money.getCurrency(),
      status: payment.getStatus()
    };
  }

  static toDomain(dto: PaymentDTO): Payment {
    const payment = Payment.create({
      id: new HasPaymentId(dto.id),
      userId: new UserId(dto.userId),
      orderId: new OrderId(dto.orderId),
      money: new Money(dto.amount, dto.currency)
    });

    this.applyStatus(payment, dto.status);
    return payment;
  }

  private static applyStatus(payment: Payment, status: string): void {
    switch (status) {
      case PaymentStatusType.SUCCEEDED:
        return payment.succeed();
      case PaymentStatusType.FAILED:
        return payment.fail();
      case PaymentStatusType.CANCELED:
        return payment.cancel();

      case PaymentStatusType.PROCESSING:
        return; // Default creation state, nothing to do

      default:
        throw new InvalidPaymentStatusError(
          `Invalid payment status for mapping: ${status}`
        );
    }
  }
}
