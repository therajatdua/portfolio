import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-12 mt-32 border-t border-border-base dark:border-zinc-800/80 bg-card-base dark:bg-zinc-950/20 no-print">
      <div className="mx-auto px-6 md:px-12 max-w-[1400px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[13px] text-text-secondary dark:text-zinc-500 font-medium">
            © {new Date().getFullYear()} Rajat Dua. Operating System. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link
              href="https://github.com/therajatdua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/therajatdua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition"
            >
              LinkedIn
            </Link>
            <Link
              href="https://youtube.com/@therajatdua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition"
            >
              YouTube
            </Link>
            <Link
              href="https://instagram.com/therajatdua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition"
            >
              Instagram
            </Link>
            <Link
              href="mailto:rajat@example.com"
              className="text-[13px] font-semibold text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition"
            >
              Email
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
