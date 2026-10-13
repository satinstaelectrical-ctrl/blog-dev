'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { getCategoryBySlug, CATEGORIES } from '@/data/categories';
import { getArticlesByCategory, getFeaturedArticles, ARTICLES } from '@/data/articles';
import { AUTHORS } from '@/data/authors';
import { ArticleCardGrid } from '@/components/cards/ArticleCardGrid';
import { EditorialSidebar } from '@/components/sidebar/EditorialSidebar';
import { NewsletterBanner } from '@/components/newsletter/NewsletterBanner';
import Link from 'next/link';

export default function CategoryArchivePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return notFound();
  }

  const articles = getArticlesByCategory(category.slug);
  const featuredArticles = getFeaturedArticles();
  const mainAuthor = AUTHORS.find((a) => a.slug === 'kate-johnson') || AUTHORS[0];
  const allTags = [
    'Intelligence Artificielle',
    'Hardware Modulaire',
    'Cognition',
    'WebGPU',
    'Agents IA',
    'Minimalisme',
  ];

  return (
    <div className="w-full pb-16">
      {/* Category Banner */}
      <section
        className="py-14 md:py-20 border-b border-zinc-200/80 dark:border-zinc-800 transition-colors"
        style={{
          backgroundColor: category.badgeBg,
        }}
      >
        <div className="container-media">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <Link href="/" className="text-xs font-semibold text-zinc-500 hover:underline">
                Accueil
              </Link>
              <span className="text-zinc-400">/</span>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Rubrique
              </span>
            </div>

            <h1
              className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
              style={{ color: category.badgeText }}
            >
              {category.name}
            </h1>

            <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl">
              {category.description}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-black/40 text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-xs">
              <span>{articles.length} article{articles.length > 1 ? 's' : ''} publié{articles.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid + Sidebar */}
      <section className="container-media mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Main Articles Grid (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {articles.map((art) => (
                  <ArticleCardGrid key={art.id} article={art} badgeLabel={category.name.toUpperCase()} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-500 text-sm">
                  Aucun article n'a encore été publié dans cette rubrique.
                </p>
                <Link
                  href="/blog"
                  className="mt-4 inline-block text-xs font-bold text-red-500 uppercase tracking-wider"
                >
                  Voir tous les articles →
                </Link>
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
