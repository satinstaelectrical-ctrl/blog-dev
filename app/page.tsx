import React from 'react';
import {
  ARTICLES,
  getFeaturedArticles,
  getRecentArticles,
  getTrendingArticles,
} from '@/data/articles';
import { CATEGORIES } from '@/data/categories';
import { AUTHORS } from '@/data/authors';
import { ArticleCardFeatured } from '@/components/cards/ArticleCardFeatured';
import { ArticleCardGrid } from '@/components/cards/ArticleCardGrid';
import { ArticleCardHorizontal } from '@/components/cards/ArticleCardHorizontal';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { EditorialSidebar } from '@/components/sidebar/EditorialSidebar';
import { NewsletterBanner } from '@/components/newsletter/NewsletterBanner';
import Link from 'next/link';
import { ArrowUpRightIcon, SparklesIcon } from '@/components/ui/Icons';

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles(6);
  const trendingArticles = getTrendingArticles(6);
  const freshArticles = ARTICLES.slice(0, 6);
  const mainAuthor = AUTHORS.find((a) => a.slug === 'steve-jones') || AUTHORS[0];

  const allTags = [
    'ARTIFICIAL INTELLIGENCE',
    'BREAKING NEWS',
    'BUSINESS GROWTH',
    'CLOUD COMPUTING',
    'DIGITAL MARKETING',
    'FUTURE OF WORK',
    'GLOBAL TRENDS',
    'MACHINE LEARNING',
    'TECHNOLOGY',
    'VENTURE CAPITAL',
    'WEB3',
  ];

  return (
    <div className="w-full pb-16">
      {/* 1. HERO IMMERSIF 100VW FULL-BLEED CONFORME ONTARIO */}
      <ArticleCardFeatured articles={featuredArticles} />

      {/* 1.5. TRENDING TICKER BAR SOUS LE HERO */}
      <section className="w-full border-b py-3" style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)' }}>
        <div className="container-media">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-xs font-semibold whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <Link href={`/article/${ARTICLES[1]?.slug || ''}`} className="hover:text-[#EF4248] transition-colors">
                ADVANCED TECHNIQUES IN ABSTRACT DIGITAL DESIGN
              </Link>
            </div>
            <span className="text-zinc-400">•</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <Link href={`/article/${ARTICLES[2]?.slug || ''}`} className="hover:text-[#EF4248] transition-colors">
                ORGANIC SHAPES IN MODERN DIGITAL ARCHITECTURE
              </Link>
            </div>
            <span className="text-zinc-400">•</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <Link href={`/article/${ARTICLES[3]?.slug || ''}`} className="hover:text-[#EF4248] transition-colors">
                HOLISTIC PACKAGING IN CONTEMPORARY SPATIAL BRANDING
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RUBRIQUES PASTELS ÉPURÉES "BLOG CATEGORIES" */}
      <section className="container-media mt-14 md:mt-18">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Blog Categories
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Explorez nos dossiers par champ de recherche et spécialités
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#EF4248] hover:underline uppercase tracking-wider"
          >
            <span>Toutes les rubriques</span>
            <ArrowUpRightIcon size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 3. FRESH OFF THE PRESS (GRILLE ASYMÉTRIQUE 1+2 / 2+1 CONFORME ONTARIO) */}
      <section className="container-media mt-16 md:mt-22">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#EF4248]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#EF4248]">
                EXCLUSIVITÉS
              </span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Fresh off the Press
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EF4248] hover:underline uppercase tracking-wider"
          >
            <span>Voir le flux complet</span>
            <ArrowUpRightIcon size={14} />
          </Link>
        </div>

        {/* Rangée 1 : 1 large + 2 étroits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8">
          {freshArticles[0] && (
            <div className="lg:col-span-6">
              <ArticleCardGrid article={freshArticles[0]} badgeLabel="RECENT" isWide={true} />
            </div>
          )}
          {freshArticles[1] && (
            <div className="lg:col-span-3">
              <ArticleCardGrid article={freshArticles[1]} badgeLabel="RECENT" isWide={false} />
            </div>
          )}
          {freshArticles[2] && (
            <div className="lg:col-span-3">
              <ArticleCardGrid article={freshArticles[2]} badgeLabel="RECENT" isWide={false} />
            </div>
          )}
        </div>

        {/* Rangée 2 : 2 étroits + 1 large */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {freshArticles[3] && (
            <div className="lg:col-span-3">
              <ArticleCardGrid article={freshArticles[3]} badgeLabel="RECENT" isWide={false} />
            </div>
          )}
          {freshArticles[4] && (
            <div className="lg:col-span-3">
              <ArticleCardGrid article={freshArticles[4]} badgeLabel="RECENT" isWide={false} />
            </div>
          )}
          {freshArticles[5] && (
            <div className="lg:col-span-6">
              <ArticleCardGrid article={freshArticles[5]} badgeLabel="RECENT" isWide={true} />
            </div>
          )}
        </div>
      </section>

      {/* 4. RECENT ARTICLES (2/3) + SIDEBAR ÉDITORIALE (1/3) */}
      <section className="container-media mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Colonne Principale 2/3 */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#EF4248]">
                  DERNIÈRES PUBLICATIONS
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mt-1" style={{ color: 'var(--text-primary)' }}>
                  Recent Articles
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {recentArticles.map((art) => (
                <ArticleCardHorizontal key={art.id} article={art} />
              ))}
            </div>

            {/* Pagination 1 2 3 > */}
            <div className="flex items-center gap-2 mt-10">
              <button className="w-9 h-9 rounded-full bg-[#EF4248] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                1
              </button>
              <Link
                href="/blog"
                className="w-9 h-9 rounded-full border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                2
              </Link>
              <Link
                href="/blog"
                className="w-9 h-9 rounded-full border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                3
              </Link>
              <Link
                href="/blog"
                className="w-9 h-9 rounded-full border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                ›
              </Link>
            </div>
          </div>

          {/* Sidebar Éditoriale 1/3 */}
          <div className="lg:col-span-4">
            <EditorialSidebar
              author={mainAuthor}
              featuredArticles={featuredArticles}
              categories={CATEGORIES}
              recentArticles={recentArticles}
              tags={allTags}
            />
          </div>
        </div>
      </section>

      {/* 5. BANNIÈRE NEWSLETTER UNIVERSELLE */}
      <div id="newsletter-section" className="mt-16 md:mt-24">
        <NewsletterBanner />
      </div>
    </div>
  );
}
