"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Circle } from "lucide-react";

const BUILD_STEPS = [
  { label: "resolving stack", value: "React · TypeScript · Node.js", ok: true },
  { label: "checking remote policy", value: "remote-friendly: true", ok: true },
  { label: "matching salary band", value: "$140k – $185k", ok: true },
  { label: "scanning open roles", value: "482 positions found", ok: true },
  { label: "build", value: "success — your shortlist is ready", ok: true },
];

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    if (visibleSteps >= BUILD_STEPS.length) return;
    const t = setTimeout(() => setVisibleSteps((v) => v + 1), visibleSteps === 0 ? 400 : 650);
    return () => clearTimeout(t);
  }, [visibleSteps]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(query ? `/jobs?q=${encodeURIComponent(query)}` : "/jobs");
  }

  return (
    <section className="relative overflow-hidden border-b border-graphite-200 bg-graphite-900 text-paper">
      <div className="absolute inset-0 bg-circuit-grid bg-[size:36px_36px] opacity-40" />
      <div className="absolute inset-0 bg-ember-glow" />

      <div className="container-hf relative flex min-h-[62vh] flex-col items-center gap-12 py-20 lg:min-h-[68vh] lg:flex-row lg:items-center lg:py-16">
        <div className="max-w-xl">
          <span className="tag border-graphite-700 bg-graphite-800 text-ember-400">for developers, by developers</span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-paper sm:text-5xl lg:text-[3.4rem]">
            Where developer careers get <span className="text-ember-500">forged</span>, not filtered.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-graphite-300">
            Every role on HireForge lists a real salary range, a real tech stack, and a real hiring
            manager. No recruiter spam, no mystery pay bands — just engineering jobs worth applying to.
          </p>

          <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-graphite-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “Senior React” or “Rust”"
                className="w-full rounded-full border border-graphite-700 bg-graphite-800 py-3 pl-11 pr-4 text-sm text-paper placeholder:text-graphite-500 focus:border-ember-500 focus:outline-none focus:ring-2 focus:ring-ember-500/20"
              />
            </div>
            <button type="submit" className="btn-primary shrink-0">
              Search roles <ArrowRight size={15} />
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Remote", "React", "Backend", "Staff+"].map((t) => (
              <Link key={t} href={`/jobs?q=${encodeURIComponent(t)}`} className="tag border-graphite-700 bg-graphite-800 text-graphite-300 hover:border-ember-500 hover:text-ember-400">
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* Signature element: animated "build log" terminal */}
        <div className="w-full max-w-md rounded-2xl border border-graphite-700 bg-graphite-950/80 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-1.5 border-b border-graphite-800 px-4 py-3">
            <Circle size={9} className="fill-graphite-600 text-graphite-600" />
            <Circle size={9} className="fill-graphite-600 text-graphite-600" />
            <Circle size={9} className="fill-graphite-600 text-graphite-600" />
            <span className="ml-2 font-mono text-[11px] text-graphite-500">match-engine.log</span>
          </div>
          <div className="space-y-2.5 p-5 font-mono text-[12.5px] leading-relaxed">
            {BUILD_STEPS.slice(0, visibleSteps).map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-ember-500">{i === BUILD_STEPS.length - 1 ? "$" : "›"}</span>
                <span className="text-graphite-500">{step.label}</span>
                <span className="ml-auto text-right text-circuit-400">{step.value}</span>
              </div>
            ))}
            {visibleSteps < BUILD_STEPS.length && (
              <div className="flex items-center gap-1.5 text-graphite-600">
                <span className="h-3.5 w-1.5 animate-pulse bg-ember-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
