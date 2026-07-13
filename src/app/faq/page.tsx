"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/content";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="container-hf max-w-2xl py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight">Frequently asked questions</h1>
      <p className="mt-3 text-graphite-500">Everything you need to know about using HireForge as a candidate or an employer.</p>

      <div className="mt-10 divide-y divide-graphite-200 border-y border-graphite-200">
        {FAQS.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={openIdx === i}
            >
              <span className="font-display text-sm font-semibold text-graphite-900">{f.q}</span>
              <ChevronDown size={18} className={`shrink-0 text-graphite-400 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
            </button>
            {openIdx === i && <p className="pb-5 text-sm leading-relaxed text-graphite-500">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
