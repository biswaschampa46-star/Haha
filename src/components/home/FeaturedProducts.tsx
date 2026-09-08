import Link from "next/link";
import type { ProductDTO } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/Reveal";

export default function FeaturedProducts({ products }: { products: ProductDTO[] }) {
  if (products.length === 0) return null;
  const [primary, ...rest] = products;
  const secondary = rest.slice(0, 3);

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold text-[#f4faff]">
              This season&apos;s edit
            </h2>
          </div>
          <Link href="/shop" className="editorial-link">
            View All
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
          {primary ? (
            <Reveal as="div" className="lg:col-span-7">
              <ProductCard product={primary} priority aspect="aspect-[4/5] lg:aspect-[16/13]" sizes="(min-width: 1024px) 55vw, 90vw" />
            </Reveal>
          ) : null}

          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {secondary.map((product, index) => (
              <Reveal key={product.id} delay={index * 100}>
                <ProductCard product={product} aspect="aspect-[4/5]" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
