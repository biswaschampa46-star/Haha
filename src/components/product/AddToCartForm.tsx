"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatBDT } from "@/lib/currency";
import type { VariantDTO } from "@/lib/types";

export default function AddToCartForm({
  productId,
  basePriceCents,
  variants,
}: {
  productId: number;
  basePriceCents: number;
  variants: VariantDTO[];
}) {
  const hasRealVariants = variants.length > 1 || (variants.length === 1 && variants[0].label !== "One Size");
  const [variantId, setVariantId] = useState<number | null>(variants[0]?.id ?? null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, isMutating } = useCart();

  const activeVariant = useMemo(() => variants.find((v) => v.id === variantId) ?? null, [variants, variantId]);
  const activePrice = activeVariant?.priceCents ?? basePriceCents;
  const outOfStock = activeVariant ? activeVariant.stock <= 0 : false;

  async function handleAdd() {
    await addItem({ productId, variantId, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-8 flex flex-col gap-7">
      {hasRealVariants ? (
        <fieldset>
          <legend className="text-[0.68rem] uppercase tracking-[0.2em] text-[#8ea5ba]">Select option</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setVariantId(variant.id)}
                aria-pressed={variantId === variant.id}
                disabled={variant.stock <= 0}
                className={`focus-ring border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                  variantId === variant.id
                    ? "border-[#4da8ff] text-[#f4faff]"
                    : "border-[rgba(140,203,255,0.22)] text-[#a8c0d5] hover:border-[#66b8ff]"
                }`}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="flex items-center gap-6">
        <label htmlFor="quantity" className="text-[0.68rem] uppercase tracking-[0.2em] text-[#8ea5ba]">
          Quantity
        </label>
        <div className="flex items-center border border-[rgba(140,203,255,0.22)]">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="focus-ring h-9 w-9 text-[#dceeff]"
            aria-label="Decrease quantity"
          >
            –
          </button>
          <span id="quantity" className="w-10 text-center text-sm text-[#f4faff]" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="focus-ring h-9 w-9 text-[#dceeff]"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={isMutating || outOfStock}
        className="focus-ring w-full max-w-xs bg-[#4da8ff] px-6 py-4 text-center text-[0.72rem] uppercase tracking-[0.22em] text-[#071a2b] transition-colors hover:bg-[#66b8ff] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {outOfStock ? "Out of Stock" : added ? "Added to Bag" : `Add to Bag — ${formatBDT(activePrice * quantity)}`}
      </button>
    </div>
  );
}
