export default function Badge({ label }: { label: "NEW" | "SALE" | "LIMITED" }) {
  return (
    <span className="inline-flex items-center border border-[rgba(140,203,255,0.3)] bg-[rgba(7,26,43,0.55)] px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#ddf3ff] backdrop-blur-sm">
      {label}
    </span>
  );
}
