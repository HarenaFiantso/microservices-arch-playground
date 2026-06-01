import { Suspense } from 'react';

import Link from 'next/link';

import { productsMock } from '@/data/products';

import { Categories } from './categories';
import { Filter } from './filter';
import { ProductCard } from './product-card';

interface ProductListProps {
  category: string;
  sort?: string;
  search?: string;
  params: 'homepage' | 'products';
}

export async function ProductList({ category, params }: ProductListProps) {
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="my-10 grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-7.5 animate-pulse rounded-md bg-gray-200" />
            ))}
          </div>
        }
      >
        <Categories />
      </Suspense>
      {params === 'products' && <Filter />}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {productsMock.length === 0
          ? 'No products found'
          : productsMock.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <Link
        href={category ? `/products/?category=${category}` : '/products'}
        className="mt-4 flex justify-end text-sm text-gray-500 underline"
      >
        View all products
      </Link>
    </div>
  );
}
