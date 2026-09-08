import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { ORDER_STATUS_FLOW } from "@/lib/types";
import { formatBDT } from "@/lib/currency";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);

  if (!order) notFound();

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
  const currentIndex = ORDER_STATUS_FLOW.findIndex((step) => step.key === order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="min-h-[70vh] px-5 pb-24 pt-32 sm:px-8 lg:px-12">
      <p className="eyebrow">Order Confirmation</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.5vw,3rem)] font-semibold text-[#f4faff]">
        Thank you, {order.customerName.split(" ")[0]}.
      </h1>
      <p className="mt-3 max-w-lg text-sm text-[#a8c0d5]">
        Your order <span className="text-[#dceeff]">{order.orderNumber}</span> has been received. We will
        verify your advance payment shortly and update the status below.
      </p>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="eyebrow mb-6">Order status</p>
          {isCancelled ? (
            <p className="text-sm text-[#ff9d9d]">This order has been cancelled.</p>
          ) : (
            <ol className="flex flex-col gap-0">
              {ORDER_STATUS_FLOW.map((step, index) => {
                const reached = index <= currentIndex;
                return (
                  <li key={step.key} className="relative flex gap-4 pb-8 last:pb-0">
                    {index < ORDER_STATUS_FLOW.length - 1 ? (
                      <span
                        className={`absolute left-[7px] top-4 h-full w-px ${
                          reached ? "bg-[#4da8ff]" : "bg-[rgba(140,203,255,0.18)]"
                        }`}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span
                      className={`relative z-10 mt-1 h-[15px] w-[15px] shrink-0 rounded-full border ${
                        reached
                          ? "border-[#4da8ff] bg-[#4da8ff]"
                          : "border-[rgba(140,203,255,0.3)] bg-transparent"
                      }`}
                      aria-hidden="true"
                    />
                    <div>
                      <p className={`text-sm uppercase tracking-[0.14em] ${reached ? "text-[#f4faff]" : "text-[#5c7996]"}`}>
                        {step.label}
                      </p>
                      {index === currentIndex ? (
                        <p className="mt-1 text-xs text-[#8ccbff]">Current status</p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}

          <div className="mt-12 border-t border-[rgba(140,203,255,0.14)] pt-8">
            <p className="eyebrow mb-4">Items</p>
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between text-sm text-[#dceeff]">
                  <span>
                    {item.productName}
                    {item.variantLabel ? ` — ${item.variantLabel}` : ""} × {item.quantity}
                  </span>
                  <span>{formatBDT(item.priceCents * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="h-fit border border-[rgba(140,203,255,0.16)] p-8">
          <p className="eyebrow">Summary</p>
          <div className="mt-5 flex flex-col gap-2 text-sm text-[#dceeff]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatBDT(order.subtotalCents)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatBDT(order.shippingCents)}</span>
            </div>
            <div className="flex justify-between text-base text-[#f4faff]">
              <span>Total</span>
              <span>{formatBDT(order.totalCents)}</span>
            </div>
          </div>
          <div className="mt-6 border-t border-[rgba(140,203,255,0.14)] pt-5 text-xs text-[#7d94a8]">
            <p>Paid via {order.paymentMethod.toUpperCase()}</p>
            <p className="mt-1">Sender: {order.paymentSenderNumber}</p>
            <p className="mt-1">Transaction ID: {order.paymentTransactionId}</p>
          </div>
          <div className="mt-6 border-t border-[rgba(140,203,255,0.14)] pt-5 text-xs text-[#7d94a8]">
            <p>{order.shippingAddress}</p>
            <p>{order.city}</p>
          </div>
          <Link href="/shop" className="editorial-link mt-8">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
