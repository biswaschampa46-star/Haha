"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ProductDTO } from "@/lib/types";
import Price from "@/components/product/Price";

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(() => {
      fetch(`/api/products?q=${encodeURIComponent(query)}&limit=6`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div
      className={`fixed inset-0 z-[70] transition-opacity duration-500 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <div className="absolute inset-0 bg-[rgba(7,26,43,0.97)] backdrop-blur-md" onClick={onClose} />
      <div className="relative mx-auto flex h-full max-w-3xl flex-col px-6 pt-28 sm:px-10">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Search the collection</p>
          <button type="button" onClick={onClose} className="focus-ring text-[0.72rem] uppercase tracking-[0.2em] text-[#dceeff]">
            Close
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!query.trim()) return;
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            onClose();
          }}
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search products..."
            className="focus-ring mt-6 w-full border-b border-[rgba(140,203,255,0.25)] bg-transparent pb-4 font-[family-name:var(--font-display)] text-3xl font-medium text-[#f4faff] placeholder:text-[#3f5972] focus:border-[#4da8ff] sm:text-4xl"
          />
        </form>

        <div className="mt-10 flex-1 overflow-y-auto pb-16">
          {loading ? <p className="text-sm text-[#a8c0d5]">Searching…</p> : null}
          {!loading && query && results.length === 0 ? (
            <p className="text-sm text-[#a8c0d5]">No products matched “{query}”.</p>
          ) : null}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {results.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} onClick={onClose} className="focus-ring group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0b263d]">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-[#f4faff]">{product.name}</p>
                <Price priceCents={product.priceCents} compareAtCents={product.compareAtCents} size="sm" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
