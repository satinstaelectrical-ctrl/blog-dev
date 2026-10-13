'use client';

import React, { useState } from 'react';
import { Article } from '@/types';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';
import { formatDateFr } from '@/lib/utils';

export function ArticleCardFeatured({ articles }: { articles: Article[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!articles || articles.length === 0) return null;
  const current = articles[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === current.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="hero-fullbleed relative w-full h-[580px] sm:h-[660px] lg:h-[720px] overflow-hidden bg-[#071426] text-white">
      {/* Photographie immersive 100vw */}
      <img
        src={current.coverImage}
        alt={current.title}
        className="w-full h-full object-cover object-center filter brightness-95 transition-transform duration-700 ease-out hover:scale-105"
      />

      {/* Dégradés cinématiques gauche et bas */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/90 via-transparent to-transparent" />

      {/* Contenu textuel dans le conteneur éditorial centré */}
      <div className="absolute inset-0 flex items-center">
        <div className="container-media w-full pt-16 sm:pt-20">
          <div className="max-w-2xl text-white">
            {/* Pastille Catégorie Pill Translucide */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#EF4248]" />
              <span>{current.category?.name || 'TECH / AI'}</span>
            </div>

            {/* Titre Principal H1 */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5">
              <Link href={`/article/${current.slug}`} className="hover:text-zinc-200 transition-colors">
                {current.title}
              </Link>
            </h1>

            {/* Auteur et Métadonnées */}
            <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300 mb-4">
              <Link href={`/author/${current.author.slug}`} className="flex items-center gap-2 font-medium hover:text-white">
                <img
                  src={current.author.avatar}
                  alt={current.author.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-white/30"
                />
                <span>Par <b className="text-white">{current.author.name}</b></span>
              </Link>
              <span>•</span>
              <time dateTime={current.publishedAt}>{formatDateFr(current.publishedAt)}</time>
              <span>•</span>
              <span>⏱️ {current.readingTime} min</span>
            </div>

            {/* Extrait */}
            <p className="text-sm sm:text-base text-zinc-200/90 leading-relaxed mb-6 line-clamp-2 sm:line-clamp-3">
              {current.excerpt}
            </p>

            {/* Actions Slider */}
            <div className="flex items-center gap-3">
              <Link
                href={`/article/${current.slug}`}
                className="px-6 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-md"
              >
                Lire l'article complet →
              </Link>

              {articles.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Article précédent"
                    className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeftIcon size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Article suivant"
                    className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRightIcon size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
