import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '../../../lib/data';
import { ExternalLink, ArrowLeft, Shield, Terminal, Compass, Cpu, Layers } from 'lucide-react';
import { Metadata } from 'next';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Github = ({ size = 14, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Props {
  params: Promise<{ slug: string }>;
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.title} — Case Study by Rajat Dua`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.imageUrl }],
    },
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto px-6 md:px-12 max-w-[1000px] py-6">
      
      {/* Back to projects */}
      <div className="mb-12 no-print">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-text-secondary hover:text-text-primary transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Product Portfolio</span>
        </Link>
      </div>

      <article className="space-y-16">
        
        {/* Header */}
        <header className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent-base bg-accent-base/10 px-2.5 py-1 rounded">
              Case Study
            </span>
            <span className="text-[12px] font-medium text-text-secondary">
              Product Architecture
            </span>
          </div>

          <h1 className="text-[42px] md:text-[62px] font-extrabold tracking-tight text-text-primary leading-tight">
            {project.title}
          </h1>

          <p className="text-[18px] md:text-[20px] text-text-secondary dark:text-zinc-400 font-normal leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4 border-y border-border-base/50 dark:border-zinc-850 py-6 no-print">
            <div className="flex-1 min-w-[150px]">
              <span className="text-[11px] uppercase font-bold text-text-secondary dark:text-zinc-550 block mb-1">Tech Stack</span>
              <p className="text-[14px] font-semibold text-text-primary dark:text-zinc-300">{project.techStack.join(', ')}</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-sm bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800 text-[13px] font-semibold text-text-primary dark:text-zinc-200 hover:bg-bg-base transition inline-flex items-center gap-1.5"
              >
                <Github size={14} />
                <span>GitHub</span>
              </Link>
              <Link
                href={project.demoUrl}
                className="px-4 py-2.5 rounded-sm bg-accent-base text-[13px] font-semibold text-white hover:bg-accent-base/90 transition inline-flex items-center gap-1.5"
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Visual Cover */}
        <div className="w-full aspect-[21/9] bg-bg-base dark:bg-zinc-950 rounded-lg overflow-hidden border border-border-base/50 dark:border-zinc-850 relative">
          <div className="absolute inset-0 bg-cover bg-center filter grayscale opacity-40" style={{ backgroundImage: `url(${project.imageUrl})` }} />
        </div>

        {/* Main Case Study Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pt-4">
          
          {/* Summary Sidebar */}
          <aside className="md:col-span-4 space-y-8">
            <div className="p-6 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800/80 rounded-lg space-y-6">
              <h3 className="text-[15px] font-bold text-text-primary dark:text-zinc-150 uppercase tracking-wider">Specifications</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-text-secondary uppercase dark:text-zinc-550 block">Architecture</span>
                  <span className="text-[13px] text-text-primary dark:text-zinc-300 font-medium leading-relaxed block mt-1">{project.architecture}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-text-secondary uppercase dark:text-zinc-550 block">Key Modules</span>
                  <ul className="list-disc list-inside text-[13px] text-text-primary dark:text-zinc-300 mt-1 space-y-1">
                    {project.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="truncate">{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          {/* Detailed Paragraphs */}
          <div className="md:col-span-8 space-y-12 text-[16px] text-text-secondary dark:text-zinc-400 leading-relaxed font-normal">
            
            <section className="space-y-4">
              <h2 className="text-[22px] font-bold text-text-primary dark:text-zinc-150 tracking-tight flex items-center gap-2">
                <Cpu size={18} className="text-accent-base" />
                <span>The Problem Space</span>
              </h2>
              <p>{project.longDescription}</p>
              <p className="pt-2">{project.problem}</p>
            </section>

            <section className="space-y-4 pt-4 border-t border-border-base/50 dark:border-zinc-850">
              <h2 className="text-[22px] font-bold text-text-primary dark:text-zinc-150 tracking-tight flex items-center gap-2">
                <Layers size={18} className="text-accent-base" />
                <span>The Solution Implementation</span>
              </h2>
              <p>{project.solution}</p>
              <ul className="list-none space-y-3 pt-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-base mt-2 flex-shrink-0" />
                    <span className="text-[15px]">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4 pt-4 border-t border-border-base/50 dark:border-zinc-850">
              <h2 className="text-[22px] font-bold text-text-primary dark:text-zinc-150 tracking-tight">
                Engineering Challenges
              </h2>
              <p>{project.challenges}</p>
            </section>

            <section className="space-y-4 pt-4 border-t border-border-base/50 dark:border-zinc-850 pb-12">
              <h2 className="text-[22px] font-bold text-text-primary dark:text-zinc-150 tracking-tight">
                Architectural Lessons
              </h2>
              <p>{project.lessons}</p>
            </section>

          </div>
        </div>

      </article>
    </div>
  );
}
