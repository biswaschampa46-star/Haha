import Link from "next/link";
import type { ProductDTO } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/Reveal";

export default function NewArrivals({ products }: { products: ProductDTO[] }) {
  if (products.length === 0) return null;

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Just In</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold text-[#f4faff]">
              New arrivals
            </h2>
          </div>
          <Link href="/shop?category=new" className="editorial-link">
            Shop New
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4">
          {products.slice(0, 4).map((product, index) => (
            <Reveal key={product.id} delay={index * 90} className={index % 3 === 1 ? "sm:mt-10" : ""}>
              <ProductCard product={product} aspect="aspect-[3/4]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
