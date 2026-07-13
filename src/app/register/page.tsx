"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

type Role = "candidate" | "employer";

export default function RegisterPage() {
  const router = useRouter();
  const { refresh } = useAuth();

  const [role, setRole] = useState<Role>("candidate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setFormError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, company: role === "employer" ? company : undefined }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data.error || "Registration failed.");
        return;
      }

      await refresh();
      router.push(role === "employer" ? "/jobs/add" : "/jobs");
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-hf flex min-h-[70vh] items-center justify-center py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-graphite-500">Join as a candidate to apply, or an employer to post roles.</p>
        </div>

        <div className="mt-6 inline-flex w-full rounded-full border border-graphite-200 bg-graphite-50 p-1">
          <button type="button" onClick={() => setRole("candidate")} className={`flex-1 rounded-full py-2 text-sm font-medium transition ${role === "candidate" ? "bg-graphite-900 text-paper" : "text-graphite-600"}`}>
            I'm a candidate
          </button>
          <button type="button" onClick={() => setRole("employer")} className={`flex-1 rounded-full py-2 text-sm font-medium transition ${role === "employer" ? "bg-graphite-900 text-paper" : "text-graphite-600"}`}>
            I'm hiring
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          {formError && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{formError}</p>
          )}
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-graphite-700">Full name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Jordan Lee" />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          {role === "employer" && (
            <div>
              <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-graphite-700">Company name</label>
              <input id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="input-field" placeholder="Acme Inc." />
              {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company}</p>}
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-graphite-700">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="you@domain.com" />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-graphite-700">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="At least 6 characters" />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            <UserPlus size={16} /> {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-graphite-500">
          Already have an account? <Link href="/login" className="font-medium text-ember-600 underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
