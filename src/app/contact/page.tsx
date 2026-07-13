"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="container-hf py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Get in touch</h1>
          <p className="mt-3 max-w-sm text-graphite-500">
            Questions about a listing, a candidate account, or a partnership — our team responds within one business day.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-graphite-100 text-graphite-600"><Mail size={15} /></span>
              <div>
                <p className="text-sm font-medium text-graphite-900">Email</p>
                <p className="text-sm text-graphite-500">hello@hireforge.dev</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-graphite-100 text-graphite-600"><MapPin size={15} /></span>
              <div>
                <p className="text-sm font-medium text-graphite-900">Based in</p>
                <p className="text-sm text-graphite-500">Austin, TX — remote-first team</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-graphite-100 text-graphite-600"><Clock size={15} /></span>
              <div>
                <p className="text-sm font-medium text-graphite-900">Response time</p>
                <p className="text-sm text-graphite-500">Within 1 business day</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-surface p-6 sm:p-8">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <Send size={28} className="text-ember-500" />
              <h2 className="mt-4 font-display text-lg font-semibold text-graphite-900">Message sent</h2>
              <p className="mt-2 text-sm text-graphite-500">Thanks for reaching out — we'll reply within one business day.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-graphite-700">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Jordan Lee" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-graphite-700">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="you@domain.com" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-graphite-700">Message</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field" placeholder="How can we help?" />
              </div>
              <button type="submit" className="btn-primary w-full">
                <Send size={15} /> Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
