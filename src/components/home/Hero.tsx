import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40">
      <div className="mx-auto grid max-w-[100rem] items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="relative z-10 lg:pb-10">
          <p className="eyebrow animate-fade-up" style={{ animationDelay: "120ms" }}>
            Premium Collection
          </p>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-[#f4faff]">
            <span className="block animate-fade-up overflow-hidden" style={{ animationDelay: "260ms" }}>
              Shop more,
            </span>
            <span className="block animate-fade-up text-[#8ccbff] overflow-hidden" style={{ animationDelay: "420ms" }}>
              live better.
            </span>
          </h1>

          <p
            className="mt-7 max-w-md animate-fade-up text-base leading-relaxed text-[#a8c0d5]"
            style={{ animationDelay: "600ms" }}
          >
            Discover considered products designed for everyday lifestyle — quietly made, built to last.
          </p>

          <div className="mt-10 animate-fade-up" style={{ animationDelay: "760ms" }}>
            <Link href="/shop" className="editorial-link">
              Explore Shop
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="animate-blur-in relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-[3/4] lg:aspect-[4/5]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/videos/BG.mp4"
              poster="/images/hero-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Editorial video of a model in a flowing garment, softly lit in dreamy blue tones"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,26,43,0.55)] via-transparent to-[rgba(7,26,43,0.15)]" />
          </div>
          <p className="absolute -bottom-6 left-4 hidden text-[0.65rem] uppercase tracking-[0.24em] text-[#5c7996] sm:block">
            The Autumn Edit — 01
          </p>
        </div>
      </div>
    </section>
  );
}
