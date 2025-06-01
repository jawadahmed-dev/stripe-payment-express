export default class PaymentMethod {
  public id: string;
  public userId: string;
  public type: string;
  public last4?: string;
  public brand?: string;
  public expMonth?: number;
  public expYear?: number;
  public createdAt: Date | number;

  constructor(params: {
    id: string;
    userId: string;
    type: string;
    last4?: string;
    brand?: string;
    expMonth?: number;
    expYear?: number;
    createdAt: Date | number;
  }) {
    this.id = params.id;
    this.userId = params.userId;
    this.type = params.type;
    this.last4 = params.last4;
    this.brand = params.brand;
    this.expMonth = params.expMonth;
    this.expYear = params.expYear;
    this.createdAt = params.createdAt;
  }
}
