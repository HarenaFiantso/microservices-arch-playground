import { Router } from 'express';

import { createProduct, updateProduct } from '../controllers/product.controller';
import { shouldBeAdmin } from '../middleware/auth.middleware';

const router: Router = Router();

router.post('/', createProduct);
router.put('/:id', shouldBeAdmin, updateProduct);

export default router;
