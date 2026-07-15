import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { MapPin, Briefcase, Clock, DollarSign, Layers, Building2, Star, ImageIcon } from "lucide-react";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import JobCard from "@/components/JobCard";
import ApplyButton from "@/components/ApplyButton";
import { COMPANY_REVIEWS } from "@/lib/content";
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

// Same alternating accent logic as the job card, so a company's color identity
// stays consistent between the card grid and its own details page.
function logoStyles(company: string) {
  const hash = company.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return hash % 2 === 0
    ? "border-circuit-500/25 bg-circuit-500/10 text-circuit-700"
    : "border-ember-500/25 bg-ember-500/10 text-ember-700";
}

function workModeStyles(mode: string) {
  if (mode === "Remote") return "border-circuit-500/30 bg-circuit-500/10 text-circuit-700";
  if (mode === "On-site") return "border-ember-500/30 bg-ember-500/10 text-ember-700";
  return "border-graphite-200 bg-graphite-50 text-graphite-600";
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < Math.round(rating) ? "fill-ember-500 text-ember-500" : "fill-graphite-200 text-graphite-200"}
        />
      ))}
    </div>
  );
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
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border font-display text-lg font-bold ${logoStyles(job.company)}`}>
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

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-graphite-100 pt-6 text-sm text-graphite-600">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-graphite-400" /> {job.location}</span>
              <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] ${workModeStyles(job.workMode)}`}>
                {job.workMode}
              </span>
              <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-graphite-400" /> {job.jobType} · {job.experienceLevel}</span>
              <span className="flex items-center gap-1.5 font-semibold text-ember-600"><DollarSign size={14} /> {formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
              <span className="flex items-center gap-1.5 text-graphite-400"><Clock size={14} /> {timeAgo(job.createdAt)}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {job.techStack.map((t, i) => (
                <span
                  key={t}
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] ${
                    i % 2 === 0
                      ? "border-circuit-500/25 bg-circuit-500/10 text-circuit-700"
                      : "border-ember-500/25 bg-ember-500/10 text-ember-700"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Photos / media (optional, employer-submitted) */}
          {job.images && job.images.length > 0 && (
            <section className="card-surface mt-6 p-6 sm:p-8">
              <h2 className="flex items-center gap-1.5 font-display text-lg font-semibold text-graphite-900">
                <ImageIcon size={16} className="text-circuit-600" /> Office &amp; team photos
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {job.images.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt={`${job.company} photo ${i + 1}`}
                    className="aspect-video w-full rounded-lg border border-graphite-200 object-cover"
                  />
                ))}
              </div>
            </section>
          )}

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
                  <Layers size={14} className="text-ember-600" /> Responsibilities
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
                  <Layers size={14} className="text-circuit-600" /> Requirements
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

          {/* Reviews / ratings (optional, shown only when review data exists for this company) */}
          {COMPANY_REVIEWS[job.company] && (
            <section className="card-surface mt-6 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-graphite-900">Reviews &amp; ratings</h2>
                <div className="flex items-center gap-2">
                  <StarRating rating={COMPANY_REVIEWS[job.company].averageRating} />
                  <span className="font-mono text-sm font-semibold text-graphite-700">
                    {COMPANY_REVIEWS[job.company].averageRating.toFixed(1)} / 5
                  </span>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                {COMPANY_REVIEWS[job.company].reviews.map((r, i) => (
                  <div key={i} className="rounded-lg border border-graphite-100 bg-graphite-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-display text-sm font-semibold text-graphite-900">{r.author}</p>
                      <StarRating rating={r.rating} />
                    </div>
                    <p className="mt-0.5 text-xs text-graphite-500">{r.roleAtCompany}</p>
                    <p className="mt-2 text-sm leading-relaxed text-graphite-600">{r.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-graphite-400">
                Reviews reflect individual experiences at {job.company} and are not verified by HireForge.
              </p>
            </section>
          )}

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
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-circuit-500/10 text-circuit-600">
              <Building2 size={16} />
            </span>
            <h3 className="mt-3 font-display text-sm font-semibold text-graphite-900">About {job.company}</h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite-500">
              Posted by {job.postedByName}. Listings on HireForge come directly from the hiring team, with no third-party recruiters.
            </p>
          </div>
          <div className="card-surface overflow-hidden p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ember-500/10 text-ember-600">
              <DollarSign size={16} />
            </span>
            <h3 className="mt-3 font-display text-sm font-semibold text-graphite-900">Pay range</h3>
            <p className="mt-2 font-mono text-lg font-semibold text-ember-600">
              {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
            </p>
            <p className="mt-1 text-xs text-graphite-500">Base salary, disclosed by the employer.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

