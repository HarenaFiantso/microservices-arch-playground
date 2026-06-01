import { Prisma, prisma } from '@kitro/product-db';
import { Request, Response } from 'express';

export const createCategory = async (req: Request, res: Response) => {
  const data: Prisma.CategoryCreateInput = req.body;

  const category = await prisma.category.create({ data });
  res.status(201).json(category);
};
