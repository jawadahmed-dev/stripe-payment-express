// controllers/WebhookController.ts
import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { IPaymentService } from "../../application/contracts/services/payment.services";
import { PaymentMapper } from "../mappers/payment-mapper";
import { inject, injectable } from "tsyringe";
import TYPES from "../../config/types";

@injectable()
export class WebhookController extends BaseController {
  constructor(@inject(TYPES.PaymentService) private paymentService: IPaymentService) {
    super();
  }

  async handleStripeEvents(req: Request, res: Response) {
    const signature = req.headers["stripe-signature"] as string;
    const rawBody = req.body as Buffer; // express.raw gives Buffer

    const webhookEvent = PaymentMapper.ToHandleWebhookEventCommand(rawBody, signature);

    await this.paymentService.handleWebhookEvent(webhookEvent);

    return this.ok(res, true);
  }
}
