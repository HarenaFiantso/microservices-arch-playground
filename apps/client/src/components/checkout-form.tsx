'use client';

import { useState } from 'react';

import { ShippingFormInputs } from '@kitro/types';
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js';
import { ConfirmError } from '@stripe/stripe-js';
import { AlertCircle, Loader2, ShieldCheck } from 'lucide-react';

export function CheckoutForm({ shippingForm }: { shippingForm: ShippingFormInputs }) {
  const checkout = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    await checkout.updateEmail(shippingForm.email);
    await checkout.updateShippingAddress({
      name: 'shipping_address',
      address: {
        line1: shippingForm.address,
        city: shippingForm.city,
        country: 'US',
      },
    });
    const res = await checkout.confirm();
    if (res.type === 'error') {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <PaymentElement
        options={{
          layout: 'accordion',
        }}
      />

      {error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-100 bg-red-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <p className="text-sm text-red-600">{error.message}</p>
        </div>
      )}

      <button
        type="button"
        disabled={loading}
        onClick={handleClick}
        className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Processing payment…
          </>
        ) : (
          <>
            <ShieldCheck className="h-3.5 w-3.5" />
            Pay now
          </>
        )}
      </button>
    </form>
  );
}
