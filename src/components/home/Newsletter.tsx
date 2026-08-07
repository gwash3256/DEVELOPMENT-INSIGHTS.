"use client";

import { useState } from "react";
import Container from "@/components/shared/Container";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      if (email) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    }, 900);
  };

  return (
    <section id="newsletter" className="bg-[var(--navy)] text-[var(--ivory)]">
      {/* Gold top rule */}
      <div className="h-0.5 bg-[var(--gold)]" />

      <Container className="py-16 md:py-20">
        <div className="max-w-xl">
          {/* Label */}
          <span className="font-sans text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[var(--gold)] block mb-4">
            Newsletter
          </span>

          {/* Headline */}
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--ivory)] mb-3 leading-snug">
            Stay informed.<br />Think critically.
          </h2>

          <p className="font-sans text-sm text-[var(--ivory)]/60 mb-8 leading-relaxed max-w-sm">
            Receive our weekly briefing/analysis, long-reads, and the stories that matter, delivered to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              required
              className="flex-1 px-4 py-3 bg-[var(--navy-light)] border border-[var(--navy-muted)] text-[var(--ivory)] placeholder:text-[var(--ivory)]/30 font-sans text-sm focus:border-[var(--gold)] focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--navy)] font-sans text-xs font-bold tracking-[0.12em] uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>

          {/* Feedback */}
          {status === "success" && (
            <p className="mt-4 font-sans text-sm text-[var(--gold-light)]">
              ✓ Thank you. You&rsquo;ll receive your first briefing shortly.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 font-sans text-sm text-red-300">
              Please enter a valid email address.
            </p>
          )}

          <p className="mt-5 font-sans text-[0.65rem] text-[var(--ivory)]/30">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </Container>
    </section>
  );
}
