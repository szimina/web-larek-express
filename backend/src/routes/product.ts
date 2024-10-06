import { Router } from 'express';
import { getProducts, createProduct, deleteProduct } from '../contollers/products';

const router = Router();
router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

export default router;
