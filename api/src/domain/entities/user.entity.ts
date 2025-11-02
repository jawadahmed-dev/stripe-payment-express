// src/domain/entities/User.ts

export class User {
  private readonly _id?: string;
  private readonly _email: string;
  private customerId: string;
  private deleted: boolean;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: {
    id?: string;
    email:string;
    customerId: string;
    deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = props.id;
    this._email = props.email;
    this.customerId = props.customerId;
    this.deleted = props.deleted ?? false;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  // Getters
  get id(): string | undefined {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get userCustomerId(): string {
    return this.customerId;
  }

  get isDeleted(): boolean {
    return this.deleted;
  }

  get createdOn(): Date {
    return this.createdAt;
  }

  get lastUpdated(): Date {
    return this.updatedAt;
  }

  // Domain behaviors
  markAsDeleted(): void {
    this.deleted = true;
    this.touch();
  }

  restore(): void {
    this.deleted = false;
    this.touch();
  }

  updateCustomerId(newCustomerId: string): void {
    this.customerId = newCustomerId;
    this.touch();
  }

  // Private utility
  private touch(): void {
    this.updatedAt = new Date();
  }
}
