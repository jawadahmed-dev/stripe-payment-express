export interface StripeEvent<T = any> {
  type: string;
  eventId: string;
  data: {
    object: T;
  };
}