import { ReturnClient } from '@/components';

export default async function ReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }> | undefined;
}) {
  const session_id = (await searchParams)?.session_id;

  if (!session_id) {
    return <div>No session id found!</div>;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`);
  const data = await res.json();

  return <ReturnClient status={data.status} paymentStatus={data.paymentStatus} />;
}
