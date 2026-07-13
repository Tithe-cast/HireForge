"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, Zap } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e?: React.FormEvent, overrides?: { email: string; password: string }) {
    e?.preventDefault();
    setErrors({});
    setFormError("");
    setLoading(true);

    const payload = overrides ?? { email, password };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data.error || "Login failed.");
        return;
      }

      await refresh();
      const redirectTo = searchParams.get("redirectTo") || "/";
      router.push(redirectTo);
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function demoLogin(role: "candidate" | "employer") {
    const creds =
      role === "employer"
        ? { email: "employer@hireforge.dev", password: "demo1234" }
        : { email: "candidate@hireforge.dev", password: "demo1234" };
    setEmail(creds.email);
    setPassword(creds.password);
    submit(undefined, creds);
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-graphite-500">Log in to apply for roles or manage your listings.</p>
      </div>

      <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
        {formError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{formError}</p>
        )}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-graphite-700">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="you@domain.com" />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-graphite-700">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="••••••••" />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          <LogIn size={16} /> {loading ? "Signing in…" : "Log in"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-graphite-200" />
        <span className="text-xs text-graphite-400">or try a demo account</span>
        <div className="h-px flex-1 bg-graphite-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => demoLogin("candidate")} disabled={loading} className="btn-secondary">
          <Zap size={14} /> Candidate demo
        </button>
        <button onClick={() => demoLogin("employer")} disabled={loading} className="btn-secondary">
          <Zap size={14} /> Employer demo
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-graphite-500">
        Don't have an account? <Link href="/register" className="font-medium text-ember-600 underline">Create one</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="container-hf flex min-h-[70vh] items-center justify-center py-16">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
