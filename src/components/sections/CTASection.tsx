import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="container-hf">
        <div className="relative overflow-hidden rounded-2xl border border-graphite-200 bg-gradient-to-br from-graphite-900 to-graphite-800 px-8 py-14 text-center text-paper sm:px-14">
          <div className="absolute inset-0 bg-circuit-grid bg-[size:32px_32px] opacity-30" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Ready to build what's next?</h2>
            <p className="mx-auto mt-4 max-w-md text-graphite-400">
              Whether you're shipping your next commit or hiring the person who will, HireForge gets you there faster.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/jobs" className="btn-primary">
                Explore open roles <ArrowRight size={15} />
              </Link>
              <Link href="/register" className="rounded-full border border-graphite-600 px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-graphite-700">
                Post a job
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
