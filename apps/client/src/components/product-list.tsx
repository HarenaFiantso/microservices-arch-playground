import { Suspense } from 'react';

import Link from 'next/link';

import { ProductType } from '@kitro/types';

import { Categories } from './categories';
import { Filter } from './filter';
import { ProductCard } from './product-card';

interface ProductListProps {
  category: string;
  sort?: string;
  search?: string;
  params: 'homepage' | 'products';
}

const fetchData = async ({
  category,
  sort,
  search,
  params,
}: {
  category?: string;
  sort?: string;
  search?: string;
  params: 'homepage' | 'products';
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?${category ? `category=${category}` : ''}${search ? `&search=${search}` : ''}&sort=${sort || 'newest'}${params === 'homepage' ? '&limit=8' : ''}`
  );
  const data: ProductType[] = await res.json();
  return data;
};

export async function ProductList({ category, sort, search, params }: ProductListProps) {
  const products = await fetchData({ category, sort, search, params });

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
        {products.length === 0
          ? 'No products found'
          : products.map((product) => <ProductCard key={product.id} product={product} />)}
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
