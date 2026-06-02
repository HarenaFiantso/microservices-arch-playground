'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ProductType } from '@kitro/types';
import { ShoppingCart } from 'lucide-react';

export function ProductCard({ product }: { product: ProductType }) {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0]!,
    color: product.colors[0]!,
  });

  const handleProductType = ({ type, value }: { type: 'size' | 'color'; value: string }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-3/3">
          <Image
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={(product.images as Record<string, string>)?.[productTypes.color] || ''}
            alt={product.name}
            fill
            className="object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="rounded-md px-2 py-1 ring ring-gray-300"
              onChange={(e) => handleProductType({ type: 'size', value: e.target.value })}
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  className={`cursor-pointer border ${
                    productTypes.color === color ? 'border-gray-400' : 'border-gray-200'
                  } rounded-full p-[1.2px]`}
                  key={color}
                  onClick={() => handleProductType({ type: 'color', value: color })}
                >
                  <div className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: color }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:bg-black hover:text-white">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
