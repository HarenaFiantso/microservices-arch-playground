'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ProductType } from '@kitro/types';
import { ShoppingCart } from 'lucide-react';

type ProductCardProduct = ProductType & {
  discount?: number;
  isNew?: boolean;
  stock?: number;
};

export function ProductCard({ product }: { product: ProductCardProduct }) {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0]!,
    color: product.colors[0]!,
  });

  const handleProductType = ({ type, value }: { type: 'size' | 'color'; value: string }) => {
    setProductTypes((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-white">
          <Image
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={(product.images as Record<string, string>)?.[productTypes.color] || ''}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-3 p-4">
        <Link href={`/products/${product.id}`}>
          <h2 className="text-sm leading-snug font-semibold text-gray-900 hover:underline">{product.name}</h2>
        </Link>
        <p className="mt-0.5 line-clamp-1 text-xs text-gray-400">{product.shortDescription}</p>
        <div className="flex items-end gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Size</span>
            <select
              name="size"
              id="size"
              className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors outline-none focus:border-gray-400"
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
            <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Color</span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color}
                  title={color}
                  onClick={() => handleProductType({ type: 'color', value: color })}
                  className={`rounded-full p-[2.5px] transition-all duration-150 ${
                    productTypes.color === color
                      ? 'ring-2 ring-gray-600 ring-offset-1'
                      : 'ring-1 ring-gray-200 hover:ring-gray-400'
                  }`}
                >
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>
          </div>
          <button className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-700 active:scale-95">
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
