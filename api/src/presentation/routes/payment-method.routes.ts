import { Router } from 'express';
import { container } from '../../config/container';
import TYPES from '../../config/types'; // import your TYPES object
import PaymentMethodsController from '../controllers/payment-methods.controller';
import { asyncHandler } from '../middlewares/async-handler';
import { GetPaymentMethodsByUserIdResponse } from '../../application/use-cases/get-payment-method-by-userid';

const router = Router();

// Resolve controller using tsyringe container and TYPES token
const controller = container.resolve<PaymentMethodsController>(
  TYPES.PaymentMethodsController
);

// Define routes
router.post('/', asyncHandler(controller.addPaymentMethod.bind(controller)));
router.get(
  '/:userId',
  asyncHandler<{ userId: string }, GetPaymentMethodsByUserIdResponse[]>(
    controller.getPaymentMethods.bind(controller)
  )
);


const paymentMethodRoutes = router;
export default paymentMethodRoutes;
