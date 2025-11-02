// src/domain/entities/payment-log.ts
export class Log {
  private readonly _id?: string;
  private readonly _level: "info" | "warn" | "error";
  private readonly _event: string;
  private readonly _message: string;
  private readonly _details?: any;
  private readonly _userId?: string;
  private readonly _createdAt: Date;

  constructor(props: {
    id?: string;
    level: "info" | "warn" | "error";
    event: string;
    message: string;
    details?: any;
    userId?: string;
    createdAt?: Date;
  }) {
    this._id = props.id;
    this._level = props.level;
    this._event = props.event;
    this._message = props.message;
    this._details = props.details;
    this._userId = props.userId;
    this._createdAt = props.createdAt ?? new Date();
  }

  // ✅ Getters
  get id(): string | undefined {
    return this._id;
  }

  get level(): "info" | "warn" | "error" {
    return this._level;
  }

  get event(): string {
    return this._event;
  }

  get message(): string {
    return this._message;
  }

  get details(): any {
    return this._details;
  }

  get userId(): string | undefined {
    return this._userId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
