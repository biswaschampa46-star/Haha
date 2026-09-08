import Link from "next/link";
import CategoryNav from "@/components/home/CategoryNav";
import ProductCard from "@/components/product/ProductCard";
import SortSelect from "@/components/shop/SortSelect";
import Reveal from "@/components/Reveal";
import { queryProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
}) {
  const params = await searchParams;
  const category = params.category ?? "all";
  const sort = params.sort ?? "featured";

  const products = await queryProducts({
    category: category === "new" ? undefined : category,
    isNew: category === "new" || undefined,
    sort,
    q: params.q,
  });

  return (
    <div className="pt-28">
      <div className="px-5 pb-10 pt-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Shop</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.5rem)] font-semibold text-[#f4faff]">
          The full collection
        </h1>
      </div>

      <CategoryNav active={category} />

      <div className="flex items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <p className="text-xs text-[#7d94a8]">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        <SortSelect current={sort} />
      </div>

      <div className="px-5 pb-24 sm:px-8 lg:px-12">
        {products.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl text-[#f4faff]">No products found</p>
            <p className="text-sm text-[#a8c0d5]">Try a different category or clear your filters.</p>
            <Link href="/shop" className="editorial-link">
              View All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 80}>
                <ProductCard product={product} aspect="aspect-[4/5]" />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
