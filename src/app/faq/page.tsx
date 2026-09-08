import Reveal from "@/components/Reveal";

const FAQS = [
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept advance payment via bKash, Nagad and Rocket. Cash on delivery is not available. After sending payment, enter your sender number and transaction ID at checkout so we can verify it.",
  },
  {
    question: "How does order verification work?",
    answer:
      "Once your advance payment is submitted, your order status begins at Pending Payment. Our team verifies the transaction and moves it through Payment Verified, Confirmed, Processing, Shipped and Delivered.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Contact us as soon as possible after placing your order. Changes can only be made before an order enters processing.",
  },
  {
    question: "Do you ship across Bangladesh?",
    answer: "Yes, we deliver nationwide.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-[70vh] px-5 pb-24 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">FAQ</p>
        <Reveal as="h1" className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight text-[#f4faff]">
          Frequently asked questions
        </Reveal>

        <div className="mt-14 flex flex-col">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 80} className="border-t border-[rgba(140,203,255,0.14)] py-8 last:border-b">
              <h2 className="font-[family-name:var(--font-display)] text-lg text-[#f4faff]">{faq.question}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#a8c0d5]">{faq.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
