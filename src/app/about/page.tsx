import { Target, Users, ShieldCheck } from "lucide-react";

export const metadata = { title: "About — HireForge" };

const VALUES = [
  { icon: Target, title: "Precision over volume", copy: "We'd rather show you 12 roles that match than 400 that don't. Every filter on HireForge is a real database field, not a keyword guess." },
  { icon: ShieldCheck, title: "Transparency by default", copy: "Salary ranges are required on every listing. Vague titles and 'DOE' pay get rejected before they ever go live." },
  { icon: Users, title: "Built with hiring teams, not around them", copy: "Every feature ships after sitting with engineering managers who are tired of sorting through recruiter spam." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-graphite-200 bg-graphite-900 py-20 text-paper">
        <div className="container-hf max-w-2xl">
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
          <h2 className="font-display text-3xl font-bold tracking-tight">What we believe</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="card-surface p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-graphite-900 text-ember-500">
                  <v.icon size={18} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-graphite-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite-500">{v.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-graphite-200 bg-graphite-50 py-20">
        <div className="container-hf grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-3xl font-bold text-graphite-900">2024</p>
            <p className="mt-1 text-sm text-graphite-500">Founded by three engineers in Austin</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-graphite-900">3,200+</p>
            <p className="mt-1 text-sm text-graphite-500">Engineers hired through the platform</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-graphite-900">100%</p>
            <p className="mt-1 text-sm text-graphite-500">Of listings disclose a salary range</p>
          </div>
        </div>
      </section>
    </div>
  );
}
