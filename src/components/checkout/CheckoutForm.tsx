"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatBDT } from "@/lib/currency";

const SHIPPING_FLAT_CENTS = 12000;

const PAYMENT_METHODS: { value: "bkash" | "nagad" | "rocket"; label: string }[] = [
  { value: "bkash", label: "bKash" },
  { value: "nagad", label: "Nagad" },
  { value: "rocket", label: "Rocket" },
];

export default function CheckoutForm({
  merchantNumbers,
}: {
  merchantNumbers: Record<"bkash" | "nagad" | "rocket", string>;
}) {
  const { cart, refresh } = useCart();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket">("bkash");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = cart.subtotalCents + SHIPPING_FLAT_CENTS;
  const merchantNumber = merchantNumbers[paymentMethod];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, paymentMethod }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to place order.");
      await refresh();
      router.push(`/order-confirmation/${data.orderNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to place order.");
      setSubmitting(false);
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center gap-4 text-center">
        <p className="font-[family-name:var(--font-display)] text-2xl text-[#f4faff]">Your cart is empty</p>
        <p className="text-sm text-[#a8c0d5]">Add something to your bag before checking out.</p>
        <Link href="/shop" className="editorial-link mt-2">
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-14 grid gap-14 lg:grid-cols-[1.5fr_1fr]">
      <div className="flex flex-col gap-10">
        <fieldset className="flex flex-col gap-5">
          <legend className="eyebrow mb-1">Shipping details</legend>
          <Field label="Full name" name="name" required />
          <Field label="Phone number" name="phone" type="tel" required />
          <Field label="Email (optional)" name="email" type="email" />
          <Field label="Delivery address" name="address" as="textarea" required />
          <Field label="City" name="city" required />
          <Field label="Order note (optional)" name="note" as="textarea" />
        </fieldset>

        <fieldset className="flex flex-col gap-5">
          <legend className="eyebrow mb-1">Advance payment</legend>
          <p className="text-xs leading-relaxed text-[#7d94a8]">
            Orders are confirmed by advance payment only — cash on delivery is not offered. Send the total
            amount using your preferred method below, then enter the sender number and transaction ID used for
            the payment.
          </p>

          <div className="flex gap-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.value}
                type="button"
                onClick={() => setPaymentMethod(method.value)}
                aria-pressed={paymentMethod === method.value}
                className={`focus-ring flex-1 border px-4 py-3 text-xs uppercase tracking-[0.16em] transition-colors ${
                  paymentMethod === method.value
                    ? "border-[#4da8ff] text-[#f4faff]"
                    : "border-[rgba(140,203,255,0.22)] text-[#a8c0d5] hover:border-[#66b8ff]"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>

          <div className="border border-[rgba(140,203,255,0.18)] bg-[rgba(11,38,61,0.5)] p-5 text-sm text-[#dceeff]">
            <p className="text-xs uppercase tracking-[0.18em] text-[#8ea5ba]">
              {PAYMENT_METHODS.find((m) => m.value === paymentMethod)?.label} Merchant Number
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-[#f4faff]">
              {merchantNumber || "Not configured yet — contact support before paying."}
            </p>
            <p className="mt-2 text-xs text-[#7d94a8]">
              Send {formatBDT(total)} to this number, then enter your sender number and the transaction ID
              below.
            </p>
          </div>

          <Field label="Your sender number" name="senderNumber" required />
          <Field label="Transaction ID" name="transactionId" required />
        </fieldset>
      </div>

      <aside className="h-fit border border-[rgba(140,203,255,0.16)] p-8">
        <p className="eyebrow">Order Summary</p>
        <ul className="mt-6 flex flex-col gap-4">
          {cart.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-4 text-sm text-[#dceeff]">
              <span className="max-w-[60%] truncate">
                {item.name}
                {item.variantLabel ? ` — ${item.variantLabel}` : ""} × {item.quantity}
              </span>
              <span>{formatBDT(item.lineTotalCents)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-2 border-t border-[rgba(140,203,255,0.14)] pt-5 text-sm text-[#dceeff]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatBDT(cart.subtotalCents)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatBDT(SHIPPING_FLAT_CENTS)}</span>
          </div>
          <div className="flex justify-between text-base text-[#f4faff]">
            <span>Total</span>
            <span>{formatBDT(total)}</span>
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-[#ff9d9d]" role="alert">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="focus-ring mt-8 w-full bg-[#4da8ff] px-5 py-4 text-center text-[0.72rem] uppercase tracking-[0.22em] text-[#071a2b] transition-colors hover:bg-[#66b8ff] disabled:opacity-50"
        >
          {submitting ? "Placing order…" : "Confirm Advance Payment"}
        </button>
      </aside>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  as = "input",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
}) {
  const commonClass =
    "focus-ring w-full border-b border-[rgba(140,203,255,0.25)] bg-transparent py-2 text-sm text-[#f4faff] placeholder:text-[#5c7996] focus:border-[#4da8ff]";
  return (
    <label className="flex flex-col gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-[#8ea5ba]">
      {label}
      {as === "textarea" ? (
        <textarea name={name} required={required} rows={3} className={commonClass} />
      ) : (
        <input name={name} type={type} required={required} className={commonClass} />
      )}
    </label>
  );
}
