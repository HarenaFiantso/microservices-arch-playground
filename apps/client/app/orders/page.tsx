import { auth } from '@clerk/nextjs/server';
import { OrderType } from '@kitro/types';

const fetchOrders = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/user-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: OrderType[] = await res.json();
  return data;
};

export default async function OrdersPage() {
  const orders = await fetchOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase">No orders found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl bg-white px-8 py-12">
      <div className="mb-12 border-b border-neutral-100 pb-8">
        <p className="mb-2 text-[10px] tracking-[0.3em] text-neutral-400 uppercase">Account</p>
        <h1 className="text-2xl font-light tracking-tight text-neutral-900">Orders</h1>
      </div>
      <div className="mb-3 grid grid-cols-[2fr_1fr_1fr_1fr_3fr] gap-6 px-4">
        {['Order ID', 'Total', 'Status', 'Date', 'Products'].map((h) => (
          <span key={h} className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
            {h}
          </span>
        ))}
      </div>
      <div className="mb-1 h-px bg-neutral-100" />
      <ul>
        {orders.map((order, i) => {
          const isPaid = order.status?.toLowerCase() === 'paid';
          const isPending = order.status?.toLowerCase() === 'pending';

          return (
            <li
              key={order._id}
              className="group grid grid-cols-[2fr_1fr_1fr_1fr_3fr] gap-6 border-b border-neutral-50 px-4 py-4 transition-colors duration-150 hover:bg-neutral-50"
            >
              <span className="truncate font-mono text-xs text-neutral-400 transition-colors group-hover:text-neutral-600">
                {order._id}
              </span>
              <span className="text-sm text-neutral-800 tabular-nums">${(order.amount / 100).toFixed(2)}</span>
              <span
                className={`inline-flex w-fit items-center gap-1.5 text-xs tracking-wide ${
                  isPaid ? 'text-neutral-800' : isPending ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${
                    isPaid ? 'bg-neutral-800' : isPending ? 'bg-neutral-300' : 'bg-neutral-400'
                  }`}
                />
                {order.status}
              </span>
              <span className="text-sm text-neutral-500 tabular-nums">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : '—'}
              </span>
              <span className="truncate text-sm text-neutral-500">
                {order.products?.map((p) => p.name).join(', ') || '—'}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 px-4">
        <p className="text-[10px] tracking-[0.2em] text-neutral-300 uppercase">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </p>
      </div>
    </div>
  );
}
