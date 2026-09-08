"use client";

import Link from "next/link";
import { useEffect } from "react";

type NavLink = { href: string; label: string };

export default function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-500 lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div className="absolute inset-0 bg-[rgba(7,26,43,0.96)] backdrop-blur-md" onClick={onClose} />
      <div className="relative flex h-full flex-col justify-between px-7 py-8">
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-[0.08em] text-[#f4faff]">
            MKR CASUAL
          </span>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring text-[0.72rem] uppercase tracking-[0.2em] text-[#dceeff]"
          >
            Close
          </button>
        </div>

        <nav className="flex flex-col gap-6" aria-label="Mobile">
          {links.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className={`focus-ring font-[family-name:var(--font-display)] text-4xl font-medium text-[#f4faff] transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${index * 60}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="eyebrow">MKR CASUAL — Editorial Goods</p>
      </div>
    </div>
  );
}
