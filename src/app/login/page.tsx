"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, Zap } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/ToastProvider";

// Simple inline brand mark so we don't pull in an extra icon package for one logo.
function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.42-.22-2.05H12v3.72h6.6c-.13 1.1-.86 2.76-2.47 3.87l-.02.15 3.59 2.78.25.02c2.28-2.1 3.57-5.2 3.57-8.49" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.9l-3.78-2.93c-1.02.7-2.4 1.2-4.16 1.2a7.22 7.22 0 0 1-6.8-4.96l-.14.01-3.73 2.89-.05.13A12 12 0 0 0 12 24" />
      <path fill="#FBBC05" d="M5.2 14.4a7.4 7.4 0 0 1-.4-2.4c0-.84.15-1.65.39-2.4L5.18 9.5 1.4 6.55l-.13.06A12 12 0 0 0 0 12c0 1.94.47 3.77 1.28 5.39z" />
      <path fill="#EA4335" d="M12 4.75c2.26 0 3.78.97 4.65 1.79l3.4-3.32C17.94 1.2 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.6l3.9 3.03A7.23 7.23 0 0 1 12 4.75" />
    </svg>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // Surface OAuth errors that arrive via redirect (e.g. ?error=... from the Google callback)
  useEffect(() => {
    const oauthError = searchParams.get("error");
    if (oauthError) setFormError(oauthError);
  }, [searchParams]);

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
  showToast(data.error || "Login failed.", "error");
  return;
}

await refresh();
showToast(`Welcome back, ${data.user.name}!`);
const redirectTo = searchParams.get("redirectTo") || "/";
router.push(redirectTo);
router.refresh();
} catch {
  setFormError("Something went wrong. Please try again.");
  showToast("Something went wrong. Please try again.", "error");
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

      {formError && (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{formError}</p>
      )}

      <a href="/api/auth/google?role=candidate" className="btn-secondary mt-6 w-full">
        <GoogleMark /> Continue with Google
      </a>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-graphite-200" />
        <span className="text-xs text-graphite-400">or use your email</span>
        <div className="h-px flex-1 bg-graphite-200" />
      </div>

      <form onSubmit={submit} className="space-y-4" noValidate>
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