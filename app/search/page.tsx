'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ARTICLES } from '@/data/articles';
import { Article } from '@/types';
import { ArticleCardGrid } from '@/components/cards/ArticleCardGrid';
import { NewsletterBanner } from '@/components/newsletter/NewsletterBanner';
import { SearchIcon } from '@/components/ui/Icons';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Article[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(ARTICLES);
      return;
    }
    const q = query.toLowerCase().trim();
    const filtered = ARTICLES.filter((a) => {
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.name.toLowerCase().includes(q) ||
        a.author.name.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
    setResults(filtered);
  }, [query]);

  return (
    <div className="w-full pb-16">
      {/* Search Header */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200/80 dark:border-zinc-800 py-12 md:py-16">
        <div className="container-media">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2 block">
              MOTEUR DE RECHERCHE
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-6">
              Rechercher dans les archives
            </h1>

            <div className="relative">
              <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Mots-clés, thématiques, dossiers..."
                className="w-full pl-12 pr-6 py-4 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 border border-zinc-200 dark:border-zinc-700 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="container-media mt-12 md:mt-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            {results.length} résultat{results.length > 1 ? 's' : ''} {query ? `pour "${query}"` : 'au total'}
          </span>
          <Link href="/blog" className="text-xs font-bold text-red-500 uppercase tracking-wider hover:underline">
            Voir le flux blog →
          </Link>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {results.map((art) => (
              <ArticleCardGrid key={art.id} article={art} badgeLabel="RÉSULTAT" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-sm mb-4">
              Aucun résultat ne correspond à votre recherche.
            </p>
            <button
              onClick={() => setQuery('')}
              className="px-6 py-2.5 rounded-full bg-red-500 text-white text-xs font-bold uppercase tracking-wider"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>

      <div className="container-media">
        <NewsletterBanner />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-media py-20 text-center">Chargement de la recherche...</div>}>
      <SearchContent />
    </Suspense>
  );
}
