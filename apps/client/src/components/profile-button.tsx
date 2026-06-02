'use client';

import { useRouter } from 'next/navigation';

import { UserButton } from '@clerk/nextjs';
import { ShoppingBag } from 'lucide-react';

export function ProfileButton() {
  const router = useRouter();
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="See Orders"
          labelIcon={<ShoppingBag className="h-4 w-4" />}
          onClick={() => router.push('/orders')}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
