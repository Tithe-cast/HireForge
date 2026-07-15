import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/lib/content";

export const metadata = { title: "Blog — HireForge" };

// Color-code categories using the existing brand accents, same pattern as job cards.
function categoryStyles(category: string) {
  if (category === "Hiring") return "border-ember-500/30 bg-ember-500/10 text-ember-700";
  return "border-circuit-500/30 bg-circuit-500/10 text-circuit-700";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="container-hf py-16">
      <div className="max-w-lg">
        <span className="tag w-fit">from the team</span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">The HireForge blog</h1>
        <p className="mt-3 text-graphite-500">Notes on hiring, interviewing, and building a career worth compiling.</p>
      </div>

      {/* Featured post */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group relative mt-10 flex flex-col overflow-hidden rounded-2xl border border-graphite-200 bg-graphite-900 p-8 text-paper shadow-card transition hover:shadow-card-hover sm:p-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-circuit-grid bg-[size:32px_32px] opacity-20" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-graphite-700 bg-graphite-800 px-2.5 py-1 font-mono text-[11px] text-ember-400">
              {featured.category}
            </span>
            <span className="font-mono text-[11px] text-graphite-500">Featured</span>
          </div>
          <h2 className="mt-5 max-w-2xl font-display text-2xl font-bold leading-snug tracking-tight transition-colors group-hover:text-ember-400 sm:text-3xl">
            {featured.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-graphite-400">{featured.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-graphite-500">
            <span>{featured.author}</span>
            <span>·</span>
            <span>{formatDate(featured.date)}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime} read</span>
          </div>
          <span className="mt-6 flex w-fit items-center gap-1.5 text-sm font-semibold text-ember-400 transition-transform group-hover:translate-x-1">
            Read the full article <ArrowRight size={15} />
          </span>
        </div>
      </Link>

      {/* Remaining posts */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-surface group flex flex-col p-6"
          >
            <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-tight ${categoryStyles(post.category)}`}>
              {post.category}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-graphite-900 transition-colors group-hover:text-ember-600">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-graphite-500">{post.excerpt}</p>

            <div className="mt-auto flex items-center justify-between pt-5">
              <div className="flex items-center gap-2 text-xs text-graphite-400">
                <span>{post.author}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-ember-600 transition-transform group-hover:translate-x-0.5">
                Read <ArrowRight size={13} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}