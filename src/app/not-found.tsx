import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-hf flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="font-mono text-sm text-ember-600">error: 404</span>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-graphite-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-graphite-500">The page you're looking for doesn't exist or may have moved.</p>
      <Link href="/" className="btn-primary mt-6">Back to home</Link>
    </div>
  );
}
