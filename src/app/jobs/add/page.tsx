"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, X } from "lucide-react";

const CATEGORIES = ["Frontend", "Backend", "Mobile", "Data & ML", "Security", "DevOps / SRE", "Product Design", "Engineering Mgmt"];

function TagListInput({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
}) {
  const [draft, setDraft] = useState("");

  function add() {
    const v = draft.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setDraft("");
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-graphite-700">{label}</label>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          className="input-field"
          placeholder={placeholder}
        />
        <button type="button" onClick={add} className="btn-secondary shrink-0 px-4">
          Add
        </button>
      </div>
      {values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {values.map((v) => (
            <span key={v} className="tag flex items-center gap-1">
              {v}
              <button type="button" onClick={() => onChange(values.filter((x) => x !== v))} aria-label={`Remove ${v}`}>
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AddJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    company: "",
    companyLogo: "",
    location: "",
    workMode: "Remote",
    jobType: "Full-time",
    experienceLevel: "Mid",
    salaryMin: "",
    salaryMax: "",
    shortDescription: "",
    fullDescription: "",
    category: "Frontend",
  });
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setFormError("");
    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          salaryMin: Number(form.salaryMin),
          salaryMax: Number(form.salaryMax),
          responsibilities,
          requirements,
          techStack,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data.error || "Could not create listing.");
        return;
      }

      router.push("/jobs/manage");
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-hf max-w-3xl py-10">
      <h1 className="font-display text-3xl font-bold tracking-tight">Post a new role</h1>
      <p className="mt-2 text-graphite-500">Every field here is what candidates use to filter — the more specific, the better your match rate.</p>

      <form onSubmit={submit} className="card-surface mt-8 space-y-6 p-6 sm:p-8" noValidate>
        {formError && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{formError}</p>}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700">Job title</label>
            <input value={form.title} onChange={(e) => update("title", e.target.value)} className="input-field" placeholder="Senior Frontend Engineer" />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700">Company name</label>
            <input value={form.company} onChange={(e) => update("company", e.target.value)} className="input-field" placeholder="Acme Inc." />
            {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-graphite-700">Company logo URL (optional)</label>
            <input value={form.companyLogo} onChange={(e) => update("companyLogo", e.target.value)} className="input-field" placeholder="https://…" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700">Location</label>
            <input value={form.location} onChange={(e) => update("location", e.target.value)} className="input-field" placeholder="Austin, TX" />
            {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700">Category</label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} className="input-field">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700">Work mode</label>
            <select value={form.workMode} onChange={(e) => update("workMode", e.target.value)} className="input-field">
              {["Remote", "Hybrid", "On-site"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700">Job type</label>
            <select value={form.jobType} onChange={(e) => update("jobType", e.target.value)} className="input-field">
              {["Full-time", "Part-time", "Contract", "Internship", "Freelance"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700">Experience level</label>
            <select value={form.experienceLevel} onChange={(e) => update("experienceLevel", e.target.value)} className="input-field">
              {["Entry", "Mid", "Senior", "Lead"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700">Minimum salary (USD)</label>
            <input type="number" value={form.salaryMin} onChange={(e) => update("salaryMin", e.target.value)} className="input-field" placeholder="120000" />
            {errors.salaryMin && <p className="mt-1 text-xs text-red-600">{errors.salaryMin}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-graphite-700">Maximum salary (USD)</label>
            <input type="number" value={form.salaryMax} onChange={(e) => update("salaryMax", e.target.value)} className="input-field" placeholder="160000" />
            {errors.salaryMax && <p className="mt-1 text-xs text-red-600">{errors.salaryMax}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-graphite-700">Short description</label>
          <textarea value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} className="input-field" rows={2} maxLength={220} placeholder="One or two sentences shown on the job card." />
          {errors.shortDescription && <p className="mt-1 text-xs text-red-600">{errors.shortDescription}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-graphite-700">Full description</label>
          <textarea value={form.fullDescription} onChange={(e) => update("fullDescription", e.target.value)} className="input-field" rows={6} placeholder="Team context, what the role owns, and why it's open." />
          {errors.fullDescription && <p className="mt-1 text-xs text-red-600">{errors.fullDescription}</p>}
        </div>

        <TagListInput label="Tech stack" values={techStack} onChange={setTechStack} placeholder="e.g. TypeScript — press Enter to add" />
        <TagListInput label="Responsibilities" values={responsibilities} onChange={setResponsibilities} placeholder="e.g. Own the checkout service — press Enter to add" />
        <TagListInput label="Requirements" values={requirements} onChange={setRequirements} placeholder="e.g. 4+ years with distributed systems — press Enter to add" />

        <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
          <PlusCircle size={16} /> {loading ? "Publishing…" : "Publish listing"}
        </button>
      </form>
    </div>
  );
}
