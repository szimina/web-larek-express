import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { getProducts, createProduct, deleteProduct } from '../controllers/products';
import { productBodyValidation, idToDeleteValidation } from '../middlewares/validation';

const productBodyValidator = celebrate({
  [Segments.BODY]: productBodyValidation,
});

const idToDeleteValidator = celebrate({
  [Segments.PARAMS]: idToDeleteValidation,
});

const router = Router();

router.get('/', getProducts);
router.post('/', productBodyValidator, createProduct);
router.delete('/:id', idToDeleteValidator, deleteProduct);

export default router;
