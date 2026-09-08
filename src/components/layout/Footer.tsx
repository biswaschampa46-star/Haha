import Link from "next/link";

const SHOP_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=all", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

const PAYMENT_METHODS = ["bKash", "Nagad", "Rocket"];

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(140,203,255,0.14)] px-5 pb-10 pt-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[100rem] gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[0.06em] text-[#f4faff]">
            MKR CASUAL
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#a8c0d5]">
            A quiet, editorial approach to everyday objects — considered pieces designed to last.
          </p>
        </div>

        <div>
          <p className="eyebrow">Shop</p>
          <ul className="mt-5 flex flex-col gap-3">
            {SHOP_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="focus-ring text-sm text-[#dceeff] transition-colors hover:text-[#66b8ff]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Social</p>
          <ul className="mt-5 flex flex-col gap-3">
            {["Instagram", "Facebook", "Pinterest"].map((social) => (
              <li key={social}>
                <a href="#" className="focus-ring text-sm text-[#dceeff] transition-colors hover:text-[#66b8ff]">
                  {social}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Advance Payment</p>
          <ul className="mt-5 flex flex-col gap-3">
            {PAYMENT_METHODS.map((method) => (
              <li key={method} className="text-sm text-[#dceeff]">
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[100rem] flex-col items-start justify-between gap-4 border-t border-[rgba(140,203,255,0.14)] pt-8 text-xs text-[#7d94a8] sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} MKR CASUAL. All rights reserved.</p>
        <p>Advance payment only — bKash, Nagad, Rocket.</p>
      </div>
    </footer>
  );
}
