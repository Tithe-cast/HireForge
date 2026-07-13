"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/content";

export default function FAQPreview() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20">
      <div className="container-hf grid gap-10 lg:grid-cols-[280px_1fr]">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight">Common questions</h2>
          <p className="mt-3 text-graphite-500">Can't find your answer here?</p>
          <Link href="/contact" className="mt-3 inline-block text-sm font-medium text-ember-600 underline">
            Contact our team
          </Link>
        </div>

        <div className="divide-y divide-graphite-200 border-y border-graphite-200">
          {FAQS.slice(0, 4).map((f, i) => (
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
    </section>
  );
}
