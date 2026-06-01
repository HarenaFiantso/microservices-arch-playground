import { Router } from 'express';

import { createProduct } from '../controllers/product.controller';

const router: Router = Router();

router.post('/', createProduct);

export default router;
