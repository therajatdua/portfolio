import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { resources } from '../../../lib/data';
import { ArrowLeft, Download, Bookmark, Terminal, HelpCircle, RefreshCw } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = resources.find((r) => r.slug === slug);
  if (!resource) return { title: 'Resource Not Found' };
  
  return {
    title: `${resource.title} — Documentation by Rajat Dua`,
    description: resource.description,
  };
}

export default async function ResourceDetail({ params }: Props) {
  const { slug } = await params;
  const resource = resources.find((r) => r.slug === slug);

  if (!resource) {
    notFound();
  }

  return (
    <div className="mx-auto px-6 md:px-12 max-w-[1000px] py-6">
      
      {/* Back to catalog */}
      <div className="mb-12 no-print">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-text-secondary hover:text-text-primary transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Documentation Catalog</span>
        </Link>
      </div>

      <article className="space-y-16">
        
        {/* Header */}
        <header className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent-base bg-accent-base/10 px-2.5 py-1 rounded">
                {resource.category}
              </span>
              <span className="text-[12px] font-mono text-text-secondary">
                {resource.version}
              </span>
            </div>
            <span className="text-[12px] text-text-secondary">Stable Release</span>
          </div>

          <h1 className="text-[42px] md:text-[54px] font-extrabold tracking-tight text-text-primary leading-tight">
            {resource.title}
          </h1>

          <p className="text-[18px] text-text-secondary dark:text-zinc-400 font-normal leading-relaxed max-w-3xl">
            {resource.description}
          </p>

          <div className="pt-4 no-print">
            <Link
              href={resource.downloadUrl}
              target={resource.downloadUrl.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-accent-base text-white text-[14px] font-semibold hover:bg-accent-base/90 active:scale-97 transition"
            >
              <Download size={15} />
              <span>Download / Access Resource</span>
            </Link>
          </div>
        </header>

        {/* Apple-style Multi-section layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 border-t border-border-base dark:border-zinc-850">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-12 text-[15px] text-text-secondary dark:text-zinc-400 leading-relaxed font-normal">
            
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="text-[20px] font-bold text-text-primary dark:text-zinc-150 tracking-tight flex items-center gap-2">
                <Bookmark size={18} className="text-accent-base" />
                <span>Overview</span>
              </h2>
              <p>{resource.overview}</p>
            </section>

            {/* Installation Instructions */}
            <section className="space-y-4 pt-4 border-t border-border-base/50 dark:border-zinc-850">
              <h2 className="text-[20px] font-bold text-text-primary dark:text-zinc-150 tracking-tight flex items-center gap-2">
                <Terminal size={18} className="text-accent-base" />
                <span>Installation and Usage Instructions</span>
              </h2>
              <ol className="list-decimal list-inside space-y-3 pt-2">
                {resource.installation.map((step, idx) => (
                  <li key={idx} className="pl-1">
                    <span className="text-[15px] text-text-primary dark:text-zinc-300 font-medium">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* FAQs */}
            <section className="space-y-6 pt-4 border-t border-border-base/50 dark:border-zinc-850">
              <h2 className="text-[20px] font-bold text-text-primary dark:text-zinc-150 tracking-tight flex items-center gap-2">
                <HelpCircle size={18} className="text-accent-base" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-6">
                {resource.faqs.map((faq, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-[15px] font-bold text-text-primary dark:text-zinc-200">{faq.q}</h3>
                    <p className="text-[14px] leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar Updates */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="p-6 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800/80 rounded-lg space-y-4">
              <h3 className="text-[14px] font-bold text-text-primary dark:text-zinc-150 uppercase tracking-wider flex items-center gap-2">
                <RefreshCw size={14} className="text-accent-base" />
                <span>Change Log</span>
              </h3>
              <ul className="space-y-3 text-[13px] list-none">
                {resource.updates.map((update, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-text-secondary dark:text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-base mt-2 flex-shrink-0" />
                    <span>{update}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

        </div>

      </article>
    </div>
  );
}
