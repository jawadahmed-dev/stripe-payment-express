import { PaymentStatusType } from "./enums/payment.enum";
import { Money } from "./value-objects/Money";
import { OrderId } from "./value-objects/OrderId";
import { PaymentId } from "./value-objects/PaymentId";
import { UserId } from "./value-objects/UserId";

export class Payment {
  private status: PaymentStatusType;

  private constructor(
    private readonly id: PaymentId,
    private readonly userId: UserId,
    private readonly orderId: OrderId,
    private readonly money: Money,
    private readonly createdAt: Date
  ) {
    this.status = PaymentStatusType.PROCESSING;
  }

  static create(props: {
    id: PaymentId;
    userId: UserId;
    orderId: OrderId;
    money: Money;
  }): Payment {
    return new Payment(
      props.id,
      props.userId,
      props.orderId,
      props.money,
      new Date()
    );
  }

  succeed(): void {
    this.status = PaymentStatusType.SUCCEEDED;
  }

  fail(): void {
    this.status = PaymentStatusType.FAILED;
  }

  cancel(): void {
    this.status = PaymentStatusType.CANCELED;
  }

  // Getters as needed by domain layers
  getId() { return this.id; }
  getStatus() { return this.status; }
  getMoney() { return this.money; }
  getUserId() { return this.userId; }
  getOrderId() { return this.orderId; }
}
