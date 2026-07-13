import Link from "next/link";
import { BLOG_POSTS } from "@/lib/content";

export const metadata = { title: "Blog — HireForge" };

export default function BlogPage() {
  return (
    <div className="container-hf py-16">
      <div className="max-w-lg">
        <h1 className="font-display text-3xl font-bold tracking-tight">The HireForge blog</h1>
        <p className="mt-3 text-graphite-500">Notes on hiring, interviewing, and building a career worth compiling.</p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="card-surface flex flex-col p-6">
            <span className="tag w-fit">{post.category}</span>
            <h2 className="mt-4 font-display text-lg font-semibold leading-snug text-graphite-900">{post.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-graphite-500">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-graphite-400">
              <span>{post.author}</span>
              <span>·</span>
              <span>{post.readTime} read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
