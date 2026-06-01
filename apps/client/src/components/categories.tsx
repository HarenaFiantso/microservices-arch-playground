'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const categories = [
  {
    name: 'All',
    image: '/brands/all.png',
    slug: 'all',
  },
  {
    name: '361°',
    image: '/brands/361.png',
    slug: '361',
  },
  {
    name: 'Adidas',
    image: '/brands/adidas.png',
    slug: 'adidas',
  },
  {
    name: 'Anta',
    image: '/brands/anta.png',
    slug: 'anta',
  },
  {
    name: 'Converse',
    image: '/brands/converse.png',
    slug: 'converse',
  },
  {
    name: 'Jordan',
    image: '/brands/jordan.png',
    slug: 'jordan',
  },
  {
    name: 'Li-ning',
    image: '/brands/li-ning.png',
    slug: 'lining',
  },
  {
    name: 'New balance',
    image: '/brands/new-balance.png',
    slug: 'new-balance',
  },
  {
    name: 'Nike',
    image: '/brands/nike.png',
    slug: 'nike',
  },
  {
    name: 'Puma',
    image: '/brands/puma.png',
    slug: 'puma',
  },
  {
    name: 'Under Armour',
    image: '/brands/under-armour.png',
    slug: 'under-armour',
  },
];

export function Categories() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get('category');

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', value || 'all');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="my-10 grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-2 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {categories.map((category) => (
        <div
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1 ${
            category.slug === selectedCategory ? 'bg-white' : 'text-gray-500'
          }`}
          key={category.name}
          onClick={() => handleChange(category.slug)}
        >
          <Image src={category.image} alt={category.name} width={16} height={16} className="h-4 w-4 object-contain" />
          {category.name}
        </div>
      ))}
    </div>
  );
}
