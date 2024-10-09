import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { orderBodyValidation } from '../middlewares/validation';
import registerOrder from '../controllers/order';

const userOrderValidator = celebrate({
  [Segments.BODY]: orderBodyValidation,
});

const router = Router();

router.post('/', userOrderValidator, registerOrder); // проблема в registerOrder

export default router;
