import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '../../../lib/data';
import { ArrowLeft, Clock, Calendar, Bookmark } from 'lucide-react';
import ReadingProgressBar from '../../../components/ReadingProgressBar';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} — Engineering Blog by Rajat Dua`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [{ url: post.coverUrl }],
    },
  };
}

// Simple deterministic Markdown parser helper to translate raw data.ts strings to elegant TSX elements
function renderMarkdown(content: string) {
  const lines = content.split('\n');
  let insideCode = false;
  let codeSnippet: string[] = [];
  
  return lines.map((line, idx) => {
    // Code block toggle
    if (line.trim().startsWith('```')) {
      if (insideCode) {
        insideCode = false;
        const code = codeSnippet.join('\n');
        codeSnippet = [];
        return (
          <pre key={idx} className="p-4 bg-bg-base dark:bg-zinc-950 rounded-sm border border-border-base dark:border-zinc-850 font-mono text-[13px] text-text-primary dark:text-zinc-300 overflow-x-auto my-6">
            <code>{code}</code>
          </pre>
        );
      } else {
        insideCode = true;
        return null;
      }
    }

    if (insideCode) {
      codeSnippet.push(line);
      return null;
    }

    // Headers
    if (line.trim().startsWith('###')) {
      return (
        <h3 key={idx} className="text-[20px] font-bold text-text-primary dark:text-zinc-100 tracking-tight mt-8 mb-4">
          {line.replace('###', '').trim()}
        </h3>
      );
    }
    if (line.trim().startsWith('##')) {
      return (
        <h2 key={idx} className="text-[24px] font-bold text-text-primary dark:text-zinc-100 tracking-tight mt-10 mb-4 border-b border-border-base/50 dark:border-zinc-900 pb-2">
          {line.replace('##', '').trim()}
        </h2>
      );
    }

    // Unordered lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      return (
        <ul key={idx} className="list-disc list-inside pl-4 text-text-secondary dark:text-zinc-400 space-y-1.5 my-3">
          <li>{line.substring(2).trim()}</li>
        </ul>
      );
    }

    // Ordered lists
    if (/^\d+\.\s/.test(line.trim())) {
      return (
        <ol key={idx} className="list-decimal list-inside pl-4 text-text-secondary dark:text-zinc-400 space-y-1.5 my-3">
          <li>{line.replace(/^\d+\.\s/, '').trim()}</li>
        </ol>
      );
    }

    // Empty lines
    if (line.trim() === '') {
      return <div key={idx} className="h-4" />;
    }

    // Paragraph
    return (
      <p key={idx} className="text-[16px] text-text-secondary dark:text-zinc-400 leading-relaxed my-4 font-normal">
        {line.trim()}
      </p>
    );
  });
}

export default async function BlogPostDetail({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Generate related posts matching tags
  const relatedPosts = blogPosts
    .filter((b) => b.slug !== slug && b.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 2);

  return (
    <>
      {/* Scroll reader progress bar */}
      <ReadingProgressBar />

      <div className="mx-auto px-6 md:px-12 max-w-[800px] py-6">
        
        {/* Back Link */}
        <div className="mb-12 no-print">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-text-secondary hover:text-text-primary transition"
          >
            <ArrowLeft size={16} />
            <span>Back to Engineering Feed</span>
          </Link>
        </div>

        <article className="space-y-10">
          {/* Header Metadata */}
          <header className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-bold text-accent-base bg-accent-base/10 px-2.5 py-1 rounded uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-[36px] md:text-[54px] font-extrabold tracking-tight text-text-primary leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-[13px] font-semibold text-text-secondary dark:text-zinc-500 border-y border-border-base/50 dark:border-zinc-850 py-4">
              <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {post.readingTime} read time</span>
            </div>
          </header>

          {/* Cover Visual */}
          <div className="w-full aspect-[21/10] bg-bg-base dark:bg-zinc-950 rounded-lg overflow-hidden border border-border-base/50 dark:border-zinc-850 relative">
            <div className="absolute inset-0 bg-cover bg-center filter grayscale opacity-45" style={{ backgroundImage: `url(${post.coverUrl})` }} />
          </div>

          {/* Render parsed text content */}
          <div className="py-6 border-b border-border-base/50 dark:border-zinc-850">
            {renderMarkdown(post.content)}
          </div>
        </article>

        {/* Related Posts Panel */}
        {relatedPosts.length > 0 && (
          <section className="pt-16 pb-12 no-print">
            <h3 className="text-[16px] font-bold text-text-primary uppercase tracking-widest mb-6">Related Readings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group p-5 bg-card-base dark:bg-zinc-900 border border-border-base dark:border-zinc-800/80 rounded-lg hover:border-text-secondary/40 transition block"
                >
                  <span className="text-[11px] text-text-secondary dark:text-zinc-500 font-medium">{rel.date}</span>
                  <h4 className="text-[16px] font-bold text-text-primary dark:text-zinc-200 mt-2 tracking-tight group-hover:text-accent-base transition-colors line-clamp-1">
                    {rel.title}
                  </h4>
                  <p className="text-[13px] text-text-secondary dark:text-zinc-450 mt-1.5 line-clamp-2 leading-relaxed">
                    {rel.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </>
  );
}
