import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/lib/content";

// Same category color coding used on the full blog listing page.
function categoryStyles(category: string) {
  if (category === "Hiring") return "border-ember-500/30 bg-ember-500/10 text-ember-700";
  return "border-circuit-500/30 bg-circuit-500/10 text-circuit-700";
}

export default function BlogPreview() {
  return (
    <section className="border-b border-graphite-200 py-20">
      <div className="container-hf">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="tag">from the blog</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">From the HireForge blog</h2>
            <p className="mt-3 max-w-md text-graphite-500">Notes on hiring, interviewing, and building a career worth compiling.</p>
          </div>
          <Link href="/blog" className="btn-secondary">
            Read the blog <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card-surface group flex flex-col p-6">
              <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-tight ${categoryStyles(post.category)}`}>
                {post.category}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold leading-snug text-graphite-900 transition-colors group-hover:text-ember-600">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-graphite-500">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-5">
                <span className="flex items-center gap-1 text-xs text-graphite-400">
                  <Clock size={11} /> {post.readTime}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-ember-600 transition-transform group-hover:translate-x-0.5">
                  Read <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}