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
