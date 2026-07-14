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

// Freelance/contract/internship listings are often stored as hourly rates
// (e.g. $80-$120/hr) rather than annual salary, so a flat "/1000" formatter
// rounds them down to $0k. Detect the scale and format accordingly.
function formatSalary(min: number, max: number, currency: string) {
  const symbol = currency === "USD" ? "$" : currency + " ";
  const isHourly = max < 1000;

  if (isHourly) {
    return `${symbol}${min}–${symbol}${max}/hr`;
  }

  const fmt = (n: number) => `${Math.round(n / 1000)}k`;
  return `${symbol}${fmt(min)} – ${symbol}${fmt(max)}`;
}

// Work-mode badges get a color cue: circuit blue for remote (most in-demand),
// ember for on-site, neutral graphite for hybrid.
function workModeStyles(mode: string) {
  if (mode === "Remote") return "border-circuit-500/30 bg-circuit-500/10 text-circuit-700";
  if (mode === "On-site") return "border-ember-500/30 bg-ember-500/10 text-ember-700";
  return "border-graphite-200 bg-graphite-50 text-graphite-600";
}

// Alternate logo tint between the two brand accents so a grid of cards
// doesn't read as flat and uniform, based on a simple hash of the company name.
function logoStyles(company: string) {
  const hash = company.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return hash % 2 === 0
    ? "border-circuit-500/25 bg-circuit-500/10 text-circuit-700"
    : "border-ember-500/25 bg-ember-500/10 text-ember-700";
}

export default function JobCard({ job }: { job: IJob }) {
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="card-surface group flex h-full flex-col gap-4 p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border font-display text-sm font-bold ${logoStyles(job.company)}`}>
            {job.companyLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={job.companyLogo} alt={`${job.company} logo`} className="h-full w-full object-cover" />
            ) : (
              job.company.slice(0, 2).toUpperCase()
            )}
          </div>
          <div className="min-w-0">
            <p
              className="font-display text-[15px] font-semibold leading-snug text-graphite-900 transition-colors group-hover:text-ember-600"
              style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
              title={job.title}
            >
              {job.title}
            </p>
            <p className="mt-0.5 truncate text-sm text-graphite-500">{job.company}</p>
          </div>
        </div>
        <span className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-tight ${workModeStyles(job.workMode)}`}>
          {job.workMode}
        </span>
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

      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[13px] font-semibold text-ember-600">
          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
        </span>
        <span className="flex items-center gap-1 text-xs font-semibold text-ember-600 transition-transform group-hover:translate-x-0.5">
          View details →
        </span>
      </div>
    </Link>
  );
}