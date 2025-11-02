import { Payment } from "../domain/payment";

export interface IPaymentRepository{
    Create(payment: Payment): Promise<Payment>;
}