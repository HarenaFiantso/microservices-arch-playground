'use client';

import { Suspense, useEffect, useRef, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Search } from 'lucide-react';

import { useDebounce } from '@/hooks/use-debounce';

function SearchBar() {
  const [value, setValue] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const debouncedValue = useDebounce(value, 400);
  const prevDebouncedValue = useRef(debouncedValue);

  useEffect(() => {
    if (prevDebouncedValue.current === debouncedValue && pathname !== '/products') {
      return;
    }
    prevDebouncedValue.current = debouncedValue;

    if (!isDirty) return;

    const currentSearch = searchParams.get('search') || '';
    if (currentSearch === debouncedValue) return;

    const params = new URLSearchParams(searchParams);

    if (debouncedValue.trim()) {
      params.set('search', debouncedValue);
    } else {
      params.delete('search');
    }

    if (pathname === '/products') {
      router.replace(`/products?${params.toString()}`, {
        scroll: false,
      });
    } else {
      router.push(`/products?${params.toString()}`);
    }
  }, [debouncedValue, isDirty, router, searchParams, pathname]);

  return (
    <div className="hidden items-center gap-2 rounded-md border border-gray-200 px-3.5 py-2 transition-all duration-200 focus-within:border-gray-400 focus-within:shadow-sm sm:flex">
      <Search className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
      <input
        id="search"
        value={value}
        placeholder="Search products..."
        className="placeholder:text-muted-foreground/60 text-foreground w-36 bg-transparent text-sm transition-all duration-300 outline-none focus:w-48"
        onChange={(e) => {
          setValue(e.target.value);
          setIsDirty(true);
        }}
      />
      <kbd className="bg-muted text-muted-foreground/70 hidden items-center gap-0.5 rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-medium select-none sm:inline-flex">
        ⌘K
      </kbd>
    </div>
  );
}

export function SearchBarWrapper() {
  return (
    <Suspense fallback={<div className="h-10 w-80 rounded-md border border-gray-200 bg-gray-50" />}>
      <SearchBar />
    </Suspense>
  );
}
