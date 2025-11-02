import { Router } from "express";
import TYPES from "../../../config/types";
import { container } from '../../../config/container';
import { asyncHandler } from "../../middlewares/async-handler";
import {WebhookController} from "../../controllers/webhook.controller";

const router = Router();

// Resolve controller using tsyringe container and TYPES token
const controller = container.resolve<WebhookController>(TYPES.WebhookController);

// Define routes
router.post(
  '/stripe',
  asyncHandler(controller.handleStripeEvents.bind(controller))
);

export default router;