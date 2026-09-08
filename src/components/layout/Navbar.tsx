"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";

const NAV_LINKS = [
  { href: "/shop?category=all", label: "Collections" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[rgba(140,203,255,0.14)] bg-[rgba(7,26,43,0.72)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[100rem] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link href="/" className="focus-ring font-[family-name:var(--font-display)] text-lg font-semibold tracking-[0.08em] text-[#f4faff]">
            MKR CASUAL
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="focus-ring text-[0.72rem] uppercase tracking-[0.2em] text-[#dceeff] transition-colors hover:text-[#66b8ff]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="focus-ring text-[0.72rem] uppercase tracking-[0.2em] text-[#dceeff] transition-colors hover:text-[#66b8ff]"
              aria-label="Open search"
            >
              Search
            </button>
            <button
              type="button"
              onClick={openDrawer}
              className="focus-ring flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-[#dceeff] transition-colors hover:text-[#66b8ff]"
              aria-label={`Open cart, ${cart.totalQuantity} item${cart.totalQuantity === 1 ? "" : "s"}`}
            >
              Cart
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[rgba(140,203,255,0.35)] px-1 text-[0.62rem] text-[#ddf3ff]">
                {cart.totalQuantity}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="focus-ring text-[0.72rem] uppercase tracking-[0.2em] text-[#dceeff] transition-colors hover:text-[#66b8ff] lg:hidden"
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
