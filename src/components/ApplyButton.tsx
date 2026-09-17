"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Eye, Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/ToastProvider";

export default function ApplyButton({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const { user, loading } = useAuth();
  const { showToast } = useToast();
  const [applied, setApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="skeleton h-10 w-36 rounded-full" />;

  if (!user) {
    return (
      <Link href="/login" className="btn-primary shrink-0">
        Log in to apply
      </Link>
    );
  }

  if (user.role === "employer") {
    return (
      <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-circuit-500/30 bg-circuit-500/10 px-4 py-2 font-mono text-xs text-circuit-700">
        <Eye size={13} /> Viewing as employer
      </span>
    );
  }

  if (applied) {
    return (
      <span className="flex shrink-0 items-center gap-2 rounded-full bg-circuit-500/10 px-5 py-2.5 text-sm font-semibold text-circuit-700">
        <CheckCircle2 size={16} /> Application sent
      </span>
    );
  }

  async function handleApply() {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Couldn't submit your application. Please try again.", "error");
        return;
      }
      setApplied(true);
      showToast("Application sent — check your email for confirmation.");
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <button
      onClick={handleApply}
      disabled={submitting}
      className="btn-primary shrink-0"
      aria-label={`Apply for ${jobTitle}`}
    >
      {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
      {submitting ? "Submitting…" : "Apply now"}
    </button>
  );
}