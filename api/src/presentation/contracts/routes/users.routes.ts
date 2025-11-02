// routes/payment.routes.ts
import { Router } from "express";
import { container } from "../../../config/container";  
import TYPES from "../../../config/types";             
import { asyncHandler } from "../../middlewares/async-handler";
import { UsersController } from "../../controllers/users.controller";

const router = Router();

// resolve by token, not class
const controller = container.resolve<UsersController>(TYPES.UsersController);

router.get(
  "/:userId/payment-methods",
  asyncHandler(controller.getPaymentMethods.bind(controller))
);


export default router;
