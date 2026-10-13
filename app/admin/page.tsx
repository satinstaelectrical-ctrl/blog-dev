'use client';

import React, { useState } from 'react';
import { ARTICLES as initialArticles } from '@/data/articles';
import { AUTHORS as initialAuthors } from '@/data/authors';
import { CATEGORIES as initialCategories } from '@/data/categories';
import { Article, Author, Category } from '@/types';
import {
  SparklesIcon,
  SearchIcon,
  CheckIcon,
  StarIcon,
  ClockIcon,
  EyeIcon,
  MessageSquareIcon,
  XIcon,
} from '@/components/ui/Icons';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'articles' | 'authors' | 'categories' | 'seo'>('articles');
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [authors] = useState<Author[]>(initialAuthors);
  const [categories] = useState<Category[]>(initialCategories);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'featured'>('all');

  // Modal create article state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    slug: '',
    categorySlug: 'intelligence-artificielle',
    authorSlug: 'kate-johnson',
    excerpt: '',
    readingTime: 5,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    metaTitle: '',
    metaDescription: '',
    isFeatured: false,
  });

  // SEO Simulator state
  const [seoTestTitle, setSeoTestTitle] = useState('Guide Ultime : Déployer et maîtriser des modèles de raisonnement en local');
  const [seoTestDesc, setSeoTestDesc] = useState('Un tutoriel complet pas-à-pas pour configurer une station de travail privée, quantifier les poids de modèles open-source et préserver une confidentialité absolue sans dépendre du cloud.');

  const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);
  const totalLikes = articles.reduce((acc, a) => acc + (a.likes || 0), 0);

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.category.name.toLowerCase().includes(searchFilter.toLowerCase());

    if (statusFilter === 'featured') return matchesSearch && a.isFeatured;
    return matchesSearch;
  });

  const handleDeleteArticle = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cet article ?')) {
      setArticles(articles.filter((a) => a.id !== id));
    }
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.excerpt) return;

    const cat = categories.find((c) => c.slug === newArticle.categorySlug) || categories[0];
    const aut = authors.find((a) => a.slug === newArticle.authorSlug) || authors[0];

    const created: Article = {
      id: `art-${Date.now()}`,
      title: newArticle.title,
      slug: newArticle.slug || newArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: newArticle.excerpt,
      content: newArticle.excerpt,
      coverImage: newArticle.coverImage,
      category: cat,
      author: aut,
      tags: ['Innovation', 'Tech'],
      readingTime: Number(newArticle.readingTime) || 5,
      publishedAt: new Date().toISOString().split('T')[0],
      isFeatured: newArticle.isFeatured,
      format: 'standard',
      views: 0,
      likes: 0,
      commentsCount: 0,
      seo: {
        metaTitle: newArticle.metaTitle || newArticle.title,
        metaDescription: newArticle.metaDescription || newArticle.excerpt,
      },
    };

    setArticles([created, ...articles]);
    setIsModalOpen(false);
    setNewArticle({
      title: '',
      slug: '',
      categorySlug: 'intelligence-artificielle',
      authorSlug: 'kate-johnson',
      excerpt: '',
      readingTime: 5,
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
      metaTitle: '',
      metaDescription: '',
      isFeatured: false,
    });
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
      {/* Top CMS Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container-media py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider">
                  CMS PRO
                </span>
                <span className="text-xs font-semibold text-zinc-500">
                  Version Éditoriale 2.4
                </span>
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                Tableau de Bord Éditorial
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                ← Retour au site public
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                + Nouvel Article
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-4 overflow-x-auto">
            {[
              { id: 'articles', label: `Articles (${articles.length})` },
              { id: 'authors', label: `Rédacteurs (${authors.length})` },
              { id: 'categories', label: `Rubriques (${categories.length})` },
              { id: 'seo', label: 'Simulateur SEO Google' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`text-sm font-semibold pb-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === t.id
                    ? 'border-red-500 text-red-500 dark:text-red-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main CMS Container */}
      <div className="container-media mt-8">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
            <span className="text-xs font-semibold text-zinc-500 block mb-1">
              Articles publiés
            </span>
            <span className="font-heading text-2xl font-bold text-zinc-900 dark:text-white">
              {articles.length}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
            <span className="text-xs font-semibold text-zinc-500 block mb-1">
              Lectures cumulées
            </span>
            <span className="font-heading text-2xl font-bold text-zinc-900 dark:text-white">
              {totalViews.toLocaleString('fr-FR')}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
            <span className="text-xs font-semibold text-zinc-500 block mb-1">
              Interactions & Likes
            </span>
            <span className="font-heading text-2xl font-bold text-zinc-900 dark:text-white">
              {totalLikes.toLocaleString('fr-FR')}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
            <span className="text-xs font-semibold text-zinc-500 block mb-1">
              Abonnés Newsletter
            </span>
            <span className="font-heading text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              14 820
            </span>
          </div>
        </div>

        {/* TAB 1: ARTICLES MANAGEMENT */}
        {activeTab === 'articles' && (
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs overflow-hidden">
            {/* Table Search & Filters bar */}
            <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filtrer les articles..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    statusFilter === 'all'
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setStatusFilter('featured')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    statusFilter === 'featured'
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  À la une
                </button>
              </div>
            </div>

            {/* Articles Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 text-zinc-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-5">Article & Titre</th>
                    <th className="py-3 px-4">Rubrique</th>
                    <th className="py-3 px-4">Rédacteur</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-center">Lectures</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {filteredArticles.map((art) => (
                    <tr key={art.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={art.coverImage}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div>
                            <div className="font-heading font-semibold text-zinc-900 dark:text-white line-clamp-1">
                              {art.title}
                            </div>
                            <div className="text-[11px] text-zinc-400 flex items-center gap-2 mt-0.5">
                              <span>/{art.slug}</span>
                              {art.isFeatured && (
                                <span className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-600 text-[9px] font-bold uppercase">
                                  À la une
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-zinc-700 dark:text-zinc-300">
                        {art.category.name}
                      </td>
                      <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400">
                        {art.author.name}
                      </td>
                      <td className="py-3.5 px-4 text-zinc-500 whitespace-nowrap">
                        {art.publishedAt}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-zinc-900 dark:text-white">
                        {art.views.toLocaleString('fr-FR')}
                      </td>
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/article/${art.slug}`}
                            target="_blank"
                            className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium transition-colors"
                          >
                            Voir
                          </Link>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 font-medium transition-colors cursor-pointer"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: AUTHORS */}
        {activeTab === 'authors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {authors.map((aut) => (
              <div
                key={aut.id}
                className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs flex flex-col items-center text-center"
              >
                <img
                  src={aut.avatar}
                  alt={aut.name}
                  className="w-20 h-20 rounded-full object-cover mb-3 ring-4 ring-zinc-50 dark:ring-zinc-800"
                />
                <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">
                  {aut.name}
                </h3>
                <span className="text-xs font-semibold text-red-500 mb-3">
                  {aut.role}
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-4">
                  {aut.bio}
                </p>
                <span className="mt-auto px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                  {aut.articleCount || 10} articles signés
                </span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: cat.accentColor }}
                  />
                  <h3 className="font-heading font-bold text-lg text-zinc-900 dark:text-white">
                    {cat.name}
                  </h3>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between text-xs font-semibold pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-400">Slug : /{cat.slug}</span>
                  <span className="text-red-500">{cat.count || 0} articles</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: SEO SIMULATOR */}
        {activeTab === 'seo' && (
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs max-w-3xl">
            <h2 className="font-heading text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Simulateur Google SERP & OpenGraph
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              Aperçu en temps réel de l’affichage de vos métadonnées dans les résultats de recherche Google.
            </p>

            <div className="flex flex-col gap-5 mb-8">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    Balise Meta Title ({seoTestTitle.length} / 60 car.)
                  </label>
                  <span className={`text-[10px] font-bold ${seoTestTitle.length > 60 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {seoTestTitle.length <= 60 ? 'Longueur Optimale' : 'Risque de troncature Google'}
                  </span>
                </div>
                <input
                  type="text"
                  value={seoTestTitle}
                  onChange={(e) => setSeoTestTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    Balise Meta Description ({seoTestDesc.length} / 160 car.)
                  </label>
                  <span className={`text-[10px] font-bold ${seoTestDesc.length > 160 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {seoTestDesc.length <= 160 ? 'Longueur Optimale' : 'Risque de troncature Google'}
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={seoTestDesc}
                  onChange={(e) => setSeoTestDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-zinc-900 dark:text-white"
                />
              </div>
            </div>

            {/* Google SERP Preview Card */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-3 block">
                APERÇU GOOGLE RÉSULTATS NATURELS
              </span>
              <div className="max-w-xl">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mb-1">
                  <span>https://ontario-media.fr</span>
                  <span>› article</span>
                </div>
                <h3 className="text-lg text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer leading-snug line-clamp-1 mb-1">
                  {seoTestTitle} | ONTARIO Média
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-2">
                  {seoTestDesc}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CREATE ARTICLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="font-heading font-bold text-xl text-zinc-900 dark:text-white">
                Rédiger & Publier un Article
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <XIcon size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                  Titre de l'article *
                </label>
                <input
                  type="text"
                  required
                  value={newArticle.title}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    })
                  }
                  placeholder="Ex: Les avancées de l'inférence neuronale..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                    Rubrique
                  </label>
                  <select
                    value={newArticle.categorySlug}
                    onChange={(e) => setNewArticle({ ...newArticle, categorySlug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                    Auteur
                  </label>
                  <select
                    value={newArticle.authorSlug}
                    onChange={(e) => setNewArticle({ ...newArticle, authorSlug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {authors.map((a) => (
                      <option key={a.slug} value={a.slug}>
                        {a.name} ({a.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                  Résumé & Chapeau éditorial *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                  placeholder="En quelques phrases percutantes..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                    Temps de lecture (minutes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newArticle.readingTime}
                    onChange={(e) => setNewArticle({ ...newArticle, readingTime: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newArticle.isFeatured}
                    onChange={(e) => setNewArticle({ ...newArticle, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-red-500 focus:ring-red-400"
                  />
                  <label htmlFor="featured" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer">
                    Mettre en Une du Magazine (Hero Slider)
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  Publier Maintenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
