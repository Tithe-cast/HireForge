"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Trash2, PlusCircle } from "lucide-react";
import type { IJob } from "@/types";

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<IJob[] | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/jobs?mine=true&pageSize=24");
    if (res.ok) {
      const data = await res.json();
      setJobs(data.jobs);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this listing? This can't be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to delete listing.");
        return;
      }
      setJobs((prev) => prev?.filter((j) => j._id !== id) ?? null);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="container-hf py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Manage your listings</h1>
          <p className="mt-2 text-graphite-500">Every role your company has posted, in one place.</p>
        </div>
        <Link href="/jobs/add" className="btn-primary">
          <PlusCircle size={16} /> Post a job
        </Link>
      </div>

      {error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}

      <div className="mt-8 overflow-x-auto rounded-card border border-graphite-200 bg-white shadow-card">
        {jobs === null ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-10 text-center text-sm text-graphite-500">
            You haven't posted any roles yet. <Link href="/jobs/add" className="text-ember-600 underline">Post your first job</Link>.
          </div>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-graphite-200 bg-graphite-50 text-xs uppercase tracking-wide text-graphite-500">
              <tr>
                <th className="px-5 py-3.5 font-medium">Role</th>
                <th className="px-5 py-3.5 font-medium">Type</th>
                <th className="px-5 py-3.5 font-medium">Location</th>
                <th className="px-5 py-3.5 font-medium">Salary</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-100">
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td className="px-5 py-4">
                    <p className="font-display font-semibold text-graphite-900">{job.title}</p>
                    <p className="text-xs text-graphite-500">{job.category}</p>
                  </td>
                  <td className="px-5 py-4 text-graphite-600">{job.jobType}</td>
                  <td className="px-5 py-4 text-graphite-600">{job.location}</td>
                  <td className="px-5 py-4 font-mono text-graphite-600">
                    ${Math.round(job.salaryMin / 1000)}k–${Math.round(job.salaryMax / 1000)}k
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/jobs/${job._id}`} className="flex h-8 w-8 items-center justify-center rounded-full text-graphite-500 hover:bg-graphite-100" aria-label="View">
                        <Eye size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(job._id)}
                        disabled={deletingId === job._id}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-graphite-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                        aria-label="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
