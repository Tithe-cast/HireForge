import Link from "next/link";
import { Code2, Server, Smartphone, Database, ShieldCheck, Cpu, Palette, LineChart } from "lucide-react";

const CATEGORIES = [
  { name: "Frontend", icon: Code2, count: 96 },
  { name: "Backend", icon: Server, count: 121 },
  { name: "Mobile", icon: Smartphone, count: 54 },
  { name: "Data & ML", icon: Database, count: 63 },
  { name: "Security", icon: ShieldCheck, count: 28 },
  { name: "DevOps / SRE", icon: Cpu, count: 47 },
  { name: "Product Design", icon: Palette, count: 31 },
  { name: "Engineering Mgmt", icon: LineChart, count: 22 },
];

export default function Categories() {
  return (
    <section className="border-b border-graphite-200 bg-graphite-50 py-20">
      <div className="container-hf">
        <div className="max-w-lg">
          <h2 className="font-display text-3xl font-bold tracking-tight">Search by discipline</h2>
          <p className="mt-3 text-graphite-500">
            Every listing is tagged by the team that owns it, not a recruiter's best guess.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.name}
              href={`/jobs?category=${encodeURIComponent(c.name)}`}
              className="card-surface flex flex-col gap-3 p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-graphite-900 text-ember-500">
                <c.icon size={18} />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-graphite-900">{c.name}</p>
                <p className="mt-0.5 font-mono text-xs text-graphite-500">{c.count} open roles</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
