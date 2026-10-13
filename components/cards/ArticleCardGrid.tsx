import React from 'react';
import { Article } from '@/types';
import Link from 'next/link';
import { CategoryBadge } from '@/components/ui/Badge';
import { ClockIcon, ShareIcon } from '@/components/ui/Icons';
import { formatCompactDateFr } from '@/lib/utils';

interface ArticleCardGridProps {
  article: Article;
  badgeLabel?: string;
  showExcerpt?: boolean;
  isWide?: boolean;
}

export function ArticleCardGrid({
  article,
  badgeLabel = 'RECENT',
  showExcerpt = false,
  isWide = false,
}: ArticleCardGridProps) {
  return (
    <article className="group flex flex-col cursor-pointer">
      {/* Media container */}
      <div className={`relative ${isWide ? 'aspect-[16/9]' : 'aspect-[16/10]'} w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-3.5 shadow-xs`}>
        <Link href={`/article/${article.slug}`} className="block w-full h-full">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Top-left Badge RECENT */}
        {badgeLabel && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-[#17191D] text-[10px] font-extrabold tracking-wider text-white uppercase shadow-xs">
              {badgeLabel}
            </span>
          </div>
        )}

        {/* Bottom-right reading time */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-semibold text-white/90">
          <ClockIcon size={12} className="text-zinc-300" />
          <span>{article.readingTime} MIN</span>
        </div>
      </div>

      {/* Content container */}
      <div className="flex flex-col flex-1">
        <h3 className={`font-heading font-bold ${isWide ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'} leading-snug tracking-tight group-hover:text-[#EF4248] transition-colors mb-2`} style={{ color: 'var(--text-primary)' }}>
          <Link href={`/article/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        {showExcerpt && (
          <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>{article.author.name} on {formatCompactDateFr(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  );
}
