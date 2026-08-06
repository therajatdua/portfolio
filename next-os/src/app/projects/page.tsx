"use client"
import React from 'react';
import Link from 'next/link';
import { projects } from '../../lib/data';
import { ExternalLink, ArrowRight, Shield, Terminal, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Github = ({ size = 24, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
  };

  return (
    <div className="mx-auto px-6 md:px-12 max-w-[1400px]">
      <section className="py-12 md:py-20 border-b border-border-base dark:border-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl"
        >
          <h1 className="text-[42px] md:text-[52px] font-extrabold tracking-tight text-text-primary leading-none">
            Product Portfolio
          </h1>
          <p className="text-[18px] text-text-secondary dark:text-zinc-400 mt-4 leading-relaxed font-normal">
            A comprehensive catalog of systems designed and engineered by Rajat Dua, exploring on-device AI operations, system scripting, and client analytics.
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {projects.map((project) => (
            <motion.article
              key={project.slug}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group bg-card-base dark:bg-zinc-900 rounded-lg border border-border-base dark:border-zinc-800/80 p-8 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-lg dark:shadow-none"
            >
              <div className="space-y-6">
                {/* Project Image */}
                <div className="w-full aspect-[16/9] bg-bg-base dark:bg-zinc-950/80 rounded-sm overflow-hidden border border-border-base/30 dark:border-zinc-850 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-cover bg-center filter grayscale opacity-25 group-hover:opacity-40 group-hover:scale-103 transition duration-500" style={{ backgroundImage: `url(${project.imageUrl})` }} />
                  <div className="z-10 p-6 w-full h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] uppercase font-bold tracking-wider text-text-secondary dark:text-zinc-450 bg-card-base dark:bg-zinc-900 border border-border-base/50 dark:border-zinc-800 px-3 py-1 rounded">
                        Case Study
                      </span>
                      <div className="flex gap-2">
                        {project.slug === 'memovault' && <Shield size={18} className="text-text-secondary dark:text-zinc-400" />}
                        {project.slug === 'expense-tracker' && <Terminal size={18} className="text-text-secondary dark:text-zinc-400" />}
                        {project.slug === 'khabri' && <Compass size={18} className="text-text-secondary dark:text-zinc-400" />}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[26px] font-extrabold text-text-primary dark:text-zinc-150 tracking-tight leading-none group-hover:text-accent-base transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[15px] text-text-secondary dark:text-zinc-400 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-[11px] font-bold text-text-secondary dark:text-zinc-400 bg-bg-base dark:bg-zinc-950 border border-border-base/50 dark:border-zinc-850 px-2.5 py-1 rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-border-base/40 dark:border-zinc-850 flex items-center justify-between text-[14px] font-semibold">
                <div className="flex gap-6">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition inline-flex items-center gap-1.5">
                    <Github size={15} />
                    <span>GitHub Repository</span>
                  </Link>
                  <Link href={project.demoUrl} className="text-text-secondary dark:text-zinc-400 hover:text-text-primary dark:hover:text-zinc-200 transition inline-flex items-center gap-1.5">
                    <ExternalLink size={15} />
                    <span>Live Demo</span>
                  </Link>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-accent-base hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Explore Case Study</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
