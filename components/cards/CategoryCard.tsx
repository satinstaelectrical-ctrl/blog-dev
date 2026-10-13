import React from 'react';
import { Category } from '@/types';
import Link from 'next/link';

export function CategoryCard({ category }: { category: Category }) {
  const isDark = category.isDark || category.badgeBg === '#13283E';

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`group relative flex flex-col items-center justify-center h-28 sm:h-32 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-center overflow-hidden border ${
        isDark ? 'border-white/10 text-white shadow-sm' : 'border-black/5 dark:border-white/5'
      }`}
      style={{
        backgroundColor: category.badgeBg,
      }}
    >
      {/* Background visual for special dark card (Technology card in Capture 4) */}
      {isDark && category.image && (
        <>
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-luminosity group-hover:scale-110 group-hover:opacity-40 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13283E] via-[#13283E]/75 to-transparent" />
        </>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center">
        <h3
          className="font-heading font-bold text-sm sm:text-base tracking-tight mb-1 group-hover:scale-105 transition-transform"
          style={{ color: isDark ? '#FFFFFF' : category.badgeText }}
        >
          {category.name}
        </h3>

        {category.count !== undefined && (
          <span
            className={`text-[11px] font-medium ${
              isDark ? 'text-zinc-300' : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            {category.count} articles
          </span>
        )}
      </div>
    </Link>
  );
}
