'use client';

import Link from 'next/link';

import { ShoppingCartIcon } from 'lucide-react';

import useCartStore from '@/stores/cart-store';

export function ShoppingCart() {
  const { cart, hasHydrated } = useCartStore();

  if (!hasHydrated) return null;

  return (
    <Link href="/cart" className="relative cursor-pointer">
      <ShoppingCartIcon className="h-4 w-4 text-gray-600" />
      <span className="absolute -top-5 -right-5 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 p-3 text-xs font-bold text-white">
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </Link>
  );
}
