import Link from "next/link";
import { Hammer, Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-graphite-200 bg-graphite-900 text-graphite-200">
      <div className="container-hf grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-paper">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember-500 text-graphite-900">
              <Hammer size={16} strokeWidth={2.5} />
            </span>
            HireForge
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-graphite-400">
            The job board built by developers, for developers. Real roles, transparent pay, no noise.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-graphite-700 text-graphite-300 transition hover:border-ember-500 hover:text-ember-500" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-graphite-700 text-graphite-300 transition hover:border-ember-500 hover:text-ember-500" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-graphite-700 text-graphite-300 transition hover:border-ember-500 hover:text-ember-500" aria-label="Twitter">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-paper">Platform</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/jobs" className="text-graphite-400 hover:text-ember-500">Explore jobs</Link></li>
            <li><Link href="/jobs/add" className="text-graphite-400 hover:text-ember-500">Post a job</Link></li>
            <li><Link href="/register" className="text-graphite-400 hover:text-ember-500">Create account</Link></li>
            <li><Link href="/faq" className="text-graphite-400 hover:text-ember-500">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-paper">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/about" className="text-graphite-400 hover:text-ember-500">About us</Link></li>
            <li><Link href="/blog" className="text-graphite-400 hover:text-ember-500">Blog</Link></li>
            <li><Link href="/contact" className="text-graphite-400 hover:text-ember-500">Contact</Link></li>
            <li><Link href="/privacy" className="text-graphite-400 hover:text-ember-500">Privacy &amp; Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-paper">Get in touch</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-graphite-400">
            <li className="flex items-center gap-2"><Mail size={14} /> hello@hireforge.dev</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Remote-first, planet Earth</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-graphite-800 py-5">
        <div className="container-hf flex flex-col items-center justify-between gap-2 text-xs text-graphite-500 sm:flex-row">
          <p>© {new Date().getFullYear()} HireForge. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-ember-500">Privacy</Link>
            <Link href="/privacy" className="hover:text-ember-500">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
