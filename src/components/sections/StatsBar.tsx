import { Users, Briefcase, DollarSign, Clock } from "lucide-react";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";

async function getLiveJobCount(): Promise<number> {
  try {
    await connectDB();
    return await Job.countDocuments({});
  } catch {
    return 0;
  }
}

export default async function StatsBar() {
  const openRoles = await getLiveJobCount();

  const stats = [
    { icon: Users, value: "3,200+", label: "active engineers hired", accent: "circuit" },
    { icon: Briefcase, value: openRoles.toLocaleString(), label: "open roles right now", accent: "ember" },
    { icon: DollarSign, value: "$152k", label: "median base salary", accent: "circuit" },
    { icon: Clock, value: "6 days", label: "average time to offer", accent: "ember" },
  ];

  return (
   <section className="border-b border-graphite-200 bg-paper py-12">

      <div className="container-hf">
        <div className="grid grid-cols-2 divide-y divide-graphite-100 rounded-2xl border border-graphite-200 bg-white shadow-card sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 p-5 sm:p-6">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  s.accent === "ember" ? "bg-ember-500/10 text-ember-600" : "bg-circuit-500/10 text-circuit-600"
                }`}
              >
                <s.icon size={17} />
              </span>
              <div>
                <p className="font-display text-xl font-bold text-graphite-900 sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-xs text-graphite-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}