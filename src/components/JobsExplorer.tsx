"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import JobCard from "@/components/JobCard";
import JobCardSkeleton from "@/components/JobCardSkeleton";
import type { IJob, JobListResponse } from "@/types";

const CATEGORIES = ["all", "Frontend", "Backend", "Mobile", "Data & ML", "Security", "DevOps / SRE", "Product Design", "Engineering Mgmt"];
const WORK_MODES = ["all", "Remote", "Hybrid", "On-site"];
const JOB_TYPES = ["all", "Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const EXPERIENCE = ["all", "Entry", "Mid", "Senior", "Lead"];

export default function JobsExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [workMode, setWorkMode] = useState(searchParams.get("workMode") || "all");
  const [jobType, setJobType] = useState(searchParams.get("jobType") || "all");
  const [experienceLevel, setExperienceLevel] = useState(searchParams.get("experienceLevel") || "all");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [data, setData] = useState<JobListResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category !== "all") params.set("category", category);
    if (workMode !== "all") params.set("workMode", workMode);
    if (jobType !== "all") params.set("jobType", jobType);
    if (experienceLevel !== "all") params.set("experienceLevel", experienceLevel);
    params.set("sort", sort);
    params.set("page", String(page));
    params.set("pageSize", "8");

    try {
      const res = await fetch(`/api/jobs?${params.toString()}`);
      const json = await res.json();
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [q, category, workMode, jobType, experienceLevel, sort, page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => setPage(1), [q, category, workMode, jobType, experienceLevel, sort]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetchJobs();
  }

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-graphite-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, company, or tech stack…"
            className="input-field pl-11"
          />
        </div>
        <button type="button" onClick={() => setShowFilters(!showFilters)} className="btn-secondary shrink-0">
          <SlidersHorizontal size={15} /> Filters
        </button>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field w-full shrink-0 sm:w-48">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="salary_high">Salary: high to low</option>
          <option value="salary_low">Salary: low to high</option>
        </select>
      </form>

      {showFilters && (
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-card border border-graphite-200 bg-graphite-50 p-4 sm:grid-cols-4">
          <FilterSelect label="Category" value={category} onChange={setCategory} options={CATEGORIES} />
          <FilterSelect label="Work mode" value={workMode} onChange={setWorkMode} options={WORK_MODES} />
          <FilterSelect label="Job type" value={jobType} onChange={setJobType} options={JOB_TYPES} />
          <FilterSelect label="Experience" value={experienceLevel} onChange={setExperienceLevel} options={EXPERIENCE} />
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-graphite-500">
          {loading ? "Searching…" : `${data?.total ?? 0} roles found`}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <JobCardSkeleton key={i} />)
          : data?.jobs.map((job: IJob) => <JobCard key={job._id} job={job} />)}
      </div>

      {!loading && data && data.jobs.length === 0 && (
        <div className="mt-10 rounded-card border border-dashed border-graphite-300 p-10 text-center text-sm text-graphite-500">
          No roles match those filters yet. Try widening your search.
        </div>
      )}

      {!loading && data && data.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-graphite-200 text-graphite-600 disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-mono text-sm text-graphite-600">
            {data.page} / {data.totalPages}
          </span>
          <button
            disabled={page >= data.totalPages}
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-graphite-200 text-graphite-600 disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-xs font-medium text-graphite-600">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input-field mt-1">
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "all" ? "All" : o}
          </option>
        ))}
      </select>
    </label>
  );
}
