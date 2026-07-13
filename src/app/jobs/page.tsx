import { Suspense } from "react";
import JobsExplorer from "@/components/JobsExplorer";

export const metadata = { title: "Explore Jobs — HireForge" };

export default function JobsPage() {
  return (
    <div className="container-hf py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">Explore open roles</h1>
        <p className="mt-2 text-graphite-500">Filter by stack, location, and level to find the role worth applying to.</p>
      </div>
      <Suspense fallback={<div className="skeleton h-96 w-full rounded-card" />}>
        <JobsExplorer />
      </Suspense>
    </div>
  );
}
