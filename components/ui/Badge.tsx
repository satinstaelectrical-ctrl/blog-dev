import React from 'react';
import { Category } from '@/types';
import Link from 'next/link';

interface BadgeProps {
  category: Category;
  size?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
  className?: string;
}

export function CategoryBadge({ category, size = 'sm', clickable = true, className = '' }: BadgeProps) {
  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-1 font-semibold tracking-wide uppercase',
    md: 'text-xs px-3 py-1.5 font-semibold tracking-wide uppercase',
    lg: 'text-sm px-4 py-2 font-semibold',
  };

  const content = (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full transition-all duration-200 ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: category.badgeBg,
        color: category.badgeText,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: category.accentColor }}
      />
      {category.name}
    </span>
  );

  if (clickable) {
    return (
      <Link
        href={`/category/${category.slug}`}
        className="inline-block transition-transform hover:scale-105"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export function PillBadge({
  label,
  variant = 'default',
  className = '',
}: {
  label: string;
  variant?: 'default' | 'accent' | 'dark';
  className?: string;
}) {
  const variantStyles = {
    default: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700',
    accent: 'bg-red-500 text-white font-medium',
    dark: 'bg-black/60 backdrop-blur-md text-white font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full uppercase tracking-wider transition-colors ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
}

export function ArticleAutoBadge({
  article,
  className = '',
}: {
  article: {
    publishedAt: string;
    isExclusive?: boolean;
    views?: number;
    likes?: number;
  };
  className?: string;
}) {
  // 1. Badge Exclusivité activé manuellement par l'administrateur
  if (article.isExclusive) {
    return (
      <span
        className={`px-2.5 py-1 rounded-full bg-[#EF4248] text-[10px] font-extrabold tracking-wider text-white uppercase shadow-xs ${className}`}
      >
        EXCLUSIF
      </span>
    );
  }

  // 2. Badge Nouveau automatique (publié il y a moins de 7 jours)
  const publishedDate = new Date(article.publishedAt).getTime();
  const diffDays = (Date.now() - publishedDate) / (1000 * 60 * 60 * 24);
  if (!isNaN(diffDays) && diffDays >= 0 && diffDays <= 7) {
    return (
      <span
        className={`px-2.5 py-1 rounded-full bg-emerald-600 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-xs ${className}`}
      >
        NOUVEAU
      </span>
    );
  }

  // 3. Badge Populaire automatique (vues > 10 000 ou interactions > 500)
  if ((article.views && article.views > 10000) || (article.likes && article.likes > 500)) {
    return (
      <span
        className={`px-2.5 py-1 rounded-full bg-purple-600 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-xs ${className}`}
      >
        POPULAIRE
      </span>
    );
  }

  // 4. Badge RECENT standard officiel Ontario
  return (
    <span
      className={`px-2.5 py-1 rounded-full bg-[#17191D] text-[10px] font-extrabold tracking-wider text-white uppercase shadow-xs ${className}`}
    >
      RECENT
    </span>
  );
}

