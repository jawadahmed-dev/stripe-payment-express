// In application layer or shared folder
export interface PaymentMethodDTO {
  id: string;
  customerId: string;
  type: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  createdAt: Date;
}
