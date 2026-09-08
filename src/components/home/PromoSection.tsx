import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function PromoSection() {
  return (
    <section className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <Reveal className="relative mx-auto aspect-[4/5] max-w-[100rem] overflow-hidden rounded-2xl sm:aspect-[16/9]">
        <Image
          src="https://images.pexels.com/photos/16158304/pexels-photo-16158304.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000"
          alt="Cinematic night street scene with soft blue reflections"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,43,0.55)_0%,rgba(7,26,43,0.35)_45%,rgba(7,26,43,0.85)_100%)]" />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-8 sm:p-14">
          <p className="eyebrow text-[#ddf3ff]">Editorial</p>
          <h2 className="mt-4 max-w-lg font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.5vw,3.25rem)] font-semibold leading-[1.05] text-[#f4faff]">
            Discover something new
          </h2>
          <p className="mt-4 max-w-sm text-sm text-[#dceeff] sm:text-base">
            Designed for everyday life — a rotating edit of pieces built around quiet, lasting quality.
          </p>
          <Link href="/shop" className="editorial-link mt-8">
            Explore
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
