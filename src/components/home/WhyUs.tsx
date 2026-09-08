import Reveal from "@/components/Reveal";

const ITEMS = [
  {
    number: "01",
    title: "Quality",
    description: "Carefully selected products.",
  },
  {
    number: "02",
    title: "Secure",
    description: "Safe and reliable payment.",
  },
  {
    number: "03",
    title: "Fast",
    description: "Quick delivery across Bangladesh.",
  },
  {
    number: "04",
    title: "Support",
    description: "We're here when you need us.",
  },
];

export default function WhyUs() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[100rem]">
        <p className="eyebrow mb-14">Why Mkr Casual</p>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, index) => (
            <Reveal key={item.number} delay={index * 100}>
              <span className="font-[family-name:var(--font-display)] text-sm text-[#4da8ff]">{item.number}</span>
              <h3 className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-[#f4faff]">{item.title}</h3>
              <p className="mt-3 max-w-[20ch] text-sm leading-relaxed text-[#a8c0d5]">{item.description}</p>
              <span className="mt-6 block h-px w-10 bg-[#4da8ff]" aria-hidden="true" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
