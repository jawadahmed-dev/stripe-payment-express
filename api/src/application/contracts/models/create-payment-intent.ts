import { PaymentMethodType } from "../enums/payment-method-type";

export interface CreatePaymentIntentCommand
{
  currency : string;
  amount : number;
  paymentMethodId? : string;
  orderId? : string;
  userId : string;
  idempotencyKey : string;

}

export interface CreatePaymentIntentResult {
  id: string;           
  clientSecret: string;
  status: string;  
  currency : string;
  amount : number;     
  paymentMethodId? : string;   
  metadata?: Record<string, any>;
  createdAt: number;
  updatedAt?: number;
  receiptUrl?: string;

}