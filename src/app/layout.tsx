import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { readCart } from "@/lib/cart";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mkr Casual — Premium Editorial Store",
  description:
    "Mkr Casual is a premium editorial storefront for considered fashion, accessories and home objects.",
};

export const viewport: Viewport = {
  themeColor: "#071A2B",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cart = await readCart();

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <div className="atmosphere" aria-hidden="true" />
        <CartProvider initialCart={cart}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded focus:bg-[#0b263d] focus:px-4 focus:py-2 focus:text-sm focus:text-[#f4faff]"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
