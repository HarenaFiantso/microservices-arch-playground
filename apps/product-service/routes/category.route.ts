import { Router } from 'express';

import { createCategory, deleteCategory, updateCategory } from '../controllers/category.controller';
import { shouldBeAdmin } from '../middleware/auth.middleware';

const router: Router = Router();

router.post('/', shouldBeAdmin, createCategory);
router.put('/:id', shouldBeAdmin, updateCategory);
router.delete('/:id', shouldBeAdmin, deleteCategory);

export default router;
