import { PaymentMethodType } from "../enums/payment-method-type";

export interface CreateRefundCommand
{
  orderId : string;
  amount : number;
  reason : "duplicate" | "fraudulent" | "requested_by_customer";

}

export interface CreateRefundResult
{
  refundId : string;
  amount : number;
  reason : string;
}