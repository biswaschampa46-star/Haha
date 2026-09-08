export type VariantDTO = {
  id: number;
  label: string;
  priceCents: number | null;
  stock: number;
};

export type ProductDTO = {
  id: number;
  slug: string;
  name: string;
  description: string;
  categoryId: number | null;
  categoryName?: string | null;
  categorySlug?: string | null;
  priceCents: number;
  compareAtCents: number | null;
  images: string[];
  isFeatured: boolean;
  isNew: boolean;
  isLimited: boolean;
  variants?: VariantDTO[];
};

export type CartItemDTO = {
  id: number;
  productId: number;
  variantId: number | null;
  quantity: number;
  name: string;
  slug: string;
  image: string | null;
  variantLabel: string | null;
  priceCents: number;
  lineTotalCents: number;
};

export type CartDTO = {
  id: string | null;
  items: CartItemDTO[];
  subtotalCents: number;
  totalQuantity: number;
};

export const ORDER_STATUS_FLOW = [
  { key: "pending_payment", label: "Pending Payment" },
  { key: "payment_verified", label: "Payment Verified" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
] as const;
