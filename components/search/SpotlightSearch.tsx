'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ARTICLES } from '@/data/articles';
import { Article } from '@/types';
import Link from 'next/link';
import { SearchIcon, XIcon, ClockIcon } from '@/components/ui/Icons';
import { CategoryBadge } from '@/components/ui/Badge';

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpotlightSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const cleanQ = query.toLowerCase().trim();
    const filtered = ARTICLES.filter((a) => {
      return (
        a.title.toLowerCase().includes(cleanQ) ||
        a.excerpt.toLowerCase().includes(cleanQ) ||
        a.category.name.toLowerCase().includes(cleanQ) ||
        a.author.name.toLowerCase().includes(cleanQ) ||
        a.tags.some((t) => t.toLowerCase().includes(cleanQ))
      );
    });
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <SearchIcon size={20} className="text-zinc-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un article, sujet, auteur, guide..."
            className="w-full bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <XIcon size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            ESC
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 block">
                SUGGESTIONS DU MOMENT
              </span>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Intelligence Artificielle', 'WebGPU', 'Hardware Modulaire', 'Écologie', 'Agents IA'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-500 transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 block">
                ARTICLES POPULAIRES
              </span>
              <div className="flex flex-col gap-3">
                {ARTICLES.slice(0, 3).map((art) => (
                  <Link
                    key={art.id}
                    href={`/article/${art.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
                  >
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-red-500 truncate">
                        {art.title}
                      </h4>
                      <span className="text-[11px] text-zinc-400">
                        {art.category.name} • {art.readingTime} min
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1 block">
                {results.length} RÉSULTAT{results.length > 1 ? 'S' : ''} TROUVÉ{results.length > 1 ? 'S' : ''}
              </span>
              {results.map((art) => (
                <Link
                  key={art.id}
                  href={`/article/${art.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                >
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CategoryBadge category={art.category} size="sm" clickable={false} />
                      <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                        <ClockIcon size={11} />
                        {art.readingTime} min
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-red-500 line-clamp-1">
                      {art.title}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                      {art.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Aucun résultat pour <span className="font-semibold text-zinc-900 dark:text-white">"{query}"</span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
