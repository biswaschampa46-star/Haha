import { discountPercent, formatBDT } from "@/lib/currency";

export default function Price({
  priceCents,
  compareAtCents,
  size = "md",
}: {
  priceCents: number;
  compareAtCents?: number | null;
  size?: "sm" | "md" | "lg";
}) {
  const discount = discountPercent(priceCents, compareAtCents);
  const priceSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className={`${priceSize} font-medium text-[#f4faff]`}>{formatBDT(priceCents)}</span>
      {compareAtCents && compareAtCents > priceCents ? (
        <>
          <span className="text-sm text-[#a8c0d5] line-through">{formatBDT(compareAtCents)}</span>
          {discount ? (
            <span className="text-[0.65rem] uppercase tracking-[0.16em] text-[#66b8ff]">
              {discount}% off
            </span>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
