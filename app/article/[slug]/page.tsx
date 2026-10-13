'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import {
  getArticleBySlug,
  getRelatedArticles,
  getFeaturedArticles,
  getRecentArticles,
  ARTICLES,
} from '@/data/articles';
import { CATEGORIES } from '@/data/categories';
import { CategoryBadge } from '@/components/ui/Badge';
import { EditorialSidebar } from '@/components/sidebar/EditorialSidebar';
import { ArticleCardGrid } from '@/components/cards/ArticleCardGrid';
import { NewsletterBanner } from '@/components/newsletter/NewsletterBanner';
import {
  ClockIcon,
  TwitterIcon,
  LinkedInIcon,
  FacebookIcon,
  LinkIcon,
  BookmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  CheckIcon,
  MessageSquareIcon,
} from '@/components/ui/Icons';
import { formatDateFr } from '@/lib/utils';
import Link from 'next/link';

export default function ArticleSinglePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = getArticleBySlug(slug);

  if (!article) {
    return notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, article.category.slug, 3);
  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles(5);

  // Comments state
  const [commentForm, setCommentForm] = useState({ name: '', email: '', text: '' });
  const [commentsList, setCommentsList] = useState([
    {
      id: 'c1',
      name: 'Alexandre Renard',
      date: 'Il y a 2 jours',
      text: 'Excellente analyse. La corrélation entre signaux comportementaux et arbitrage algorithmique est en effet le vrai tournant de cette décennie.',
    },
  ]);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.text) return;

    setCommentsList([
      {
        id: Date.now().toString(),
        name: commentForm.name,
        date: "À l'instant",
        text: commentForm.text,
      },
      ...commentsList,
    ]);
    setCommentForm({ name: '', email: '', text: '' });
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  const copyArticleLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const allTags = [
    'Intelligence Artificielle',
    'Hardware Modulaire',
    'Cognition',
    'WebGPU',
    'Agents IA',
    'Minimalisme',
    'Design Systèmes',
  ];

  return (
    <div className="w-full pb-16">
      {/* 1. HERO ARTICLE IMMERSIF (Conforme à Ontario Page 1) */}
      <section className="container-media pt-6 md:pt-10">
        <div className="relative w-full rounded-3xl overflow-hidden bg-zinc-950 text-white min-h-[420px] md:min-h-[500px] flex flex-col justify-end p-6 md:p-12 lg:p-16 shadow-2xl">
          {/* Background cover image with soft overlay */}
          <img
            src={article.coverImage}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30" />

          {/* Breadcrumbs & Category Badge */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white"
            >
              Accueil
            </Link>
            <span className="text-zinc-500">/</span>
            <Link
              href={`/category/${article.category.slug}`}
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white"
            >
              {article.category.name}
            </Link>
            <span className="text-zinc-500">/</span>
            <CategoryBadge category={article.category} size="sm" clickable={false} />
          </div>

          {/* Title */}
          <h1 className="relative z-10 font-heading text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl">
            {article.title}
          </h1>

          {/* Metadata bar */}
          <div className="relative z-10 flex flex-wrap items-center gap-4 text-xs md:text-sm text-zinc-300 pt-4 border-t border-white/15">
            <Link
              href={`/author/${article.author.slug}`}
              className="flex items-center gap-2.5 font-semibold hover:text-white"
            >
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20"
              />
              <span>{article.author.name}</span>
            </Link>

            <span className="text-zinc-500">•</span>
            <time dateTime={article.publishedAt}>
              {formatDateFr(article.publishedAt)}
            </time>

            <span className="text-zinc-500">•</span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon size={14} />
              {article.readingTime} min de lecture
            </span>

            <span className="text-zinc-500">•</span>
            <span className="inline-flex items-center gap-1.5">
              <MessageSquareIcon size={14} />
              {commentsList.length} commentaire{commentsList.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT + SIDEBAR LAYOUT (70% / 30%) */}
      <section className="container-media mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main article content column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-8">
            {/* Left floating interaction buttons (sticky) */}
            <aside className="hidden md:flex flex-col items-center gap-3.5 sticky top-28 self-start pt-2">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                aria-label="Enregistrer l'article"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  bookmarked
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
                }`}
              >
                <BookmarkIcon size={16} />
              </button>

              <button
                onClick={copyArticleLink}
                aria-label="Copier le lien"
                className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors relative"
              >
                {copiedLink ? <CheckIcon size={16} className="text-emerald-500" /> : <LinkIcon size={16} />}
              </button>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Partager sur X"
                className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-black hover:text-white transition-colors flex items-center justify-center"
              >
                <TwitterIcon size={15} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Partager sur LinkedIn"
                className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center"
              >
                <LinkedInIcon size={15} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Partager sur Facebook"
                className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-blue-700 hover:text-white transition-colors flex items-center justify-center"
              >
                <FacebookIcon size={15} />
              </a>
            </aside>

            {/* Reading Column */}
            <div className="flex-1 min-w-0">
              {/* Sommaire interactif (Table of contents) */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500 mb-3 block">
                  SOMMAIRE DE L'ENQUÊTE
                </span>
                <ul className="flex flex-col gap-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>1. La genèse d'une rupture analytique majeure</span>
                  </li>
                  <li className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>2. Les trois piliers de la détection de signaux faibles</span>
                  </li>
                  <li className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>3. Pourquoi les métriques traditionnelles échouent</span>
                  </li>
                  {article.review && (
                    <li className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-pointer">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>4. Banc d'essai : {article.review.productName}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Excerpt Lead Paragraph */}
              <p className="text-lg md:text-xl font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed mb-8 border-l-4 border-red-500 pl-5">
                {article.excerpt}
              </p>

              {/* Body Text */}
              <div className="prose-editorial">
                <p>
                  Les signaux numériques ont cessé d'être de simples relevés de clics ou des empreintes résiduelles. Aujourd’hui, ils incarnent le système nerveux central des écosystèmes connectés. Dans un monde saturé de stimuli, la valeur ne réside plus dans le volume de données collectées, mais dans la finesse d’extraction des variations imperceptibles.
                </p>

                {/* Inline Image matching Ontario */}
                <figure className="my-10">
                  <div className="rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-sm">
                    <img
                      src={
                        article.galleryImages?.[1] ||
                        'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=85'
                      }
                      alt="Laboratoire de test et modélisation"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {article.coverCaption && (
                    <figcaption className="text-xs text-zinc-500 dark:text-zinc-400 mt-2.5 text-center italic">
                      {article.coverCaption}
                    </figcaption>
                  )}
                </figure>

                <h3>Les trois piliers de la détection précoce</h3>
                <p>
                  Pour comprendre comment les modèles de fondation traitent l’information, nous devons distinguer la latence de capture de la profondeur de corrélation. La plupart des outils actuels souffrent d’une surcharge cognitive artificielle due à des algorithmes de filtrage obsolètes.
                </p>

                <ul>
                  <li><strong>Vitesse de capture :</strong> Traitement des micro-flux en moins de 15 millisecondes à la périphérie du réseau (Edge).</li>
                  <li><strong>Embeddings contextuels :</strong> Capacité à relier du texte, des séries temporelles et des signaux télémétriques hétérogènes.</li>
                  <li><strong>Atténuation du bruit statistique :</strong> Neutralisation des bots et des manipulations de marché coordonnées.</li>
                </ul>

                {/* Pull-Quote stylisée conforme à Ontario */}
                <blockquote className="my-10 p-6 md:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-l-4 border-red-500">
                  <p className="font-heading text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 italic leading-snug mb-2">
                    "Bienvenue dans l’ère où la créativité rencontre la rigueur technologique pour redéfinir la présence numérique."
                  </p>
                  <cite className="text-xs font-semibold text-zinc-500 not-italic block">
                    — {article.author.name}, {article.author.role}
                  </cite>
                </blockquote>

                <p>
                  L’impact ne se limite pas à la finance ou à la technologie de pointe : il redéfinit en profondeur notre rapport au travail, à la production de contenu et à l’attention humaine.
                </p>

                {/* Banc d'essai & Affiliation Box (si review) */}
                {article.review && (
                  <div className="my-10 p-6 md:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                          BANC D’ESSAI CERTIFIÉ
                        </span>
                        <h4 className="font-heading text-xl font-bold text-zinc-900 dark:text-white mt-1">
                          {article.review.productName}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-2xl font-heading font-extrabold text-2xl shadow-sm self-start sm:self-auto">
                        <StarIcon size={20} className="text-amber-300" />
                        <span>{article.review.score}</span>
                        <span className="text-xs font-normal opacity-80">/10</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 block">
                          POINTS FORTS
                        </span>
                        <ul className="flex flex-col gap-2 text-xs md:text-sm text-zinc-700 dark:text-zinc-300">
                          {article.review.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3 block">
                          POINTS FAIBLES
                        </span>
                        <ul className="flex flex-col gap-2 text-xs md:text-sm text-zinc-700 dark:text-zinc-300">
                          {article.review.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-rose-500 font-bold">✕</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-zinc-500">Prix indicatif : </span>
                        <span className="font-heading font-bold text-base text-zinc-900 dark:text-white">
                          {article.review.price || 'N/C'}
                        </span>
                      </div>
                      <a
                        href={article.review.affiliateUrl || '#'}
                        className="px-6 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm text-center"
                      >
                        {article.review.affiliateLabel || 'Voir l’offre partenaire'}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Tags Cloud */}
              <div className="flex flex-wrap items-center gap-2 pt-6 mt-8 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-2">
                  TAGS :
                </span>
                {article.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/search?q=${encodeURIComponent(t)}`}
                    className="text-xs px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors uppercase font-medium"
                  >
                    #{t}
                  </Link>
                ))}
              </div>

              {/* Author Bio Box */}
              <div className="my-10 p-6 md:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-white dark:ring-zinc-800 shadow-sm flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-heading font-bold text-base text-zinc-900 dark:text-white">
                        {article.author.name}
                      </h4>
                      <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
                        {article.author.role}
                      </span>
                    </div>
                    <Link
                      href={`/author/${article.author.slug}`}
                      className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      Tous ses articles →
                    </Link>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {article.author.bio}
                  </p>
                </div>
              </div>

              {/* Comments Section & Form (Conforme à Ontario) */}
              <div className="my-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <h3 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                  Commentaires ({commentsList.length})
                </h3>

                {/* Comments List */}
                <div className="flex flex-col gap-4 mb-10">
                  {commentsList.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-heading font-bold text-sm text-zinc-900 dark:text-white">
                          {c.name}
                        </span>
                        <span className="text-xs text-zinc-400">{c.date}</span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Leave a Comment Form */}
                <div className="p-6 md:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
                  <h4 className="font-heading text-lg font-bold text-zinc-900 dark:text-white mb-2">
                    Laisser un commentaire
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                    Votre adresse email ne sera pas publiée. Les champs obligatoires sont indiqués.
                  </p>

                  {commentSubmitted && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                      Votre commentaire a été publié avec succès.
                    </div>
                  )}

                  <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          required
                          value={commentForm.name}
                          onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                          placeholder="Votre nom"
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                          Adresse email *
                        </label>
                        <input
                          type="email"
                          required
                          value={commentForm.email}
                          onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                          placeholder="votre@email.fr"
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                        Commentaire *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={commentForm.text}
                        onChange={(e) => setCommentForm({ ...commentForm, text: e.target.value })}
                        placeholder="Rédigez votre réflexion..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="px-7 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer self-start"
                      >
                        Publier le commentaire
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Column (4 cols) */}
          <div className="lg:col-span-4">
            <EditorialSidebar
              author={article.author}
              featuredArticles={featuredArticles}
              categories={CATEGORIES}
              recentArticles={recentArticles}
              tags={allTags}
            />
          </div>
        </div>
      </section>

      {/* 3. RELATED ARTICLES ("Read Next") */}
      {relatedArticles.length > 0 && (
        <section className="container-media mt-16 md:mt-24 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              À lire ensuite dans la rubrique {article.category.name}
            </h3>
            <Link
              href={`/category/${article.category.slug}`}
              className="text-xs font-bold text-red-500 uppercase tracking-wider hover:underline"
            >
              Tous les articles de la rubrique →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <ArticleCardGrid key={rel.id} article={rel} badgeLabel="EN LIEN" />
            ))}
          </div>
        </section>
      )}

      {/* 4. NEWSLETTER */}
      <div className="container-media">
        <NewsletterBanner />
      </div>
    </div>
  );
}
