import { prisma, Prisma } from '@kitro/product-db';
import { StripeProductType } from '@kitro/types';
import { Request, Response } from 'express';

import { producer } from '../utils/kafka';

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

  producer.send('product.created', { value: stripeProduct });
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Prisma.ProductUpdateInput = req.body;

  const updatedProduct = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });

  return res.status(200).json(updatedProduct);
};
