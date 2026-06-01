import { Suspense } from 'react';

import { Categories } from './categories';

export function ProductList() {
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
      <p>Something</p>
    </div>
  );
}
