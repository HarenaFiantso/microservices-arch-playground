import { prisma, Prisma } from '@kitro/product-db';
import { StripeProductType } from '@kitro/types';
import { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;

  const { colors, images } = data;
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return res.status(400).json({ message: 'Colors array is required!' });
  }

  if (!images || typeof images !== 'object') {
    return res.status(400).json({ message: 'Images object is required!' });
  }

  const missingColors = colors.filter((color) => !(color in images));

  if (missingColors.length > 0) {
    return res.status(400).json({ message: 'Missing images for colors!', missingColors });
  }

  const product = await prisma.product.create({ data });

  const stripeProduct: StripeProductType = {
    id: product.id.toString(),
    name: product.name,
    price: product.price,
  };

  res.status(201).json(product);
};
