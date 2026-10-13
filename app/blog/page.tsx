'use client';

import React, { useState } from 'react';
import { ARTICLES, getFeaturedArticles } from '@/data/articles';
import { CATEGORIES } from '@/data/categories';
import { AUTHORS } from '@/data/authors';
import { ArticleCardGrid } from '@/components/cards/ArticleCardGrid';
import { EditorialSidebar } from '@/components/sidebar/EditorialSidebar';
import { NewsletterBanner } from '@/components/newsletter/NewsletterBanner';
import { ChevronRightIcon, ChevronLeftIcon } from '@/components/ui/Icons';
import Link from 'next/link';

export default function BlogArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const filteredArticles =
    selectedCategory === 'all'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category.slug === selectedCategory);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const featuredArticles = getFeaturedArticles();
  const mainAuthor = AUTHORS.find((a) => a.slug === 'kate-johnson') || AUTHORS[0];
  const allTags = [
    'Intelligence Artificielle',
    'Hardware Modulaire',
    'Cognition',
    'WebGPU',
    'Agents IA',
    'Minimalisme',
    'Design Systèmes',
    'Local AI',
  ];

  return (
    <div className="w-full pb-16">
      {/* Blog Archive Header */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200/80 dark:border-zinc-800 py-12 md:py-16">
        <div className="container-media">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
              ARCHIVES ÉDITORIALES
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
              Toutes Nos Publications
            </h1>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Explorez l’ensemble de nos analyses, enquêtes approfondies, bancs d’essai et prospectives technologiques.
            </p>

            {/* Interactive Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-red-500 text-white shadow-sm'
                    : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                Tous ({ARTICLES.length})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Blog Grid + Sidebar Layout (Ontario Page 2) */}
      <section className="container-media mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* 2-column post grid (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-zinc-500">
              <span>
                Affichage de {paginatedArticles.length} sur {filteredArticles.length} articles
              </span>
              <span>Page {currentPage} sur {totalPages}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {paginatedArticles.map((art) => (
                <ArticleCardGrid key={art.id} article={art} badgeLabel="RÉCENT" />
              ))}
            </div>

            {/* Pagination Controls matching Ontario Template */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeftIcon size={16} />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ChevronRightIcon size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <EditorialSidebar
              author={mainAuthor}
              featuredArticles={featuredArticles}
              categories={CATEGORIES}
              recentArticles={ARTICLES}
              tags={allTags}
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <div className="container-media">
        <NewsletterBanner />
      </div>
    </div>
  );
}
