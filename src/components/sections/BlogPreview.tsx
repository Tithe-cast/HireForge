import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/content";

export default function BlogPreview() {
  return (
    <section className="border-b border-graphite-200 py-20">
      <div className="container-hf">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">From the HireForge blog</h2>
            <p className="mt-3 max-w-md text-graphite-500">Notes on hiring, interviewing, and building a career worth compiling.</p>
          </div>
          <Link href="/blog" className="btn-secondary">
            Read the blog <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card-surface flex flex-col p-6">
              <span className="tag w-fit">{post.category}</span>
              <h3 className="mt-4 font-display text-base font-semibold leading-snug text-graphite-900">{post.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-graphite-500">{post.excerpt}</p>
              <span className="mt-4 text-xs font-medium text-ember-600">{post.readTime} read →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
