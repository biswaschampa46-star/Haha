import Reveal from "@/components/Reveal";

export default function ContactPage() {
  return (
    <div className="min-h-[70vh] px-5 pb-24 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Contact</p>
        <Reveal as="h1" className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight text-[#f4faff]">
          We&apos;re here to help.
        </Reveal>
        <Reveal delay={150} className="mt-8 flex flex-col gap-4 text-base leading-relaxed text-[#a8c0d5]">
          <p>For order questions, payment verification or product enquiries, reach us any time.</p>
          <div className="mt-4 flex flex-col gap-3 border-t border-[rgba(140,203,255,0.14)] pt-6 text-sm text-[#dceeff]">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#8ea5ba]">Email</p>
            <p>support@mkrcasual.example</p>
          </div>
          <div className="flex flex-col gap-3 border-t border-[rgba(140,203,255,0.14)] pt-6 text-sm text-[#dceeff]">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#8ea5ba]">Response Time</p>
            <p>We aim to respond to every message within one business day.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
