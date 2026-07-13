const TESTIMONIALS = [
  {
    quote:
      "I filtered by stack and salary in under a minute and had a first-round call scheduled by Thursday. Never touched a recruiter DM.",
    name: "Priya Nair",
    role: "Senior Backend Engineer, hired at a Series B fintech",
  },
  {
    quote:
      "We stopped getting résumé floods the week we started requiring a real salary range on our listing. Applicant quality doubled.",
    name: "Marcus Webb",
    role: "Engineering Manager, posts on HireForge",
  },
  {
    quote:
      "The tech-stack tags aren't decorative — every filter actually matched what the team used day to day. That's rarer than it should be.",
    name: "Alicia Torres",
    role: "Staff Frontend Engineer",
  },
];

export default function Testimonials() {
  return (
    <section className="border-b border-graphite-200 py-20">
      <div className="container-hf">
        <h2 className="font-display text-3xl font-bold tracking-tight">Trusted by engineers who hate job boards</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card-surface flex flex-col justify-between p-6">
              <blockquote className="text-sm leading-relaxed text-graphite-700">“{t.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-graphite-100 pt-4">
                <p className="font-display text-sm font-semibold text-graphite-900">{t.name}</p>
                <p className="mt-0.5 text-xs text-graphite-500">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
