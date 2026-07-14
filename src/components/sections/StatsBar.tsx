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
    { value: "3,200+", label: "active engineers hired" },
    { value: openRoles.toLocaleString(), label: "open roles right now" },
    { value: "$152k", label: "median base salary" },
    { value: "6 days", label: "average time to offer" },
  ];

  return (
    <section className="border-b border-graphite-200 bg-paper py-10">
      <div className="container-hf grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center sm:text-left">
            <p className="font-display text-2xl font-bold text-graphite-900 sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs text-graphite-500 sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}