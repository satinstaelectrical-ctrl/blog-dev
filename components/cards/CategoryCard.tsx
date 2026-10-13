import React from 'react';
import { Category } from '@/types';
import Link from 'next/link';

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col items-center justify-center h-28 sm:h-32 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md text-center border border-transparent"
      style={{
        backgroundColor: category.badgeBg,
      }}
    >
      <h3
        className="font-heading font-bold text-sm sm:text-base tracking-tight mb-1"
        style={{ color: category.badgeText }}
      >
        {category.name}
      </h3>

      {category.count !== undefined && (
        <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
          {category.count} articles
        </span>
      )}
    </Link>
  );
}
