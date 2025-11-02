// routes/payment.routes.ts
import { Router } from "express";
import { container } from "../../../config/container";  
import TYPES from "../../../config/types";             
import { PaymentsController } from "../../controllers/payments.controller";
import { asyncHandler } from "../../middlewares/async-handler";

const router = Router();

// resolve by token, not class
const controller = container.resolve<PaymentsController>(TYPES.PaymentsController);

router.post(
  "/create-intent",
  asyncHandler(controller.createPaymentIntent.bind(controller))
);

router.post(
  "/setup-intent",
  asyncHandler(controller.createSetupIntent.bind(controller)) 
);

router.post(
  "/create-refund",
  asyncHandler(controller.createRefund.bind(controller)) 
);

export default router;
