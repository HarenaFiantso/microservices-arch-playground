'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { motion } from 'motion/react';

const categories = [
  { name: '361°', image: '/brands/361.png', slug: '361' },
  { name: 'Adidas', image: '/brands/adidas.png', slug: 'adidas' },
  { name: 'Anta', image: '/brands/anta.png', slug: 'anta' },
  { name: 'Jordan', image: '/brands/jordan.png', slug: 'jordan' },
  { name: 'Li-ning', image: '/brands/li-ning.png', slug: 'li-ning' },
  { name: 'Nike', image: '/brands/nike.png', slug: 'nike' },
  { name: 'Puma', image: '/brands/puma.png', slug: 'puma' },
  { name: 'Under Armour', image: '/brands/under-armour.png', slug: 'under-armour' },
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
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative my-10 overflow-hidden rounded-full bg-gray-100"
    >
      <div
        className="relative flex flex-wrap justify-between gap-1.5 rounded-2xl border border-white/20 p-2 text-sm"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl" />
        {categories.map((category, index) => {
          const isActive = category.slug === selectedCategory;
          return (
            <motion.button
              key={category.name}
              onClick={() => handleChange(category.slug)}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium transition-colors"
              style={{
                color: isActive ? '#111827' : 'rgba(75,85,99,0.85)',
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 100%)',
                    boxShadow:
                      '0 4px_16px_rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '50px',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                />
              )}
              {!isActive && (
                <motion.span
                  className="absolute inset-0 rounded-xl opacity-0 transition-opacity hover:opacity-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 100%)',
                  }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={16}
                  height={16}
                  className={`h-4 w-4 object-contain transition-all duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'
                  }`}
                />
                <span className="text-xs font-semibold tracking-wide whitespace-nowrap">{category.name}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
