'use client';

import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '@clerk/nextjs';
import { CartItemsType, ShippingFormInputs } from '@kitro/types';
import { CheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Lock } from 'lucide-react';

import useCartStore from '@/stores/cart-store';

import { CheckoutForm } from './checkout-form';

const fetchClientSecret = async (cart: CartItemsType, token: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`, {
    method: 'POST',
    body: JSON.stringify({ cart }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => json.checkoutSessionClientSecret);
};

function PaymentSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-5">
      <p className="text-xs font-medium tracking-widest text-gray-400 uppercase">Payment details</p>
      <div className="flex flex-col gap-1.5">
        <div className="h-3.5 w-24 rounded-md bg-gray-100" />
        <div className="h-10 w-full rounded-lg bg-gray-100" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="h-3.5 w-20 rounded-md bg-gray-100" />
          <div className="h-10 w-full rounded-lg bg-gray-100" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-3.5 w-16 rounded-md bg-gray-100" />
          <div className="h-10 w-full rounded-lg bg-gray-100" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="h-3.5 w-28 rounded-md bg-gray-100" />
        <div className="h-10 w-full rounded-lg bg-gray-100" />
      </div>
      <div className="mt-2 h-11 w-full rounded-xl bg-gray-100" />
      <div className="flex items-center justify-center gap-1.5">
        <div className="h-3 w-3 rounded-full bg-gray-100" />
        <div className="h-3 w-40 rounded-md bg-gray-100" />
      </div>
    </div>
  );
}

export function StripePaymentForm({ shippingForm }: { shippingForm: ShippingFormInputs }) {
  const { cart } = useCartStore();
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const { getToken } = useAuth();

  const stripePromise = useMemo(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
      return null;
    }
    return loadStripe(key);
  }, []);

  useEffect(() => {
    getToken()
      .then((t) => {
        console.log('Token:', t);
        setToken(t);
      })
      .finally(() => setTokenLoading(false));
  }, [getToken]);

  if (!token || tokenLoading) return <PaymentSkeleton />;

  return (
    <div className="flex flex-col gap-1">
      <p className="mb-4 text-xs font-medium tracking-widest text-gray-400 uppercase">Payment details</p>

      <CheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret: () => fetchClientSecret(cart, token),
        }}
      >
        <CheckoutForm shippingForm={shippingForm} />
      </CheckoutProvider>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        <Lock className="h-3 w-3 text-gray-400" />
        <span className="text-xs text-gray-400">Payments are encrypted and secured by Stripe</span>
      </div>
    </div>
  );
}
