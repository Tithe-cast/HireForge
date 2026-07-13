"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Hammer } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const loggedOutLinks = [
    { href: "/jobs", label: "Explore Jobs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const loggedInExtra =
    user?.role === "employer"
      ? [
          { href: "/jobs", label: "Explore Jobs" },
          { href: "/jobs/add", label: "Post a Job" },
          { href: "/jobs/manage", label: "Manage Jobs" },
        ]
      : [{ href: "/jobs", label: "Explore Jobs" }, { href: "/faq", label: "FAQ" }];

  const links = user
    ? [...loggedInExtra, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }, { href: "/blog", label: "Blog" }]
    : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-graphite-200 bg-paper/90 backdrop-blur">
      <div className="container-hf flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-graphite-900 text-ember-500">
            <Hammer size={16} strokeWidth={2.5} />
          </span>
          HireForge
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                pathname === l.href ? "bg-graphite-900 text-paper" : "text-graphite-600 hover:bg-graphite-100 hover:text-graphite-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {loading ? (
            <div className="h-9 w-24 skeleton" />
          ) : user ? (
            <>
              <span className="tag">{user.role === "employer" ? user.company || "Employer" : "Candidate"}</span>
              <button onClick={logout} className="btn-ghost">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-ghost">
                Log in
              </Link>
              <Link href="/register" className="btn-primary">
                Get started
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-graphite-200 bg-paper md:hidden">
          <div className="container-hf flex flex-col gap-1 py-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-graphite-700 hover:bg-graphite-100">
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-graphite-200 pt-3">
              {user ? (
                <button onClick={logout} className="btn-secondary w-full">
                  Sign out
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="btn-secondary w-full">
                    Log in
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)} className="btn-primary w-full">
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
