"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
      setMessage("You're on the list.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Stay in the loop</p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold text-[#f4faff]">
          New arrivals, selected offers
          <br className="hidden sm:block" /> and product updates.
        </h2>

        <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row sm:items-end">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="focus-ring w-full border-b border-[rgba(140,203,255,0.3)] bg-transparent px-1 py-3 text-center text-sm text-[#f4faff] placeholder:text-[#5c7996] focus:border-[#4da8ff] sm:text-left"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="focus-ring shrink-0 whitespace-nowrap border-b border-[#4da8ff] pb-3 text-[0.72rem] uppercase tracking-[0.2em] text-[#f4faff] transition-opacity hover:opacity-70 disabled:opacity-50"
          >
            Subscribe →
          </button>
        </form>
        {message ? (
          <p className={`mt-4 text-sm ${status === "error" ? "text-[#ff9d9d]" : "text-[#8ccbff]"}`} role="status">
            {message}
          </p>
        ) : null}
      </Reveal>
    </section>
  );
}
