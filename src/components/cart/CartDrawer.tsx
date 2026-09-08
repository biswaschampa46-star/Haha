"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { formatBDT } from "@/lib/currency";

export default function CartDrawer() {
  const { cart, isDrawerOpen, closeDrawer, updateItem, removeItem, isMutating } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isDrawerOpen, closeDrawer]);

  return (
    <div
      className={`fixed inset-0 z-[80] transition-opacity duration-500 ${
        isDrawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <div className="absolute inset-0 bg-[rgba(4,14,24,0.6)] backdrop-blur-sm" onClick={closeDrawer} />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[rgba(140,203,255,0.16)] bg-[#0b263d] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <p className="eyebrow">Your Bag ({cart.totalQuantity})</p>
          <button type="button" onClick={closeDrawer} className="focus-ring text-[0.7rem] uppercase tracking-[0.2em] text-[#dceeff]">
            Close
          </button>
        </div>

        <div className="hairline" />

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-[family-name:var(--font-display)] text-xl text-[#f4faff]">Your cart is empty</p>
            <p className="text-sm text-[#a8c0d5]">Discover something worth bringing home.</p>
            <Link href="/shop" onClick={closeDrawer} className="editorial-link mt-2">
              Explore Shop
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="flex flex-col gap-6">
              {cart.items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-[#071a2b]">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm text-[#f4faff]">{item.name}</p>
                      {item.variantLabel ? (
                        <p className="mt-0.5 text-xs text-[#a8c0d5]">{item.variantLabel}</p>
                      ) : null}
                      <p className="mt-1 text-sm text-[#8ccbff]">{formatBDT(item.priceCents)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[rgba(140,203,255,0.2)]">
                        <button
                          type="button"
                          disabled={isMutating}
                          onClick={() => updateItem(item.id, item.quantity - 1)}
                          className="focus-ring h-7 w-7 text-sm text-[#dceeff] disabled:opacity-40"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          –
                        </button>
                        <span className="w-7 text-center text-sm text-[#f4faff]" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          disabled={isMutating}
                          onClick={() => updateItem(item.id, item.quantity + 1)}
                          className="focus-ring h-7 w-7 text-sm text-[#dceeff] disabled:opacity-40"
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
                </li>
              ))}
            </ul>
          </div>
        )}

        {cart.items.length > 0 ? (
          <div className="border-t border-[rgba(140,203,255,0.14)] px-6 py-6">
            <div className="flex items-center justify-between text-sm text-[#dceeff]">
              <span>Subtotal</span>
              <span className="text-base text-[#f4faff]">{formatBDT(cart.subtotalCents)}</span>
            </div>
            <p className="mt-1 text-xs text-[#7d94a8]">Shipping and advance payment calculated at checkout.</p>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="focus-ring w-full border border-[rgba(140,203,255,0.3)] px-5 py-3 text-center text-[0.7rem] uppercase tracking-[0.2em] text-[#dceeff] transition-colors hover:border-[#4da8ff]"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="focus-ring w-full bg-[#4da8ff] px-5 py-3 text-center text-[0.7rem] uppercase tracking-[0.2em] text-[#071a2b] transition-colors hover:bg-[#66b8ff]"
              >
                Checkout
              </Link>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
