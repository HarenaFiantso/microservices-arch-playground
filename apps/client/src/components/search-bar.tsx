import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="hidden items-center gap-2 rounded-md border border-gray-200 px-3.5 py-2 transition-all duration-200 focus-within:border-gray-400 focus-within:shadow-sm sm:flex">
      <Search className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
      <input
        id="search"
        placeholder="Search..."
        className="placeholder:text-muted-foreground/60 text-foreground w-36 bg-transparent text-sm transition-all duration-300 outline-none focus:w-48"
      />
      <kbd className="bg-muted text-muted-foreground/70 hidden items-center gap-0.5 rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-medium select-none sm:inline-flex">
        ⌘K
      </kbd>
    </div>
  );
}
