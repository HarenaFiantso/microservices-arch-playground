'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { ShippingFormInputs, shippingFormSchema } from '@kitro/types';
import { ArrowRight, Building2, Mail, MapPin, Phone, User } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

const fields = [
  {
    id: 'name' as const,
    label: 'Full name',
    type: 'text',
    placeholder: 'Your name',
    icon: User,
  },
  {
    id: 'email' as const,
    label: 'Email address',
    type: 'email',
    placeholder: 'your.email@gmail.com',
    icon: Mail,
  },
  {
    id: 'phone' as const,
    label: 'Phone number',
    type: 'text',
    placeholder: '+261 00 00 000 00',
    icon: Phone,
  },
  {
    id: 'address' as const,
    label: 'Street address',
    type: 'text',
    placeholder: 'Your street address',
    icon: MapPin,
  },
  {
    id: 'city' as const,
    label: 'City',
    type: 'text',
    placeholder: 'Your city',
    icon: Building2,
  },
] satisfies {
  id: keyof ShippingFormInputs;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ElementType;
}[];

export function ShippingForm({ setShippingForm }: { setShippingForm: (data: ShippingFormInputs) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });

  const router = useRouter();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push('/cart?step=3', { scroll: false });
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit(handleShippingForm)}>
      <p className="mb-4 text-xs font-medium tracking-widest text-gray-400 uppercase">Shipping details</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map(({ id, label, type, placeholder, icon: Icon }) => {
          const hasError = !!errors[id];
          return (
            <div key={id} className={`flex flex-col gap-1 ${id === 'address' ? 'sm:col-span-2' : ''}`}>
              <label htmlFor={id} className="text-xs font-medium text-gray-500">
                {label}
              </label>
              <div className="relative">
                <Icon
                  className={`absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 transition-colors ${
                    hasError ? 'text-red-400' : 'text-gray-400'
                  }`}
                />
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  {...register(id)}
                  className={`w-full rounded-lg border bg-gray-50 py-2.5 pr-3 pl-9 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-offset-0 ${
                    hasError
                      ? 'border-red-200 focus:border-red-300 focus:ring-red-100'
                      : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                  }`}
                />
              </div>
              {hasError && <p className="flex items-center gap-1 text-xs text-red-500">{errors[id]?.message}</p>}
            </div>
          );
        })}
      </div>
      <button
        type="submit"
        className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 active:scale-[0.98]"
      >
        Continue to payment
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}
