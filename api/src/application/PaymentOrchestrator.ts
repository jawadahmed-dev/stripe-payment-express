import { Payment } from "../domain/payment";
import { IPaymentOrchestrator } from "./IPaymentOrchestrator";

export class PaymentOrchestrator implements IPaymentOrchestrator{
    Create(payment: Payment): Promise<Payment> {
        throw new Error("Method not implemented.");
    }
}