import { PaymentMethodType } from "../../domain/enums/payment-method.enum";
import { IPaymentMethodRepository } from "../interfaces/payment-method.repository";
import { PaymentMethodMapper } from "../mappers/payment-method.mapper";

export interface GetPaymentMethodsByUserIdRequest {
  userId: string;
}

export interface GetPaymentMethodsByUserIdResponse {
  id: string;
  last4?: string;
  brand?: string;
  expMonth?: number;
  expYear?: number;
  type: PaymentMethodType;
}

export default class GetPaymentMethodsByUserIdUseCase {
  constructor(
    private readonly paymentMethodRepository: IPaymentMethodRepository
  ) {}

  async execute(request: GetPaymentMethodsByUserIdRequest): Promise<GetPaymentMethodsByUserIdResponse[]> {
    const { userId } = request;

    if (!userId) throw new Error("Missing required field: userId");

    const entities = await this.paymentMethodRepository.findByUserId(userId);

    return entities.map(PaymentMethodMapper.toGetPaymentMethodResponse);
  }
}
