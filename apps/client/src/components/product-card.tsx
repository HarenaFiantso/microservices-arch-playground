import { ProductType } from '@kitro/types';

interface ProductCardProps {
  key: number;
  product: ProductType;
}

export function ProductCard({ key, product }: ProductCardProps) {
  console.log(key, product);

  return <h1>Product card</h1>;
}
