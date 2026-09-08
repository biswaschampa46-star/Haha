import { cookies } from "next/headers";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { cartItems, carts, productVariants, products } from "@/db/schema";
import type { CartDTO } from "./types";

const CART_COOKIE = "cart_token";

/** Reads the cart referenced by the cookie, if any, without creating one. */
export async function readCart(): Promise<CartDTO> {
  const jar = await cookies();
  const token = jar.get(CART_COOKIE)?.value;
  if (!token) {
    return { id: null, items: [], subtotalCents: 0, totalQuantity: 0 };
  }
  return loadCartDTO(token);
}

/** Gets the existing cart id from the cookie, or creates one + sets the cookie. */
export async function getOrCreateCartId(): Promise<string> {
  const jar = await cookies();
  const existing = jar.get(CART_COOKIE)?.value;
  if (existing) {
    const [row] = await db.select().from(carts).where(eq(carts.id, existing)).limit(1);
    if (row) return row.id;
  }
  const [created] = await db.insert(carts).values({}).returning();
  jar.set(CART_COOKIE, created.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return created.id;
}

export async function clearCartCookieCart(cartId: string) {
  await db.delete(cartItems).where(eq(cartItems.cartId, cartId));
}

export async function loadCartDTO(cartId: string): Promise<CartDTO> {
  const rows = await db
    .select({
      id: cartItems.id,
      productId: cartItems.productId,
      variantId: cartItems.variantId,
      quantity: cartItems.quantity,
      name: products.name,
      slug: products.slug,
      images: products.images,
      basePrice: products.priceCents,
      variantLabel: productVariants.label,
      variantPrice: productVariants.priceCents,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .leftJoin(productVariants, eq(cartItems.variantId, productVariants.id))
    .where(eq(cartItems.cartId, cartId));

  const items = rows.map((row) => {
    const priceCents = row.variantPrice ?? row.basePrice;
    return {
      id: row.id,
      productId: row.productId,
      variantId: row.variantId,
      quantity: row.quantity,
      name: row.name,
      slug: row.slug,
      image: (row.images as string[])?.[0] ?? null,
      variantLabel: row.variantLabel,
      priceCents,
      lineTotalCents: priceCents * row.quantity,
    };
  });

  const subtotalCents = items.reduce((sum, item) => sum + item.lineTotalCents, 0);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return { id: cartId, items, subtotalCents, totalQuantity };
}

export async function findExistingCartRow(cartId: string, productId: number, variantId: number | null) {
  const conditions = [eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)];
  if (variantId === null) {
    conditions.push(eq(cartItems.variantId, -1));
  }
  const rows = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)));
  return rows.find((row) => row.variantId === variantId) ?? null;
}

export { CART_COOKIE };
