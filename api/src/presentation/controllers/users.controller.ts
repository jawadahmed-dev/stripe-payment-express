// controllers/PaymentsController.ts
import { Request, Response } from "express";
import { IPaymentService } from "../../application/contracts/services/payment.services";
import { BaseController } from "./base.controller";
import { inject, injectable } from "tsyringe";
import TYPES from "../../config/types";

@injectable()
export class UsersController extends BaseController {
  constructor(@inject(TYPES.PaymentService) private paymentService: IPaymentService) 
  {
    super();
  }

  async getPaymentMethods(req: Request, res: Response) {
    const userId = req.params.userId as string;
    const result = await this.paymentService.getPaymentMethods(userId);
    return this.ok(res,result);
  }

}
