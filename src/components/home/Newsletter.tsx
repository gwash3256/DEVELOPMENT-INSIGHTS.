"use client";

import { useState } from "react";
import Container from "@/components/shared/Container";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      if (email) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    }, 1000);
  };

  return (
    <section id="newsletter" className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Get the latest articles, tutorials, and development insights delivered to your inbox every week.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="flex-1 px-6 py-4 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 transition-all"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {/* Status Messages */}
          {status === "success" && (
            <div className="mt-4 p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-100">
              ✓ Thanks for subscribing! Check your email for confirmation.
            </div>
          )}
          {status === "error" && (
            <div className="mt-4 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-100">
              ✗ Please enter a valid email address.
            </div>
          )}

          {/* Footer Text */}
          <p className="text-sm text-blue-100 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </Container>
    </section>
  );
}
