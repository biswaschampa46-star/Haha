import Reveal from "@/components/Reveal";

export default function IntroStatement() {
  return (
    <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-4xl">
        <Reveal as="h2" className="font-[family-name:var(--font-display)] text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-[#f4faff]">
          Designed for
          <br />
          the way you live.
        </Reveal>
        <Reveal delay={150} className="mt-8 max-w-xl text-base leading-relaxed text-[#a8c0d5] sm:text-lg">
          Every piece in the collection is chosen with restraint — quiet materials, considered proportions,
          and details that reveal themselves slowly. Less noise, more substance.
        </Reveal>
      </div>
    </section>
  );
}
