import Link from "next/link";
import { MapPin, Briefcase, Clock } from "lucide-react";
import type { IJob } from "@/types";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  return `${Math.floor(days / 30)} mo ago`;
}

function formatSalary(min: number, max: number, currency: string) {
  const fmt = (n: number) => `${Math.round(n / 1000)}k`;
  const symbol = currency === "USD" ? "$" : currency + " ";
  return `${symbol}${fmt(min)} – ${symbol}${fmt(max)}`;
}

export default function JobCard({ job }: { job: IJob }) {
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="card-surface flex h-full flex-col gap-4 p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-graphite-200 bg-graphite-50 font-display text-sm font-bold text-graphite-600">
            {job.companyLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={job.companyLogo} alt={`${job.company} logo`} className="h-full w-full object-cover" />
            ) : (
              job.company.slice(0, 2).toUpperCase()
            )}
          </div>
          <div>
            <p className="font-display text-[15px] font-semibold leading-snug text-graphite-900 line-clamp-1">{job.title}</p>
            <p className="text-sm text-graphite-500">{job.company}</p>
          </div>
        </div>
        <span className="tag shrink-0">{job.workMode}</span>
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-graphite-600">{job.shortDescription}</p>

      <div className="flex flex-wrap gap-1.5">
        {job.techStack.slice(0, 4).map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-graphite-100 pt-4 text-xs text-graphite-500">
        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
        <span className="flex items-center gap-1"><Briefcase size={12} /> {job.jobType}</span>
        <span className="flex items-center gap-1"><Clock size={12} /> {timeAgo(job.createdAt)}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-mono text-sm font-semibold text-graphite-900">
          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
        </span>
        <span className="btn-ghost pointer-events-none px-3 py-1.5 text-xs text-ember-600">View details →</span>
      </div>
    </Link>
  );
}
