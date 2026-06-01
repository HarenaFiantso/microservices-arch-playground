import { Banner, ProductList } from '@/components';

export default async function Home({ searchParams }: { searchParams: Promise<{ category: string }> }) {
  const category = (await searchParams).category;
  return (
    <main>
      <Banner />
      <ProductList category={category} params="homepage" />
    </main>
  );
}
