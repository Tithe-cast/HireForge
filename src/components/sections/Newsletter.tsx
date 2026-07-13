"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="border-b border-graphite-200 bg-graphite-900 py-16 text-paper">
      <div className="container-hf flex flex-col items-center gap-6 text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          New roles, every Tuesday morning.
        </h2>
        <p className="max-w-md text-graphite-400">
          A short digest of newly posted engineering roles with disclosed salary ranges. No spam, unsubscribe anytime.
        </p>
        {submitted ? (
          <p className="rounded-full border border-ember-500/40 bg-ember-500/10 px-5 py-2.5 text-sm text-ember-400">
            You're on the list — check your inbox next Tuesday.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full rounded-full border border-graphite-700 bg-graphite-800 px-4 py-2.5 text-sm text-paper placeholder:text-graphite-500 focus:border-ember-500 focus:outline-none focus:ring-2 focus:ring-ember-500/20"
            />
            <button type="submit" className="btn-primary shrink-0">
              Subscribe <Send size={14} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
