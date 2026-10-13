'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Author, Article, Category } from '@/types';
import { ArticleCardMini } from '@/components/cards/ArticleCardMini';
import {
  TwitterIcon,
  LinkedInIcon,
} from '@/components/ui/Icons';
import { formatCompactDateFr } from '@/lib/utils';

interface EditorialSidebarProps {
  author?: Author;
  featuredArticles: Article[];
  categories: Category[];
  recentArticles: Article[];
  tags: string[];
}

export function EditorialSidebar({
  author,
  featuredArticles,
  categories,
  recentArticles,
  tags,
}: EditorialSidebarProps) {
  const [sliderIndex, setSliderIndex] = useState(0);
  const featured = featuredArticles[sliderIndex] || featuredArticles[0];

  return (
    <aside className="w-full flex flex-col gap-8">
      {/* 1. Featured Posts Carousel Widget (Conforme Image A Ontario) */}
      {featured && (
        <div className="relative w-full rounded-3xl overflow-hidden shadow-sm group cursor-pointer border" style={{ borderColor: 'var(--border-color)' }}>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <img
              src={featured.coverImage}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="absolute bottom-0 inset-x-0 p-6 text-white">
              <h4 className="font-heading font-bold text-base sm:text-lg leading-snug mb-2 group-hover:text-zinc-200">
                <Link href={`/article/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h4>
              <p className="text-[11px] text-zinc-300">
                {featured.author.name} on {formatCompactDateFr(featured.publishedAt)}
              </p>
            </div>
          </div>

          {/* Dots Indicator */}
          {featuredArticles.length > 1 && (
            <div className="p-3 flex justify-center gap-1.5" style={{ backgroundColor: 'var(--surface-soft)' }}>
              {featuredArticles.slice(0, 3).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSliderIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    idx === sliderIndex ? 'bg-[#EF4248] scale-125' : 'bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. About Author Widget */}
      {author && (
        <div className="p-6 rounded-3xl border shadow-xs" style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)' }}>
          <div className="flex items-center justify-between mb-4 pb-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              ABOUT AUTHOR
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-20 h-20 rounded-full object-cover mb-3 ring-4 ring-black/5 dark:ring-white/10 shadow-sm"
            />
            <h3 className="font-heading font-bold text-base" style={{ color: 'var(--text-primary)' }}>
              {author.name}
            </h3>
            <span className="text-xs font-semibold text-[#EF4248] uppercase tracking-wider mb-3">
              {author.role}
            </span>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              {author.bio}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {author.socials.twitter && (
                <a
                  href={author.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[#EF4248] hover:text-white transition-colors"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  <TwitterIcon size={13} />
                </a>
              )}
              {author.socials.linkedin && (
                <a
                  href={author.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[#EF4248] hover:text-white transition-colors"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  <LinkedInIcon size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Related Articles Widget */}
      <div className="p-6 rounded-3xl border shadow-xs" style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center justify-between mb-4 pb-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            RELATED ARTICLES
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {recentArticles.slice(0, 3).map((art) => (
            <ArticleCardMini key={art.id} article={art} />
          ))}
        </div>
      </div>

      {/* 4. Popular Tags Widget */}
      <div className="p-6 rounded-3xl border shadow-xs" style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center justify-between mb-4 pb-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            POPULAR TAGS
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/search?q=${encodeURIComponent(tag)}`}
              className="text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all hover:bg-[#EF4248] hover:text-white hover:border-[#EF4248] uppercase tracking-wider"
              style={{
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--surface)',
              }}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
