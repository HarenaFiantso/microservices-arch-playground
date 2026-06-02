'use client';

import { useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ProductType } from '@kitro/types';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';

import useCartStore from '@/stores/cart-store';

export function ProductInteraction({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleParamChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success('Product added to cart');
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">Size</span>
          <span className="text-xs text-neutral-600 dark:text-neutral-300">{selectedSize.toUpperCase()}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {product.sizes.map((size) => {
            const isActive = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => handleParamChange('size', size)}
                className={[
                  'flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-full border px-2.5 text-xs font-bold transition-all duration-150',
                  isActive
                    ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:border-neutral-400',
                ].join(' ')}
              >
                {size.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">Colors</span>
        </div>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              title={color}
              onClick={() => handleTypeChange('color', color)}
              className={`cursor-pointer rounded-full p-[2.5px] transition-all duration-150 ${
                selectedColor === color
                  ? 'ring-2 ring-gray-600 ring-offset-1'
                  : 'ring-1 ring-gray-200 hover:ring-gray-400'
              }`}
            >
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">Quantity</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer border border-gray-300 p-1"
            onClick={() => handleQuantityChange('decrement')}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border border-gray-300 p-1"
            onClick={() => handleQuantityChange('increment')}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-700 active:scale-95"
      >
        <ShoppingCart className="h-3.5 w-3.5" />
        Add to Cart
      </button>
    </div>
  );
}
