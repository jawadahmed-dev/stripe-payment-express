import { inject, injectable } from "inversify";
import { IPaymentMethodRepository} from "../interfaces/payment-method.repository";
import { IPaymentService } from "../interfaces/payment.service";
import { PaymentMethodMapper } from "../mappers/payment-method.mapper";
import TYPES from "../../config/types";


export interface AddPaymentMethodRequest {
  userId: string;
  paymentMethodToken: string;
  type: string;
  last4?: string;
  brand?: string;
  expMonth?: number;
  expYear?: number;
  createdAt: Date;
}

export interface AddPaymentMethodResponse {
  id: string;
  last4: string | undefined;
  brand: string | undefined;
}

@injectable()
export default class AddPaymentMethodUseCase {
  constructor(
    @inject(TYPES.PaymentRepository) private readonly paymentMethodRepository: IPaymentMethodRepository,
    @inject(TYPES.StripeService) private readonly paymentService: IPaymentService
  ) {}

  async execute(request : AddPaymentMethodRequest): Promise<AddPaymentMethodResponse> {

    const {userId, paymentMethodToken} = request;

    if (!userId || !paymentMethodToken) {
      throw new Error('Missing required fields: userId, paymentMethodToken');
    }

    const paymentMethodEntityToCreate = await this.paymentService.attachPaymentMethod(
      userId,
      paymentMethodToken
    );

    if (!paymentMethodEntityToCreate.isValid()) throw new Error('Invalid payment method data');

    const createdPaymentMethodEntity = await this.paymentMethodRepository.create(paymentMethodEntityToCreate);
    const response = PaymentMethodMapper.toAddPaymentMethodResponse(createdPaymentMethodEntity);

    return response;
  }
}
