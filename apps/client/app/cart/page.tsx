'use client';

import { Suspense, useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { ShippingFormInputs } from '@kitro/types';
import { ArrowRight, Check, Lock, Tag, Trash2, Truck } from 'lucide-react';

import { ShippingForm, StripePaymentForm } from '@/components';
import useCartStore from '@/stores/cart-store';

const steps = [
  { id: 1, title: 'Cart' },
  { id: 2, title: 'Shipping' },
  { id: 3, title: 'Payment' },
];

function CartContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();
  const [promoCode, setPromoCode] = useState('');

  const activeStep = parseInt(searchParams.get('step') || '1');

  const { cart, removeFromCart } = useCartStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * 0.1;
  const shipping = 10;
  const total = subtotal - discount + shipping;

  return (
    <div className="mx-auto mt-10 max-w-6xl px-4 pb-16">
      <h1 className="mb-8 text-center text-2xl font-medium text-gray-900">Your shopping cart</h1>
      <div className="mb-10 flex items-center justify-center gap-0">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-all duration-300 ${
                  step.id < activeStep
                    ? 'bg-gray-900 text-white'
                    : step.id === activeStep
                      ? 'bg-gray-900 text-white ring-4 ring-gray-900/10'
                      : 'border border-gray-200 bg-gray-100 text-gray-400'
                }`}
              >
                {step.id < activeStep ? <Check className="h-3.5 w-3.5" /> : step.id}
              </div>
              <span className={`text-sm font-medium ${step.id <= activeStep ? 'text-gray-900' : 'text-gray-400'}`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-4 h-px w-12 transition-all duration-500 ${
                  step.id < activeStep ? 'bg-gray-900' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {activeStep === 1 ? (
            <>
              <p className="mb-5 text-xs font-medium tracking-widest text-gray-400 uppercase">Items ({cart.length})</p>
              <div className="flex flex-col divide-y divide-gray-100">
                {cart.map((item) => (
                  <div
                    key={item.id + item.selectedSize + item.selectedColor}
                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                      <Image
                        src={(item.images as Record<string, string>)?.[item.selectedColor] || ''}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">{item.name}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">
                          Qty: {item.quantity}
                        </span>
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">
                          Size: {item.selectedSize}
                        </span>
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">
                          {item.selectedColor}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      aria-label="Remove item"
                      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-400 transition-all duration-200 hover:border-red-200 hover:bg-red-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {cart.length === 0 && <p className="py-12 text-center text-sm text-gray-400">Your cart is empty.</p>}
              </div>
            </>
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <StripePaymentForm shippingForm={shippingForm} />
          ) : (
            <p className="py-8 text-center text-sm text-gray-400">Please fill in the shipping form to continue.</p>
          )}
        </div>
        <div className="flex w-full flex-col gap-4 lg:sticky lg:top-8 lg:w-90">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-5 text-xs font-medium tracking-widest text-gray-400 uppercase">Order summary</p>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal ({cart.length} items)</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount (10%)</span>
                <span className="font-medium text-emerald-600">−${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
              </div>
            </div>
            <div className="my-4 border-t border-gray-100" />
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Total</span>
              <span className="text-lg font-medium text-gray-900">${total.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-3 pl-9 text-sm text-gray-900 placeholder-gray-400 transition outline-none focus:border-gray-400 focus:bg-white"
                />
              </div>
              <button className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95">
                Apply
              </button>
            </div>
            {activeStep === 1 && (
              <button
                onClick={() => router.push('/cart?step=2', { scroll: false })}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.98]"
              >
                Continue to shipping
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
            <div className="mt-3 flex items-center justify-center gap-1.5">
              <Lock className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-400">Secure checkout</span>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
              <Truck className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Free shipping on orders over $150</p>
              <p className="mt-0.5 text-xs text-gray-400">
                Your order qualifies — estimated delivery in 3–5 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto mt-20 max-w-6xl px-4 text-center text-sm text-gray-400">
          Loading checkout details...
        </div>
      }
    >
      <CartContent />
    </Suspense>
  );
}
