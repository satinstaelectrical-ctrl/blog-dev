import React from 'react';
import {
  ARTICLES,
  getFeaturedArticles,
  getRecentArticles,
  getFreshArticles,
  getHeroArticles,
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
import { ArrowUpRightIcon } from '@/components/ui/Icons';

export default function HomePage() {
  const heroArticles = getHeroArticles();
  const freshArticles = getFreshArticles().length > 0 ? getFreshArticles() : ARTICLES.slice(1, 7);
  const recentArticles = ARTICLES.filter((a) => a.id.startsWith('art-recent-'));
  const horizontalList = recentArticles.length > 0 ? recentArticles : ARTICLES.slice(7, 10);
  const sidebarFeatured = ARTICLES.filter((a) => a.id.startsWith('art-sidebar-') || a.isHero);

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
      {/* 1. HERO IMMERSIF 100VW FULL-BLEED (Capture 4 Theme Ontario) */}
      <ArticleCardFeatured articles={heroArticles} />

      {/* 2. TRENDING TICKER BAR SOUS LE HERO (Capture 4 Theme Ontario) */}
      <section className="w-full border-b py-3 transition-colors" style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)' }}>
        <div className="container-media">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-xs font-semibold whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
            {/* Puce 1 : Crypto (Vert) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400">
                CRYPTO
              </span>
              <Link href={`/article/${freshArticles[1]?.slug || ''}`} className="hover:text-[#EF4248] transition-colors">
                Colorful Packaging in Contemporary Crypto Branding
              </Link>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>

            {/* Puce 2 : Digital (Violet) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400">
                DIGITAL
              </span>
              <Link href={`/article/${freshArticles[3]?.slug || ''}`} className="hover:text-[#EF4248] transition-colors">
                Transparent Structures in Digital Architecture
              </Link>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>

            {/* Puce 3 : AI (Rose) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-pink-100 dark:bg-pink-950/70 text-pink-600 dark:text-pink-400">
                AI
              </span>
              <Link href={`/article/${freshArticles[0]?.slug || ''}`} className="hover:text-[#EF4248] transition-colors">
                AI Motion Techniques in Abstract Digital Design
              </Link>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>

            {/* Puce 4 : Business (Bleu/Ardoise) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400">
                BUSINESS
              </span>
              <Link href={`/article/${freshArticles[5]?.slug || ''}`} className="hover:text-[#EF4248] transition-colors">
                Organic Shapes in Modern Digital Architecture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RUBRIQUES PASTELS ÉPURÉES "BLOG CATEGORIES" (Capture 4 Theme Ontario) */}
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

      {/* 4. FRESH OFF THE PRESS (Capture 5 — Grille 6 Cartes Exactes 3x2) */}
      <section className="container-media mt-16 md:mt-22">
        <div className="flex items-center justify-between mb-8">
          <div>
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

        {/* Grille 3 Colonnes x 2 Rangées Conforme Capture 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {freshArticles.slice(0, 6).map((art) => (
            <ArticleCardGrid key={art.id} article={art} isWide={false} />
          ))}
        </div>
      </section>

      {/* 5. RECENT ARTICLES (70%) + SIDEBAR ÉDITORIALE (30%) (Capture 2 & 3) */}
      <section className="container-media mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Colonne Principale (70% - 8 colonnes) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  Recent Articles
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {horizontalList.map((art) => (
                <ArticleCardHorizontal key={art.id} article={art} />
              ))}
            </div>

            {/* Pagination Conforme Capture 2 (1 2 3 >) */}
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

          {/* Sidebar Éditoriale (30% - 4 colonnes) */}
          <div className="lg:col-span-4">
            <EditorialSidebar
              author={mainAuthor}
              featuredArticles={sidebarFeatured}
              categories={CATEGORIES}
              recentArticles={freshArticles}
              tags={allTags}
            />
          </div>
        </div>
      </section>

      {/* 6. BANNIÈRE NEWSLETTER UNIVERSELLE (Capture 1) */}
      <div id="newsletter-section" className="mt-16 md:mt-24">
        <NewsletterBanner />
      </div>
    </div>
  );
}
