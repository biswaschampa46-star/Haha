import { and, asc, desc, eq, ilike, or, SQL } from "drizzle-orm";
import { db } from "@/db";
import { categories, productVariants, products } from "@/db/schema";
import type { ProductDTO } from "./types";

export type ProductQuery = {
  category?: string | null;
  sort?: string | null;
  q?: string | null;
  featured?: boolean;
  isNew?: boolean;
  limit?: number;
};

export async function queryProducts(query: ProductQuery): Promise<ProductDTO[]> {
  const conditions: SQL[] = [];

  if (query.category && query.category !== "all") {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, query.category))
      .limit(1);
    if (category) {
      conditions.push(eq(products.categoryId, category.id));
    } else {
      return [];
    }
  }

  if (query.featured) conditions.push(eq(products.isFeatured, true));
  if (query.isNew) conditions.push(eq(products.isNew, true));

  if (query.q) {
    const term = `%${query.q}%`;
    conditions.push(or(ilike(products.name, term), ilike(products.description, term))!);
  }

  let orderBy = [asc(products.sortOrder)];
  switch (query.sort) {
    case "price-asc":
      orderBy = [asc(products.priceCents)];
      break;
    case "price-desc":
      orderBy = [desc(products.priceCents)];
      break;
    case "newest":
      orderBy = [desc(products.createdAt)];
      break;
    default:
      orderBy = [asc(products.sortOrder)];
  }

  const rows = await db
    .select({
      id: products.id,
      slug: products.slug,
      name: products.name,
      description: products.description,
      categoryId: products.categoryId,
      priceCents: products.priceCents,
      compareAtCents: products.compareAtCents,
      images: products.images,
      isFeatured: products.isFeatured,
      isNew: products.isNew,
      isLimited: products.isLimited,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(...orderBy)
    .limit(query.limit ?? 100);

  return rows.map((row) => ({ ...row, images: (row.images as string[]) ?? [] }));
}

export async function getProductBySlug(slug: string): Promise<ProductDTO | null> {
  const [row] = await db
    .select({
      id: products.id,
      slug: products.slug,
      name: products.name,
      description: products.description,
      categoryId: products.categoryId,
      priceCents: products.priceCents,
      compareAtCents: products.compareAtCents,
      images: products.images,
      isFeatured: products.isFeatured,
      isNew: products.isNew,
      isLimited: products.isLimited,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, slug))
    .limit(1);

  if (!row) return null;

  const variants = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, row.id))
    .orderBy(asc(productVariants.sortOrder));

  return {
    ...row,
    images: (row.images as string[]) ?? [],
    variants: variants.map((v) => ({
      id: v.id,
      label: v.label,
      priceCents: v.priceCents,
      stock: v.stock,
    })),
  };
}
