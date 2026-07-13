"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function ApplyButton({ jobTitle }: { jobTitle: string }) {
  const { user, loading } = useAuth();
  const [applied, setApplied] = useState(false);

  if (loading) return <div className="skeleton h-10 w-32 rounded-full" />;

  if (!user) {
    return (
      <Link href="/login" className="btn-primary shrink-0">
        Log in to apply
      </Link>
    );
  }

  if (user.role === "employer") {
    return (
      <span className="tag shrink-0">Employer view</span>
    );
  }

  if (applied) {
    return (
      <span className="flex shrink-0 items-center gap-2 rounded-full bg-circuit-500/10 px-5 py-2.5 text-sm font-semibold text-circuit-700">
        <CheckCircle2 size={16} /> Application sent
      </span>
    );
  }

  return (
    <button onClick={() => setApplied(true)} className="btn-primary shrink-0" aria-label={`Apply for ${jobTitle}`}>
      Apply now
    </button>
  );
}
