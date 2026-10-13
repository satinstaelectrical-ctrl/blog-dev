'use client';

import React, { useState, useEffect } from 'react';
import { getContentStore, subscribeToContentStore, ContentStoreState } from '@/lib/contentStore';
import { ArticleCardFeatured } from '@/components/cards/ArticleCardFeatured';
import { ArticleCardGrid } from '@/components/cards/ArticleCardGrid';
import { ArticleCardHorizontal } from '@/components/cards/ArticleCardHorizontal';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { EditorialSidebar } from '@/components/sidebar/EditorialSidebar';
import { NewsletterBanner } from '@/components/newsletter/NewsletterBanner';
import Link from 'next/link';

export default function HomePage() {
  const [store, setStore] = useState<ContentStoreState | null>(null);

  useEffect(() => {
    setStore(getContentStore());
    const unsubscribe = subscribeToContentStore((updated) => {
      setStore(updated);
    });
    return () => unsubscribe();
  }, []);

  // Articles publiés uniquement pour le public
  const publishedArticles = (store?.articles || []).filter(
    (a) => !a.status || a.status === 'published'
  );

  // Hero Article personnalisé
  const heroArticles = publishedArticles.filter((a) => a.isHero || a.isFeatured);
  const heroList = heroArticles.length > 0 ? heroArticles : publishedArticles.slice(0, 2);

  // Si une personnalisation du Hero est configurée dans le CMS, on l'applique sur le premier article Hero
  const displayHeroList = heroList.map((art, idx) => {
    if (idx === 0 && store?.customization?.hero) {
      return {
        ...art,
        title: store.customization.hero.mainTitle || art.title,
        excerpt: store.customization.hero.subtitle || art.excerpt,
        coverImage: store.customization.hero.coverImage || art.coverImage,
        readingTime: store.customization.hero.readingTime || art.readingTime,
      };
    }
    return art;
  });

  // Fresh off the press : 6 articles suivants
  const freshArticles = publishedArticles.slice(1, 7);

  // Recent Articles : flux horizontal
  const recentArticles = publishedArticles.slice(7, 10);
  const horizontalList = recentArticles.length > 0 ? recentArticles : publishedArticles.slice(0, 3);

  const sidebarFeatured = publishedArticles.filter((a) => a.id.startsWith('art-sidebar-') || a.isFeatured);

  const customization = store?.customization;
  const sections = customization?.sections || {
    showTicker: true,
    showCategories: true,
    showFreshArticles: true,
    showRecentArticles: true,
    showPopularTags: true,
    showSponsorAd: true,
    showNewsletter: true,
  };

  const categories = store?.categories || [];

  return (
    <div className="w-full pb-16">
      {/* 1. HERO IMMERSIF 100VW FULL-BLEED (Capture 4 Theme Ontario) */}
      <ArticleCardFeatured articles={displayHeroList} />

      {/* 2. TRENDING TICKER BAR SOUS LE HERO (Capture 4 Theme Ontario) */}
      {sections.showTicker && (
        <section
          className="w-full border-b py-3 transition-colors"
          style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--border-color)' }}
        >
          <div className="container-media">
            <div
              className="flex items-center gap-6 overflow-x-auto no-scrollbar text-xs font-semibold whitespace-nowrap"
              style={{ color: 'var(--text-secondary)' }}
            >
              {/* Puce 1 : Crypto (Vert) */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400">
                  CRYPTO
                </span>
                <Link
                  href={`/article/${freshArticles[1]?.slug || ''}`}
                  className="hover:text-[#EF4248] transition-colors"
                >
                  Colorful Packaging in Contemporary Crypto Branding
                </Link>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>

              {/* Puce 2 : Digital (Violet) */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400">
                  DIGITAL
                </span>
                <Link
                  href={`/article/${freshArticles[3]?.slug || ''}`}
                  className="hover:text-[#EF4248] transition-colors"
                >
                  Transparent Structures in Digital Architecture
                </Link>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>

              {/* Puce 3 : AI (Rose) */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-pink-100 dark:bg-pink-950/70 text-pink-600 dark:text-pink-400">
                  AI
                </span>
                <Link
                  href={`/article/${freshArticles[0]?.slug || ''}`}
                  className="hover:text-[#EF4248] transition-colors"
                >
                  AI Motion Techniques in Abstract Digital Design
                </Link>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>

              {/* Puce 4 : Business (Bleu/Ardoise) */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400">
                  BUSINESS
                </span>
                <Link
                  href={`/article/${freshArticles[5]?.slug || ''}`}
                  className="hover:text-[#EF4248] transition-colors"
                >
                  Organic Shapes in Modern Digital Architecture
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. RUBRIQUES PASTELS ÉPURÉES "BLOG CATEGORIES" (Capture 4 Theme Ontario) */}
      {sections.showCategories && (
        <section className="container-media mt-14 md:mt-18">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading" style={{ color: 'var(--text-primary)' }}>
              Blog Categories
            </h2>
            <Link
              href="/blog"
              className="text-xs font-bold uppercase tracking-wider text-[#EF4248] hover:text-[#DA343A] transition-colors flex items-center gap-1"
            >
              <span>Voir tout</span>
              <span>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.slice(0, 6).map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>
      )}

      {/* 4. GRILLE ÉDITORIALE "FRESH OFF THE PRESS" — 6 CARTES EN 3x2 (Capture 5 Theme Ontario) */}
      {sections.showFreshArticles && (
        <section className="container-media mt-16 md:mt-22">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading" style={{ color: 'var(--text-primary)' }}>
              Fresh off the Press
            </h2>
            <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
              Sélection de la rédaction
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {freshArticles.map((article) => (
              <ArticleCardGrid key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* 5. SECTION "RECENT ARTICLES" (70%) + SIDEBAR (30%) (Capture 2 & 3 Theme Ontario) */}
      {sections.showRecentArticles && (
        <section className="container-media mt-16 md:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Colonne Principale 70% : Flux Horizontal */}
            <div className="lg:col-span-8">
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading mb-8" style={{ color: 'var(--text-primary)' }}>
                Recent Articles
              </h2>

              <div className="flex flex-col gap-6 sm:gap-8">
                {horizontalList.map((article) => (
                  <ArticleCardHorizontal key={article.id} article={article} />
                ))}
              </div>

              {/* Pagination Numérotée Officielle Ontario (1 2 3 >) */}
              <div className="flex items-center gap-2 mt-12 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <span className="w-10 h-10 rounded-full bg-[#EF4248] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  1
                </span>
                <Link
                  href="/blog"
                  className="w-10 h-10 rounded-full border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  2
                </Link>
                <Link
                  href="/blog"
                  className="w-10 h-10 rounded-full border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  3
                </Link>
                <Link
                  href="/blog"
                  className="w-10 h-10 rounded-full border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  ›
                </Link>
              </div>
            </div>

            {/* Barre Latérale 30% : Widgets Modulaires & Sponsor */}
            <aside className="lg:col-span-4">
              <EditorialSidebar
                featuredArticles={sidebarFeatured}
                recentArticles={freshArticles.slice(0, 3)}
                categories={store?.categories || []}
                tags={store?.tags.map((t) => t.name) || []}
              />
            </aside>
          </div>
        </section>
      )}

      {/* 6. BANNIÈRE NEWSLETTER UNIVERSELLE (Capture 1 Theme Ontario) */}
      {sections.showNewsletter && (
        <section id="newsletter-section" className="container-media mt-16 md:mt-24">
          <NewsletterBanner />
        </section>
      )}
    </div>
  );
}
