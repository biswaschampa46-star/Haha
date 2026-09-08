import Image from "next/image";
import Link from "next/link";
import type { ProductDTO } from "@/lib/types";
import Price from "./Price";
import Badge from "./Badge";

export default function ProductCard({
  product,
  priority = false,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw",
}: {
  product: ProductDTO;
  priority?: boolean;
  aspect?: string;
  sizes?: string;
}) {
  const image = product.images[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="focus-ring group block"
      aria-label={`View ${product.name}`}
    >
      <div className={`relative w-full overflow-hidden rounded-[4px] bg-[#0b263d] ${aspect}`}>
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(7,26,43,0.35)] via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew ? <Badge label="NEW" /> : null}
          {product.isLimited ? <Badge label="LIMITED" /> : null}
          {!product.isNew && !product.isLimited && product.compareAtCents ? <Badge label="SALE" /> : null}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-1.5 transition-transform duration-500 group-hover:-translate-y-0.5">
        {product.categoryName ? (
          <span className="text-[0.62rem] uppercase tracking-[0.2em] text-[#a8c0d5]">
            {product.categoryName}
          </span>
        ) : null}
        <h3 className="font-[family-name:var(--font-display)] text-[0.98rem] font-medium text-[#f4faff]">
          {product.name}
        </h3>
        <Price priceCents={product.priceCents} compareAtCents={product.compareAtCents} size="sm" />
      </div>
    </Link>
  );
}
