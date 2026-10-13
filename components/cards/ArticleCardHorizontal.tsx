import React from 'react';
import { Article } from '@/types';
import Link from 'next/link';
import { ClockIcon } from '@/components/ui/Icons';
import { formatCompactDateFr } from '@/lib/utils';

export function ArticleCardHorizontal({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col sm:flex-row gap-5 sm:gap-6 pb-8 border-b cursor-pointer transition-colors" style={{ borderColor: 'var(--border-color)' }}>
      {/* Thumbnail Left */}
      <div className="relative w-full sm:w-56 aspect-[4/3] rounded-2xl overflow-hidden flex-shrink-0 shadow-xs bg-zinc-100 dark:bg-zinc-800">
        <Link href={`/article/${article.slug}`} className="block w-full h-full">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-semibold text-white">
          <ClockIcon size={11} />
          <span>{article.readingTime} MIN</span>
        </div>
      </div>

      {/* Details Right */}
      <div className="flex flex-col justify-center min-w-0">
        <h3 className="font-heading font-bold text-lg sm:text-xl leading-snug tracking-tight group-hover:text-[#EF4248] transition-colors mb-2" style={{ color: 'var(--text-primary)' }}>
          <Link href={`/article/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
          {article.author.name} on {formatCompactDateFr(article.publishedAt)}
        </p>

        <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {article.excerpt}
        </p>

        <div>
          <Link
            href={`/article/${article.slug}`}
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#EF4248] group-hover:underline"
          >
            MORE →
          </Link>
        </div>
      </div>
    </article>
  );
}
