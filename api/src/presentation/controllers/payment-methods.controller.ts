import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import AddPaymentMethodUseCase, { AddPaymentMethodRequest, AddPaymentMethodResponse } from '../../application/use-cases/add-payment-method';
import GetPaymentMethodsUseCase, { GetPaymentMethodsByUserIdRequest, GetPaymentMethodsByUserIdResponse } from '../../application/use-cases/get-payment-method-by-userid';
import GetPaymentMethodsByUserIdUseCase from '../../application/use-cases/get-payment-method-by-userid';
import TYPES from '../../config/types';

@injectable()
export default class PaymentMethodsController {
  constructor(
    @inject(TYPES.AddPaymentMethodUseCase)
    private readonly addPaymentMethodUseCase: AddPaymentMethodUseCase,

    @inject(TYPES.GetPaymentMethodsByUserIdUseCase)
    private readonly getPaymentMethodsUseCase: GetPaymentMethodsByUserIdUseCase
  ) {}
  
  async addPaymentMethod(
    req: Request<{}, {}, AddPaymentMethodRequest>,
    res: Response<AddPaymentMethodResponse>,
    next: NextFunction
  ): Promise<void> {
    const result = await this.addPaymentMethodUseCase.execute(req.body);
    res.status(201).json(result);
  }

  async getPaymentMethods(
    req: Request<GetPaymentMethodsByUserIdRequest>,
    res: Response<GetPaymentMethodsByUserIdResponse[]>,
    next: NextFunction
  ): Promise<void> {

    // Extract userId from route params
    const userId = req.params.userId;

    // Build the request DTO for your use case (populate userId)
    const request: GetPaymentMethodsByUserIdRequest = { userId };

    const paymentMethods = await this.getPaymentMethodsUseCase.execute(request);
    res.status(200).json(paymentMethods);
  }
}