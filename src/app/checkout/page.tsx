import CheckoutForm from "@/components/checkout/CheckoutForm";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const merchantNumbers = {
    bkash: process.env.BKASH_MERCHANT_NUMBER ?? "",
    nagad: process.env.NAGAD_MERCHANT_NUMBER ?? "",
    rocket: process.env.ROCKET_MERCHANT_NUMBER ?? "",
  };

  return (
    <div className="min-h-[70vh] px-5 pb-24 pt-32 sm:px-8 lg:px-12">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3rem)] font-semibold text-[#f4faff]">
        Complete your order
      </h1>
      <CheckoutForm merchantNumbers={merchantNumbers} />
    </div>
  );
}
