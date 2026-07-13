import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import JobCard from "@/components/JobCard";
import type { IJob } from "@/types";

async function getFeaturedJobs(): Promise<IJob[]> {
  try {
    await connectDB();
    const jobs = await Job.find({}).sort({ createdAt: -1 }).limit(8).lean();
    return JSON.parse(JSON.stringify(jobs));
  } catch {
    return [];
  }
}

export default async function FeaturedJobs() {
  const jobs = await getFeaturedJobs();

  return (
    <section className="border-b border-graphite-200 py-20">
      <div className="container-hf">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Freshly forged roles</h2>
            <p className="mt-3 max-w-md text-graphite-500">The latest engineering positions, posted directly by hiring teams.</p>
          </div>
          <Link href="/jobs" className="btn-secondary">
            Browse all jobs <ArrowRight size={15} />
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="mt-10 rounded-card border border-dashed border-graphite-300 p-10 text-center text-sm text-graphite-500">
            No roles are live yet — run <code className="tag">npm run seed</code> to populate sample listings, or be the first to{" "}
            <Link href="/jobs/add" className="text-ember-600 underline">post a job</Link>.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
