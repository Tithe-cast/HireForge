import { Target, Users, ShieldCheck, Rocket, UserCheck, BadgeCheck } from "lucide-react";

export const metadata = { title: "About — HireForge" };

const VALUES = [
  {
    icon: Target,
    title: "Precision over volume",
    copy: "We'd rather show you 12 roles that match than 400 that don't. Every filter on HireForge is a real database field, not a keyword guess.",
    accent: "ember",
  },
  {
    icon: ShieldCheck,
    title: "Transparency by default",
    copy: "Salary ranges are required on every listing. Vague titles and 'DOE' pay get rejected before they ever go live.",
    accent: "circuit",
  },
  {
    icon: Users,
    title: "Built with hiring teams, not around them",
    copy: "Every feature ships after sitting with engineering managers who are tired of sorting through recruiter spam.",
    accent: "ember",
  },
];

const STATS = [
  { icon: Rocket, value: "2024", label: "Founded by three engineers in Austin", accent: "ember" },
  { icon: UserCheck, value: "3,200+", label: "Engineers hired through the platform", accent: "circuit" },
  { icon: BadgeCheck, value: "100%", label: "Of listings disclose a salary range", accent: "ember" },
];

function accentClasses(accent: string) {
  return accent === "ember"
    ? { icon: "bg-ember-500/10 text-ember-600", value: "text-ember-600" }
    : { icon: "bg-circuit-500/10 text-circuit-600", value: "text-circuit-600" };
}

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-graphite-200 bg-graphite-900 py-20 text-paper">
        <div className="pointer-events-none absolute inset-0 bg-circuit-grid bg-[size:36px_36px] opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-ember-glow" />
        <div className="container-hf relative max-w-2xl">
          <span className="tag border-graphite-700 bg-graphite-800 text-ember-400">our story</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">
            We built the job board we wished existed as engineers.
          </h1>
          <p className="mt-5 text-graphite-300">
            HireForge started in 2024 after three founding engineers spent a combined four months
            wading through job boards that hid salary ranges, buried tech stacks in PDF attachments,
            and routed every application through a recruiter who'd never written a line of code. We
            built the alternative: a listing format that requires the information that actually
            matters, and a search experience built around how developers actually filter.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-hf">
          <span className="tag">principles</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">What we believe</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {VALUES.map((v) => {
              const c = accentClasses(v.accent);
              return (
                <div key={v.title} className="card-surface p-6">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${c.icon}`}>
                    <v.icon size={18} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-graphite-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite-500">{v.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-graphite-200 bg-graphite-50 py-20">
        <div className="container-hf">
          <span className="tag">by the numbers</span>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {STATS.map((s) => {
              const c = accentClasses(s.accent);
              return (
                <div key={s.label} className="card-surface p-6">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.icon}`}>
                    <s.icon size={16} />
                  </span>
                  <p className={`mt-4 font-display text-3xl font-bold ${c.value}`}>{s.value}</p>
                  <p className="mt-1 text-sm text-graphite-500">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}