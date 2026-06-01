import { Router } from 'express';

import { createCategory, updateCategory } from '../controllers/category.controller';
import { shouldBeAdmin } from '../middleware/auth.middleware';

const router: Router = Router();

router.post('/', shouldBeAdmin, createCategory);
router.put('/:id', shouldBeAdmin, updateCategory);

export default router;
