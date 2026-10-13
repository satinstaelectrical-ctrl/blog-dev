'use client';

import React, { useState, useEffect } from 'react';
import { ARTICLES as initialArticles } from '@/data/articles';
import { AUTHORS as initialAuthors } from '@/data/authors';
import { CATEGORIES as initialCategories } from '@/data/categories';
import { ADVERTISEMENTS as initialAds } from '@/data/advertisements';
import { MEDIA_LIBRARY as initialMedia } from '@/data/media';
import { TAGS_LIST as initialTags } from '@/data/tags';
import { COMMENTS_LIST as initialComments } from '@/data/comments';
import { SITE_PAGES as initialPages } from '@/data/pages';
import { USER_ACCOUNTS as initialUsers } from '@/data/users';
import { DEFAULT_SITE_SETTINGS } from '@/data/settings';
import {
  Article,
  Author,
  Category,
  Advertisement,
  MediaItem,
  TagItem,
  Comment,
  SitePage,
  UserAccount,
  SiteSettings,
} from '@/types';
import {
  LayoutDashboardIcon,
  FileTextIcon,
  ImageIcon,
  FolderIcon,
  TagIcon,
  BookOpenIcon,
  MegaphoneIcon,
  UsersIcon,
  SettingsIcon,
  PlusIcon,
  TrashIcon,
  CopyIcon,
  UploadIcon,
  TrendingUpIcon,
  LockIcon,
  SearchIcon,
  CheckIcon,
  XIcon,
  EyeIcon,
  ClockIcon,
  MessageSquareIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowUpRightIcon,
  SparklesIcon,
} from '@/components/ui/Icons';
import Link from 'next/link';

interface GutenbergBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'quote' | 'image' | 'video' | 'audio' | 'affiliate' | 'separator';
  level?: 'h2' | 'h3' | 'h4';
  text?: string;
  caption?: string;
  url?: string;
  productName?: string;
  brand?: string;
  description?: string;
  features?: string[];
  affiliateUrl?: string;
  merchantName?: string;
  buttonText?: string;
}

export default function AdminDashboardPage() {
  // 1. Authentification & Protection de Route
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [adminEmail, setAdminEmail] = useState('redacteur@ontario.fr');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');

  // 2. Navigation de la Sidebar CMS
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'articles'
    | 'editor'
    | 'media'
    | 'categories'
    | 'tags'
    | 'pages'
    | 'advertisements'
    | 'users'
    | 'comments'
    | 'newsletter'
    | 'settings'
  >('dashboard');

  // 3. Données Dynamiques du CMS
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [trashArticles, setTrashArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [authors] = useState<Author[]>(initialAuthors);
  const [ads, setAds] = useState<Advertisement[]>(initialAds);
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [tagsList, setTagsList] = useState<TagItem[]>(initialTags);
  const [commentsList, setCommentsList] = useState<Comment[]>(initialComments);
  const [sitePages, setSitePages] = useState<SitePage[]>(initialPages);
  const [usersList, setUsersList] = useState<UserAccount[]>(initialUsers);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  // 4. Filtres Articles
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'scheduled' | 'trash'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedArticleIds, setSelectedArticleIds] = useState<string[]>([]);

  // 5. État de l'Éditeur Gutenberg
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorSlug, setEditorSlug] = useState('');
  const [editorExcerpt, setEditorExcerpt] = useState('');
  const [editorCategorySlug, setEditorCategorySlug] = useState('ai');
  const [editorAuthorSlug, setEditorAuthorSlug] = useState('steve-jones');
  const [editorCoverImage, setEditorCoverImage] = useState(
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=85'
  );
  const [editorReadingTime, setEditorReadingTime] = useState(4);
  const [editorIsFeatured, setEditorIsFeatured] = useState(false);
  const [editorIsHero, setEditorIsHero] = useState(false);
  const [editorStatus, setEditorStatus] = useState<'draft' | 'published' | 'scheduled'>('published');
  const [editorMetaTitle, setEditorMetaTitle] = useState('');
  const [editorMetaDesc, setEditorMetaDesc] = useState('');
  const [editorTags, setEditorTags] = useState('ARTIFICIAL INTELLIGENCE, INNOVATION, TECH');
  const [editorBlocks, setEditorBlocks] = useState<GutenbergBlock[]>([
    {
      id: 'b-1',
      type: 'paragraph',
      text: 'L’exploration des nouveaux territoires technologiques exige une audace sans précédent et une rigueur intellectuelle absolue.',
    },
    {
      id: 'b-2',
      type: 'heading',
      level: 'h2',
      text: 'Les nouveaux paradigmes de l’ingénierie cognitive',
    },
    {
      id: 'b-3',
      type: 'quote',
      text: 'La technologie ne vaut que lorsqu’elle sert de catalyseur à l’intelligence et à l’émotion humaine.',
    },
  ]);
  const [showLivePreviewModal, setShowLivePreviewModal] = useState(false);

  // 6. État Médiathèque
  const [mediaFilterType, setMediaFilterType] = useState<'all' | 'image' | 'video' | 'audio' | 'document'>('all');
  const [mediaSearchQuery, setMediaSearchQuery] = useState('');
  const [selectedMediaPreview, setSelectedMediaPreview] = useState<MediaItem | null>(null);
  const [copySuccessUrl, setCopySuccessUrl] = useState<string | null>(null);

  // 7. Modale Création Annonce Publicitaire
  const [showNewAdModal, setShowNewAdModal] = useState(false);
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdSponsor, setNewAdSponsor] = useState('');
  const [newAdUrl, setNewAdUrl] = useState('');
  const [newAdImage, setNewAdImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');
  const [newAdPosition, setNewAdPosition] = useState<Advertisement['position']>('sidebar');
  const [newAdType, setNewAdType] = useState<Advertisement['type']>('sponsor');

  // 8. Modale Création Catégorie
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatBg, setNewCatBg] = useState('#F0ECFA');
  const [newCatText, setNewCatText] = useState('#5844A8');
  const [newCatIsDark, setNewCatIsDark] = useState(false);
  const [newCatImage, setNewCatImage] = useState('');

  // Toast / Feedback
  const [adminNotification, setAdminNotification] = useState<string | null>(null);

  const notify = (msg: string) => {
    setAdminNotification(msg);
    setTimeout(() => setAdminNotification(null), 3500);
  };

  // -------------------------------------------------------------------------
  // Gestion de l'authentification
  // -------------------------------------------------------------------------
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'redacteur@ontario.fr' && adminPassword === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
      notify('Connexion administrateur réussie.');
    } else {
      setAuthError('Identifiants invalides. Utilisez redacteur@ontario.fr / admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    notify('Déconnexion effectuée.');
  };

  // -------------------------------------------------------------------------
  // Gestion des Articles & Éditeur
  // -------------------------------------------------------------------------
  const startNewArticle = () => {
    setEditingArticleId(null);
    setEditorTitle('');
    setEditorSlug('');
    setEditorExcerpt('');
    setEditorCategorySlug(categories[0]?.slug || 'ai');
    setEditorAuthorSlug('steve-jones');
    setEditorCoverImage('https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=85');
    setEditorReadingTime(3);
    setEditorIsFeatured(false);
    setEditorIsHero(false);
    setEditorStatus('published');
    setEditorMetaTitle('');
    setEditorMetaDesc('');
    setEditorTags('ARTIFICIAL INTELLIGENCE, TECH');
    setEditorBlocks([
      { id: 'b-1', type: 'paragraph', text: 'Rédigez votre introduction éditoriale...' },
    ]);
    setActiveTab('editor');
  };

  const editArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setEditorTitle(art.title);
    setEditorSlug(art.slug);
    setEditorExcerpt(art.excerpt);
    setEditorCategorySlug(art.category.slug);
    setEditorAuthorSlug(art.author.slug);
    setEditorCoverImage(art.coverImage);
    setEditorReadingTime(art.readingTime);
    setEditorIsFeatured(!!art.isFeatured);
    setEditorIsHero(!!art.isHero);
    setEditorStatus(art.status === 'trash' ? 'draft' : art.status || 'published');
    setEditorMetaTitle(art.seo?.metaTitle || art.title);
    setEditorMetaDesc(art.seo?.metaDescription || art.excerpt);
    setEditorTags(art.tags?.join(', ') || '');
    if (art.contentBlocks && art.contentBlocks.length > 0) {
      setEditorBlocks(art.contentBlocks);
    } else {
      setEditorBlocks([
        { id: 'b-1', type: 'paragraph', text: art.excerpt },
        { id: 'b-2', type: 'heading', level: 'h2', text: 'Développement de l’enquête' },
        { id: 'b-3', type: 'paragraph', text: art.content || 'Contenu détaillé de l’article...' },
      ]);
    }
    setActiveTab('editor');
  };

  const saveArticle = (statusOverride?: 'draft' | 'published' | 'scheduled') => {
    if (!editorTitle.trim()) {
      alert('Veuillez renseigner un titre pour l’article.');
      return;
    }

    const currentStatus = statusOverride || editorStatus;
    const currentCat = categories.find((c) => c.slug === editorCategorySlug) || categories[0];
    const currentAuthor = authors.find((a) => a.slug === editorAuthorSlug) || authors[0];
    const generatedSlug = editorSlug.trim()
      ? editorSlug
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
      : editorTitle
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');

    const formattedArticle: Article = {
      id: editingArticleId || `art-${Date.now()}`,
      title: editorTitle,
      slug: generatedSlug,
      excerpt: editorExcerpt || editorBlocks.find((b) => b.type === 'paragraph')?.text?.slice(0, 160) || '',
      content: editorBlocks.map((b) => b.text || '').join('\n\n'),
      contentBlocks: editorBlocks,
      coverImage: editorCoverImage,
      category: currentCat,
      author: currentAuthor,
      tags: editorTags.split(',').map((t) => t.trim()).filter(Boolean),
      readingTime: editorReadingTime || 4,
      publishedAt: new Date().toISOString().split('T')[0],
      status: currentStatus,
      isFeatured: editorIsFeatured,
      isHero: editorIsHero,
      views: editingArticleId ? articles.find((a) => a.id === editingArticleId)?.views || 120 : 1,
      likes: editingArticleId ? articles.find((a) => a.id === editingArticleId)?.likes || 14 : 0,
      commentsCount: 0,
      format: 'standard',
      seo: {
        metaTitle: editorMetaTitle || editorTitle,
        metaDescription: editorMetaDesc || editorExcerpt,
      },
    };

    if (editingArticleId) {
      setArticles((prev) => prev.map((a) => (a.id === editingArticleId ? formattedArticle : a)));
      notify(`Article "${formattedArticle.title}" mis à jour (${currentStatus}).`);
    } else {
      setArticles((prev) => [formattedArticle, ...prev]);
      notify(`Nouvel article "${formattedArticle.title}" créé (${currentStatus}).`);
    }
    setActiveTab('articles');
  };

  const moveArticleToTrash = (id: string) => {
    const target = articles.find((a) => a.id === id);
    if (!target) return;
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setTrashArticles((prev) => [{ ...target, status: 'trash' }, ...prev]);
    notify(`Article déplacé dans la corbeille.`);
  };

  const restoreArticleFromTrash = (id: string) => {
    const target = trashArticles.find((a) => a.id === id);
    if (!target) return;
    setTrashArticles((prev) => prev.filter((a) => a.id !== id));
    setArticles((prev) => [{ ...target, status: 'draft' }, ...prev]);
    notify(`Article restauré en brouillon.`);
  };

  const permanentlyDeleteArticle = (id: string) => {
    if (confirm('Êtes-vous certain de vouloir supprimer définitivement cet article ? Cette action est irréversible.')) {
      setTrashArticles((prev) => prev.filter((a) => a.id !== id));
      notify(`Article supprimé définitivement.`);
    }
  };

  // Actions groupées
  const handleBulkAction = (action: 'publish' | 'draft' | 'trash' | 'restore' | 'delete') => {
    if (selectedArticleIds.length === 0) return;

    if (action === 'publish' || action === 'draft') {
      setArticles((prev) =>
        prev.map((a) => (selectedArticleIds.includes(a.id) ? { ...a, status: action === 'publish' ? 'published' : 'draft' } : a))
      );
      notify(`${selectedArticleIds.length} article(s) mis à jour (${action}).`);
    } else if (action === 'trash') {
      const toTrash = articles.filter((a) => selectedArticleIds.includes(a.id)).map((a) => ({ ...a, status: 'trash' as const }));
      setArticles((prev) => prev.filter((a) => !selectedArticleIds.includes(a.id)));
      setTrashArticles((prev) => [...toTrash, ...prev]);
      notify(`${selectedArticleIds.length} article(s) déplacés en corbeille.`);
    } else if (action === 'restore') {
      const restored = trashArticles.filter((a) => selectedArticleIds.includes(a.id)).map((a) => ({ ...a, status: 'draft' as const }));
      setTrashArticles((prev) => prev.filter((a) => !selectedArticleIds.includes(a.id)));
      setArticles((prev) => [...restored, ...prev]);
      notify(`${selectedArticleIds.length} article(s) restaurés.`);
    } else if (action === 'delete') {
      if (confirm(`Supprimer définitivement ${selectedArticleIds.length} article(s) ?`)) {
        setTrashArticles((prev) => prev.filter((a) => !selectedArticleIds.includes(a.id)));
        notify(`${selectedArticleIds.length} article(s) définitivement supprimés.`);
      }
    }
    setSelectedArticleIds([]);
  };

  // -------------------------------------------------------------------------
  // Gestion des Annonces Publicitaires
  // -------------------------------------------------------------------------
  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdTitle || !newAdUrl) return;

    const newAd: Advertisement = {
      id: `ad-${Date.now()}`,
      title: newAdTitle,
      sponsorName: newAdSponsor || 'Partenaire Média',
      targetUrl: newAdUrl,
      imageUrl: newAdImage,
      type: newAdType,
      position: newAdPosition,
      badgeLabel: 'SPONSORISÉ',
      callToAction: 'Découvrir',
      startDate: new Date().toISOString().split('T')[0],
      isActive: true,
      viewsCount: 0,
      clicksCount: 0,
    };

    setAds((prev) => [newAd, ...prev]);
    setShowNewAdModal(false);
    setNewAdTitle('');
    setNewAdSponsor('');
    setNewAdUrl('');
    notify(`Nouvelle campagne publicitaire créée.`);
  };

  const toggleAdStatus = (id: string) => {
    setAds((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, isActive: !ad.isActive } : ad))
    );
    notify(`Statut de la campagne publicitaire mis à jour.`);
  };

  const deleteAd = (id: string) => {
    if (confirm('Supprimer cette campagne ?')) {
      setAds((prev) => prev.filter((ad) => ad.id !== id));
      notify(`Campagne supprimée.`);
    }
  };

  // -------------------------------------------------------------------------
  // Gestion de la Médiathèque
  // -------------------------------------------------------------------------
  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const isVid = file.type.startsWith('video');
    const isAud = file.type.startsWith('audio');
    const isPdf = file.type.includes('pdf');

    const newMedia: MediaItem = {
      id: `med-${Date.now()}`,
      title: file.name.replace(/\.[^/.]+$/, ''),
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      mimeType: file.type || 'image/jpeg',
      type: isVid ? 'video' : isAud ? 'audio' : isPdf ? 'document' : 'image',
      url: URL.createObjectURL(file),
      thumbnailUrl: !isVid && !isAud && !isPdf ? URL.createObjectURL(file) : undefined,
      uploadedAt: new Date().toISOString().split('T')[0],
      dimensions: '1920x1080',
    };

    setMediaList((prev) => [newMedia, ...prev]);
    notify(`Fichier "${file.name}" importé avec succès dans la médiathèque.`);
  };

  const copyMediaUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopySuccessUrl(url);
    setTimeout(() => setCopySuccessUrl(null), 2500);
    notify(`URL du média copiée dans le presse-papier.`);
  };

  // -------------------------------------------------------------------------
  // Gestion des Commentaires
  // -------------------------------------------------------------------------
  const updateCommentStatus = (id: string, status: 'approved' | 'pending' | 'spam') => {
    setCommentsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
    notify(`Statut du commentaire mis à jour (${status}).`);
  };

  const deleteComment = (id: string) => {
    if (confirm('Supprimer ce commentaire ?')) {
      setCommentsList((prev) => prev.filter((c) => c.id !== id));
      notify(`Commentaire supprimé.`);
    }
  };

  // -------------------------------------------------------------------------
  // Gestion des Catégories
  // -------------------------------------------------------------------------
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    const slug = newCatSlug || newCatName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug,
      description: `Dossiers et analyses dédiés à ${newCatName}.`,
      accentColor: newCatText,
      badgeBg: newCatBg,
      badgeText: newCatText,
      count: 0,
      isDark: newCatIsDark,
      image: newCatImage || undefined,
    };

    setCategories((prev) => [...prev, newCat]);
    setShowNewCategoryModal(false);
    setNewCatName('');
    setNewCatSlug('');
    notify(`Catégorie "${newCat.name}" ajoutée.`);
  };

  // -------------------------------------------------------------------------
  // Écran de Connexion Administrateur
  // -------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#071426] text-white">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0e2137] border border-[#28445e] shadow-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#EF4248] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg mb-3">
              O
            </div>
            <h1 className="font-heading text-2xl font-black tracking-tight">ONTARIO CMS</h1>
            <p className="text-xs text-zinc-400 mt-1">Espace d’administration éditoriale sécurisé</p>
          </div>

          {authError && (
            <div className="p-3 mb-6 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-semibold text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Email Professionnel
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#122b45] border border-[#28445e] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#EF4248]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Mot de Passe
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#122b45] border border-[#28445e] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#EF4248]"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-3 py-3 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer"
            >
              Accéder au Tableau de Bord →
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#28445e] text-center">
            <Link href="/" className="text-xs text-zinc-400 hover:text-white transition-colors">
              ← Retour au site public
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Interface Principale du CMS WordPress-like
  // -------------------------------------------------------------------------
  const filteredArticles = (statusFilter === 'trash' ? trashArticles : articles).filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || art.category.slug === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      statusFilter === 'trash' ||
      (statusFilter === 'published' && art.status === 'published') ||
      (statusFilter === 'draft' && art.status === 'draft') ||
      (statusFilter === 'scheduled' && art.status === 'scheduled');
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f4f6f9] dark:bg-[#071426] text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* Toast de Notification Système */}
      {adminNotification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-2xl border border-white/20 animate-fade-in text-xs font-bold">
          <CheckIcon size={16} className="text-emerald-500" />
          <span>{adminNotification}</span>
        </div>
      )}

      {/* Barre Supérieure d'Administration */}
      <header className="h-16 border-b px-6 flex items-center justify-between sticky top-0 z-40 bg-white/90 dark:bg-[#0e2137]/90 backdrop-blur-md border-zinc-200 dark:border-[#28445e]">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-[#EF4248] flex items-center justify-center text-white font-extrabold text-sm shadow-md">
              O
            </div>
            <span className="font-heading font-extrabold text-base tracking-tight hidden sm:inline">
              ONTARIO CMS
            </span>
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-[#EF4248] transition-colors"
          >
            <span>Voir le site</span>
            <ArrowUpRightIcon size={13} />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={startNewArticle}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <PlusIcon size={14} />
            <span className="hidden sm:inline">Ajouter un article</span>
          </button>

          <div className="flex items-center gap-2 pl-3 border-l border-zinc-200 dark:border-[#28445e]">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
              alt="Admin"
              className="w-7 h-7 rounded-full object-cover ring-2 ring-zinc-300 dark:ring-zinc-700"
            />
            <span className="text-xs font-bold hidden md:inline">Steve Jones (Admin)</span>
            <button
              onClick={handleLogout}
              className="text-xs text-zinc-400 hover:text-red-500 ml-2 font-semibold cursor-pointer"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Corps CMS : Sidebar Gauche + Zone de Travail */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Latérale Gauche */}
        <aside className="w-full md:w-64 border-r p-4 flex flex-col justify-between bg-white dark:bg-[#0b1c30] border-zinc-200 dark:border-[#28445e]">
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#EF4248] text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <LayoutDashboardIcon size={16} />
              <span>Tableau de Bord</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'articles' || activeTab === 'editor'
                  ? 'bg-[#EF4248] text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileTextIcon size={16} />
                <span>Articles</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">{articles.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'media'
                  ? 'bg-[#EF4248] text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon size={16} />
                <span>Médias</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">{mediaList.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-[#EF4248] text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <FolderIcon size={16} />
              <span>Catégories ({categories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tags')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'tags'
                  ? 'bg-[#EF4248] text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <TagIcon size={16} />
              <span>Tags ({tagsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pages')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'pages'
                  ? 'bg-[#EF4248] text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <BookOpenIcon size={16} />
              <span>Pages ({sitePages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('advertisements')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'advertisements'
                  ? 'bg-[#EF4248] text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <MegaphoneIcon size={16} />
                <span>Annonces / Régie</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold">
                {ads.filter((a) => a.isActive).length} ACTIVES
              </span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-[#EF4248] text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <UsersIcon size={16} />
              <span>Utilisateurs ({usersList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('comments')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'comments'
                  ? 'bg-[#EF4248] text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquareIcon size={16} />
                <span>Commentaires</span>
              </div>
              {commentsList.filter((c) => c.status === 'pending').length > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-extrabold">
                  {commentsList.filter((c) => c.status === 'pending').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#EF4248] text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <SettingsIcon size={16} />
              <span>Paramètres du Site</span>
            </button>
          </nav>

          <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-[#28445e] text-[11px] text-zinc-400">
            <p>Version : Ontario v3.4 Enterprise</p>
            <p className="mt-1">Connecté à Supabase Cloud</p>
          </div>
        </aside>

        {/* Zone de Contenu Principal */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl">
          {/* ================================================================= */}
          {/* TAB 1 : DASHBOARD (Vue d'ensemble des Métriques) */}
          {/* ================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="flex flex-col gap-8 animate-fade-in">
              <div>
                <h1 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight">
                  Tableau de Bord
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Performances éditoriales, audience en direct et régie publicitaire
                </p>
              </div>

              {/* 4 Cartes KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Vues Totales</span>
                    <EyeIcon size={16} />
                  </div>
                  <div className="text-2xl font-black font-heading text-zinc-900 dark:text-white">
                    142,850
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-bold mt-2">
                    <TrendingUpIcon size={12} />
                    <span>+18.4% ce mois</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Articles Publiés</span>
                    <FileTextIcon size={16} />
                  </div>
                  <div className="text-2xl font-black font-heading text-zinc-900 dark:text-white">
                    {articles.length}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-medium mt-2">
                    {trashArticles.length} dans la corbeille
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Abonnés Lettre</span>
                    <UsersIcon size={16} />
                  </div>
                  <div className="text-2xl font-black font-heading text-zinc-900 dark:text-white">
                    1,420
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-bold mt-2">
                    <span>99.2% de délivrabilité</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs">
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Revenus Pub / Affiliation</span>
                    <MegaphoneIcon size={16} />
                  </div>
                  <div className="text-2xl font-black font-heading text-[#EF4248]">
                    4,890 €
                  </div>
                  <div className="text-[11px] text-emerald-500 font-bold mt-2">
                    {ads.filter((a) => a.isActive).length} campagnes actives
                  </div>
                </div>
              </div>

              {/* Raccourcis Rapides & Derniers Articles */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100 dark:border-[#28445e]">
                    <h3 className="font-heading font-bold text-sm">Publications Récentes</h3>
                    <button
                      onClick={() => setActiveTab('articles')}
                      className="text-xs font-bold text-[#EF4248] hover:underline"
                    >
                      Voir tous les articles →
                    </button>
                  </div>

                  <div className="flex flex-col divide-y divide-zinc-100 dark:divide-[#28445e]">
                    {articles.slice(0, 5).map((art) => (
                      <div key={art.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={art.coverImage}
                            alt={art.title}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold truncate">{art.title}</h4>
                            <p className="text-[11px] text-zinc-400">
                              {art.category.name} • {art.readingTime} min • {art.views} vues
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => editArticle(art)}
                          className="px-3 py-1 rounded-lg border text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer flex-shrink-0"
                        >
                          Éditer
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-sm mb-3">Statut de la Plateforme</h3>
                    <ul className="flex flex-col gap-3 text-xs">
                      <li className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-[#28445e]">
                        <span className="text-zinc-500">Moteur Next.js</span>
                        <span className="font-bold text-emerald-500">v16.4 Turbopack (Actif)</span>
                      </li>
                      <li className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-[#28445e]">
                        <span className="text-zinc-500">Base Supabase</span>
                        <span className="font-bold text-emerald-500">Connecté (RLS OK)</span>
                      </li>
                      <li className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-[#28445e]">
                        <span className="text-zinc-500">Régie Publicitaire</span>
                        <span className="font-bold text-[#EF4248]">Opérationnelle</span>
                      </li>
                      <li className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-[#28445e]">
                        <span className="text-zinc-500">Médiathèque</span>
                        <span className="font-bold">{mediaList.length} fichiers stockés</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-[#28445e]">
                    <button
                      onClick={startNewArticle}
                      className="w-full py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      + Rédiger un nouvel article
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2 : GESTION DES ARTICLES */}
          {/* ================================================================= */}
          {activeTab === 'articles' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-heading text-2xl font-extrabold tracking-tight">Articles</h1>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Gestion de l’ensemble du flux éditorial, programmations et corbeille
                  </p>
                </div>
                <button
                  onClick={startNewArticle}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer w-fit"
                >
                  <PlusIcon size={14} />
                  <span>Ajouter un article</span>
                </button>
              </div>

              {/* Barre des Filtres et Sous-onglets */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto text-xs font-bold">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      statusFilter === 'all' ? 'bg-[#EF4248] text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Tous ({articles.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('published')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      statusFilter === 'published' ? 'bg-[#EF4248] text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Publiés ({articles.filter((a) => a.status === 'published').length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('draft')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      statusFilter === 'draft' ? 'bg-[#EF4248] text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Brouillons ({articles.filter((a) => a.status === 'draft').length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('trash')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      statusFilter === 'trash' ? 'bg-[#EF4248] text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Corbeille ({trashArticles.length})
                  </button>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] text-xs font-semibold"
                  >
                    <option value="all">Toutes les rubriques</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <div className="relative flex-1 md:w-60">
                    <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] text-xs focus:outline-none focus:ring-1 focus:ring-[#EF4248]"
                    />
                  </div>
                </div>
              </div>

              {/* Actions Groupées */}
              {selectedArticleIds.length > 0 && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-[#EF4248]">
                    {selectedArticleIds.length} article(s) sélectionné(s)
                  </span>
                  <div className="flex items-center gap-2">
                    {statusFilter !== 'trash' ? (
                      <>
                        <button
                          onClick={() => handleBulkAction('publish')}
                          className="px-3 py-1 rounded bg-emerald-600 text-white font-bold"
                        >
                          Publier
                        </button>
                        <button
                          onClick={() => handleBulkAction('draft')}
                          className="px-3 py-1 rounded bg-zinc-600 text-white font-bold"
                        >
                          Mettre en brouillon
                        </button>
                        <button
                          onClick={() => handleBulkAction('trash')}
                          className="px-3 py-1 rounded bg-amber-600 text-white font-bold"
                        >
                          Déplacer en corbeille
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleBulkAction('restore')}
                          className="px-3 py-1 rounded bg-emerald-600 text-white font-bold"
                        >
                          Restaurer
                        </button>
                        <button
                          onClick={() => handleBulkAction('delete')}
                          className="px-3 py-1 rounded bg-red-600 text-white font-bold"
                        >
                          Supprimer définitivement
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Tableau des Articles */}
              <div className="overflow-x-auto rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-[#28445e] bg-zinc-50/50 dark:bg-[#122b45]/40 text-zinc-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={
                            selectedArticleIds.length > 0 &&
                            selectedArticleIds.length === filteredArticles.length
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedArticleIds(filteredArticles.map((a) => a.id));
                            } else {
                              setSelectedArticleIds([]);
                            }
                          }}
                        />
                      </th>
                      <th className="py-3 px-4">Article</th>
                      <th className="py-3 px-4">Rubrique</th>
                      <th className="py-3 px-4">Auteur</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-[#28445e]">
                    {filteredArticles.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-zinc-400">
                          Aucun article trouvé pour ces critères.
                        </td>
                      </tr>
                    ) : (
                      filteredArticles.map((art) => (
                        <tr key={art.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={selectedArticleIds.includes(art.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedArticleIds((prev) => [...prev, art.id]);
                                } else {
                                  setSelectedArticleIds((prev) => prev.filter((id) => id !== art.id));
                                }
                              }}
                            />
                          </td>
                          <td className="py-3 px-4 max-w-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={art.coverImage}
                                alt={art.title}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <h4 className="font-bold text-xs truncate hover:text-[#EF4248]">
                                  {art.title}
                                </h4>
                                <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                                  /article/{art.slug}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                              style={{
                                backgroundColor: art.category.badgeBg || '#eee',
                                color: art.category.badgeText || '#333',
                              }}
                            >
                              {art.category.name}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium text-zinc-600 dark:text-zinc-300">
                            {art.author.name}
                          </td>
                          <td className="py-3 px-4 text-zinc-400 whitespace-nowrap">
                            {art.publishedAt}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                                art.status === 'published'
                                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                  : art.status === 'trash'
                                  ? 'bg-red-500/15 text-red-600 dark:text-red-400'
                                  : 'bg-zinc-500/15 text-zinc-500'
                              }`}
                            >
                              {art.status || 'published'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            {statusFilter !== 'trash' ? (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => editArticle(art)}
                                  className="px-2.5 py-1 rounded-lg border text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                                >
                                  Éditer
                                </button>
                                <button
                                  onClick={() => moveArticleToTrash(art.id)}
                                  className="p-1 rounded-lg text-zinc-400 hover:text-red-500 cursor-pointer"
                                  title="Mettre en corbeille"
                                >
                                  <TrashIcon size={14} />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => restoreArticleFromTrash(art.id)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                                >
                                  Restaurer
                                </button>
                                <button
                                  onClick={() => permanentlyDeleteArticle(art.id)}
                                  className="p-1 rounded-lg text-red-500 hover:bg-red-500/20 cursor-pointer"
                                  title="Supprimer définitivement"
                                >
                                  <TrashIcon size={14} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3 : ÉDITEUR D'ARTICLE TYPE WORDPRESS (Gutenberg) */}
          {/* ================================================================= */}
          {activeTab === 'editor' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-[#28445e]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('articles')}
                    className="p-1.5 rounded-lg border hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold"
                  >
                    ← Retour
                  </button>
                  <h1 className="font-heading text-xl font-extrabold">
                    {editingArticleId ? 'Éditer l’article' : 'Rédiger un nouvel article'}
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowLivePreviewModal(true)}
                    className="px-3 py-1.5 rounded-xl border text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  >
                    Prévisualiser
                  </button>
                  <button
                    onClick={() => saveArticle('draft')}
                    className="px-3 py-1.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold hover:bg-zinc-300 cursor-pointer"
                  >
                    Enregistrer Brouillon
                  </button>
                  <button
                    onClick={() => saveArticle('published')}
                    className="px-4 py-1.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Publier l'Article →
                  </button>
                </div>
              </div>

              {/* Grille 2 Colonnes : Zone d'Écriture (70%) + Réglages Latéraux (30%) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Zone Rédactionnelle Gutenberg */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  {/* Titre Principal de l'Article */}
                  <input
                    type="text"
                    placeholder="Saisissez le grand titre éditorial..."
                    value={editorTitle}
                    onChange={(e) => setEditorTitle(e.target.value)}
                    className="w-full text-2xl sm:text-3xl font-heading font-black bg-transparent border-b pb-3 border-zinc-200 dark:border-[#28445e] focus:outline-none focus:border-[#EF4248]"
                  />

                  {/* Barre d'outils d'insertion de blocs (Gutenberg) */}
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] flex items-center gap-2 flex-wrap shadow-xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mr-2">
                      Insérer un bloc :
                    </span>
                    <button
                      onClick={() =>
                        setEditorBlocks((prev) => [
                          ...prev,
                          { id: `b-${Date.now()}`, type: 'paragraph', text: 'Nouveau paragraphe éditorial...' },
                        ])
                      }
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-[#122b45] text-xs font-semibold hover:bg-zinc-200"
                    >
                      + Paragraphe
                    </button>
                    <button
                      onClick={() =>
                        setEditorBlocks((prev) => [
                          ...prev,
                          { id: `b-${Date.now()}`, type: 'heading', level: 'h2', text: 'Titre de Section H2' },
                        ])
                      }
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-[#122b45] text-xs font-semibold hover:bg-zinc-200"
                    >
                      + Titre H2
                    </button>
                    <button
                      onClick={() =>
                        setEditorBlocks((prev) => [
                          ...prev,
                          { id: `b-${Date.now()}`, type: 'quote', text: 'Citation mémorable en exergue...' },
                        ])
                      }
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-[#122b45] text-xs font-semibold hover:bg-zinc-200"
                    >
                      + Citation
                    </button>
                    <button
                      onClick={() =>
                        setEditorBlocks((prev) => [
                          ...prev,
                          {
                            id: `b-${Date.now()}`,
                            type: 'image',
                            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
                            caption: 'Légende de la photographie d’illustration',
                          },
                        ])
                      }
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-[#122b45] text-xs font-semibold hover:bg-zinc-200"
                    >
                      + Image Légendée
                    </button>
                    <button
                      onClick={() =>
                        setEditorBlocks((prev) => [
                          ...prev,
                          {
                            id: `b-${Date.now()}`,
                            type: 'affiliate',
                            productName: 'Station de Travail Modulaire Studio Pro X1',
                            brand: 'Apex Computing',
                            description: 'Matériel certifié réparable sans outils pour inférence IA locale.',
                            affiliateUrl: 'https://www.amazon.fr/dp/B0EXEMPLE?tag=ontario-21',
                            buttonText: 'Consulter l’offre partenaire',
                          },
                        ])
                      }
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold hover:bg-amber-500/20"
                    >
                      + Produit Affilié Amazon
                    </button>
                  </div>

                  {/* Liste des Blocs Éditables */}
                  <div className="flex flex-col gap-4">
                    {editorBlocks.map((block, index) => (
                      <div
                        key={block.id}
                        className="p-4 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs relative group"
                      >
                        <div className="flex items-center justify-between mb-2 text-zinc-400 text-[11px] font-bold uppercase">
                          <span>Bloc #{index + 1} — {block.type}</span>
                          <button
                            onClick={() =>
                              setEditorBlocks((prev) => prev.filter((b) => b.id !== block.id))
                            }
                            className="text-red-400 hover:text-red-600 text-xs font-semibold"
                          >
                            Supprimer
                          </button>
                        </div>

                        {block.type === 'paragraph' && (
                          <textarea
                            rows={3}
                            value={block.text || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditorBlocks((prev) =>
                                prev.map((b) => (b.id === block.id ? { ...b, text: val } : b))
                              );
                            }}
                            className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#EF4248]"
                          />
                        )}

                        {block.type === 'heading' && (
                          <input
                            type="text"
                            value={block.text || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditorBlocks((prev) =>
                                prev.map((b) => (b.id === block.id ? { ...b, text: val } : b))
                              );
                            }}
                            className="w-full p-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#EF4248]"
                          />
                        )}

                        {block.type === 'quote' && (
                          <div className="flex flex-col gap-2">
                            <textarea
                              rows={2}
                              value={block.text || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditorBlocks((prev) =>
                                  prev.map((b) => (b.id === block.id ? { ...b, text: val } : b))
                                );
                              }}
                              placeholder="Texte de la citation..."
                              className="w-full p-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] text-xs italic"
                            />
                          </div>
                        )}

                        {block.type === 'image' && (
                          <div className="flex flex-col gap-2">
                            <input
                              type="text"
                              value={block.url || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditorBlocks((prev) =>
                                  prev.map((b) => (b.id === block.id ? { ...b, url: val } : b))
                                );
                              }}
                              placeholder="URL de l'image..."
                              className="w-full p-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] text-xs"
                            />
                            {block.url && (
                              <img
                                src={block.url}
                                alt="Aperçu"
                                className="w-full h-44 object-cover rounded-xl mt-1"
                              />
                            )}
                          </div>
                        )}

                        {block.type === 'affiliate' && (
                          <div className="flex flex-col gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                            <input
                              type="text"
                              value={block.productName || ''}
                              placeholder="Nom du produit..."
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditorBlocks((prev) =>
                                  prev.map((b) => (b.id === block.id ? { ...b, productName: val } : b))
                                );
                              }}
                              className="w-full p-2 rounded-lg bg-white dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] text-xs font-bold"
                            />
                            <input
                              type="text"
                              value={block.affiliateUrl || ''}
                              placeholder="Lien affilié Amazon..."
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditorBlocks((prev) =>
                                  prev.map((b) => (b.id === block.id ? { ...b, affiliateUrl: val } : b))
                                );
                              }}
                              className="w-full p-2 rounded-lg bg-white dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] text-xs"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colonne Latérale : Métadonnées & Réglages */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  {/* Réglages de Publication */}
                  <div className="p-5 rounded-3xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs flex flex-col gap-4 text-xs">
                    <h3 className="font-heading font-bold text-sm pb-2 border-b border-zinc-100 dark:border-[#28445e]">
                      Organisation & Métadonnées
                    </h3>

                    <div>
                      <label className="block font-bold text-zinc-500 mb-1">Rubrique</label>
                      <select
                        value={editorCategorySlug}
                        onChange={(e) => setEditorCategorySlug(e.target.value)}
                        className="w-full p-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] font-semibold"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-500 mb-1">Auteur Assigné</label>
                      <select
                        value={editorAuthorSlug}
                        onChange={(e) => setEditorAuthorSlug(e.target.value)}
                        className="w-full p-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] font-semibold"
                      >
                        {authors.map((a) => (
                          <option key={a.id} value={a.slug}>
                            {a.name} ({a.role})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-500 mb-1">Image à la Une (URL)</label>
                      <input
                        type="text"
                        value={editorCoverImage}
                        onChange={(e) => setEditorCoverImage(e.target.value)}
                        className="w-full p-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e]"
                      />
                      {editorCoverImage && (
                        <img
                          src={editorCoverImage}
                          alt="Cover"
                          className="w-full h-28 object-cover rounded-xl mt-2"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-500 mb-1">Extrait Court</label>
                      <textarea
                        rows={3}
                        value={editorExcerpt}
                        onChange={(e) => setEditorExcerpt(e.target.value)}
                        placeholder="Court résumé introductif..."
                        className="w-full p-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e]"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-bold">Mettre en avant dans le Hero</span>
                      <input
                        type="checkbox"
                        checked={editorIsHero}
                        onChange={(e) => setEditorIsHero(e.target.checked)}
                        className="w-4 h-4 rounded text-[#EF4248]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-bold">Article Exclusif / Badge Rouge</span>
                      <input
                        type="checkbox"
                        checked={editorIsFeatured}
                        onChange={(e) => setEditorIsFeatured(e.target.checked)}
                        className="w-4 h-4 rounded text-[#EF4248]"
                      />
                    </div>
                  </div>

                  {/* Simulateur SEO SERP Google */}
                  <div className="p-5 rounded-3xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs flex flex-col gap-3 text-xs">
                    <h3 className="font-heading font-bold text-sm pb-2 border-b border-zinc-100 dark:border-[#28445e]">
                      Aperçu SERP Google
                    </h3>
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] flex flex-col gap-1">
                      <span className="text-[10px] text-zinc-400">ontariowp.com › article › {editorSlug || 'titre'}</span>
                      <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 truncate">
                        {editorMetaTitle || editorTitle || 'Titre de l’article'} | Ontario Magazine
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {editorMetaDesc || editorExcerpt || 'Description optimisée pour l’indexation sur les moteurs de recherche...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4 : MÉDIATHÈQUE TYPE WORDPRESS */}
          {/* ================================================================= */}
          {activeTab === 'media' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-heading text-2xl font-extrabold tracking-tight">Médiathèque</h1>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Gestion des photographies, vidéos WebGPU, podcasts et documents PDF
                  </p>
                </div>

                <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer w-fit">
                  <UploadIcon size={14} />
                  <span>Téléverser des fichiers</span>
                  <input type="file" onChange={handleSimulatedUpload} className="hidden" />
                </label>
              </div>

              {/* Barre de Filtres Médiathèque */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold">
                  {(['all', 'image', 'video', 'audio', 'document'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setMediaFilterType(t)}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer uppercase text-[10px] ${
                        mediaFilterType === t
                          ? 'bg-[#EF4248] text-white'
                          : 'text-zinc-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Filtrer les médias..."
                    value={mediaSearchQuery}
                    onChange={(e) => setMediaSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] text-xs focus:outline-none focus:ring-1 focus:ring-[#EF4248]"
                  />
                </div>
              </div>

              {/* Grille des Médias */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {mediaList
                  .filter((m) => mediaFilterType === 'all' || m.type === mediaFilterType)
                  .filter((m) => m.title.toLowerCase().includes(mediaSearchQuery.toLowerCase()))
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMediaPreview(item)}
                      className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] cursor-pointer hover:shadow-lg transition-all"
                    >
                      {item.type === 'image' && (
                        <img
                          src={item.thumbnailUrl || item.url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                      {item.type === 'video' && (
                        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-zinc-800 text-white">
                          <span className="text-xl">🎬</span>
                          <span className="text-[10px] font-bold mt-1 truncate w-full">{item.fileName}</span>
                        </div>
                      )}
                      {item.type === 'audio' && (
                        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-purple-900 text-white">
                          <span className="text-xl">🎙️</span>
                          <span className="text-[10px] font-bold mt-1 truncate w-full">{item.fileName}</span>
                        </div>
                      )}
                      {item.type === 'document' && (
                        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-blue-900 text-white">
                          <span className="text-xl">📄</span>
                          <span className="text-[10px] font-bold mt-1 truncate w-full">{item.fileName}</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center text-white text-[11px] font-bold">
                        <span className="line-clamp-2">{item.title}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 5 : GESTION DES ANNONCES & RÉGIE PUBLICITAIRE (Section 10) */}
          {/* ================================================================= */}
          {activeTab === 'advertisements' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-heading text-2xl font-extrabold tracking-tight">Régie Publicitaire</h1>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Gestion des bannières, encarts sponsors, popups promotionnelles et suivi CTR
                  </p>
                </div>
                <button
                  onClick={() => setShowNewAdModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer w-fit"
                >
                  <PlusIcon size={14} />
                  <span>Créer une campagne</span>
                </button>
              </div>

              {/* Tableau des Campagnes Publicitaires */}
              <div className="rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-[#28445e] bg-zinc-50/50 dark:bg-[#122b45]/40 text-zinc-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">Campagne</th>
                      <th className="py-3 px-4">Annonceur</th>
                      <th className="py-3 px-4">Format / Emplacement</th>
                      <th className="py-3 px-4">Impressions</th>
                      <th className="py-3 px-4">Clics</th>
                      <th className="py-3 px-4">CTR</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-[#28445e]">
                    {ads.map((ad) => {
                      const ctr = ad.viewsCount > 0 ? ((ad.clicksCount / ad.viewsCount) * 100).toFixed(1) : '0.0';
                      return (
                        <tr key={ad.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 font-bold max-w-xs truncate">
                            <div className="flex items-center gap-3">
                              <img
                                src={ad.imageUrl}
                                alt={ad.title}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                              />
                              <span className="truncate">{ad.title}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium text-zinc-600 dark:text-zinc-300">
                            {ad.sponsorName}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-[#122b45] text-[10px] font-bold uppercase">
                              {ad.type} ({ad.position})
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold">{ad.viewsCount.toLocaleString()}</td>
                          <td className="py-3 px-4 font-semibold">{ad.clicksCount.toLocaleString()}</td>
                          <td className="py-3 px-4 font-bold text-emerald-500">{ctr}%</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => toggleAdStatus(ad.id)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase cursor-pointer ${
                                ad.isActive ? 'bg-emerald-500/15 text-emerald-600' : 'bg-zinc-500/15 text-zinc-500'
                              }`}
                            >
                              {ad.isActive ? 'ACTIF' : 'PAUSE'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => deleteAd(ad.id)}
                              className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer"
                            >
                              <TrashIcon size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 6 : GESTION DES CATÉGORIES */}
          {/* ================================================================= */}
          {activeTab === 'categories' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-heading text-2xl font-extrabold tracking-tight">Catégories</h1>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Gestion des rubriques éditoriales et palettes pastels Ontario
                  </p>
                </div>
                <button
                  onClick={() => setShowNewCategoryModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <PlusIcon size={14} />
                  <span>Nouvelle Catégorie</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-5 rounded-2xl border flex flex-col justify-between shadow-xs transition-all"
                    style={{
                      backgroundColor: cat.isDark ? '#13283E' : cat.badgeBg,
                      borderColor: 'transparent',
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="font-heading font-black text-base"
                          style={{ color: cat.isDark ? '#FFFFFF' : cat.badgeText }}
                        >
                          {cat.name}
                        </span>
                        <span className="text-[11px] font-bold text-zinc-400">
                          {cat.count || 0} articles
                        </span>
                      </div>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: cat.isDark ? '#D1D5DB' : 'var(--text-secondary)' }}
                      >
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                      <span>slug: /{cat.slug}</span>
                      {cat.isDark && <span className="text-[10px] font-bold text-white uppercase bg-white/20 px-2 py-0.5 rounded">Robot Dark Card</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 7 : GESTION DES UTILISATEURS & RÔLES */}
          {/* ================================================================= */}
          {activeTab === 'users' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div>
                <h1 className="font-heading text-2xl font-extrabold tracking-tight">Utilisateurs & Rôles</h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Gestion des comptes rédacteurs, journalistes et abonnés
                </p>
              </div>

              <div className="rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-[#28445e] bg-zinc-50/50 dark:bg-[#122b45]/40 text-zinc-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">Utilisateur</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Rôle</th>
                      <th className="py-3 px-4">Date de Création</th>
                      <th className="py-3 px-4">Dernière Connexion</th>
                      <th className="py-3 px-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-[#28445e]">
                    {usersList.map((user) => (
                      <tr key={user.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-bold">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-zinc-500">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-[#122b45] text-[10px] font-extrabold uppercase">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-zinc-400">{user.createdAt}</td>
                        <td className="py-3 px-4 text-zinc-400">{user.lastLoginAt || '—'}</td>
                        <td className="py-3 px-4">
                          <span className="text-emerald-500 font-bold text-[10px] uppercase">ACTIF</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 8 : MODÉRATION DES COMMENTAIRES */}
          {/* ================================================================= */}
          {activeTab === 'comments' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div>
                <h1 className="font-heading text-2xl font-extrabold tracking-tight">Commentaires</h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Modération en temps réel des avis et réactions des lecteurs
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {commentsList.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs flex flex-col sm:flex-row items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {c.authorName[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs">{c.authorName}</h4>
                          <span className="text-[10px] text-zinc-400">({c.authorEmail})</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                              c.status === 'approved'
                                ? 'bg-emerald-500/15 text-emerald-600'
                                : c.status === 'spam'
                                ? 'bg-red-500/15 text-red-600'
                                : 'bg-amber-500/15 text-amber-600'
                            }`}
                          >
                            {c.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mt-1">
                          {c.content}
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-2">
                          Article concerné : <b className="text-zinc-600 dark:text-zinc-200">{c.articleTitle || 'Article'}</b>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {c.status !== 'approved' && (
                        <button
                          onClick={() => updateCommentStatus(c.id, 'approved')}
                          className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Approuver
                        </button>
                      )}
                      {c.status !== 'spam' && (
                        <button
                          onClick={() => updateCommentStatus(c.id, 'spam')}
                          className="px-3 py-1 rounded-lg bg-amber-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Spam
                        </button>
                      )}
                      <button
                        onClick={() => deleteComment(c.id)}
                        className="p-1 rounded-lg text-zinc-400 hover:text-red-500 cursor-pointer"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 9 : PARAMÈTRES DU SITE */}
          {/* ================================================================= */}
          {activeTab === 'settings' && (
            <div className="flex flex-col gap-6 animate-fade-in max-w-3xl">
              <div>
                <h1 className="font-heading text-2xl font-extrabold tracking-tight">Paramètres du Site</h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Identité visuelle, SEO global, régie publicitaire et coordonnées officielles Ontario
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-[#0e2137] border border-zinc-200 dark:border-[#28445e] shadow-xs flex flex-col gap-4 text-xs">
                <div>
                  <label className="block font-bold mb-1">Nom du Média</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e] font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Slogan Éditorial</label>
                  <input
                    type="text"
                    value={settings.siteTagline}
                    onChange={(e) => setSettings({ ...settings, siteTagline: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Email Officiel</label>
                    <input
                      type="text"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Téléphone</label>
                    <input
                      type="text"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Adresse Siège Social (Conforme Capture Ontario)</label>
                  <input
                    type="text"
                    value={settings.contactAddress}
                    onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e]"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-[#28445e]">
                  <div>
                    <span className="font-bold block">Régie Publicitaire Interne</span>
                    <span className="text-[11px] text-zinc-400">Activer l'affichage des annonces et encarts sponsors</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.adsEnabled}
                    onChange={(e) => setSettings({ ...settings, adsEnabled: e.target.checked })}
                    className="w-4 h-4 text-[#EF4248] rounded"
                  />
                </div>

                <button
                  onClick={() => notify('Paramètres du site enregistrés.')}
                  className="mt-4 py-3 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold transition-all shadow-xs cursor-pointer"
                >
                  Sauvegarder les Paramètres
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ===================================================================== */}
      {/* MODALE D'APERÇU LIVE D'ARTICLE */}
      {/* ===================================================================== */}
      {showLivePreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#071426] rounded-3xl overflow-y-auto p-8 border border-zinc-200 dark:border-[#28445e] shadow-2xl relative">
            <button
              onClick={() => setShowLivePreviewModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full border flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>
            <div className="max-w-2xl mx-auto">
              <span className="px-3 py-1 rounded-full bg-[#EF4248] text-white text-[10px] font-black uppercase">
                {editorCategorySlug}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold mt-4 mb-3">
                {editorTitle || 'Sans titre'}
              </h1>
              <p className="text-zinc-400 text-xs mb-6">Par Steve Jones • Lecture 4 min</p>
              {editorCoverImage && (
                <img
                  src={editorCoverImage}
                  alt="Aperçu"
                  className="w-full h-80 object-cover rounded-2xl mb-6 shadow-sm"
                />
              )}
              <div className="prose dark:prose-invert text-sm leading-relaxed space-y-4">
                {editorBlocks.map((b) => (
                  <p key={b.id}>{b.text}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODALE CRÉATION CAMPAGNE PUBLICITAIRE */}
      {/* ===================================================================== */}
      {showNewAdModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#0e2137] rounded-3xl p-6 border border-zinc-200 dark:border-[#28445e] shadow-2xl">
            <h3 className="font-heading font-bold text-lg mb-4">Créer une Campagne Publicitaire</h3>
            <form onSubmit={handleCreateAd} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Titre de l'Annonce</label>
                <input
                  type="text"
                  value={newAdTitle}
                  onChange={(e) => setNewAdTitle(e.target.value)}
                  required
                  placeholder="Ex: Apex Neural Cloud..."
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e]"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Nom du Sponsor</label>
                <input
                  type="text"
                  value={newAdSponsor}
                  onChange={(e) => setNewAdSponsor(e.target.value)}
                  placeholder="Ex: Apex Systems"
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e]"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Lien de Destination</label>
                <input
                  type="url"
                  value={newAdUrl}
                  onChange={(e) => setNewAdUrl(e.target.value)}
                  required
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Format</label>
                  <select
                    value={newAdType}
                    onChange={(e) => setNewAdType(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e]"
                  >
                    <option value="sponsor">Bloc Sponsorisé</option>
                    <option value="banner">Bannière</option>
                    <option value="card">Carte Flux</option>
                    <option value="popup">Popup</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Position</label>
                  <select
                    value={newAdPosition}
                    onChange={(e) => setNewAdPosition(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-zinc-50 dark:bg-[#122b45] border border-zinc-200 dark:border-[#28445e]"
                  >
                    <option value="sidebar">Sidebar Latérale</option>
                    <option value="between_sections">Entre Sections</option>
                    <option value="header">En-tête</option>
                    <option value="footer">Pied de page</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-zinc-100 dark:border-[#28445e]">
                <button
                  type="button"
                  onClick={() => setShowNewAdModal(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#EF4248] text-white text-xs font-bold"
                >
                  Créer la Campagne
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODALE DÉTAILS MÉDIA */}
      {/* ===================================================================== */}
      {selectedMediaPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#0e2137] rounded-3xl p-6 border border-zinc-200 dark:border-[#28445e] shadow-2xl relative">
            <button
              onClick={() => setSelectedMediaPreview(null)}
              className="absolute top-4 right-4 text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
            <h3 className="font-heading font-bold text-sm mb-3 truncate">{selectedMediaPreview.title}</h3>
            {selectedMediaPreview.type === 'image' && (
              <img
                src={selectedMediaPreview.url}
                alt={selectedMediaPreview.title}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
            )}
            <div className="flex flex-col gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-4">
              <p>Nom : {selectedMediaPreview.fileName}</p>
              <p>Poids : {selectedMediaPreview.fileSize} • Type : {selectedMediaPreview.mimeType}</p>
              <p>Dimensions : {selectedMediaPreview.dimensions || '—'}</p>
            </div>
            <button
              onClick={() => copyMediaUrl(selectedMediaPreview.url)}
              className="w-full py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <CopyIcon size={14} />
              <span>{copySuccessUrl === selectedMediaPreview.url ? 'URL Copiée !' : 'Copier l’URL du fichier'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
