const STATS = [
  { value: "3,200+", label: "active engineers hired" },
  { value: "482", label: "open roles this month" },
  { value: "$152k", label: "median base salary" },
  { value: "6 days", label: "average time to offer" },
];

export default function StatsBar() {
  return (
    <section className="border-b border-graphite-200 bg-paper py-10">
      <div className="container-hf grid grid-cols-2 gap-6 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center sm:text-left">
            <p className="font-display text-2xl font-bold text-graphite-900 sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs text-graphite-500 sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
