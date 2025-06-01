import PaymentMethod from "../../domain/entities/payment-method";
import { IBaseRepository } from "./base.repository";

export interface IPaymentMethodRepository extends IBaseRepository<PaymentMethod>{
  findByUserId(userId: string): Promise<PaymentMethod[]>;
    
}