import Reveal from "@/components/Reveal";

export default function AboutPage() {
  return (
    <div className="min-h-[70vh] px-5 pb-24 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">About</p>
        <Reveal as="h1" className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight text-[#f4faff]">
          A quieter kind of store.
        </Reveal>
        <Reveal delay={150} className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-[#a8c0d5]">
          <p>
            Mkr Casual is an editorial storefront built around considered products — pieces chosen for their
            materials, proportions and longevity rather than trend.
          </p>
          <p>
            We keep the catalogue small and the presentation calm, because we believe the products should be
            the focus, not the noise around them.
          </p>
          <p>
            This page is intentionally simple. As the store grows, this space will be updated with real
            information about our team, sourcing and process.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
