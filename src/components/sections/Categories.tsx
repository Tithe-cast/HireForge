import Link from "next/link";
import { Code2, Server, Smartphone, Database, ShieldCheck, Cpu, Palette, LineChart } from "lucide-react";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";

const CATEGORY_META = [
  { name: "Frontend", icon: Code2 },
  { name: "Backend", icon: Server },
  { name: "Mobile", icon: Smartphone },
  { name: "Data & ML", icon: Database },
  { name: "Security", icon: ShieldCheck },
  { name: "DevOps / SRE", icon: Cpu },
  { name: "Product Design", icon: Palette },
  { name: "Engineering Mgmt", icon: LineChart },
];

async function getCategoryCounts(): Promise<Record<string, number>> {
  try {
    await connectDB();
    const results = await Job.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]);
    const counts: Record<string, number> = {};
    for (const r of results) counts[r._id] = r.count;
    return counts;
  } catch {
    return {};
  }
}

export default async function Categories() {
  const counts = await getCategoryCounts();

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
          {CATEGORY_META.map((c) => (
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
                <p className="mt-0.5 font-mono text-xs text-graphite-500">{counts[c.name] ?? 0} open roles</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}