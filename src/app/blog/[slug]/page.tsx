import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "@/lib/content";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="container-hf max-w-2xl py-16">
      <Link href="/blog" className="flex items-center gap-1.5 text-sm text-graphite-500 hover:text-ember-600">
        <ArrowLeft size={14} /> Back to blog
      </Link>

      <span className="tag mt-6 w-fit">{post.category}</span>
      <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-graphite-900 sm:text-4xl">{post.title}</h1>
      <div className="mt-4 flex items-center gap-3 text-sm text-graphite-500">
        <span>{post.author}</span>
        <span>·</span>
        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
        <span>·</span>
        <span>{post.readTime} read</span>
      </div>

      <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-graphite-700">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}
