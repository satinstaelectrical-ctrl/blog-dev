import React from 'react';
import { Article } from '@/types';
import Link from 'next/link';
import { formatCompactDateFr } from '@/lib/utils';

export function ArticleCardMini({ article }: { article: Article }) {
  return (
    <article className="group flex items-center gap-3.5">
      <Link
        href={`/article/${article.slug}`}
        className="relative w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800"
      >
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-col min-w-0">
        <h4 className="font-heading font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-red-500 transition-colors line-clamp-2 leading-snug mb-1">
          <Link href={`/article/${article.slug}`}>
            {article.title}
          </Link>
        </h4>

        <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
          <time dateTime={article.publishedAt}>
            {formatCompactDateFr(article.publishedAt)}
          </time>
          <span>•</span>
          <span>{article.readingTime} min</span>
        </div>
      </div>
    </article>
  );
}
