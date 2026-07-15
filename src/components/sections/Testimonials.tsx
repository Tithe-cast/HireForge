import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I filtered by stack and salary in under a minute and had a first-round call scheduled by Thursday. Never touched a recruiter DM.",
    name: "Priya Nair",
    role: "Senior Backend Engineer, hired at a Series B fintech",
    accent: "ember",
  },
  {
    quote:
      "We stopped getting résumé floods the week we started requiring a real salary range on our listing. Applicant quality doubled.",
    name: "Marcus Webb",
    role: "Engineering Manager, posts on HireForge",
    accent: "circuit",
  },
  {
    quote:
      "The tech-stack tags aren't decorative — every filter actually matched what the team used day to day. That's rarer than it should be.",
    name: "Alicia Torres",
    role: "Staff Frontend Engineer",
    accent: "ember",
  },
];

function accentClasses(accent: string) {
  return accent === "ember"
    ? { bg: "bg-ember-500/10 text-ember-600", avatar: "bg-ember-500 text-white" }
    : { bg: "bg-circuit-500/10 text-circuit-600", avatar: "bg-circuit-500 text-white" };
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function Testimonials() {
  return (
    <section className="border-b border-graphite-200 py-20">
      <div className="container-hf">
        <span className="tag">social proof</span>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">Trusted by engineers who hate job boards</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => {
            const c = accentClasses(t.accent);
            return (
              <figure key={t.name} className="card-surface flex flex-col justify-between p-6">
                <div>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full ${c.bg}`}>
                    <Quote size={15} />
                  </span>
                  <blockquote className="mt-4 text-[15px] leading-relaxed text-graphite-700">
                    {t.quote}
                  </blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-graphite-100 pt-4">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold ${c.avatar}`}>
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-graphite-900">{t.name}</p>
                    <p className="mt-0.5 text-xs text-graphite-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}