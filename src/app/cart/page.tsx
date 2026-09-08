"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatBDT } from "@/lib/currency";

export default function CartPage() {
  const { cart, updateItem, removeItem, isMutating } = useCart();

  return (
    <div className="min-h-[70vh] px-5 pb-24 pt-32 sm:px-8 lg:px-12">
      <p className="eyebrow">Your Bag</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] font-semibold text-[#f4faff]">
        Shopping Cart
      </h1>

      {cart.items.length === 0 ? (
        <div className="mt-20 flex flex-col items-center gap-4 text-center">
          <p className="font-[family-name:var(--font-display)] text-2xl text-[#f4faff]">Your cart is empty</p>
          <p className="text-sm text-[#a8c0d5]">Discover something worth bringing home.</p>
          <Link href="/shop" className="editorial-link mt-2">
            Explore Shop
          </Link>
        </div>
      ) : (
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <ul className="flex flex-col gap-8">
            {cart.items.map((item) => (
              <li key={item.id} className="flex gap-5 border-b border-[rgba(140,203,255,0.14)] pb-8">
                <Link href={`/products/${item.slug}`} className="relative h-32 w-24 shrink-0 overflow-hidden bg-[#0b263d] sm:h-40 sm:w-32">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill sizes="128px" className="object-cover" />
                  ) : null}
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link href={`/products/${item.slug}`} className="focus-ring font-[family-name:var(--font-display)] text-lg text-[#f4faff]">
                      {item.name}
                    </Link>
                    {item.variantLabel ? <p className="mt-1 text-sm text-[#a8c0d5]">{item.variantLabel}</p> : null}
                    <p className="mt-2 text-sm text-[#8ccbff]">{formatBDT(item.priceCents)}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-[rgba(140,203,255,0.2)]">
                      <button
                        type="button"
                        disabled={isMutating}
                        onClick={() => updateItem(item.id, item.quantity - 1)}
                        className="focus-ring h-9 w-9 text-[#dceeff] disabled:opacity-40"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        –
                      </button>
                      <span className="w-9 text-center text-sm text-[#f4faff]" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        disabled={isMutating}
                        onClick={() => updateItem(item.id, item.quantity + 1)}
                        className="focus-ring h-9 w-9 text-[#dceeff] disabled:opacity-40"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="focus-ring text-[0.65rem] uppercase tracking-[0.18em] text-[#7d94a8] hover:text-[#66b8ff]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="hidden w-24 text-right text-sm text-[#f4faff] sm:block">
                  {formatBDT(item.lineTotalCents)}
                </p>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-[rgba(140,203,255,0.16)] p-8">
            <p className="eyebrow">Order Summary</p>
            <div className="mt-6 flex items-center justify-between text-sm text-[#dceeff]">
              <span>Subtotal</span>
              <span>{formatBDT(cart.subtotalCents)}</span>
            </div>
            <p className="mt-2 text-xs text-[#7d94a8]">Shipping calculated at checkout.</p>
            <Link
              href="/checkout"
              className="focus-ring mt-8 block w-full bg-[#4da8ff] px-5 py-4 text-center text-[0.72rem] uppercase tracking-[0.22em] text-[#071a2b] transition-colors hover:bg-[#66b8ff]"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
