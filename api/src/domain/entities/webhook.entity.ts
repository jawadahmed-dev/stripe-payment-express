
export class WebhookEvent {
  private readonly _id?: string;
  private readonly _eventId: string;
  private readonly type: string;
  private readonly receivedAt: Date;
  private processed: boolean;
  private processingAttempts: number;
  private lastError?: string;
  private payload: object;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: {
    id?: string;
    eventId: string;
    type: string;
    receivedAt?: Date;
    processed?: boolean;
    processingAttempts?: number;
    lastError?: string;
    payload: object;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = props.id;
    this._eventId = props.eventId;
    this.type = props.type;
    this.receivedAt = props.receivedAt ?? new Date();
    this.processed = props.processed ?? false;
    this.processingAttempts = props.processingAttempts ?? 0;
    this.lastError = props.lastError;
    this.payload = props.payload;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  // Getters
  get id(): string | undefined {
    return this._id;
  }

  get isProcessed(): boolean {
    return this.processed;
  }

  get attempts(): number {
    return this.processingAttempts;
  }

  get error(): string | undefined {
    return this.lastError;
  }

  get eventType(): string {
    return this.type;
  }

  get eventPayload(): object {
    return this.payload;
  }

  get eventReceivedAt(): Date {
    return this.receivedAt;
  }

  get eventCreatedAt(): Date {
    return this.createdAt;
  }

  get eventUpdatedAt(): Date {
    return this.updatedAt;
  }

  get eventId(): string {
    return this._eventId;
  }

  // Domain Behaviors
  markProcessed(): void {
    this.processed = true;
    this.touch();
  }

  markFailed(errorMessage: string): void {
    this.processingAttempts += 1;
    this.lastError = errorMessage;
    this.processed = false;
    this.touch();
  }

  incrementAttempts(): void {
    this.processingAttempts += 1;
    this.touch();
  }

  updatePayload(payload: object): void {
    this.payload = payload;
    this.touch();
  }

  // Private utility
  private touch(): void {
    this.updatedAt = new Date();
  }
}
