import { Router } from 'express';

import { createCategory } from '../controllers/category.controller';
import { shouldBeAdmin } from '../middleware/auth.middleware';

const router: Router = Router();

router.post('/', shouldBeAdmin, createCategory);

export default router;
