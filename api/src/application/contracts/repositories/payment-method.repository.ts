
import { PaymentMethod } from "../../../domain/entities/payment-method.entity";
import { IBaseRepository } from "./base.repository";

export interface IPaymentMethodRepository extends IBaseRepository<PaymentMethod>{
  get(userId?: string): Promise<PaymentMethod[]>;
}