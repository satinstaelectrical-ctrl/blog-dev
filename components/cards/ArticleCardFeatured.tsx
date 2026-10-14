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
    <section className="relative w-full min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] h-[86vh] max-h-[940px] bg-[#071426] text-white overflow-hidden select-none">
      {/* Arrière-plan Photographique Grand Angle avec Transition Douce */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          key={current.id}
          src={current.coverImage}
          alt={current.imageAlt || current.title}
          loading="eager"
          fetchPriority="high"
          style={{ objectPosition: current.focalPoint || 'center center' }}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out scale-100 hover:scale-105 filter brightness-[0.92] contrast-[1.05]"
        />

        {/* Masque Dégradé Editorial Profond */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#071426] via-[#071426]/60 to-black/60 sm:via-[#071426]/40 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#071426]/95 via-[#071426]/75 to-transparent sm:w-3/4 lg:w-3/5 pointer-events-none" />
      </div>

      {/* Contenu Éditorial Inférieur Gauche Aligné sur le Conteneur Ontario (1376px) */}
      <div className="absolute bottom-10 sm:bottom-14 lg:bottom-16 inset-x-0 z-20">
        <div className="site-container container-media">
          <div className="max-w-3xl flex flex-col items-start text-left">
            {/* Badges de Catégories (Pills Translucides comme dans la capture) */}
            <div className="flex items-center gap-2 mb-3.5 flex-wrap">
              <span className="px-3.5 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-xs transition-all">
                {current.category?.name || 'AI'}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-[11px] font-extrabold uppercase tracking-wider text-white/90 shadow-xs transition-all">
                TECHNOLOGY
              </span>
            </div>

            {/* Grand Titre H1 Éditorial */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold text-white tracking-tight leading-[1.08] mb-3.5 drop-shadow-lg">
              <Link href={`/article/${current.slug}`} className="hover:text-zinc-200 transition-colors">
                {current.title}
              </Link>
            </h1>

            {/* Ligne Métadonnées Auteur & Date conforme à la capture: "Steve Jones on Mar 24, 2026" */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-medium mb-3.5">
              <span className="text-white font-semibold">{current.author?.name || 'Steve Jones'}</span>
              <span>on</span>
              <span>{formatDateFr(current.publishedAt)}</span>
            </div>

            {/* Extrait fluide et soigné */}
            <p className="text-sm sm:text-base text-zinc-300/95 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-3 mb-6 font-normal drop-shadow-xs">
              {current.excerpt}
            </p>

            {/* Commandes Circulaires du Carrousel Flèche Gauche & Flèche Droite conformes à la capture */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handlePrev}
                aria-label="Article précédent"
                className="w-11 h-11 rounded-full border border-white/35 bg-black/40 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95 group shadow-xl"
              >
                <ChevronLeftIcon size={16} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Article suivant"
                className="w-11 h-11 rounded-full border border-white/35 bg-black/40 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95 group shadow-xl"
              >
                <ChevronRightIcon size={16} />
              </button>

              {/* Indicateur Numérique & Puces */}
              <div className="flex items-center gap-2.5 ml-2">
                <span className="text-xs font-mono font-bold text-white/90">
                  0{currentIndex + 1} / 0{articles.length}
                </span>
                <div className="hidden sm:flex items-center gap-1.5 ml-1">
                  {articles.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1 rounded-full transition-all cursor-pointer ${
                        idx === currentIndex ? 'w-6 bg-[#EF4248]' : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
