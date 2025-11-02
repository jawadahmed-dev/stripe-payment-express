export interface CreateSetupIntentCommand {
    customerId: string;
    idempotencyKey: string;
}

export interface CreateSetupIntentResult {
  clientSecret: string;
  setupIntentId: string;
}