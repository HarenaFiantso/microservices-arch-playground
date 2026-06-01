import Link from 'next/link';

import { Bell, Footprints, Home, ShoppingCartIcon } from 'lucide-react';

import { SearchBar } from './search-bar';

export function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-gray-200 pb-4">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="bg-foreground flex h-6 w-6 items-center justify-center rounded-lg md:h-9 md:w-9">
          <Footprints className="text-background h-3.5 w-3.5 md:h-5 md:w-5" strokeWidth={1.75} />
        </div>
        <p className="hidden text-xl font-bold tracking-[0.18em] md:block">KITRO.</p>
      </Link>
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href="/">
          <Home className="h-4 w-4 text-gray-600" />
        </Link>
        <Bell className="h-4 w-4 text-gray-600" />
        <ShoppingCartIcon className="h-4 w-4 text-gray-600" />
      </div>
    </nav>
  );
}
