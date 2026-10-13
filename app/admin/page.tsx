'use client';

import React, { useState, useEffect } from 'react';
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
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowUpRightIcon,
} from '@/components/ui/Icons';
import Link from 'next/link';

interface GutenbergBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'quote' | 'image' | 'video' | 'affiliate' | 'callout' | 'code' | 'separator';
  level?: 'h2' | 'h3' | 'h4';
  text?: string;
  caption?: string;
  altText?: string;
  url?: string;
  videoUrl?: string;
  // Affiliate block fields
  productName?: string;
  brand?: string;
  description?: string;
  features?: string[];
  affiliateUrl?: string;
  merchantName?: string;
  buttonText?: string;
  disclaimer?: string;
}

interface NewsletterSub {
  id: string;
  email: string;
  status: 'confirmed' | 'pending' | 'unsubscribed';
  subscribedAt: string;
}

interface AffiliateProductItem {
  id: string;
  productName: string;
  brand: string;
  merchantName: string;
  affiliateUrl: string;
  imageUrl: string;
  description: string;
  features: string[];
  isActive: boolean;
}

export default function AdminDashboardPage() {
  // 1. Authentification & Sécurité
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [adminEmail, setAdminEmail] = useState('redacteur@ontario.fr');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');

  // 2. Navigation Dashboard
  const [activeTab, setActiveTab] = useState<
    'articles' | 'editor' | 'hero_slider' | 'affiliates' | 'newsletter' | 'media' | 'authors' | 'categories' | 'seo'
  >('articles');

  // 3. Données principales
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [trashArticles, setTrashArticles] = useState<Article[]>([]);
  const [authors] = useState<Author[]>(initialAuthors);
  const [categories] = useState<Category[]>(initialCategories);

  // 4. Filtres articles
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'scheduled' | 'trash'>('all');
  const [selectedArticleIds, setSelectedArticleIds] = useState<string[]>([]);

  // 5. État Éditeur Gutenberg
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorSlug, setEditorSlug] = useState('');
  const [editorExcerpt, setEditorExcerpt] = useState('');
  const [editorCategorySlug, setEditorCategorySlug] = useState('intelligence-artificielle');
  const [editorAuthorSlug, setEditorAuthorSlug] = useState('steve-jones');
  const [editorCoverImage, setEditorCoverImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85');
  const [editorCoverCaption, setEditorCoverCaption] = useState('');
  const [editorIsFeatured, setEditorIsFeatured] = useState(false);
  const [editorIsExclusive, setEditorIsExclusive] = useState(false);
  const [editorStatus, setEditorStatus] = useState<'draft' | 'published' | 'scheduled'>('published');
  const [editorMetaTitle, setEditorMetaTitle] = useState('');
  const [editorMetaDesc, setEditorMetaDesc] = useState('');
  const [editorTags, setEditorTags] = useState('Innovation, IA, Tech');
  const [editorBlocks, setEditorBlocks] = useState<GutenbergBlock[]>([
    {
      id: 'b-1',
      type: 'paragraph',
      text: 'L’étincelle qui a propulsé notre laboratoire éditorial est née de l’observation des bouleversements sans précédent survenus dans l’arbitrage de l’attention.',
    },
    {
      id: 'b-2',
      type: 'heading',
      level: 'h2',
      text: 'La convergence entre spatial computing et modèles génératifs',
    },
    {
      id: 'b-3',
      type: 'quote',
      text: 'La technologie ne vaut que lorsqu’elle sert de catalyseur à l’émotion et à l’intelligence humaine.',
      caption: 'Steve Jones, Rédacteur en Chef',
    },
    {
      id: 'b-4',
      type: 'affiliate',
      productName: 'Station de Travail Modulaire Studio 2026',
      brand: 'NextGen Pro',
      merchantName: 'Amazon',
      affiliateUrl: 'https://amazon.fr/dp/B0EXEMPLE?tag=ontario-21',
      description: 'L’architecture la plus stable pour l’inférence locale de modèles d’IA et le rendu 3D haute fidélité.',
      features: ['Puce Neural Engine 64 cœurs', 'Refroidissement passif silencieux', 'Garantie 3 ans'],
      buttonText: 'Voir sur Amazon',
      disclaimer: 'Lien affilié vérifié — Nous pouvons percevoir une commission sans surcoût.',
    },
  ]);
  const [saveNotification, setSaveNotification] = useState('');

  // 6. Catalogue Affiliation
  const [affiliateProducts, setAffiliateProducts] = useState<AffiliateProductItem[]>([
    {
      id: 'aff-1',
      productName: 'Station de Travail Modulaire Studio 2026',
      brand: 'NextGen Pro',
      merchantName: 'Amazon',
      affiliateUrl: 'https://amazon.fr/dp/B0EXEMPLE?tag=ontario-21',
      imageUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=600&q=80',
      description: 'Station d’ingénierie certifiée pour les flux de production lourds.',
      features: ['64 Cores', '128 Go VRAM unifiée', 'Connectique PCIe 5.0'],
      isActive: true,
    },
    {
      id: 'aff-2',
      productName: 'Casque Audio Spatial Haute Précision',
      brand: 'Acoustic Sound Lab',
      merchantName: 'Amazon',
      affiliateUrl: 'https://amazon.fr/dp/B0CASQUE?tag=ontario-21',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: 'Immersion acoustique parfaite pour les créateurs de médias et monteurs audio.',
      features: ['Réduction active du bruit 42dB', 'Réponse 5Hz - 48kHz', 'Autonomie 38h'],
      isActive: true,
    },
  ]);

  // 7. Abonnés Newsletter
  const [subscribers, setSubscribers] = useState<NewsletterSub[]>([
    { id: 'sub-1', email: 'directeur@agence-ia.fr', status: 'confirmed', subscribedAt: '2026-03-24' },
    { id: 'sub-2', email: 'redaction@media-futur.com', status: 'confirmed', subscribedAt: '2026-03-25' },
    { id: 'sub-3', email: 'investisseur@vc-fund.eu', status: 'confirmed', subscribedAt: '2026-03-26' },
    { id: 'sub-4', email: 'consultant@strat-tech.net', status: 'pending', subscribedAt: '2026-03-27' },
  ]);

  // 8. Médiathèque
  const mediaLibrary = [
    { id: 'm-1', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85', title: 'Portait Cyberpunk Orange', dimensions: '2000x1200' },
    { id: 'm-2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', title: 'Steve Jones Avatar', dimensions: '600x600' },
    { id: 'm-3', url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=85', title: 'Bureau Spatial Minimaliste', dimensions: '1920x1080' },
    { id: 'm-4', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', title: 'Kate Johnson Portrait', dimensions: '600x600' },
    { id: 'm-5', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=85', title: 'Cyber Sécurité Réseau', dimensions: '1920x1080' },
  ];

  // Calculs statistiques réels
  const publishedCount = articles.filter((a) => a.status === 'published' || !a.status).length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const scheduledCount = articles.filter((a) => a.status === 'scheduled').length;
  const trashCount = trashArticles.length;
  const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);
  const totalLikes = articles.reduce((acc, a) => acc + (a.likes || 0), 0);

  // Filtrage des articles
  const currentDisplayedList = statusFilter === 'trash'
    ? trashArticles
    : articles.filter((a) => {
        if (statusFilter === 'all') return true;
        if (statusFilter === 'published') return a.status === 'published' || !a.status;
        if (statusFilter === 'draft') return a.status === 'draft';
        if (statusFilter === 'scheduled') return a.status === 'scheduled';
        return true;
      });

  const filteredArticles = currentDisplayedList.filter((a) =>
    a.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    a.category.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Handlers Authentification
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'redacteur@ontario.fr' && adminPassword === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Identifiants administrateur invalides.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Actions d'articles
  const handleOpenGutenberg = (art?: Article) => {
    if (art) {
      setEditingArticleId(art.id);
      setEditorTitle(art.title);
      setEditorSlug(art.slug);
      setEditorExcerpt(art.excerpt);
      setEditorCategorySlug(art.category.slug);
      setEditorAuthorSlug(art.author.slug);
      setEditorCoverImage(art.coverImage);
      setEditorCoverCaption(art.coverCaption || '');
      setEditorIsFeatured(art.isFeatured || false);
      setEditorIsExclusive(art.isExclusive || false);
      setEditorStatus((art.status as any) || 'published');
      setEditorMetaTitle(art.seo?.metaTitle || art.title);
      setEditorMetaDesc(art.seo?.metaDescription || art.excerpt);
      setEditorTags(art.tags.join(', '));
      if (art.contentBlocks && art.contentBlocks.length > 0) {
        setEditorBlocks(art.contentBlocks);
      }
    } else {
      setEditingArticleId('new');
      setEditorTitle('');
      setEditorSlug('');
      setEditorExcerpt('');
      setEditorCategorySlug('intelligence-artificielle');
      setEditorAuthorSlug('steve-jones');
      setEditorCoverImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85');
      setEditorCoverCaption('');
      setEditorIsFeatured(false);
      setEditorIsExclusive(false);
      setEditorStatus('draft');
      setEditorMetaTitle('');
      setEditorMetaDesc('');
      setEditorTags('Technologie, IA, Média');
      setEditorBlocks([
        { id: `b-${Date.now()}-1`, type: 'paragraph', text: 'Rédigez l’introduction de votre enquête...' },
      ]);
    }
    setActiveTab('editor');
  };

  const handleSaveGutenberg = (targetStatus: 'published' | 'draft' | 'scheduled') => {
    if (!editorTitle.trim()) {
      alert('Veuillez renseigner un titre pour cet article.');
      return;
    }

    const cat = categories.find((c) => c.slug === editorCategorySlug) || categories[0];
    const aut = authors.find((a) => a.slug === editorAuthorSlug) || authors[0];
    const calculatedReadingTime = Math.max(3, Math.ceil(editorBlocks.reduce((acc, b) => acc + (b.text?.split(' ').length || 20), 0) / 200));

    if (editingArticleId === 'new') {
      const newArt: Article = {
        id: `art-${Date.now()}`,
        title: editorTitle,
        slug: editorSlug || editorTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        excerpt: editorExcerpt || editorBlocks[0]?.text?.slice(0, 160) || '',
        content: editorExcerpt,
        contentBlocks: editorBlocks,
        coverImage: editorCoverImage,
        coverCaption: editorCoverCaption,
        category: cat,
        author: aut,
        tags: editorTags.split(',').map((t) => t.trim()).filter(Boolean),
        readingTime: calculatedReadingTime,
        publishedAt: new Date().toISOString().split('T')[0],
        status: targetStatus,
        isFeatured: editorIsFeatured,
        isExclusive: editorIsExclusive,
        format: 'standard',
        views: targetStatus === 'published' ? 120 : 0,
        likes: 0,
        commentsCount: 0,
        seo: {
          metaTitle: editorMetaTitle || editorTitle,
          metaDescription: editorMetaDesc || editorExcerpt,
        },
      };
      setArticles([newArt, ...articles]);
      setEditingArticleId(newArt.id);
    } else {
      setArticles(
        articles.map((a) => {
          if (a.id === editingArticleId) {
            return {
              ...a,
              title: editorTitle,
              slug: editorSlug || a.slug,
              excerpt: editorExcerpt,
              contentBlocks: editorBlocks,
              coverImage: editorCoverImage,
              coverCaption: editorCoverCaption,
              category: cat,
              author: aut,
              tags: editorTags.split(',').map((t) => t.trim()).filter(Boolean),
              readingTime: calculatedReadingTime,
              status: targetStatus,
              isFeatured: editorIsFeatured,
              isExclusive: editorIsExclusive,
              seo: {
                metaTitle: editorMetaTitle || editorTitle,
                metaDescription: editorMetaDesc || editorExcerpt,
              },
            };
          }
          return a;
        })
      );
    }

    setSaveNotification(`Article enregistré avec succès en tant que [${targetStatus.toUpperCase()}] !`);
    setTimeout(() => setSaveNotification(''), 4000);
  };

  const handleTrashArticle = (id: string) => {
    const art = articles.find((a) => a.id === id);
    if (art) {
      setArticles(articles.filter((a) => a.id !== id));
      setTrashArticles([{ ...art, status: 'trash' }, ...trashArticles]);
    }
  };

  const handleRestoreArticle = (id: string) => {
    const art = trashArticles.find((a) => a.id === id);
    if (art) {
      setTrashArticles(trashArticles.filter((a) => a.id !== id));
      setArticles([{ ...art, status: 'draft' }, ...articles]);
    }
  };

  const handlePermanentDelete = (id: string) => {
    if (confirm('ATTENTION ACTION IRRÉVERSIBLE : Supprimer définitivement cet article du serveur ?')) {
      setTrashArticles(trashArticles.filter((a) => a.id !== id));
    }
  };

  const handleDuplicateArticle = (art: Article) => {
    const duplicated: Article = {
      ...art,
      id: `art-${Date.now()}`,
      title: `${art.title} (Copie)`,
      slug: `${art.slug}-copie-${Date.now().toString().slice(-4)}`,
      status: 'draft',
      views: 0,
      likes: 0,
    };
    setArticles([duplicated, ...articles]);
  };

  // Actions groupées (Bulk actions)
  const handleToggleSelectAll = () => {
    if (selectedArticleIds.length === filteredArticles.length) {
      setSelectedArticleIds([]);
    } else {
      setSelectedArticleIds(filteredArticles.map((a) => a.id));
    }
  };

  const handleBulkAction = (action: 'publish' | 'draft' | 'trash' | 'restore' | 'delete') => {
    if (selectedArticleIds.length === 0) return;

    if (action === 'publish') {
      setArticles(articles.map((a) => selectedArticleIds.includes(a.id) ? { ...a, status: 'published' } : a));
    } else if (action === 'draft') {
      setArticles(articles.map((a) => selectedArticleIds.includes(a.id) ? { ...a, status: 'draft' } : a));
    } else if (action === 'trash') {
      const toTrash = articles.filter((a) => selectedArticleIds.includes(a.id)).map((a) => ({ ...a, status: 'trash' as const }));
      setArticles(articles.filter((a) => !selectedArticleIds.includes(a.id)));
      setTrashArticles([...toTrash, ...trashArticles]);
    } else if (action === 'restore') {
      const toRestore = trashArticles.filter((a) => selectedArticleIds.includes(a.id)).map((a) => ({ ...a, status: 'draft' as const }));
      setTrashArticles(trashArticles.filter((a) => !selectedArticleIds.includes(a.id)));
      setArticles([...toRestore, ...articles]);
    } else if (action === 'delete') {
      if (confirm(`Supprimer définitivement ${selectedArticleIds.length} article(s) ? Action irréversible.`)) {
        setTrashArticles(trashArticles.filter((a) => !selectedArticleIds.includes(a.id)));
      }
    }
    setSelectedArticleIds([]);
  };

  // Gestion des blocs Gutenberg
  const handleAddBlock = (type: GutenbergBlock['type']) => {
    const newBlock: GutenbergBlock = {
      id: `b-${Date.now()}`,
      type,
      text: type === 'paragraph' ? 'Nouveau paragraphe éditorial...' : type === 'heading' ? 'Nouveau Titre H2' : 'Citation...',
      level: 'h2',
      affiliateUrl: 'https://amazon.fr/dp/B0EXEMPLE?tag=ontario-21',
      merchantName: 'Amazon',
      buttonText: 'Voir sur Amazon',
      disclaimer: 'Lien affilié — nous pouvons percevoir une commission.',
    };
    setEditorBlocks([...editorBlocks, newBlock]);
  };

  const handleMoveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= editorBlocks.length) return;
    const updated = [...editorBlocks];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setEditorBlocks(updated);
  };

  const handleDeleteBlock = (index: number) => {
    setEditorBlocks(editorBlocks.filter((_, i) => i !== index));
  };

  // ÉCRAN DE VERROUILLAGE SÉCURISÉ (SI NON AUTHENTIFIÉ)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#071426] text-white">
        <div className="w-full max-w-md p-8 rounded-3xl border border-[#28445e] bg-[#0e2137] shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#EF4248] flex items-center justify-center font-extrabold text-lg shadow-md">
              O
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold">ONTARIO CMS</h1>
              <p className="text-xs text-[#839bb5]">Espace Rédaction & Administration Sécurisé</p>
            </div>
          </div>

          {authError && (
            <div className="p-3 mb-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#b2c3d6] block mb-1.5">Identifiant Rédacteur</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#122b45] border border-[#28445e] text-xs text-white focus:outline-none focus:border-[#EF4248]"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#b2c3d6] block mb-1.5">Mot de Passe Sécurisé</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#122b45] border border-[#28445e] text-xs text-white focus:outline-none focus:border-[#EF4248]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md mt-2 cursor-pointer"
            >
              Déverrouiller le Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#28445e] text-center text-xs text-[#839bb5]">
            <Link href="/" className="hover:text-white transition-colors">
              ← Retour au site public Ontario
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-[#071426] pb-24 text-zinc-900 dark:text-zinc-100">
      {/* Top Navbar Administrateur WordPress */}
      <div className="bg-white dark:bg-[#0e2137] border-b border-zinc-200 dark:border-[#28445e] sticky top-0 z-40 shadow-xs">
        <div className="container-media py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EF4248] flex items-center justify-center text-white font-black text-sm shadow-md">
              O
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-extrabold tracking-tight">ONTARIO CMS</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px] uppercase">
                  WordPress-Like Pro
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-[#839bb5]">
                Connecté en tant que <b>{adminEmail}</b>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-full border border-zinc-200 dark:border-[#28445e] text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-[#122b45] transition-colors"
            >
              Voir le Site Public ↗
            </Link>
            <button
              onClick={() => handleOpenGutenberg()}
              className="px-5 py-2 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              + Nouvel Article (Gutenberg)
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-[#122b45] transition-colors"
              title="Déconnexion"
            >
              <XIcon size={18} />
            </button>
          </div>
        </div>

        {/* Onglets de navigation CMS */}
        <div className="container-media overflow-x-auto flex items-center gap-6 pt-2 border-t border-zinc-100 dark:border-[#28445e]/50">
          {[
            { id: 'articles', label: `Articles (${articles.length})` },
            { id: 'editor', label: 'Éditeur Gutenberg' },
            { id: 'hero_slider', label: 'Slider Hero 100vw' },
            { id: 'affiliates', label: `Affiliation Amazon (${affiliateProducts.length})` },
            { id: 'newsletter', label: `Newsletter (${subscribers.length})` },
            { id: 'media', label: 'Médiathèque' },
            { id: 'authors', label: `Auteurs (${authors.length})` },
            { id: 'categories', label: `Rubriques (${categories.length})` },
            { id: 'seo', label: 'Simulateur SEO' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs font-bold uppercase tracking-wider py-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#EF4248] text-[#EF4248]'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Message de notification de sauvegarde */}
      {saveNotification && (
        <div className="container-media mt-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckIcon size={16} />
            <span>{saveNotification}</span>
          </div>
        </div>
      )}

      {/* Main CMS Body */}
      <div className="container-media mt-8">
        {/* KPI CARDS (Métriques du Média) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200/80 dark:border-[#28445e] shadow-xs">
            <span className="text-xs font-semibold text-zinc-500 dark:text-[#839bb5] block mb-1">
              Articles Publiés
            </span>
            <span className="font-heading text-2xl font-bold text-zinc-900 dark:text-white">
              {publishedCount}
            </span>
            <div className="text-[11px] text-zinc-400 mt-1">
              {draftCount} brouillon(s) • {scheduledCount} programmé(s)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200/80 dark:border-[#28445e] shadow-xs">
            <span className="text-xs font-semibold text-zinc-500 dark:text-[#839bb5] block mb-1">
              Lectures Cumulées
            </span>
            <span className="font-heading text-2xl font-bold text-[#EF4248]">
              {totalViews.toLocaleString('fr-FR')}
            </span>
            <div className="text-[11px] text-zinc-400 mt-1">
              {totalLikes.toLocaleString('fr-FR')} likes & partages
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200/80 dark:border-[#28445e] shadow-xs">
            <span className="text-xs font-semibold text-zinc-500 dark:text-[#839bb5] block mb-1">
              Abonnés Newsletter
            </span>
            <span className="font-heading text-2xl font-bold text-emerald-500">
              {subscribers.length.toLocaleString('fr-FR')}
            </span>
            <div className="text-[11px] text-zinc-400 mt-1">
              Double opt-in actif conforme RGPD
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200/80 dark:border-[#28445e] shadow-xs">
            <span className="text-xs font-semibold text-zinc-500 dark:text-[#839bb5] block mb-1">
              Articles en Corbeille
            </span>
            <span className="font-heading text-2xl font-bold text-amber-500">
              {trashCount}
            </span>
            <div className="text-[11px] text-zinc-400 mt-1">
              Restauration possible en 1 clic
            </div>
          </div>
        </div>

        {/* TAB 1 : GESTION DES ARTICLES TYPE WORDPRESS */}
        {activeTab === 'articles' && (
          <div className="bg-white dark:bg-[#0e2137] rounded-3xl border border-zinc-200/80 dark:border-[#28445e] shadow-xs overflow-hidden">
            {/* Barre de filtrage & sous-onglets WordPress */}
            <div className="p-5 border-b border-zinc-100 dark:border-[#28445e] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {[
                  { id: 'all', label: `Tous (${articles.length})` },
                  { id: 'published', label: `Publiés (${publishedCount})` },
                  { id: 'draft', label: `Brouillons (${draftCount})` },
                  { id: 'scheduled', label: `Programmés (${scheduledCount})` },
                  { id: 'trash', label: `Corbeille (${trashCount})` },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setStatusFilter(st.id as any);
                      setSelectedArticleIds([]);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                      statusFilter === st.id
                        ? 'bg-[#EF4248] text-white shadow-xs'
                        : 'bg-zinc-100 dark:bg-[#122b45] text-zinc-600 dark:text-[#b2c3d6] hover:bg-zinc-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <SearchIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Rechercher un article..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#EF4248]"
                />
              </div>
            </div>

            {/* Barre des Actions Groupées (Bulk Actions) */}
            {selectedArticleIds.length > 0 && (
              <div className="p-3 bg-red-500/10 border-b border-red-500/20 px-5 flex items-center justify-between gap-3 text-xs">
                <span className="font-bold text-[#EF4248]">
                  {selectedArticleIds.length} article(s) sélectionné(s)
                </span>
                <div className="flex items-center gap-2">
                  {statusFilter !== 'trash' ? (
                    <>
                      <button
                        onClick={() => handleBulkAction('publish')}
                        className="px-3 py-1 rounded-md bg-emerald-600 text-white font-bold"
                      >
                        Publier
                      </button>
                      <button
                        onClick={() => handleBulkAction('draft')}
                        className="px-3 py-1 rounded-md bg-zinc-600 text-white font-bold"
                      >
                        En brouillon
                      </button>
                      <button
                        onClick={() => handleBulkAction('trash')}
                        className="px-3 py-1 rounded-md bg-amber-600 text-white font-bold"
                      >
                        Déplacer en corbeille
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleBulkAction('restore')}
                        className="px-3 py-1 rounded-md bg-emerald-600 text-white font-bold"
                      >
                        Restaurer
                      </button>
                      <button
                        onClick={() => handleBulkAction('delete')}
                        className="px-3 py-1 rounded-md bg-red-600 text-white font-bold"
                      >
                        Supprimer définitivement
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Table des Articles */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-[#28445e] bg-zinc-50/50 dark:bg-[#122b45]/40 text-zinc-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={selectedArticleIds.length === filteredArticles.length && filteredArticles.length > 0}
                        onChange={handleToggleSelectAll}
                        className="rounded cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-4">Article</th>
                    <th className="py-3 px-4">Rubrique</th>
                    <th className="py-3 px-4">Auteur</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4 text-center">Stats</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-[#28445e]">
                  {filteredArticles.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-zinc-400">
                        Aucun article ne correspond aux filtres actuels.
                      </td>
                    </tr>
                  ) : (
                    filteredArticles.map((art) => {
                      const isSelected = selectedArticleIds.includes(art.id);
                      return (
                        <tr
                          key={art.id}
                          className={`hover:bg-zinc-50/50 dark:hover:bg-[#122b45]/30 transition-colors ${
                            isSelected ? 'bg-red-500/5' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                if (isSelected) {
                                  setSelectedArticleIds(selectedArticleIds.filter((id) => id !== art.id));
                                } else {
                                  setSelectedArticleIds([...selectedArticleIds, art.id]);
                                }
                              }}
                              className="rounded cursor-pointer"
                            />
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={art.coverImage}
                                alt=""
                                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                              />
                              <div>
                                <div className="font-heading font-semibold text-zinc-900 dark:text-white line-clamp-1">
                                  {art.title}
                                </div>
                                <div className="text-[11px] text-zinc-400 flex items-center gap-2 mt-0.5">
                                  <span>/{art.slug}</span>
                                  {art.isFeatured && (
                                    <span className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-600 text-[9px] font-bold uppercase">
                                      Slider Hero
                                    </span>
                                  )}
                                  {art.isExclusive && (
                                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 text-[9px] font-bold uppercase">
                                      Exclusif
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
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                                art.status === 'draft'
                                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                  : art.status === 'scheduled'
                                  ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-600'
                                  : statusFilter === 'trash'
                                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600'
                                  : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600'
                              }`}
                            >
                              {statusFilter === 'trash' ? 'Corbeille' : art.status || 'Publié'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center font-bold text-zinc-700 dark:text-[#b2c3d6]">
                            👁️ {art.views || 0}
                          </td>
                          <td className="py-3.5 px-5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {statusFilter !== 'trash' ? (
                                <>
                                  <button
                                    onClick={() => handleOpenGutenberg(art)}
                                    className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-[#122b45] hover:bg-[#EF4248] hover:text-white font-medium transition-colors"
                                  >
                                    Modifier
                                  </button>
                                  <Link
                                    href={`/article/${art.slug}`}
                                    target="_blank"
                                    className="px-2 py-1 rounded-lg border border-zinc-200 dark:border-[#28445e] hover:bg-black/5 text-zinc-500"
                                    title="Prévisualiser"
                                  >
                                    Voir ↗
                                  </Link>
                                  <button
                                    onClick={() => handleDuplicateArticle(art)}
                                    className="px-2 py-1 rounded-lg border border-zinc-200 dark:border-[#28445e] text-zinc-500 hover:text-white hover:bg-zinc-700"
                                    title="Dupliquer l'article"
                                  >
                                    Dupliquer
                                  </button>
                                  <button
                                    onClick={() => handleTrashArticle(art.id)}
                                    className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 text-amber-600 font-medium"
                                  >
                                    Corbeille
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleRestoreArticle(art.id)}
                                    className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold"
                                  >
                                    Restaurer
                                  </button>
                                  <button
                                    onClick={() => handlePermanentDelete(art.id)}
                                    className="px-3 py-1 rounded-lg bg-red-600 text-white font-bold"
                                  >
                                    Supprimer
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2 : ÉDITEUR VISUEL DE BLOCS TYPE GUTENBERG */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Colonne de rédaction par blocs (8 cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-[#0e2137] rounded-3xl border border-zinc-200/80 dark:border-[#28445e] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-[#28445e] mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4248]">
                    ÉDITEUR MODULAIRE GUTENBERG
                  </span>
                  <h2 className="font-heading text-xl font-bold">
                    {editingArticleId === 'new' ? 'Nouvel Article' : 'Modifier le Contenu'}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSaveGutenberg('draft')}
                    className="px-4 py-2 rounded-full border border-zinc-200 dark:border-[#28445e] text-xs font-bold hover:bg-zinc-100 dark:hover:bg-[#122b45] cursor-pointer"
                  >
                    Brouillon
                  </button>
                  <button
                    onClick={() => handleSaveGutenberg('published')}
                    className="px-6 py-2 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Publier l'Article
                  </button>
                </div>
              </div>

              {/* Titre Principal de l'Article */}
              <input
                type="text"
                value={editorTitle}
                onChange={(e) => {
                  setEditorTitle(e.target.value);
                  if (editingArticleId === 'new') {
                    setEditorSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
                  }
                }}
                placeholder="Saisissez le titre de l'article..."
                className="w-full font-heading text-2xl sm:text-4xl font-extrabold mb-4 bg-transparent focus:outline-none placeholder-zinc-300 dark:placeholder-zinc-600"
              />

              {/* Chapeau / Extrait de l'Article */}
              <textarea
                value={editorExcerpt}
                onChange={(e) => setEditorExcerpt(e.target.value)}
                placeholder="Rédigez l'extrait éditorial ou le chapeau d'introduction (1 à 2 phrases percutantes)..."
                rows={2}
                className="w-full text-sm mb-6 bg-transparent border-b border-zinc-100 dark:border-[#28445e] pb-3 focus:outline-none placeholder-zinc-400 text-zinc-600 dark:text-[#b2c3d6]"
              />

              {/* Liste ordonnée des Blocs Gutenberg */}
              <div className="space-y-4 mb-8">
                {editorBlocks.map((block, idx) => (
                  <div
                    key={block.id}
                    className="p-5 rounded-2xl border border-zinc-200/80 dark:border-[#28445e] bg-zinc-50/70 dark:bg-[#122b45]/50 relative group transition-all"
                  >
                    <div className="flex items-center justify-between text-xs mb-3 text-zinc-500 dark:text-[#839bb5]">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200 dark:bg-[#071426]">
                          {block.type}
                        </span>
                        {block.type === 'heading' && (
                          <span className="font-bold text-[#EF4248] uppercase text-[10px]">{block.level}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMoveBlock(idx, -1)}
                          disabled={idx === 0}
                          className="hover:text-black dark:hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          ↑ Monter
                        </button>
                        <button
                          onClick={() => handleMoveBlock(idx, 1)}
                          disabled={idx === editorBlocks.length - 1}
                          className="hover:text-black dark:hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          ↓ Descendre
                        </button>
                        <button
                          onClick={() => handleDeleteBlock(idx)}
                          className="text-red-500 font-bold hover:underline cursor-pointer ml-2"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>

                    {/* Rendu dynamique selon le type de bloc */}
                    {block.type === 'paragraph' && (
                      <textarea
                        value={block.text || ''}
                        onChange={(e) => {
                          const updated = [...editorBlocks];
                          updated[idx].text = e.target.value;
                          setEditorBlocks(updated);
                        }}
                        rows={3}
                        className="w-full text-sm bg-transparent border border-zinc-200 dark:border-[#28445e] p-3 rounded-xl focus:outline-none text-zinc-800 dark:text-zinc-100"
                        placeholder="Texte du paragraphe..."
                      />
                    )}

                    {block.type === 'heading' && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={block.text || ''}
                          onChange={(e) => {
                            const updated = [...editorBlocks];
                            updated[idx].text = e.target.value;
                            setEditorBlocks(updated);
                          }}
                          className="w-full font-heading font-bold text-lg bg-transparent border border-zinc-200 dark:border-[#28445e] p-2.5 rounded-xl focus:outline-none"
                          placeholder="Titre de section..."
                        />
                        <div className="flex gap-2 text-xs">
                          {(['h2', 'h3', 'h4'] as const).map((lvl) => (
                            <button
                              key={lvl}
                              onClick={() => {
                                const updated = [...editorBlocks];
                                updated[idx].level = lvl;
                                setEditorBlocks(updated);
                              }}
                              className={`px-2.5 py-1 rounded-md uppercase font-bold text-[10px] ${
                                block.level === lvl ? 'bg-[#EF4248] text-white' : 'bg-zinc-200 dark:bg-[#071426]'
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {block.type === 'quote' && (
                      <div className="space-y-2">
                        <textarea
                          value={block.text || ''}
                          onChange={(e) => {
                            const updated = [...editorBlocks];
                            updated[idx].text = e.target.value;
                            setEditorBlocks(updated);
                          }}
                          rows={2}
                          className="w-full text-sm italic bg-transparent border border-zinc-200 dark:border-[#28445e] p-3 rounded-xl focus:outline-none"
                          placeholder="Texte de la citation remarquable..."
                        />
                        <input
                          type="text"
                          value={block.caption || ''}
                          onChange={(e) => {
                            const updated = [...editorBlocks];
                            updated[idx].caption = e.target.value;
                            setEditorBlocks(updated);
                          }}
                          className="w-full text-xs bg-transparent border border-zinc-200 dark:border-[#28445e] p-2 rounded-xl focus:outline-none"
                          placeholder="Auteur de la citation (ex: Steve Jones)..."
                        />
                      </div>
                    )}

                    {block.type === 'affiliate' && (
                      <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 space-y-3 text-xs">
                        <div className="flex items-center gap-2 text-[#EF4248] font-bold">
                          <span>📦 BLOC PRODUIT AFFILIÉ AMAZON (CONFORME FTC & REL="SPONSORED")</span>
                        </div>
                        <input
                          type="text"
                          value={block.productName || ''}
                          onChange={(e) => {
                            const updated = [...editorBlocks];
                            updated[idx].productName = e.target.value;
                            setEditorBlocks(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-[#28445e] bg-white dark:bg-[#071426]"
                          placeholder="Nom exact du produit recommandé"
                        />
                        <input
                          type="text"
                          value={block.affiliateUrl || ''}
                          onChange={(e) => {
                            const updated = [...editorBlocks];
                            updated[idx].affiliateUrl = e.target.value;
                            setEditorBlocks(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-[#28445e] bg-white dark:bg-[#071426]"
                          placeholder="URL Partenaire Sécurisée (https://amazon.fr/dp/...)"
                        />
                        <textarea
                          value={block.description || ''}
                          onChange={(e) => {
                            const updated = [...editorBlocks];
                            updated[idx].description = e.target.value;
                            setEditorBlocks(updated);
                          }}
                          rows={2}
                          className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-[#28445e] bg-white dark:bg-[#071426]"
                          placeholder="Avis éditorial et justification du banc d'essai"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Barre d'insertion de nouveaux blocs Gutenberg */}
              <div className="p-4 rounded-2xl border border-dashed border-zinc-200 dark:border-[#28445e] flex flex-wrap gap-2 items-center justify-center">
                <span className="text-xs font-bold text-zinc-400 mr-2">+ Insérer un bloc :</span>
                <button
                  onClick={() => handleAddBlock('paragraph')}
                  className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-[#28445e] text-xs font-semibold hover:bg-[#EF4248] hover:text-white transition-colors cursor-pointer"
                >
                  Paragraphe
                </button>
                <button
                  onClick={() => handleAddBlock('heading')}
                  className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-[#28445e] text-xs font-semibold hover:bg-[#EF4248] hover:text-white transition-colors cursor-pointer"
                >
                  Titre H2 / H3
                </button>
                <button
                  onClick={() => handleAddBlock('quote')}
                  className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-[#28445e] text-xs font-semibold hover:bg-[#EF4248] hover:text-white transition-colors cursor-pointer"
                >
                  Pull-Quote
                </button>
                <button
                  onClick={() => handleAddBlock('affiliate')}
                  className="px-3.5 py-1.5 rounded-full bg-[#EF4248] text-white text-xs font-bold shadow-xs hover:bg-[#DA343A] transition-colors cursor-pointer"
                >
                  + Produit Affilié Amazon
                </button>
              </div>
            </div>

            {/* Panneau latéral des Réglages de Publication (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0e2137] border border-zinc-200/80 dark:border-[#28445e] shadow-xs space-y-4">
                <h3 className="font-heading font-bold text-base pb-3 border-b border-zinc-100 dark:border-[#28445e]">
                  Paramètres de Publication
                </h3>

                <div>
                  <label className="text-xs font-semibold text-zinc-500 dark:text-[#839bb5] block mb-1">
                    Slug d'URL
                  </label>
                  <input
                    type="text"
                    value={editorSlug}
                    onChange={(e) => setEditorSlug(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-[#28445e] bg-zinc-50 dark:bg-[#122b45] text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-500 dark:text-[#839bb5] block mb-1">
                    Rubrique Principale
                  </label>
                  <select
                    value={editorCategorySlug}
                    onChange={(e) => setEditorCategorySlug(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-[#28445e] bg-zinc-50 dark:bg-[#122b45] text-xs font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-500 dark:text-[#839bb5] block mb-1">
                    Rédacteur / Auteur
                  </label>
                  <select
                    value={editorAuthorSlug}
                    onChange={(e) => setEditorAuthorSlug(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-[#28445e] bg-zinc-50 dark:bg-[#122b45] text-xs font-semibold"
                  >
                    {authors.map((a) => (
                      <option key={a.id} value={a.slug}>
                        {a.name} ({a.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-500 dark:text-[#839bb5] block mb-1">
                    Image de Couverture (URL)
                  </label>
                  <input
                    type="text"
                    value={editorCoverImage}
                    onChange={(e) => setEditorCoverImage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-[#28445e] bg-zinc-50 dark:bg-[#122b45] text-xs mb-2"
                  />
                  {editorCoverImage && (
                    <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-200 dark:border-[#28445e]">
                      <img src={editorCoverImage} alt="Cover preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="pt-2 space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editorIsFeatured}
                      onChange={(e) => setEditorIsFeatured(e.target.checked)}
                      className="rounded"
                    />
                    <span>Mettre en avant dans le Slider Hero</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editorIsExclusive}
                      onChange={(e) => setEditorIsExclusive(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-[#EF4248]">Badge EXCLUSIF (Édition spéciale)</span>
                  </label>
                </div>
              </div>

              {/* Aperçu Référencement Google SEO */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0e2137] border border-zinc-200/80 dark:border-[#28445e] shadow-xs space-y-3">
                <h4 className="font-heading font-bold text-sm">Aperçu Google SERP</h4>
                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-[#071426] border border-zinc-200 dark:border-[#28445e] text-xs">
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                    https://ontariowp.com/article/{editorSlug || 'titre-article'}
                  </div>
                  <div className="text-[#1a0dab] dark:text-[#8ab4f8] font-semibold text-sm line-clamp-1 mt-0.5">
                    {editorMetaTitle || editorTitle || 'Titre de l’article dans Google'}
                  </div>
                  <div className="text-zinc-500 dark:text-[#839bb5] text-[11px] line-clamp-2 mt-1">
                    {editorMetaDesc || editorExcerpt || 'Description de l’article indexée par les moteurs de recherche...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3 : GESTION DU SLIDER HERO 100VW */}
        {activeTab === 'hero_slider' && (
          <div className="bg-white dark:bg-[#0e2137] rounded-3xl border border-zinc-200/80 dark:border-[#28445e] p-6 sm:p-8 shadow-xs">
            <div className="max-w-2xl mb-8">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4248]">
                ACCUEIL & IMPACT VISUEL
              </span>
              <h2 className="font-heading text-2xl font-bold mt-1">
                Gestion des Articles du Slider Hero (100vw)
              </h2>
              <p className="text-xs text-zinc-500 dark:text-[#839bb5] mt-1">
                Sélectionnez les articles majeurs qui défilent dans la photographie monumentale pleine largeur de la page d'accueil.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    art.isFeatured
                      ? 'border-[#EF4248] bg-red-500/5'
                      : 'border-zinc-200 dark:border-[#28445e] bg-zinc-50 dark:bg-[#122b45]'
                  }`}
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3">
                    <img src={art.coverImage} alt="" className="w-full h-full object-cover" />
                    {art.isFeatured && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#EF4248] text-white text-[9px] font-extrabold uppercase">
                        ACTIF SLIDER
                      </span>
                    )}
                  </div>
                  <h4 className="font-heading font-bold text-sm line-clamp-2 mb-2">
                    {art.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs pt-3 border-t border-zinc-200 dark:border-[#28445e]">
                    <span className="text-zinc-500">{art.category.name}</span>
                    <button
                      onClick={() => {
                        setArticles(
                          articles.map((a) => (a.id === art.id ? { ...a, isFeatured: !a.isFeatured } : a))
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                        art.isFeatured
                          ? 'bg-red-500 text-white'
                          : 'border border-zinc-300 dark:border-[#28445e] hover:bg-[#EF4248] hover:text-white'
                      }`}
                    >
                      {art.isFeatured ? 'Retirer du Slider' : '+ Mettre à la une'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4 : CATALOGUE PRODUITS AFFILIÉS */}
        {activeTab === 'affiliates' && (
          <div className="bg-white dark:bg-[#0e2137] rounded-3xl border border-zinc-200/80 dark:border-[#28445e] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-[#28445e] mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4248]">
                  MONÉTISATION & COMMERCE CONFORME
                </span>
                <h2 className="font-heading text-2xl font-bold mt-1">
                  Catalogue Produits Affiliés Amazon & Partenaires
                </h2>
              </div>
              <button
                onClick={() => {
                  const newProd: AffiliateProductItem = {
                    id: `aff-${Date.now()}`,
                    productName: 'Nouveau Produit Testé',
                    brand: 'Marque Partenaire',
                    merchantName: 'Amazon',
                    affiliateUrl: 'https://amazon.fr/dp/EXEMPLE?tag=ontario-21',
                    imageUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=600&q=80',
                    description: 'Description de test...',
                    features: ['Avantage A', 'Avantage B'],
                    isActive: true,
                  };
                  setAffiliateProducts([newProd, ...affiliateProducts]);
                }}
                className="px-5 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs uppercase tracking-wider shadow-md"
              >
                + Ajouter un Produit Affilié
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {affiliateProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-6 rounded-2xl border border-zinc-200 dark:border-[#28445e] bg-zinc-50 dark:bg-[#122b45] flex gap-5 items-start"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.productName}
                    className="w-24 h-24 rounded-xl object-contain bg-white dark:bg-[#071426] p-2 border border-zinc-200 dark:border-[#28445e] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EF4248]">
                      {prod.merchantName} • {prod.brand}
                    </span>
                    <h4 className="font-heading font-bold text-base mt-0.5 line-clamp-1">
                      {prod.productName}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-[#839bb5] line-clamp-2 mt-1">
                      {prod.description}
                    </p>
                    <div className="flex items-center gap-3 mt-4 text-xs font-semibold">
                      <a
                        href={prod.affiliateUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="text-[#EF4248] hover:underline"
                      >
                        Tester l'URL Partenaire ↗
                      </a>
                      <span className="text-zinc-400">•</span>
                      <button
                        onClick={() => {
                          setAffiliateProducts(affiliateProducts.filter((p) => p.id !== prod.id));
                        }}
                        className="text-red-500 hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5 : ABONNÉS NEWSLETTER */}
        {activeTab === 'newsletter' && (
          <div className="bg-white dark:bg-[#0e2137] rounded-3xl border border-zinc-200/80 dark:border-[#28445e] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-[#28445e] mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                  DIFFUSION ÉDITORIALE RGPD
                </span>
                <h2 className="font-heading text-2xl font-bold mt-1">
                  Gestion des Abonnés Newsletter ({subscribers.length})
                </h2>
              </div>
              <button
                onClick={() => {
                  const csv = 'Email,Statut,Date\n' + subscribers.map((s) => `${s.email},${s.status},${s.subscribedAt}`).join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `ontario_subscribers_${Date.now()}.csv`;
                  a.click();
                }}
                className="px-5 py-2.5 rounded-full border border-zinc-300 dark:border-[#28445e] hover:bg-zinc-100 dark:hover:bg-[#122b45] text-xs font-bold transition-colors cursor-pointer"
              >
                📥 Exporter la Liste (CSV)
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-[#28445e] text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Adresse Email</th>
                    <th className="py-3 px-4">Statut Confirmation</th>
                    <th className="py-3 px-4">Date Inscription</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-[#28445e]">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-zinc-50 dark:hover:bg-[#122b45]/30">
                      <td className="py-3.5 px-4 font-semibold">{sub.email}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            sub.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60'
                              : 'bg-amber-100 text-amber-600 dark:bg-amber-950/60'
                          }`}
                        >
                          {sub.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-zinc-400">{sub.subscribedAt}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSubscribers(subscribers.filter((s) => s.id !== sub.id))}
                          className="text-red-500 hover:underline"
                        >
                          Désabonner
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6 : MÉDIATHÈQUE */}
        {activeTab === 'media' && (
          <div className="bg-white dark:bg-[#0e2137] rounded-3xl border border-zinc-200/80 dark:border-[#28445e] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-[#28445e] mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4248]">
                  PIPELINE D'IMAGES & MÉDIAS
                </span>
                <h2 className="font-heading text-2xl font-bold mt-1">
                  Médiathèque Éditoriale Haute Définition
                </h2>
              </div>
              <button
                onClick={() => {
                  const url = prompt('Collez l’URL de l’image à ajouter :');
                  if (url) {
                    alert('Image enregistrée dans la médiathèque locale.');
                  }
                }}
                className="px-5 py-2.5 rounded-full bg-[#EF4248] text-white font-bold text-xs shadow-md"
              >
                + Ajouter une Image
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {mediaLibrary.map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded-2xl border border-zinc-200 dark:border-[#28445e] bg-zinc-50 dark:bg-[#122b45] group cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(m.url);
                    alert(`URL de l'image copiée : ${m.url}`);
                  }}
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-2">
                    <img src={m.url} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="text-xs font-semibold line-clamp-1">{m.title}</div>
                  <div className="text-[10px] text-zinc-400">{m.dimensions}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7 : AUTEURS */}
        {activeTab === 'authors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {authors.map((aut) => (
              <div
                key={aut.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#0e2137] border border-zinc-200/80 dark:border-[#28445e] shadow-xs flex flex-col items-center text-center"
              >
                <img
                  src={aut.avatar}
                  alt={aut.name}
                  className="w-20 h-20 rounded-full object-cover mb-3 ring-4 ring-zinc-50 dark:ring-[#122b45]"
                />
                <h3 className="font-heading font-bold text-base">{aut.name}</h3>
                <span className="text-xs font-semibold text-[#EF4248] mb-3">{aut.role}</span>
                <p className="text-xs text-zinc-500 dark:text-[#839bb5] line-clamp-3 mb-4">{aut.bio}</p>
                <span className="mt-auto px-3 py-1 rounded-full bg-zinc-100 dark:bg-[#122b45] text-[11px] font-semibold">
                  {aut.articleCount || 10} articles signés
                </span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 8 : RUBRIQUES */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#0e2137] border border-zinc-200/80 dark:border-[#28445e] shadow-xs"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.accentColor }} />
                  <h3 className="font-heading font-bold text-lg">{cat.name}</h3>
                </div>
                <p className="text-xs text-zinc-600 dark:text-[#b2c3d6] leading-relaxed mb-4">{cat.description}</p>
                <div className="flex items-center justify-between text-xs font-semibold pt-3 border-t border-zinc-100 dark:border-[#28445e]">
                  <span className="text-zinc-400">Slug : /{cat.slug}</span>
                  <span className="text-[#EF4248]">{cat.count || 0} articles</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 9 : SIMULATEUR SEO GOOGLE */}
        {activeTab === 'seo' && (
          <div className="bg-white dark:bg-[#0e2137] rounded-3xl border border-zinc-200/80 dark:border-[#28445e] p-6 sm:p-8 shadow-xs max-w-3xl">
            <h2 className="font-heading text-2xl font-bold mb-2">Simulateur & Contrôleur SEO Google</h2>
            <p className="text-xs text-zinc-500 dark:text-[#839bb5] mb-6">
              Vérifiez le rendu exact de vos balises Meta Title, Meta Description et Open Graph avant indexation par les robots de recherche.
            </p>
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#071426] border border-zinc-200 dark:border-[#28445e] text-xs">
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
                https://ontariowp.com/article/guide-ia-2026
              </div>
              <div className="text-[#1a0dab] dark:text-[#8ab4f8] text-base font-bold line-clamp-1 mb-1">
                ONTARIO — Plateforme Éditoriale Multimédia & Prospectives 2026
              </div>
              <div className="text-zinc-500 dark:text-[#839bb5] text-xs leading-relaxed">
                Le média de référence sur les technologies de rupture, l'intelligence artificielle, le design spatial et les modèles d'affaires innovants. Analyses, bancs d'essai et dossiers d'experts.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
