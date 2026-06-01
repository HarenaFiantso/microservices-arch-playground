import Link from 'next/link';

import { Footprints } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-16 flex items-center justify-between rounded-lg bg-gray-800 px-8 py-6">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white md:h-9 md:w-9">
          <Footprints className="h-3.5 w-3.5 text-gray-800 md:h-5 md:w-5" strokeWidth={1.75} />
        </div>
        <p className="hidden text-xl font-bold tracking-[0.18em] text-white md:block">KITRO.</p>
      </Link>
      <p className="text-sm text-gray-400">© {currentYear} Kitro. All rights reserved.</p>
    </div>
  );
}
