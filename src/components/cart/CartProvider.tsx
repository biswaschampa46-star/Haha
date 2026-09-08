"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { CartDTO } from "@/lib/types";

type CartContextValue = {
  cart: CartDTO;
  isDrawerOpen: boolean;
  isMutating: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (input: { productId: number; variantId: number | null; quantity?: number }) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  refresh: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

const EMPTY_CART: CartDTO = { id: null, items: [], subtotalCents: 0, totalQuantity: 0 };

export function CartProvider({ initialCart, children }: { initialCart: CartDTO; children: ReactNode }) {
  const [cart, setCart] = useState<CartDTO>(initialCart ?? EMPTY_CART);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isMutating, setMutating] = useState(false);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/cart", { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as CartDTO;
      setCart(data);
    }
  }, []);

  const addItem = useCallback(
    async (input: { productId: number; variantId: number | null; quantity?: number }) => {
      setMutating(true);
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        if (res.ok) {
          const data = (await res.json()) as CartDTO;
          setCart(data);
          setDrawerOpen(true);
        }
      } finally {
        setMutating(false);
      }
    },
    [],
  );

  const updateItem = useCallback(async (itemId: number, quantity: number) => {
    setMutating(true);
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      });
      if (res.ok) {
        const data = (await res.json()) as CartDTO;
        setCart(data);
      }
    } finally {
      setMutating(false);
    }
  }, []);

  const removeItem = useCallback(async (itemId: number) => {
    setMutating(true);
    try {
      const res = await fetch(`/api/cart?itemId=${itemId}`, { method: "DELETE" });
      if (res.ok) {
        const data = (await res.json()) as CartDTO;
        setCart(data);
      }
    } finally {
      setMutating(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      isDrawerOpen,
      isMutating,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addItem,
      updateItem,
      removeItem,
      refresh,
    }),
    [cart, isDrawerOpen, isMutating, addItem, updateItem, removeItem, refresh],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
