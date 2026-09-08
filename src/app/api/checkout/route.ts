import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { cartItems, orderItems, orders, paymentMethodValues } from "@/db/schema";
import { CART_COOKIE, loadCartDTO } from "@/lib/cart";

const SHIPPING_FLAT_CENTS = 12000;

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MER-${stamp}${random}`;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, phone, email, address, city, note, paymentMethod, senderNumber, transactionId } = body;

  if (!name || !phone || !address || !city) {
    return NextResponse.json({ error: "Please complete all required shipping fields." }, { status: 400 });
  }

  if (!paymentMethodValues.includes(paymentMethod)) {
    return NextResponse.json({ error: "Select a valid advance payment method." }, { status: 400 });
  }

  if (!senderNumber || !transactionId) {
    return NextResponse.json(
      { error: "Sender number and transaction ID are required to verify advance payment." },
      { status: 400 },
    );
  }

  const jar = await cookies();
  const cartId = jar.get(CART_COOKIE)?.value;
  if (!cartId) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const cart = await loadCartDTO(cartId);
  if (cart.items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const subtotalCents = cart.subtotalCents;
  const totalCents = subtotalCents + SHIPPING_FLAT_CENTS;
  const orderNumber = generateOrderNumber();

  const [order] = await db
    .insert(orders)
    .values({
      orderNumber,
      customerName: String(name).slice(0, 160),
      customerPhone: String(phone).slice(0, 32),
      customerEmail: email ? String(email).slice(0, 200) : null,
      shippingAddress: String(address).slice(0, 2000),
      city: String(city).slice(0, 120),
      note: note ? String(note).slice(0, 2000) : null,
      paymentMethod,
      paymentSenderNumber: String(senderNumber).slice(0, 32),
      paymentTransactionId: String(transactionId).slice(0, 64),
      status: "pending_payment",
      subtotalCents,
      shippingCents: SHIPPING_FLAT_CENTS,
      totalCents,
    })
    .returning();

  await db.insert(orderItems).values(
    cart.items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      productName: item.name,
      variantLabel: item.variantLabel,
      priceCents: item.priceCents,
      quantity: item.quantity,
    })),
  );

  await db.delete(cartItems).where(eq(cartItems.cartId, cartId));

  jar.delete(CART_COOKIE);

  return NextResponse.json({ orderNumber: order.orderNumber });
}
