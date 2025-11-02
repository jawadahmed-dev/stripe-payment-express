import { Payment } from "../../../domain/entities/payment.entity";
import { IBaseRepository } from "./base.repository";

export interface IPaymentRepository extends IBaseRepository<Payment>{
  findByOrderId(orderId?: string): Promise<Payment | null>;

}