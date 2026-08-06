"use client"
import React from 'react';
import { resume } from '../../lib/data';
import { Download, FileText, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto px-6 md:px-12 max-w-[900px]">
      
      {/* Resume Actions Bar */}
      <div className="py-6 border-b border-border-base dark:border-zinc-900 flex justify-between items-center no-print">
        <div className="flex items-center gap-2 text-text-secondary">
          <FileText size={18} />
          <span className="text-[13px] font-semibold">Printable Curriculum Vitae</span>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4 py-2 bg-accent-base text-white text-[13px] font-semibold rounded-sm hover:bg-accent-base/90 active:scale-97 transition"
        >
          <Printer size={14} />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Sheet Container */}
      <section className="py-12 md:py-16 space-y-12 print-card">
        
        {/* Header Name & Role */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-text-primary pb-8 gap-6">
          <div>
            <h1 className="text-[36px] md:text-[46px] font-extrabold tracking-tight text-text-primary leading-none">
              {resume.name}
            </h1>
            <p className="text-[16px] md:text-[18px] text-text-secondary dark:text-zinc-400 mt-2 font-medium">
              {resume.role}
            </p>
          </div>

          {/* Contact Details */}
          <div className="text-[13px] md:text-[14px] text-text-secondary dark:text-zinc-405 space-y-1 md:text-right font-medium">
            <p>{resume.contact.email}</p>
            <p>{resume.contact.location}</p>
            <p>{resume.contact.github} | {resume.contact.linkedin}</p>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="space-y-3">
          <h2 className="text-[14px] font-bold text-text-primary uppercase tracking-wider border-b border-border-base pb-1">
            Summary
          </h2>
          <p className="text-[14px] text-text-secondary dark:text-zinc-400 leading-relaxed font-normal">
            {resume.summary}
          </p>
        </section>

        {/* Experience details */}
        <section className="space-y-6">
          <h2 className="text-[14px] font-bold text-text-primary uppercase tracking-wider border-b border-border-base pb-1">
            Professional Experience
          </h2>
          
          <div className="space-y-8">
            {resume.experience.map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-[15px] font-bold text-text-primary dark:text-zinc-200">
                      {exp.role}
                    </h3>
                    <p className="text-[13px] text-text-secondary dark:text-zinc-500 font-semibold mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-[12px] text-text-secondary font-mono bg-bg-base dark:bg-zinc-950 px-2 py-0.5 rounded border border-border-base/50 dark:border-zinc-805 shrink-0">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="list-disc list-inside space-y-1.5 pl-1 pt-1 text-[13.5px] text-text-secondary dark:text-zinc-400 leading-relaxed">
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="pl-1">
                      <span className="font-normal">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education Details */}
        <section className="space-y-4">
          <h2 className="text-[14px] font-bold text-text-primary uppercase tracking-wider border-b border-border-base pb-1">
            Education
          </h2>
          {resume.education.map((edu, idx) => (
            <div key={idx} className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-[14px] font-bold text-text-primary dark:text-zinc-200">
                  {edu.institution}
                </h3>
                <p className="text-[12px] text-text-secondary dark:text-zinc-500 mt-0.5">
                  {edu.degree}
                </p>
              </div>
              <span className="text-[12px] text-text-secondary font-mono bg-bg-base dark:bg-zinc-950 px-2 py-0.5 rounded border border-border-base/50 dark:border-zinc-805 shrink-0">
                {edu.period}
              </span>
            </div>
          ))}
        </section>

        {/* Skills grid section */}
        <section className="space-y-4 pb-12">
          <h2 className="text-[14px] font-bold text-text-primary uppercase tracking-wider border-b border-border-base pb-1">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
            {resume.skills.map((skill, idx) => (
              <div key={idx} className="space-y-1.5">
                <h4 className="text-[12px] font-bold text-text-secondary dark:text-zinc-500 uppercase tracking-wide">
                  {skill.category}
                </h4>
                <p className="text-[13px] text-text-primary dark:text-zinc-300 font-semibold leading-relaxed">
                  {skill.items.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>

      </section>

    </div>
  );
}
