import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { getProducts, createProduct, deleteProduct } from '../contollers/products';
import registerOrder from '../contollers/order';
import { orderBodyValidation, productBodyValidation } from '../middlewares/validation';

const userOrderValidator = celebrate({
  [Segments.BODY]: orderBodyValidation,
});

const productBodyValidator = celebrate({
  [Segments.BODY]: productBodyValidation,
});

const router = Router();
router.get('/product', getProducts);
router.post('/product', productBodyValidator, createProduct);
router.delete('/product/:id', deleteProduct);

router.post('/order', userOrderValidator, registerOrder);

export default router;
