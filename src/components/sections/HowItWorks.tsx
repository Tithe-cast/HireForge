"use client";

import { useState } from "react";
import { Search, FileEdit, Send, PenLine, Users, CheckCircle2 } from "lucide-react";

const CANDIDATE_STEPS = [
  { icon: Search, title: "Filter by what matters", copy: "Stack, salary band, remote policy, seniority — narrow 482 roles down to the five worth your time." },
  { icon: FileEdit, title: "Apply with your GitHub", copy: "Skip the résumé rewrite. Link your profile and let your commits do the talking." },
  { icon: Send, title: "Hear back in days", copy: "Every employer commits to a response window before their listing goes live." },
];

const EMPLOYER_STEPS = [
  { icon: PenLine, title: "Post the real role", copy: "Title, stack, and salary range required — no vague listings allowed on HireForge." },
  { icon: Users, title: "Reach engaged engineers", copy: "Your listing surfaces to candidates who already filtered for your exact stack." },
  { icon: CheckCircle2, title: "Manage it all in one place", copy: "Track applicants and edit or close postings from a single dashboard." },
];

export default function HowItWorks() {
  const [tab, setTab] = useState<"candidate" | "employer">("candidate");
  const steps = tab === "candidate" ? CANDIDATE_STEPS : EMPLOYER_STEPS;

  return (
    <section className="border-b border-graphite-200 bg-graphite-50 py-20">
      <div className="container-hf">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-3xl font-bold tracking-tight">How HireForge works</h2>
          <div className="inline-flex rounded-full border border-graphite-200 bg-white p-1">
            <button
              onClick={() => setTab("candidate")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${tab === "candidate" ? "bg-graphite-900 text-paper" : "text-graphite-600"}`}
            >
              For candidates
            </button>
            <button
              onClick={() => setTab("employer")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${tab === "employer" ? "bg-graphite-900 text-paper" : "text-graphite-600"}`}
            >
              For employers
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="card-surface p-6">
              <span className="font-mono text-xs text-ember-600">step {i + 1}</span>
              <span className="mt-3 flex h-11 w-11 items-center justify-center rounded-lg bg-graphite-900 text-ember-500">
                <s.icon size={18} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-graphite-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite-500">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
