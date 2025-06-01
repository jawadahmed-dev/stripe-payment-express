import { Router } from 'express';
import container from '../../config/container';
import PaymentMethodsController from '../controllers/payment-methods.controller';


const router = Router();
const controller = container.get<PaymentMethodsController>(Symbol.for('PaymentMethodsController'));

// Routes for payment methods
router.post('/', controller.addPaymentMethod.bind(controller));
router.get('/:userId', controller.getPaymentMethods.bind(controller));

const paymentMethodRoutes = router;
export default paymentMethodRoutes;