import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/Reveal";
import { queryProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const products = q ? await queryProducts({ q }) : [];

  return (
    <div className="min-h-[70vh] px-5 pb-24 pt-32 sm:px-8 lg:px-12">
      <p className="eyebrow">Search</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] font-semibold text-[#f4faff]">
        {q ? `Results for “${q}”` : "Search the collection"}
      </h1>

      {q && products.length === 0 ? (
        <p className="mt-10 text-sm text-[#a8c0d5]">No products matched your search.</p>
      ) : null}

      <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <Reveal key={product.id} delay={(index % 4) * 80}>
            <ProductCard product={product} aspect="aspect-[4/5]" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
