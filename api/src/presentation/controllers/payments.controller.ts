// controllers/PaymentsController.ts
import { Request, Response } from "express";
import { IPaymentService } from "../../application/contracts/services/payment.services";
import { BaseController } from "./base.controller";
import { inject, injectable } from "tsyringe";
import TYPES from "../../config/types";

@injectable()
export class PaymentsController extends BaseController {
  constructor(@inject(TYPES.PaymentService) private paymentService: IPaymentService) 
  {
    super();
  }

  async createPaymentIntent(req: Request, res: Response) {
    const result = await this.paymentService.createPaymentIntent(req.body);
    return this.created(res,result);
  }

  async createSetupIntent(req: Request, res: Response) {
    const result = await this.paymentService.createSetupIntent(req.body);
    return this.created(res,result);
  }

  async createRefund(req: Request, res: Response) {
    const result = await this.paymentService.createRefund(req.body);
    return this.created(res,result);
  }

}
