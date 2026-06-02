import Image from 'next/image';

import { ProductType } from '@kitro/types';

import { ProductInteraction } from '@/components';

const fetchProduct = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`);
  const data: ProductType = await res.json();
  return data;
};

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await fetchProduct(id);
  return {
    title: product.name,
    description: product.description,
  };
};

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}) {
  const { size, color } = await searchParams;
  const { id } = await params;

  const product = await fetchProduct(id);

  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);

  const productImage = (product.images as Record<string, string>)?.[selectedColor] || '';

  return (
    <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-8 px-4 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-3">
        <div className="relative aspect-3/4 w-full">
          <Image src={productImage} alt={product.name} fill className="rounded-md object-contain" />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="mb-3 text-3xl leading-tight font-semibold text-neutral-900">{product.name}.</h1>
        <p className="mb-5 text-sm leading-relaxed font-light text-neutral-500">{product.description}</p>
        <hr className="mb-5 border-neutral-200" />
        <div className="mb-6 flex items-baseline gap-3">
          <span className="text-2xl font-semibold tracking-tight text-neutral-900">${product.price.toFixed(2)}</span>
        </div>
        <ProductInteraction product={product} selectedSize={selectedSize} selectedColor={selectedColor} />
      </div>
    </div>
  );
}
