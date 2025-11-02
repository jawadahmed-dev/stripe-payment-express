import { PaymentStatusType } from "../../domain/enums/payment.enum";

export interface PaymentDTO {
  id: string;
  userId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
}