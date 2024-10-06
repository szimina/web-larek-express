import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import orderSchema from '../models/order';
import registerOrder from '../contollers/order';

const router = Router();

const userOrderValidator = celebrate({
  [Segments.BODY]: orderSchema,
});

router.post('/', userOrderValidator, registerOrder);

export default router;
