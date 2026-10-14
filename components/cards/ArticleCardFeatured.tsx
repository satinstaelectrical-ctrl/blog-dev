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
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [articles.length]);

  return (
    <section className="relative w-full bg-[#071426] text-white pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 overflow-hidden">
      {/* Fond décoratif subtil et atténué bleu nuit (ne parasite pas la lecture) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-900/20 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-purple-900/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#EF4248]/5 blur-3xl" />
      </div>

      <div className="site-container container-media relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          
          {/* Colonne Gauche : Texte Éditorial Majeur (~7 colonnes) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Pastille Catégorie Pill Translucide */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider mb-4 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#EF4248]" />
              <span className="text-white/95">{current.category?.name || 'TECH / AI'}</span>
            </div>

            {/* Grand Titre H1 Éditorial */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold tracking-tight leading-[1.12] mb-5">
              <Link href={`/article/${current.slug}`} className="hover:text-zinc-200 transition-colors">
                {current.title}
              </Link>
            </h1>

            {/* Métadonnées & Auteur */}
            <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300 mb-5 flex-wrap">
              <Link href={`/author/${current.author?.slug || 'steve-jones'}`} className="flex items-center gap-2 font-medium hover:text-white">
                <img
                  src={current.author?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'}
                  alt={current.author?.name || 'Steve Jones'}
                  className="w-6 h-6 rounded-full object-cover border border-white/20"
                />
                <span>Par <b className="text-white font-semibold">{current.author?.name || 'Steve Jones'}</b></span>
              </Link>
              <span>•</span>
              <time dateTime={current.publishedAt}>{formatDateFr(current.publishedAt)}</time>
              <span>•</span>
              <span>⏱️ {current.readingTime} min</span>
            </div>

            {/* Extrait fluide et lisible */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 sm:mb-8 line-clamp-3 max-w-xl">
              {current.excerpt}
            </p>

            {/* Actions & Flèches de navigation Slider Hero */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href={`/article/${current.slug}`}
                className="px-6 sm:px-7 py-3 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-[#EF4248]/25 flex items-center gap-2 group"
              >
                <span>Lire l'article complet</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>

              {articles.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Article précédent"
                    className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeftIcon size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Article suivant"
                    className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRightIcon size={16} />
                  </button>
                  <span className="text-xs font-mono font-medium text-zinc-400 ml-1.5">
                    0{currentIndex + 1} / 0{articles.length}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Colonne Droite : Frame Photo 4:3 avec angles 22px, bordure fine, ombre discrète (~5 colonnes) */}
          <div className="lg:col-span-5 w-full flex flex-col">
            <Link
              href={`/article/${current.slug}`}
              className="relative w-full aspect-[4/3] rounded-[22px] overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-[#0E2137] group block"
            >
              {/* Skeleton de chargement sous-jacent */}
              <div className="absolute inset-0 bg-[#0E2137] animate-pulse flex items-center justify-center text-zinc-500 text-xs">
                <span>Chargement du visuel...</span>
              </div>

              {/* Photographie éditoriale haute définition avec point de cadrage configurable */}
              <img
                key={current.id}
                src={current.coverImage}
                alt={current.imageAlt || current.title}
                loading="eager"
                fetchPriority="high"
                style={{ objectPosition: current.focalPoint || 'center center' }}
                className="relative z-10 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Légende d'image optionnelle au bas du cadre */}
              {(current.coverCaption || current.excerpt) && (
                <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-6 text-[11px] text-zinc-300">
                  <p className="line-clamp-1 italic">{current.coverCaption || 'Photographie éditoriale — ONTARIO Magazine'}</p>
                </div>
              )}

              {/* Badge interactif coin supérieur droit */}
              <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white uppercase tracking-wider">
                À la Une
              </div>
            </Link>

            {/* Mention / Légende éditoriale discrète sous le cadre */}
            {current.coverCaption && (
              <span className="text-[11px] text-zinc-400 mt-2 px-1 text-right italic hidden sm:block">
                {current.coverCaption}
              </span>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
