import { PaymentMethodType } from '../enums/payment-method.enum';
import { BaseEntity } from './base.entity';

export default class PaymentMethod extends BaseEntity {
  public userId: string;
  public customerId: string;
  public type: PaymentMethodType;
  public last4: string;
  public brand: string;
  public expMonth: number;
  public expYear: number;
  public isDefault: boolean = true;

  constructor(params: {
    id: string;
    userId: string;
    customerId: string;
    type: PaymentMethodType;
    last4: string;
    brand: string;
    expMonth: number;
    expYear: number;
    createdAt: Date
  }) {
    super(params);
    this.userId = params.userId;
    this.customerId = params.customerId;
    this.type = params.type;
    this.last4 = params.last4;
    this.brand = params.brand;
    this.expMonth = params.expMonth;
    this.expYear = params.expYear;
  }

  
}
