import { IPaymentMethodRepository} from "../interfaces/payment-method.repository";
import { IPaymentService } from "../interfaces/payment.service";
import { PaymentMethodMapper } from "../mappers/payment-method.mapper";


export interface AddPaymentMethodRequest {
  userId: string;
  customerId:string;
  paymentMethodId: string;
}

export interface AddPaymentMethodResponse {
  id: string;
  last4: string | undefined;
  brand: string | undefined;
}

export default class AddPaymentMethodUseCase {
  constructor(
    private readonly paymentMethodRepository: IPaymentMethodRepository,
    private readonly paymentService: IPaymentService
  ) {}

  async execute(request : AddPaymentMethodRequest): Promise<AddPaymentMethodResponse> {

    const {customerId, paymentMethodId, userId} = request;

    const stripePaymentMethod = await this.paymentService.attachPaymentMethod(
      customerId,
      paymentMethodId
    );

    const paymentMethodToCreate =  PaymentMethodMapper.fromDTO(stripePaymentMethod, userId);
    const createdPaymentMethod = await this.paymentMethodRepository.create(paymentMethodToCreate);
    const response = PaymentMethodMapper.toAddPaymentMethodResponse(createdPaymentMethod);

    return response;
  }
}
