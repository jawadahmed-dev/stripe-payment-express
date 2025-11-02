import { Payment } from "../domain/payment";
 
export interface IPaymentOrchestrator{
    Create(payment: Payment): Promise<Payment>;
}