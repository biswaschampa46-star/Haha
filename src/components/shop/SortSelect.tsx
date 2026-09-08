"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function SortSelect({ current }: { current: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.2em] text-[#8ea5ba]">
      Sort
      <select
        value={current}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring border border-[rgba(140,203,255,0.2)] bg-transparent px-3 py-2 text-[#dceeff]"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#0b263d] text-[#f4faff]">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
