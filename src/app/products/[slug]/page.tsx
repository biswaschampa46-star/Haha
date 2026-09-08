import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, queryProducts } from "@/lib/products";
import Price from "@/components/product/Price";
import Badge from "@/components/product/Badge";
import AddToCartForm from "@/components/product/AddToCartForm";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found — Mkr Casual" };
  return {
    title: `${product.name} — Mkr Casual`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = (
    await queryProducts({ category: product.categorySlug ?? undefined, limit: 5 })
  ).filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-28">
      <nav aria-label="Breadcrumb" className="px-5 pb-6 text-xs text-[#7d94a8] sm:px-8 lg:px-12">
        <Link href="/shop" className="focus-ring hover:text-[#66b8ff]">
          Shop
        </Link>
        {product.categoryName ? (
          <>
            {" "}
            /{" "}
            <Link href={`/shop?category=${product.categorySlug}`} className="focus-ring hover:text-[#66b8ff]">
              {product.categoryName}
            </Link>
          </>
        ) : null}{" "}
        / <span className="text-[#a8c0d5]">{product.name}</span>
      </nav>

      <div className="mx-auto grid max-w-[100rem] gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#0b263d]">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute left-4 top-4 flex flex-col gap-1.5">
            {product.isNew ? <Badge label="NEW" /> : null}
            {product.isLimited ? <Badge label="LIMITED" /> : null}
            {!product.isNew && !product.isLimited && product.compareAtCents ? <Badge label="SALE" /> : null}
          </div>
        </div>

        <div className="lg:pt-6">
          {product.categoryName ? (
            <p className="eyebrow">{product.categoryName}</p>
          ) : null}
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold leading-tight text-[#f4faff]">
            {product.name}
          </h1>
          <div className="mt-5">
            <Price priceCents={product.priceCents} compareAtCents={product.compareAtCents} size="lg" />
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#a8c0d5]">{product.description}</p>

          <AddToCartForm
            productId={product.id}
            basePriceCents={product.priceCents}
            variants={product.variants ?? []}
          />

          <div className="hairline mt-10 pt-8">
            <p className="text-xs leading-relaxed text-[#7d94a8]">
              Advance payment via bKash, Nagad or Rocket is required to confirm every order. Cash on delivery
              is not available.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="px-5 pb-24 sm:px-8 lg:px-12">
          <p className="eyebrow mb-10">You may also like</p>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-4">
            {related.map((item, index) => (
              <Reveal key={item.id} delay={index * 80}>
                <ProductCard product={item} aspect="aspect-[4/5]" />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
