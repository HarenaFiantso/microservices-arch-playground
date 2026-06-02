import Link from 'next/link';

import { Footprints, Home } from 'lucide-react';

import { SearchBarWrapper } from './search-bar';
import { ShoppingCart } from './shopping-cart';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-200 bg-white/75 py-4 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="bg-foreground flex h-6 w-6 items-center justify-center rounded-lg md:h-9 md:w-9">
          <Footprints className="text-background h-3.5 w-3.5 md:h-5 md:w-5" strokeWidth={1.75} />
        </div>
        <p className="hidden text-xl font-bold tracking-[0.18em] md:block">KITRO.</p>
      </Link>
      <div className="flex items-center gap-6">
        <SearchBarWrapper />
        <Link href="/">
          <Home className="h-4 w-4 text-gray-600" />
        </Link>
        <ShoppingCart />
      </div>
    </nav>
  );
}
