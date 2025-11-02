import { IPaymentRepository } from "../application/IPaymentRepository";
import { Payment } from "../domain/Payment";

export class PaymentRepository implements IPaymentRepository{
    Create(payment: Payment): Promise<Payment> {
        throw new Error("Method not implemented.");
    }
}