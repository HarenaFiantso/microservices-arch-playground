import { ProductList } from '@/components';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string; sort: string; search: string }>;
}) {
  const category = (await searchParams).category;
  const sort = (await searchParams).sort;
  const search = (await searchParams).search;
  return <ProductList category={category} sort={sort} search={search} params="products" />;
}
