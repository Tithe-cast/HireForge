"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const DATA = [
  { level: "Entry", median: 82 },
  { level: "Mid", median: 118 },
  { level: "Senior", median: 156 },
  { level: "Lead", median: 194 },
];

export default function SalaryStats() {
  return (
    <section className="border-b border-graphite-200 bg-graphite-50 py-20">
      <div className="container-hf grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="tag">salary transparency, by the numbers</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">Pay bands you can actually plan around</h2>
          <p className="mt-4 max-w-md text-graphite-500">
            Every listing on HireForge is required to publish a real salary range. Here's the current
            median base pay across experience levels, drawn from active listings.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <dt className="text-xs text-graphite-500">Listings with disclosed pay</dt>
              <dd className="font-display text-2xl font-bold text-graphite-900">100%</dd>
            </div>
            <div>
              <dt className="text-xs text-graphite-500">Median negotiation lift</dt>
              <dd className="font-display text-2xl font-bold text-graphite-900">+9%</dd>
            </div>
          </dl>
        </div>

        <div className="card-surface p-6">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={DATA} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E5E8" />
              <XAxis dataKey="level" tick={{ fontSize: 12, fill: "#6B7078" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7078" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}k`} />
              <Tooltip
                cursor={{ fill: "rgba(255,122,69,0.08)" }}
                formatter={(v: number) => [`$${v}k`, "Median base"]}
                contentStyle={{ borderRadius: 10, border: "1px solid #E4E5E8", fontSize: 12 }}
              />
              <Bar dataKey="median" fill="#FF7A45" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
