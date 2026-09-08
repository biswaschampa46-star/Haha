import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { cartItems, products, productVariants } from "@/db/schema";
import { findExistingCartRow, getOrCreateCartId, loadCartDTO, readCart } from "@/lib/cart";

export async function GET() {
  const cart = await readCart();
  return NextResponse.json(cart);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const productId = Number(body?.productId);
  const variantId = body?.variantId === null || body?.variantId === undefined ? null : Number(body.variantId);
  const quantity = Math.max(1, Math.min(20, Number(body?.quantity) || 1));

  if (!Number.isFinite(productId)) {
    return NextResponse.json({ error: "A valid productId is required." }, { status: 400 });
  }

  const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (variantId !== null) {
    const [variant] = await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.id, variantId))
      .limit(1);
    if (!variant || variant.productId !== productId) {
      return NextResponse.json({ error: "Variant not found." }, { status: 404 });
    }
  }

  const cartId = await getOrCreateCartId();
  const existing = await findExistingCartRow(cartId, productId, variantId);

  if (existing) {
    await db
      .update(cartItems)
      .set({ quantity: existing.quantity + quantity })
      .where(eq(cartItems.id, existing.id));
  } else {
    await db.insert(cartItems).values({ cartId, productId, variantId, quantity });
  }

  const dto = await loadCartDTO(cartId);
  return NextResponse.json(dto);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const itemId = Number(body?.itemId);
  const quantity = Number(body?.quantity);

  if (!Number.isFinite(itemId) || !Number.isFinite(quantity)) {
    return NextResponse.json({ error: "itemId and quantity are required." }, { status: 400 });
  }

  const [row] = await db.select().from(cartItems).where(eq(cartItems.id, itemId)).limit(1);
  if (!row) {
    return NextResponse.json({ error: "Cart item not found." }, { status: 404 });
  }

  if (quantity <= 0) {
    await db.delete(cartItems).where(eq(cartItems.id, itemId));
  } else {
    await db
      .update(cartItems)
      .set({ quantity: Math.min(20, quantity) })
      .where(eq(cartItems.id, itemId));
  }

  const dto = await loadCartDTO(row.cartId);
  return NextResponse.json(dto);
}

export async function DELETE(request: NextRequest) {
  const itemId = Number(request.nextUrl.searchParams.get("itemId"));
  if (!Number.isFinite(itemId)) {
    return NextResponse.json({ error: "itemId is required." }, { status: 400 });
  }

  const [row] = await db.select().from(cartItems).where(eq(cartItems.id, itemId)).limit(1);
  if (!row) {
    return NextResponse.json({ error: "Cart item not found." }, { status: 404 });
  }

  await db.delete(cartItems).where(eq(cartItems.id, itemId));
  const dto = await loadCartDTO(row.cartId);
  return NextResponse.json(dto);
}
