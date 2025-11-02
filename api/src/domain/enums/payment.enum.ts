// src/domain/enums/payment.enum.ts

// export enum PaymentStatusType {
//   REQUIRES_PAYMENT_METHOD = 'requires_payment_method',
//   REQUIRES_CONFIRMATION = 'requires_confirmation',
//   REQUIRES_ACTION = 'requires_action',
//   PROCESSING = 'processing',
//   REQUIRES_CAPTURE = 'requires_capture',
//   SUCCEEDED = 'succeeded',
//   CANCELED = 'canceled',
// }


export enum PaymentStatusType {
  PROCESSING = "PROCESSING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  CANCELED = "CANCELED"
}