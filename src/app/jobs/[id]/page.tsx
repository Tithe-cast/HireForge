import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { MapPin, Briefcase, Clock, DollarSign, Layers } from "lucide-react";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import JobCard from "@/components/JobCard";
import ApplyButton from "@/components/ApplyButton";
import type { IJob } from "@/types";

export const dynamic = "force-dynamic";

async function getJob(id: string): Promise<IJob | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  await connectDB();
  const job = await Job.findById(id).lean();
  if (!job) return null;
  return JSON.parse(JSON.stringify(job));
}

async function getRelatedJobs(job: IJob): Promise<IJob[]> {
  await connectDB();
  const jobs = await Job.find({ category: job.category, _id: { $ne: job._id } })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
  return JSON.parse(JSON.stringify(jobs));
}

function formatSalary(min: number, max: number, currency: string) {
  const symbol = currency === "USD" ? "$" : currency + " ";
  const isHourly = max < 1000;
  if (isHourly) return `${symbol}${min} – ${symbol}${max} / hour`;
  const fmt = (n: number) => n.toLocaleString();
  return `${symbol}${fmt(min)} – ${symbol}${fmt(max)} / year`;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Posted today";
  if (days === 1) return "Posted 1 day ago";
  return `Posted ${days} days ago`;
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);
  if (!job) notFound();
  const related = await getRelatedJobs(job);

  return (
    <div className="container-hf py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          {/* Header */}
          <div className="card-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-graphite-200 bg-graphite-50 font-display text-lg font-bold text-graphite-600">
                  {job.companyLogo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={job.companyLogo} alt={`${job.company} logo`} className="h-full w-full object-cover" />
                  ) : (
                    job.company.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold tracking-tight text-graphite-900 sm:text-3xl">{job.title}</h1>
                  <p className="mt-1 text-graphite-500">{job.company}</p>
                </div>
              </div>
              <ApplyButton jobTitle={job.title} />
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-graphite-100 pt-6 text-sm text-graphite-600">
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location} · {job.workMode}</span>
              <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.jobType} · {job.experienceLevel}</span>
              <span className="flex items-center gap-1.5"><DollarSign size={14} /> {formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {timeAgo(job.createdAt)}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {job.techStack.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Overview */}
          <section className="card-surface mt-6 p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-graphite-900">Overview</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-graphite-600">{job.fullDescription}</p>
          </section>

          {/* Key info / specifications */}
          <section className="card-surface mt-6 p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-graphite-900">Key information</h2>
            <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-1.5 text-sm font-semibold text-graphite-800">
                  <Layers size={14} /> Responsibilities
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-graphite-600">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember-500" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-1.5 text-sm font-semibold text-graphite-800">
                  <Layers size={14} /> Requirements
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-graphite-600">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-circuit-500" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Related jobs */}
          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-lg font-semibold text-graphite-900">Related roles</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <JobCard key={r._id} job={r} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="h-fit space-y-6 lg:sticky lg:top-24">
          <div className="card-surface p-6">
            <h3 className="font-display text-sm font-semibold text-graphite-900">About {job.company}</h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite-500">
              Posted by {job.postedByName}. Listings on HireForge come directly from the hiring team, with no third-party recruiters.
            </p>
          </div>
          <div className="card-surface p-6">
            <h3 className="font-display text-sm font-semibold text-graphite-900">Pay range</h3>
            <p className="mt-2 font-mono text-lg font-semibold text-graphite-900">
              {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
            </p>
            <p className="mt-1 text-xs text-graphite-500">Base salary, disclosed by the employer.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
