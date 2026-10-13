'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAdminSession,
  clearAdminSession,
  updateAdminProfile,
  changeAdminPassword,
  AdminSession,
} from '@/lib/auth';
import {
  getContentStore,
  saveContentStore,
  subscribeToContentStore,
  resetContentStore,
  ContentStoreState,
  SiteCustomization,
} from '@/lib/contentStore';
import {
  Article,
  Category,
  MediaItem,
  TagItem,
  Comment,
  SitePage,
  UserAccount,
  Advertisement,
} from '@/types';
import Link from 'next/link';

interface GutenbergBlock {
  id: string;
  type:
    | 'paragraph'
    | 'heading'
    | 'quote'
    | 'image'
    | 'gallery'
    | 'video'
    | 'button'
    | 'table'
    | 'alert'
    | 'affiliate';
  level?: 'h2' | 'h3' | 'h4';
  text?: string;
  caption?: string;
  url?: string;
  galleryImages?: string[];
  buttonText?: string;
  buttonUrl?: string;
  alertType?: 'info' | 'warning' | 'tip';
  tableRows?: string[][];
  productName?: string;
  brand?: string;
  price?: string;
  description?: string;
  features?: string[];
  affiliateUrl?: string;
  merchantName?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  // 1. Session Administrateur & Garde de Sécurité
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // 2. État du Magasin de Données CMS
  const [store, setStore] = useState<ContentStoreState | null>(null);

  // 3. Navigation Sidebar CMS
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'articles'
    | 'editor'
    | 'pages'
    | 'media'
    | 'categories'
    | 'tags'
    | 'customization'
    | 'users'
    | 'newsletter'
    | 'seo'
    | 'profile'
  >('dashboard');

  // 4. Notifications Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 5. Filtres Articles
  const [articleStatusFilter, setArticleStatusFilter] = useState<
    'all' | 'published' | 'draft' | 'scheduled' | 'trash'
  >('all');
  const [articleSearch, setArticleSearch] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState('all');
  const [selectedArticleIds, setSelectedArticleIds] = useState<string[]>([]);

  // 6. Éditeur Gutenberg par Blocs
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorSlug, setEditorSlug] = useState('');
  const [editorExcerpt, setEditorExcerpt] = useState('');
  const [editorCategorySlug, setEditorCategorySlug] = useState('ai');
  const [editorAuthorSlug, setEditorAuthorSlug] = useState('steve-jones');
  const [editorCoverImage, setEditorCoverImage] = useState(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85'
  );
  const [editorReadingTime, setEditorReadingTime] = useState(5);
  const [editorStatus, setEditorStatus] = useState<'draft' | 'published' | 'scheduled'>('published');
  const [editorTags, setEditorTags] = useState('IA, INNOVATION, TECH');
  const [editorBlocks, setEditorBlocks] = useState<GutenbergBlock[]>([
    {
      id: 'b-1',
      type: 'paragraph',
      text: 'L’intelligence artificielle et les nouveaux paradigmes visuels redéfinissent en profondeur la manière dont les plateformes éditoriales engagent leurs communautés.',
    },
    {
      id: 'b-2',
      type: 'heading',
      level: 'h2',
      text: 'Une rupture technologique majeure dans l’architecture numérique',
    },
    {
      id: 'b-3',
      type: 'quote',
      text: '« Le véritable luxe de demain ne résidera pas dans l’abondance de l’information, mais dans la pertinence de sa mise en scène. »',
    },
  ]);
  const [editorSeoTitle, setEditorSeoTitle] = useState('');
  const [editorSeoDesc, setEditorSeoDesc] = useState('');
  const [editorSeoKeyword, setEditorSeoKeyword] = useState('');
  const [showLivePreviewModal, setShowLivePreviewModal] = useState(false);
  const [showMediaPickerForCover, setShowMediaPickerForCover] = useState(false);

  // 7. Personnalisation du Site (Header, Hero, Sections, Footer)
  const [customizationForm, setCustomizationForm] = useState<SiteCustomization | null>(null);

  // 8. Gestion de Profil & Mot de passe
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 9. Modales de création rapide
  const [isNewCategoryModal, setIsNewCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatBg, setNewCatBg] = useState('#F0ECFA');
  const [newCatText, setNewCatText] = useState('#5844A8');

  const [isNewUserModal, setIsNewUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'administrator' | 'editor' | 'reader'>('editor');

  const [isMediaUploadModal, setIsMediaUploadModal] = useState(false);
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video' | 'audio' | 'document'>('image');

  // INITIALISATION & VÉRIFICATION DE SESSION
  useEffect(() => {
    const currentSession = getAdminSession();
    if (!currentSession || (currentSession.role !== 'administrator' && currentSession.role !== 'editor')) {
      router.replace('/admin/login');
      return;
    }

    setSession(currentSession);
    setProfileName(currentSession.fullName);
    setProfileEmail(currentSession.email);
    setProfileAvatar(currentSession.avatar);

    const initialStore = getContentStore();
    setStore(initialStore);
    setCustomizationForm(initialStore.customization);
    setIsAuthChecking(false);

    // Abonnement aux changements du Store
    const unsubscribe = subscribeToContentStore((updated) => {
      setStore(updated);
      setCustomizationForm(updated.customization);
    });

    return () => unsubscribe();
  }, [router]);

  // Afficher un toast éphémère
  const notify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Déconnexion
  const handleLogout = () => {
    clearAdminSession();
    router.replace('/admin/login');
  };

  // Sauvegarde globale dans le store
  const commitStore = (updated: ContentStoreState, message?: string) => {
    saveContentStore(updated);
    setStore(updated);
    if (message) notify(message);
  };

  // Filtrage des articles
  const filteredArticles = useMemo(() => {
    if (!store) return [];
    return store.articles.filter((art) => {
      // Filtre statut
      if (articleStatusFilter !== 'all') {
        const artStatus = art.status || 'published';
        if (artStatus !== articleStatusFilter) return false;
      }
      // Filtre catégorie
      if (articleCategoryFilter !== 'all') {
        if (art.category.slug !== articleCategoryFilter) return false;
      }
      // Filtre recherche
      if (articleSearch.trim()) {
        const q = articleSearch.toLowerCase();
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchExcerpt = art.excerpt.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt) return false;
      }
      return true;
    });
  }, [store, articleStatusFilter, articleCategoryFilter, articleSearch]);

  // KPIs
  const stats = useMemo(() => {
    if (!store) {
      return { total: 0, published: 0, drafts: 0, scheduled: 0, trash: 0, users: 0, subs: 0, media: 0, views: 0 };
    }
    const published = store.articles.filter((a) => !a.status || a.status === 'published').length;
    const drafts = store.articles.filter((a) => a.status === 'draft').length;
    const scheduled = store.articles.filter((a) => a.status === 'scheduled').length;
    const trash = store.articles.filter((a) => a.status === 'trash').length;
    const views = store.articles.reduce((acc, curr) => acc + (curr.views || 0), 0);
    return {
      total: store.articles.length,
      published,
      drafts,
      scheduled,
      trash,
      users: store.users.length,
      subs: store.subscribers.length,
      media: store.media.length,
      views,
    };
  }, [store]);

  // Ouvrir un article existant dans l'éditeur Gutenberg
  const handleEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setEditorTitle(art.title);
    setEditorSlug(art.slug);
    setEditorExcerpt(art.excerpt);
    setEditorCategorySlug(art.category.slug);
    setEditorAuthorSlug(art.author.slug);
    setEditorCoverImage(art.coverImage);
    setEditorReadingTime(art.readingTime || 5);
    setEditorStatus(art.status === 'draft' ? 'draft' : art.status === 'scheduled' ? 'scheduled' : 'published');
    setEditorTags((art.tags || []).join(', '));
    setEditorSeoTitle(art.seo?.metaTitle || art.title);
    setEditorSeoDesc(art.seo?.metaDescription || art.excerpt);
    setEditorSeoKeyword(art.tags?.[0] || 'Technologie');

    if (art.contentBlocks && art.contentBlocks.length > 0) {
      setEditorBlocks(
        art.contentBlocks.map((b, idx) => ({
          id: `block-${idx}-${Date.now()}`,
          ...b,
        }))
      );
    } else {
      setEditorBlocks([
        { id: `b-1`, type: 'paragraph', text: art.content || art.excerpt },
      ]);
    }
    setActiveTab('editor');
  };

  // Initialiser un nouvel article vierge
  const handleNewArticle = () => {
    setEditingArticleId(null);
    setEditorTitle('');
    setEditorSlug('');
    setEditorExcerpt('');
    setEditorCategorySlug(store?.categories[0]?.slug || 'ai');
    setEditorAuthorSlug(store?.authors[0]?.slug || 'steve-jones');
    setEditorCoverImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85');
    setEditorReadingTime(4);
    setEditorStatus('published');
    setEditorTags('IA, INNOVATION, TECH');
    setEditorSeoTitle('');
    setEditorSeoDesc('');
    setEditorSeoKeyword('');
    setEditorBlocks([
      { id: `b-${Date.now()}-1`, type: 'paragraph', text: 'Commencez à rédiger votre nouvel article ici...' },
    ]);
    setActiveTab('editor');
  };

  // Enregistrer ou Mettre à jour l'article
  const handleSaveArticle = (targetStatus?: 'draft' | 'published' | 'scheduled') => {
    if (!store) return;
    const finalStatus = targetStatus || editorStatus;

    if (!editorTitle.trim()) {
      notify('⚠️ Veuillez renseigner au moins un titre pour l’article.');
      return;
    }

    const categoryObj = store.categories.find((c) => c.slug === editorCategorySlug) || store.categories[0];
    const authorObj = store.authors.find((a) => a.slug === editorAuthorSlug) || store.authors[0];

    const cleanSlug = (editorSlug.trim() || editorTitle)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const updatedArticle: Article = {
      id: editingArticleId || `art-${Date.now()}`,
      title: editorTitle,
      slug: cleanSlug,
      excerpt: editorExcerpt || editorTitle,
      content: editorBlocks
        .filter((b) => b.type === 'paragraph')
        .map((b) => b.text)
        .join('\n\n'),
      contentBlocks: editorBlocks,
      coverImage: editorCoverImage,
      category: categoryObj,
      author: authorObj,
      tags: editorTags.split(',').map((t) => t.trim()).filter(Boolean),
      readingTime: Number(editorReadingTime) || 4,
      publishedAt: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: finalStatus,
      format: 'standard',
      views: editingArticleId ? (store.articles.find((a) => a.id === editingArticleId)?.views || 120) : 0,
      likes: editingArticleId ? (store.articles.find((a) => a.id === editingArticleId)?.likes || 12) : 0,
      commentsCount: 0,
      seo: {
        metaTitle: editorSeoTitle || editorTitle,
        metaDescription: editorSeoDesc || editorExcerpt,
      },
    };

    let nextArticles: Article[] = [];
    if (editingArticleId) {
      nextArticles = store.articles.map((a) => (a.id === editingArticleId ? updatedArticle : a));
    } else {
      nextArticles = [updatedArticle, ...store.articles];
    }

    commitStore(
      { ...store, articles: nextArticles },
      finalStatus === 'published'
        ? '✓ Article publié avec succès et visible en direct sur le site !'
        : '✓ Article sauvegardé en brouillon.'
    );
    setActiveTab('articles');
  };

  // Actions rapides de cycle de vie d'article
  const handleUpdateArticleStatus = (articleId: string, newStatus: 'published' | 'draft' | 'trash') => {
    if (!store) return;
    const nextArticles = store.articles.map((a) => (a.id === articleId ? { ...a, status: newStatus } : a));
    commitStore({ ...store, articles: nextArticles }, `✓ Statut de l'article modifié : ${newStatus}`);
  };

  const handleDeletePermanent = (articleId: string) => {
    if (!store) return;
    if (!confirm('Êtes-vous sûr de vouloir supprimer définitivement cet article ? Cette action est irréversible.')) {
      return;
    }
    const nextArticles = store.articles.filter((a) => a.id !== articleId);
    commitStore({ ...store, articles: nextArticles }, '✓ Article supprimé définitivement.');
  };

  // Traitement par lot
  const handleBulkAction = (action: 'publish' | 'draft' | 'trash' | 'delete') => {
    if (!store || selectedArticleIds.length === 0) return;
    if (action === 'delete') {
      if (!confirm(`Supprimer définitivement ${selectedArticleIds.length} article(s) ?`)) return;
      const nextArticles = store.articles.filter((a) => !selectedArticleIds.includes(a.id));
      commitStore({ ...store, articles: nextArticles }, `✓ ${selectedArticleIds.length} article(s) supprimé(s).`);
    } else {
      const statusMap: Record<string, 'published' | 'draft' | 'trash'> = {
        publish: 'published',
        draft: 'draft',
        trash: 'trash',
      };
      const newStatus = statusMap[action];
      const nextArticles = store.articles.map((a) =>
        selectedArticleIds.includes(a.id) ? { ...a, status: newStatus } : a
      );
      commitStore({ ...store, articles: nextArticles }, `✓ ${selectedArticleIds.length} article(s) mis à jour.`);
    }
    setSelectedArticleIds([]);
  };

  // Sauvegarde de la Personnalisation du Site (Header, Hero, Sections, Footer)
  const handleSaveCustomization = (e: React.FormEvent) => {
    e.preventDefault();
    if (!store || !customizationForm) return;

    commitStore(
      { ...store, customization: customizationForm },
      '✓ Personnalisation du site sauvegardée ! Toutes les zones du site public sont immédiatement actualisées.'
    );
  };

  // Sauvegarde du Profil Administrateur
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const success = updateAdminProfile(profileName, profileEmail, profileAvatar);
    if (success) {
      setSession((prev) => (prev ? { ...prev, fullName: profileName, email: profileEmail, avatar: profileAvatar } : null));
      notify('✓ Profil administrateur mis à jour.');
    } else {
      notify('⚠️ Erreur lors de la mise à jour du profil.');
    }
  };

  // Modification sécurisée du Mot de Passe
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (newPassword !== confirmPassword) {
      setPasswordError('Le nouveau mot de passe et sa confirmation ne correspondent pas.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Le nouveau mot de passe doit comporter au moins 8 caractères.');
      return;
    }

    const res = await changeAdminPassword(oldPassword, newPassword);
    if (res.success) {
      notify('✓ Mot de passe administrateur modifié avec succès.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordError(res.error || 'Erreur lors du changement de mot de passe.');
    }
  };

  // Création d'une nouvelle Catégorie
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!store || !newCatName.trim()) return;

    const slug = (newCatSlug.trim() || newCatName).toLowerCase().replace(/\s+/g, '-');
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug,
      description: newCatDesc || newCatName,
      accentColor: newCatText,
      badgeBg: newCatBg,
      badgeText: newCatText,
      count: 0,
    };

    commitStore(
      { ...store, categories: [...store.categories, newCat] },
      `✓ Catégorie "${newCatName}" ajoutée avec succès.`
    );
    setIsNewCategoryModal(false);
    setNewCatName('');
    setNewCatSlug('');
    setNewCatDesc('');
  };

  // Suppression d'une Catégorie
  const handleDeleteCategory = (catId: string) => {
    if (!store) return;
    if (!confirm('Supprimer cette catégorie ?')) return;
    commitStore(
      { ...store, categories: store.categories.filter((c) => c.id !== catId) },
      '✓ Catégorie supprimée.'
    );
  };

  // Création d'un nouvel Utilisateur
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!store || !newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isActive: true,
      createdAt: 'Aujourd’hui',
      articlesCount: 0,
    };

    commitStore(
      { ...store, users: [...store.users, newUser] },
      `✓ Utilisateur "${newUserName}" créé avec le rôle ${newUserRole}.`
    );
    setIsNewUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
  };

  // Modification du rôle utilisateur
  const handleChangeUserRole = (userId: string, newRole: 'administrator' | 'editor' | 'reader') => {
    if (!store) return;
    const nextUsers = store.users.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
    commitStore({ ...store, users: nextUsers }, '✓ Rôle de l’utilisateur mis à jour.');
  };

  // Suppression d'utilisateur
  const handleDeleteUser = (userId: string) => {
    if (!store) return;
    if (session?.userId === userId) {
      alert('Vous ne pouvez pas supprimer votre propre compte administrateur actif.');
      return;
    }
    if (!confirm('Supprimer cet utilisateur ?')) return;
    commitStore(
      { ...store, users: store.users.filter((u) => u.id !== userId) },
      '✓ Utilisateur supprimé.'
    );
  };

  // Ajout de média
  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!store || !newMediaTitle.trim() || !newMediaUrl.trim()) return;

    const newMedia: MediaItem = {
      id: `med-${Date.now()}`,
      title: newMediaTitle,
      fileName: newMediaTitle.toLowerCase().replace(/\s+/g, '_') + '.jpg',
      url: newMediaUrl,
      type: newMediaType,
      fileSize: '1.4 MB',
      dimensions: '1920x1080',
      mimeType: 'image/jpeg',
      uploadedAt: 'Aujourd’hui',
    };

    commitStore({ ...store, media: [newMedia, ...store.media] }, '✓ Média ajouté à la bibliothèque.');
    setIsMediaUploadModal(false);
    setNewMediaTitle('');
    setNewMediaUrl('');
  };

  const handleDeleteMedia = (mediaId: string) => {
    if (!store) return;
    if (!confirm('Supprimer ce média de la bibliothèque ?')) return;
    commitStore(
      { ...store, media: store.media.filter((m) => m.id !== mediaId) },
      '✓ Média supprimé.'
    );
  };

  // Copier l'URL d'un média
  const handleCopyMediaUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    notify('✓ URL du média copiée dans le presse-papiers !');
  };

  // Export CSV de la Newsletter
  const handleExportNewsletterCSV = () => {
    if (!store) return;
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Email,Date,Statut\n' +
      store.subscribers.map((s) => `${s.id},${s.email},${s.subscribedAt},${s.status}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ontario_newsletter_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify('✓ Fichier CSV des abonnés exporté avec succès.');
  };

  // Suppression d'un abonné
  const handleDeleteSubscriber = (subId: string) => {
    if (!store) return;
    commitStore(
      { ...store, subscribers: store.subscribers.filter((s) => s.id !== subId) },
      '✓ Abonné supprimé de la liste.'
    );
  };

  // Réinitialisation d'usine
  const handleFactoryReset = () => {
    if (
      !confirm(
        'ATTENTION : Voulez-vous réinitialiser toutes les données du CMS aux paramètres d’usine officiels Ontario ?'
      )
    ) {
      return;
    }
    const fresh = resetContentStore();
    setStore(fresh);
    setCustomizationForm(fresh.customization);
    notify('✓ Données du CMS réinitialisées aux valeurs d’usine.');
  };

  // BLOCS GUTENBERG : Ajout, Déplacement, Suppression
  const addBlock = (type: GutenbergBlock['type']) => {
    const newId = `b-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    let blockData: GutenbergBlock = { id: newId, type };

    if (type === 'heading') {
      blockData = { ...blockData, level: 'h2', text: 'Nouveau sous-titre de section' };
    } else if (type === 'paragraph') {
      blockData = { ...blockData, text: 'Nouveau paragraphe rédigé...' };
    } else if (type === 'quote') {
      blockData = { ...blockData, text: 'Citation inspirante...' };
    } else if (type === 'image') {
      blockData = {
        ...blockData,
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        caption: 'Légende de l’image',
      };
    } else if (type === 'video') {
      blockData = {
        ...blockData,
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        caption: 'Vidéo de démonstration 4K',
      };
    } else if (type === 'button') {
      blockData = { ...blockData, buttonText: 'En savoir plus', buttonUrl: 'https://ontariowp.com' };
    } else if (type === 'alert') {
      blockData = { ...blockData, alertType: 'tip', text: 'Astuce : L’analyse approfondie permet d’anticiper les ruptures.' };
    } else if (type === 'affiliate') {
      blockData = {
        ...blockData,
        productName: 'Station de Travail Modulaire Studio Pro',
        brand: 'Apex Tech',
        price: '1 299 €',
        description: 'Équipement haut de gamme recommandé par la rédaction.',
        features: ['Processeur 24 cœurs', 'Refroidissement passif', 'Garantie 3 ans'],
        affiliateUrl: 'https://amazon.fr',
        merchantName: 'Amazon Partner',
      };
    } else if (type === 'table') {
      blockData = {
        ...blockData,
        tableRows: [
          ['Critère', 'Ontario Media', 'Concurrent standard'],
          ['Vitesse d’affichage', '< 0.8s', '2.5s'],
          ['Fidélité visuelle', '100% WordPress Ontario', 'Approximative'],
        ],
      };
    }

    setEditorBlocks([...editorBlocks, blockData]);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= editorBlocks.length) return;
    const copy = [...editorBlocks];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    setEditorBlocks(copy);
  };

  const removeBlock = (index: number) => {
    if (editorBlocks.length <= 1) {
      notify('Un article doit contenir au moins un bloc.');
      return;
    }
    const copy = [...editorBlocks];
    copy.splice(index, 1);
    setEditorBlocks(copy);
  };

  if (isAuthChecking || !store || !session) {
    return (
      <div className="min-h-screen bg-[#071426] flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#EF4248] border-t-transparent animate-spin" />
          <p className="text-xs text-zinc-400">Chargement du CMS ONTARIO...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071426] text-white flex flex-col lg:flex-row font-sans selection:bg-[#EF4248] selection:text-white antialiased">
      {/* TOAST FLOTTANT DE NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-5 py-3.5 rounded-2xl bg-[#0E2137] border border-[#28445E] shadow-2xl text-xs font-semibold text-white flex items-center gap-3 animate-slide-in">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          1. SIDEBAR FIXE D'ADMINISTRATION CMS
      ========================================================================== */}
      <aside className="w-full lg:w-72 bg-[#0E2137] border-b lg:border-b-0 lg:border-r border-[#28445E] flex-shrink-0 flex flex-col justify-between sticky top-0 lg:h-screen z-40">
        <div>
          {/* En-tête Marque CMS */}
          <div className="p-6 border-b border-[#28445E]/80 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-[#EF4248] flex items-center justify-center text-white font-extrabold shadow-md shadow-red-500/30">
                <span className="font-heading text-lg">O</span>
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg tracking-tight text-white block leading-none">
                  ONTARIO
                </span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  CMS Enterprise
                </span>
              </div>
            </Link>
            <span className="px-2 py-0.5 rounded-full bg-[#EF4248]/20 text-[#EF4248] border border-[#EF4248]/30 text-[9px] font-mono font-bold">
              v2.4
            </span>
          </div>

          {/* Profil Administrateur Connecté */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-[#122B45] border border-[#28445E]/80 flex items-center gap-3">
            <img
              src={session.avatar}
              alt={session.fullName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#EF4248]/40"
            />
            <div className="flex-1 min-w-0">
              <div className="font-heading font-bold text-xs truncate text-white">{session.fullName}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-zinc-400 capitalize">{session.role}</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('profile')}
              title="Mon Profil"
              className="p-1.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              ⚙️
            </button>
          </div>

          {/* Menu de Navigation */}
          <nav className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)] no-scrollbar">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#EF4248] text-white shadow-md shadow-red-500/20'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">📊</span>
                <span>Dashboard</span>
              </span>
              <span className="text-[10px] opacity-75 font-mono">KPIs</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'articles' || activeTab === 'editor'
                  ? 'bg-[#EF4248] text-white shadow-md shadow-red-500/20'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">📝</span>
                <span>Articles</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                {stats.total}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('customization')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'customization'
                  ? 'bg-[#EF4248] text-white shadow-md shadow-red-500/20'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">🎨</span>
                <span>Personnalisation Site</span>
              </span>
              <span className="text-[10px] text-amber-400 font-bold">Direct</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'media'
                  ? 'bg-[#EF4248] text-white shadow-md shadow-red-500/20'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">🖼️</span>
                <span>Médiathèque</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px]">{stats.media}</span>
            </button>

            <button
              onClick={() => setActiveTab('pages')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'pages'
                  ? 'bg-[#EF4248] text-white shadow-md shadow-red-500/20'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">📑</span>
                <span>Pages du Site</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px]">{store.sitePages.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'categories'
                  ? 'bg-[#EF4248] text-white shadow-md shadow-red-500/20'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">🗂️</span>
                <span>Catégories</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px]">{store.categories.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('tags')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'tags'
                  ? 'bg-[#EF4248] text-white shadow-md shadow-red-500/20'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">🏷️</span>
                <span>Tags Éditoriaux</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px]">{store.tags.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'users'
                  ? 'bg-[#EF4248] text-white shadow-md shadow-red-500/20'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">👥</span>
                <span>Utilisateurs & Rôles</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px]">{stats.users}</span>
            </button>

            <button
              onClick={() => setActiveTab('newsletter')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'newsletter'
                  ? 'bg-[#EF4248] text-white shadow-md shadow-red-500/20'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">✉️</span>
                <span>Newsletter</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                {stats.subs}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'seo'
                  ? 'bg-[#EF4248] text-white shadow-md shadow-red-500/20'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">🔍</span>
                <span>SEO & Sitemap</span>
              </span>
              <span className="text-[10px] text-zinc-400">Meta</span>
            </button>
          </nav>
        </div>

        {/* Pied de Sidebar */}
        <div className="p-4 border-t border-[#28445E]/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white font-medium transition-colors"
          >
            <span>Voir le site public</span>
            <span>↗</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl hover:bg-red-500/10 text-xs text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
          >
            <span>🔒 Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          2. ESPACE DE TRAVAIL PRINCIPAL
      ========================================================================== */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {/* =======================================================================
            TAB : DASHBOARD OVERVIEW
        ======================================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 max-w-7xl mx-auto">
            {/* Bannière de Bienvenue */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0E2137] via-[#122B45] to-[#0E2137] border border-[#28445E]">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EF4248]/20 text-[#EF4248] text-[10px] font-bold uppercase tracking-wider mb-2">
                  ✓ CMS Connecté en Direct
                </span>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                  Bonjour, {session.fullName}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                  Voici l'état opérationnel complet de votre média multimédia ONTARIO aujourd’hui.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handleNewArticle}
                  className="px-5 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-lg shadow-red-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>+</span>
                  <span>Nouvel Article</span>
                </button>
                <button
                  onClick={() => setActiveTab('customization')}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <span>🎨 Personnaliser Accueil</span>
                </button>
              </div>
            </div>

            {/* Cartes KPI Statistiques */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-5 rounded-2xl bg-[#0E2137] border border-[#28445E]">
                <span className="text-[11px] font-semibold text-zinc-400 block mb-1">Articles Publiés</span>
                <div className="font-heading text-2xl font-black text-[#EF4248]">{stats.published}</div>
                <span className="text-[10px] text-zinc-500 mt-1 block">Sur {stats.total} total</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#0E2137] border border-[#28445E]">
                <span className="text-[11px] font-semibold text-zinc-400 block mb-1">Brouillons</span>
                <div className="font-heading text-2xl font-black text-amber-400">{stats.drafts}</div>
                <span className="text-[10px] text-zinc-500 mt-1 block">En préparation</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#0E2137] border border-[#28445E]">
                <span className="text-[11px] font-semibold text-zinc-400 block mb-1">Abonnés Newsletter</span>
                <div className="font-heading text-2xl font-black text-emerald-400">{stats.subs}</div>
                <span className="text-[10px] text-emerald-500/80 mt-1 block">100% Opt-in</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#0E2137] border border-[#28445E]">
                <span className="text-[11px] font-semibold text-zinc-400 block mb-1">Médias Hébergés</span>
                <div className="font-heading text-2xl font-black text-blue-400">{stats.media}</div>
                <span className="text-[10px] text-zinc-500 mt-1 block">Images & Vidéos</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#0E2137] border border-[#28445E]">
                <span className="text-[11px] font-semibold text-zinc-400 block mb-1">Lectures Cumulées</span>
                <div className="font-heading text-2xl font-black text-purple-400">
                  {(stats.views / 1000).toFixed(1)}k
                </div>
                <span className="text-[10px] text-zinc-500 mt-1 block">Vues certifiées</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#0E2137] border border-[#28445E]">
                <span className="text-[11px] font-semibold text-zinc-400 block mb-1">Utilisateurs CMS</span>
                <div className="font-heading text-2xl font-black text-cyan-400">{stats.users}</div>
                <span className="text-[10px] text-zinc-500 mt-1 block">Rôles configurés</span>
              </div>
            </div>

            {/* Graphique de Trafic & Dernières Activités */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Graphique d'audience simulé professionnel */}
              <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0E2137] border border-[#28445E] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">Audience & Lectures (7 derniers jours)</h3>
                    <p className="text-xs text-zinc-400">Progression hebdomadaire de l’engagement éditorial</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                    +18.4% cette semaine
                  </span>
                </div>

                <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-[#28445E]/60">
                  {[
                    { day: 'Lun', val: 65, views: '4.2k' },
                    { day: 'Mar', val: 82, views: '5.8k' },
                    { day: 'Mer', val: 74, views: '5.1k' },
                    { day: 'Jeu', val: 95, views: '6.9k' },
                    { day: 'Ven', val: 88, views: '6.3k' },
                    { day: 'Sam', val: 60, views: '3.9k' },
                    { day: 'Dim', val: 92, views: '6.7k' },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <span className="text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {bar.views}
                      </span>
                      <div
                        style={{ height: `${bar.val}%` }}
                        className="w-full max-w-[36px] rounded-t-lg bg-gradient-to-t from-[#EF4248] to-[#ff7b80] group-hover:brightness-125 transition-all shadow-md shadow-red-500/10"
                      />
                      <span className="text-[11px] font-medium text-zinc-400">{bar.day}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 text-xs text-zinc-400">
                  <span>Moyenne quotidienne : <b>5 550 lectures</b></span>
                  <span>Temps moyen de lecture : <b>4m 42s</b></span>
                </div>
              </div>

              {/* Dernières Activités Récentes */}
              <div className="p-6 rounded-3xl bg-[#0E2137] border border-[#28445E] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-base text-white">Dernières Activités</h3>
                  <span className="text-xs text-zinc-400">Temps réel</span>
                </div>
                <div className="space-y-3.5 flex-1 overflow-y-auto max-h-56 no-scrollbar">
                  <div className="p-3 rounded-xl bg-[#122B45] border border-[#28445E]/60 flex items-start gap-3">
                    <span className="text-sm">✍️</span>
                    <div className="text-xs">
                      <p className="font-semibold text-white">Article sauvegardé</p>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">{store.articles[0]?.title}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#122B45] border border-[#28445E]/60 flex items-start gap-3">
                    <span className="text-sm">✉️</span>
                    <div className="text-xs">
                      <p className="font-semibold text-white">Nouvel abonné Newsletter</p>
                      <p className="text-[11px] text-zinc-400">{store.subscribers[0]?.email || 'contact@client.fr'}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#122B45] border border-[#28445E]/60 flex items-start gap-3">
                    <span className="text-sm">🖼️</span>
                    <div className="text-xs">
                      <p className="font-semibold text-white">Médiathèque synchronisée</p>
                      <p className="text-[11px] text-zinc-400">{store.media.length} fichiers actifs</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('articles')}
                  className="mt-4 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 text-center transition-colors"
                >
                  Gérer tous les articles →
                </button>
              </div>
            </div>

            {/* Tableau rapide des derniers articles */}
            <div className="p-6 rounded-3xl bg-[#0E2137] border border-[#28445E]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-base text-white">Articles Récemment Modifiés</h3>
                <button
                  onClick={() => setActiveTab('articles')}
                  className="text-xs font-semibold text-[#EF4248] hover:underline"
                >
                  Voir tout ({store.articles.length})
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#28445E] text-zinc-400 uppercase tracking-wider text-[10px]">
                      <th className="pb-3">Titre de l'Article</th>
                      <th className="pb-3">Catégorie</th>
                      <th className="pb-3">Statut</th>
                      <th className="pb-3">Vues</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#28445E]/60">
                    {store.articles.slice(0, 5).map((art) => (
                      <tr key={art.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 font-semibold text-white max-w-xs truncate pr-4">
                          {art.title}
                        </td>
                        <td className="py-3">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase"
                            style={{ backgroundColor: art.category.badgeBg, color: art.category.badgeText }}
                          >
                            {art.category.name}
                          </span>
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                              art.status === 'published' || !art.status
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : art.status === 'draft'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}
                          >
                            {art.status || 'published'}
                          </span>
                        </td>
                        <td className="py-3 text-zinc-300 font-mono">{art.views || 0}</td>
                        <td className="py-3 text-right space-x-2">
                          <button
                            onClick={() => handleEditArticle(art)}
                            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-[#EF4248] hover:text-white text-zinc-300 font-medium transition-colors"
                          >
                            Modifier
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB : GESTION DES ARTICLES (LISTE STYLE WORDPRESS)
        ======================================================================== */}
        {activeTab === 'articles' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* Titre et Action Principale */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                  Gestion des Articles
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Créez, éditez, publiez et modérez l'ensemble des contenus de la plateforme.
                </p>
              </div>
              <button
                onClick={handleNewArticle}
                className="px-5 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-lg shadow-red-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>+</span>
                <span>Nouvel Article (Éditeur Gutenberg)</span>
              </button>
            </div>

            {/* Filtres par Onglet de Statut façon WordPress */}
            <div className="flex gap-4 border-b border-[#28445E] pb-3 text-xs font-bold overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: 'Tous', count: stats.total },
                { id: 'published', label: 'Publiés', count: stats.published },
                { id: 'draft', label: 'Brouillons', count: stats.drafts },
                { id: 'scheduled', label: 'Programmés', count: stats.scheduled },
                { id: 'trash', label: 'Corbeille', count: stats.trash },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setArticleStatusFilter(tab.id as any)}
                  className={`cursor-pointer transition-colors pb-3 -mb-3 whitespace-nowrap ${
                    articleStatusFilter === tab.id
                      ? 'text-[#EF4248] border-b-2 border-[#EF4248]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label} <span className="text-[10px] opacity-75">({tab.count})</span>
                </button>
              ))}
            </div>

            {/* Barre de Recherche & Filtres Secondaires */}
            <div className="p-4 rounded-2xl bg-[#0E2137] border border-[#28445E] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Rechercher par titre ou extrait..."
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#EF4248] w-full sm:w-64"
                />
                <select
                  value={articleCategoryFilter}
                  onChange={(e) => setArticleCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white focus:outline-none"
                >
                  <option value="all">Toutes Catégories</option>
                  {store.categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions groupées */}
              {selectedArticleIds.length > 0 && (
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <span className="text-xs text-zinc-400">
                    <b>{selectedArticleIds.length}</b> sélectionnés :
                  </span>
                  <button
                    onClick={() => handleBulkAction('publish')}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-[11px] font-bold hover:bg-emerald-500/30"
                  >
                    Publier
                  </button>
                  <button
                    onClick={() => handleBulkAction('draft')}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-[11px] font-bold hover:bg-amber-500/30"
                  >
                    Brouillon
                  </button>
                  <button
                    onClick={() => handleBulkAction('trash')}
                    className="px-2.5 py-1.5 rounded-lg bg-red-500/20 text-red-300 text-[11px] font-bold hover:bg-red-500/30"
                  >
                    Mettre Corbeille
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="px-2.5 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-bold hover:bg-red-700"
                  >
                    Supprimer Définitif
                  </button>
                </div>
              )}
            </div>

            {/* Tableau Complet des Articles */}
            <div className="rounded-3xl bg-[#0E2137] border border-[#28445E] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#122B45]/70 border-b border-[#28445E] text-zinc-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4 w-10">
                        <input
                          type="checkbox"
                          checked={
                            filteredArticles.length > 0 &&
                            selectedArticleIds.length === filteredArticles.length
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedArticleIds(filteredArticles.map((a) => a.id));
                            } else {
                              setSelectedArticleIds([]);
                            }
                          }}
                          className="rounded accent-[#EF4248]"
                        />
                      </th>
                      <th className="py-4 pr-4">Titre</th>
                      <th className="py-4 pr-4">Auteur</th>
                      <th className="py-4 pr-4">Catégorie</th>
                      <th className="py-4 pr-4">Statut</th>
                      <th className="py-4 pr-4">Date</th>
                      <th className="py-4 pr-4">Vues</th>
                      <th className="py-4 pr-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#28445E]/50">
                    {filteredArticles.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-zinc-400">
                          Aucun article ne correspond à vos filtres.
                        </td>
                      </tr>
                    ) : (
                      filteredArticles.map((art) => {
                        const isSelected = selectedArticleIds.includes(art.id);
                        return (
                          <tr key={art.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedArticleIds([...selectedArticleIds, art.id]);
                                  } else {
                                    setSelectedArticleIds(selectedArticleIds.filter((id) => id !== art.id));
                                  }
                                }}
                                className="rounded accent-[#EF4248]"
                              />
                            </td>
                            <td className="py-4 pr-4 font-bold text-white max-w-sm">
                              <div className="flex items-center gap-3">
                                <img
                                  src={art.coverImage}
                                  alt=""
                                  className="w-12 h-9 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="truncate hover:text-[#EF4248] cursor-pointer" onClick={() => handleEditArticle(art)}>
                                    {art.title}
                                  </div>
                                  <div className="text-[10px] text-zinc-400 font-mono truncate">
                                    /{art.slug}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 pr-4 text-zinc-300 font-medium">
                              {art.author.name}
                            </td>
                            <td className="py-4 pr-4">
                              <span
                                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase"
                                style={{
                                  backgroundColor: art.category.badgeBg,
                                  color: art.category.badgeText,
                                }}
                              >
                                {art.category.name}
                              </span>
                            </td>
                            <td className="py-4 pr-4">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                                  art.status === 'published' || !art.status
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : art.status === 'draft'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                }`}
                              >
                                {art.status || 'published'}
                              </span>
                            </td>
                            <td className="py-4 pr-4 text-zinc-400 text-[11px] whitespace-nowrap">
                              {art.publishedAt}
                            </td>
                            <td className="py-4 pr-4 text-zinc-300 font-mono">
                              {art.views || 0}
                            </td>
                            <td className="py-4 pr-4 text-right space-x-1 whitespace-nowrap">
                              <button
                                onClick={() => handleEditArticle(art)}
                                title="Modifier avec l'éditeur Gutenberg"
                                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#EF4248] text-white text-xs font-semibold transition-colors"
                              >
                                Éditer
                              </button>
                              {art.status !== 'published' ? (
                                <button
                                  onClick={() => handleUpdateArticleStatus(art.id, 'published')}
                                  title="Publier immédiatement"
                                  className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs"
                                >
                                  ✓ Publier
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUpdateArticleStatus(art.id, 'draft')}
                                  title="Passer en brouillon"
                                  className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs"
                                >
                                  Brouillon
                                </button>
                              )}
                              {art.status !== 'trash' ? (
                                <button
                                  onClick={() => handleUpdateArticleStatus(art.id, 'trash')}
                                  title="Mettre dans la corbeille"
                                  className="px-2 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs"
                                >
                                  🗑️
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleDeletePermanent(art.id)}
                                  title="Supprimer définitivement"
                                  className="px-2 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 text-xs font-bold"
                                >
                                  ✕ Supprimer
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB : ÉDITEUR D'ARTICLES TYPE GUTENBERG PAR BLOCS
        ======================================================================== */}
        {activeTab === 'editor' && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Barre Supérieure d'Édition */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0E2137] border border-[#28445E]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('articles')}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-zinc-300 transition-colors"
                >
                  ← Retour aux articles
                </button>
                <span className="text-xs text-zinc-400">
                  {editingArticleId ? 'Modification d’un article' : 'Nouvelle publication'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowLivePreviewModal(true)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>👁️ Prévisualiser en Direct</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveArticle('draft')}
                  className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-bold text-amber-300 transition-all cursor-pointer"
                >
                  Sauvegarder Brouillon
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveArticle('published')}
                  className="px-5 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-xs font-bold text-white shadow-md shadow-red-500/20 transition-all cursor-pointer"
                >
                  ✓ Publier Immédiatement
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne Principale : Titre & Composition par Blocs */}
              <div className="lg:col-span-2 space-y-6">
                {/* Grand Titre & Slug */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0E2137] border border-[#28445E] space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Titre de votre article..."
                    value={editorTitle}
                    onChange={(e) => {
                      setEditorTitle(e.target.value);
                      if (!editingArticleId) {
                        setEditorSlug(e.target.value.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'));
                      }
                    }}
                    className="w-full bg-transparent font-heading font-extrabold text-2xl sm:text-3xl text-white placeholder-zinc-500 focus:outline-none"
                  />
                  <div className="flex items-center gap-2 text-xs text-zinc-400 border-t border-[#28445E]/60 pt-3">
                    <span>Permalien : <b>ontariowp.com/article/</b></span>
                    <input
                      type="text"
                      value={editorSlug}
                      onChange={(e) => setEditorSlug(e.target.value)}
                      placeholder="mon-article-slug"
                      className="px-2 py-0.5 rounded bg-[#122B45] border border-[#28445E] text-white font-mono text-xs focus:outline-none focus:border-[#EF4248]"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Extrait chapô / résumé d’introduction..."
                    value={editorExcerpt}
                    onChange={(e) => setEditorExcerpt(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#EF4248]"
                  />
                </div>

                {/* ZONE DES BLOCS GUTENBERG */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-zinc-300">
                      Blocs de Contenu Modulaires ({editorBlocks.length})
                    </h3>
                    <span className="text-[11px] text-zinc-400">Glisser, réorganiser ou modifier</span>
                  </div>

                  {editorBlocks.map((block, idx) => (
                    <div
                      key={block.id}
                      className="group p-5 rounded-2xl bg-[#0E2137] border border-[#28445E] hover:border-[#EF4248]/50 transition-all relative"
                    >
                      {/* En-tête du bloc & Outils de réorganisation */}
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#28445E]/60 text-xs">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold uppercase text-zinc-300">
                          {block.type}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveBlock(idx, 'up')}
                            disabled={idx === 0}
                            title="Monter"
                            className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-20"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            onClick={() => moveBlock(idx, 'down')}
                            disabled={idx === editorBlocks.length - 1}
                            title="Descendre"
                            className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-20"
                          >
                            ▼
                          </button>
                          <button
                            type="button"
                            onClick={() => removeBlock(idx)}
                            title="Supprimer ce bloc"
                            className="p-1 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Rendu du formulaire spécifique au type de bloc */}
                      {block.type === 'paragraph' && (
                        <textarea
                          rows={3}
                          value={block.text || ''}
                          onChange={(e) => {
                            const copy = [...editorBlocks];
                            copy[idx].text = e.target.value;
                            setEditorBlocks(copy);
                          }}
                          placeholder="Saisissez votre texte de paragraphe..."
                          className="w-full bg-[#122B45] p-3 rounded-xl border border-[#28445E] text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#EF4248]"
                        />
                      )}

                      {block.type === 'heading' && (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            {(['h2', 'h3', 'h4'] as const).map((lvl) => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => {
                                  const copy = [...editorBlocks];
                                  copy[idx].level = lvl;
                                  setEditorBlocks(copy);
                                }}
                                className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                                  block.level === lvl
                                    ? 'bg-[#EF4248] text-white'
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                }`}
                              >
                                {lvl}
                              </button>
                            ))}
                          </div>
                          <input
                            type="text"
                            value={block.text || ''}
                            onChange={(e) => {
                              const copy = [...editorBlocks];
                              copy[idx].text = e.target.value;
                              setEditorBlocks(copy);
                            }}
                            placeholder="Titre de sous-section..."
                            className="w-full bg-[#122B45] p-3 rounded-xl border border-[#28445E] text-base font-heading font-bold text-white focus:outline-none focus:border-[#EF4248]"
                          />
                        </div>
                      )}

                      {block.type === 'quote' && (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            value={block.text || ''}
                            onChange={(e) => {
                              const copy = [...editorBlocks];
                              copy[idx].text = e.target.value;
                              setEditorBlocks(copy);
                            }}
                            placeholder="Citation ou phrase en exergue..."
                            className="w-full bg-[#122B45] p-3 rounded-xl border border-[#28445E] text-sm italic text-amber-200 focus:outline-none focus:border-[#EF4248]"
                          />
                        </div>
                      )}

                      {block.type === 'image' && (
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={block.url || ''}
                              onChange={(e) => {
                                const copy = [...editorBlocks];
                                copy[idx].url = e.target.value;
                                setEditorBlocks(copy);
                              }}
                              placeholder="URL de l'image (https://...)"
                              className="flex-1 bg-[#122B45] px-3 py-2 rounded-xl border border-[#28445E] text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (store.media.length > 0) {
                                  const copy = [...editorBlocks];
                                  copy[idx].url = store.media[0].url;
                                  setEditorBlocks(copy);
                                  notify('Image insérée depuis la médiathèque !');
                                }
                              }}
                              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-zinc-200"
                            >
                              Médiathèque
                            </button>
                          </div>
                          <input
                            type="text"
                            value={block.caption || ''}
                            onChange={(e) => {
                              const copy = [...editorBlocks];
                              copy[idx].caption = e.target.value;
                              setEditorBlocks(copy);
                            }}
                            placeholder="Légende de l'image..."
                            className="w-full bg-[#122B45] px-3 py-1.5 rounded-xl border border-[#28445E] text-xs text-zinc-400"
                          />
                          {block.url && (
                            <img
                              src={block.url}
                              alt=""
                              className="w-full h-40 object-cover rounded-xl mt-2"
                            />
                          )}
                        </div>
                      )}

                      {block.type === 'video' && (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={block.url || ''}
                            onChange={(e) => {
                              const copy = [...editorBlocks];
                              copy[idx].url = e.target.value;
                              setEditorBlocks(copy);
                            }}
                            placeholder="URL Vidéo (MP4 ou YouTube)..."
                            className="w-full bg-[#122B45] px-3 py-2 rounded-xl border border-[#28445E] text-xs text-white"
                          />
                          <input
                            type="text"
                            value={block.caption || ''}
                            onChange={(e) => {
                              const copy = [...editorBlocks];
                              copy[idx].caption = e.target.value;
                              setEditorBlocks(copy);
                            }}
                            placeholder="Légende de la vidéo..."
                            className="w-full bg-[#122B45] px-3 py-1.5 rounded-xl border border-[#28445E] text-xs text-zinc-400"
                          />
                        </div>
                      )}

                      {block.type === 'button' && (
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={block.buttonText || ''}
                            onChange={(e) => {
                              const copy = [...editorBlocks];
                              copy[idx].buttonText = e.target.value;
                              setEditorBlocks(copy);
                            }}
                            placeholder="Libellé du bouton"
                            className="bg-[#122B45] px-3 py-2 rounded-xl border border-[#28445E] text-xs text-white"
                          />
                          <input
                            type="text"
                            value={block.buttonUrl || ''}
                            onChange={(e) => {
                              const copy = [...editorBlocks];
                              copy[idx].buttonUrl = e.target.value;
                              setEditorBlocks(copy);
                            }}
                            placeholder="Lien de redirection (https://...)"
                            className="bg-[#122B45] px-3 py-2 rounded-xl border border-[#28445E] text-xs text-white"
                          />
                        </div>
                      )}

                      {block.type === 'alert' && (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            value={block.text || ''}
                            onChange={(e) => {
                              const copy = [...editorBlocks];
                              copy[idx].text = e.target.value;
                              setEditorBlocks(copy);
                            }}
                            placeholder="Message de l'encadré d'information..."
                            className="w-full bg-[#122B45] p-3 rounded-xl border border-[#28445E] text-xs text-cyan-300"
                          />
                        </div>
                      )}

                      {block.type === 'affiliate' && (
                        <div className="space-y-3 bg-[#122B45]/60 p-4 rounded-xl border border-[#28445E]">
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={block.productName || ''}
                              onChange={(e) => {
                                const copy = [...editorBlocks];
                                copy[idx].productName = e.target.value;
                                setEditorBlocks(copy);
                              }}
                              placeholder="Nom du Produit"
                              className="col-span-2 bg-[#122B45] px-3 py-2 rounded-xl border border-[#28445E] text-xs text-white"
                            />
                            <input
                              type="text"
                              value={block.price || ''}
                              onChange={(e) => {
                                const copy = [...editorBlocks];
                                copy[idx].price = e.target.value;
                                setEditorBlocks(copy);
                              }}
                              placeholder="Prix (ex: 299 €)"
                              className="bg-[#122B45] px-3 py-2 rounded-xl border border-[#28445E] text-xs text-white"
                            />
                          </div>
                          <input
                            type="text"
                            value={block.affiliateUrl || ''}
                            onChange={(e) => {
                              const copy = [...editorBlocks];
                              copy[idx].affiliateUrl = e.target.value;
                              setEditorBlocks(copy);
                            }}
                            placeholder="Lien Partenaire (rel=sponsored)"
                            className="w-full bg-[#122B45] px-3 py-2 rounded-xl border border-[#28445E] text-xs text-white"
                          />
                          <p className="text-[10px] text-zinc-400">
                            Mention légale automatique incluse : « Lien affilié — la rédaction peut percevoir une commission ».
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Palette d'Ajout Rapide de Blocs */}
                  <div className="p-4 rounded-2xl bg-[#0E2137] border border-dashed border-[#28445E] flex flex-wrap items-center justify-center gap-2">
                    <span className="text-xs font-bold text-zinc-400 mr-2">Insérer un Bloc :</span>
                    <button
                      type="button"
                      onClick={() => addBlock('paragraph')}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#EF4248] text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                    >
                      + Paragraphe
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('heading')}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#EF4248] text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                    >
                      + Titre (H2/H3)
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('image')}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#EF4248] text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                    >
                      + Image
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('quote')}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#EF4248] text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                    >
                      + Citation
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('video')}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#EF4248] text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                    >
                      + Vidéo
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('button')}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#EF4248] text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                    >
                      + Bouton CTA
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('affiliate')}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#EF4248] text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                    >
                      + Produit Affilié
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('alert')}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#EF4248] text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                    >
                      + Encadré Note
                    </button>
                  </div>
                </div>
              </div>

              {/* Colonne Latérale : Paramètres de Publication, Image & SEO */}
              <div className="space-y-6">
                {/* Statut & Publication */}
                <div className="p-6 rounded-3xl bg-[#0E2137] border border-[#28445E] space-y-4">
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white">
                    Paramètres de Publication
                  </h3>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Statut de l'article</label>
                    <select
                      value={editorStatus}
                      onChange={(e) => setEditorStatus(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                    >
                      <option value="published">Publié (En ligne)</option>
                      <option value="draft">Brouillon (Non visible)</option>
                      <option value="scheduled">Programmé</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Rubrique / Catégorie</label>
                    <select
                      value={editorCategorySlug}
                      onChange={(e) => setEditorCategorySlug(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                    >
                      {store.categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Auteur Éditorial</label>
                    <select
                      value={editorAuthorSlug}
                      onChange={(e) => setEditorAuthorSlug(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                    >
                      {store.authors.map((a) => (
                        <option key={a.id} value={a.slug}>
                          {a.name} ({a.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Temps de lecture (minutes)</label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={editorReadingTime}
                      onChange={(e) => setEditorReadingTime(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Tags (séparés par des virgules)</label>
                    <input
                      type="text"
                      value={editorTags}
                      onChange={(e) => setEditorTags(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white font-mono"
                    />
                  </div>
                </div>

                {/* Image Principale (Couverture) */}
                <div className="p-6 rounded-3xl bg-[#0E2137] border border-[#28445E] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white">
                      Image Principale
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowMediaPickerForCover(!showMediaPickerForCover)}
                      className="text-xs text-[#EF4248] hover:underline font-semibold"
                    >
                      {showMediaPickerForCover ? 'Masquer' : 'Médiathèque'}
                    </button>
                  </div>

                  <input
                    type="text"
                    value={editorCoverImage}
                    onChange={(e) => setEditorCoverImage(e.target.value)}
                    placeholder="URL de l'image de couverture"
                    className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                  />

                  {editorCoverImage && (
                    <img
                      src={editorCoverImage}
                      alt="Aperçu couverture"
                      className="w-full aspect-[16/10] object-cover rounded-2xl border border-[#28445E]"
                    />
                  )}

                  {/* Tiroir de sélection depuis la Médiathèque */}
                  {showMediaPickerForCover && (
                    <div className="p-3 rounded-2xl bg-[#122B45] border border-[#28445E] space-y-2">
                      <p className="text-[11px] font-bold text-zinc-300">Choisir dans la Médiathèque :</p>
                      <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto no-scrollbar">
                        {store.media
                          .filter((m) => m.type === 'image')
                          .map((m) => (
                            <img
                              key={m.id}
                              src={m.url}
                              alt={m.title}
                              onClick={() => {
                                setEditorCoverImage(m.url);
                                setShowMediaPickerForCover(false);
                                notify('Image de couverture mise à jour !');
                              }}
                              className="w-full h-14 object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-[#EF4248]"
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section Référencement SEO Spécifique */}
                <div className="p-6 rounded-3xl bg-[#0E2137] border border-[#28445E] space-y-4">
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-white">
                    Optimisation SEO de l'Article
                  </h3>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Titre SEO (Google SERP)</label>
                    <input
                      type="text"
                      value={editorSeoTitle}
                      onChange={(e) => setEditorSeoTitle(e.target.value)}
                      placeholder={editorTitle || 'Titre optimisé...'}
                      className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Méta Description</label>
                    <textarea
                      rows={2}
                      value={editorSeoDesc}
                      onChange={(e) => setEditorSeoDesc(e.target.value)}
                      placeholder="Description pour les moteurs de recherche..."
                      className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Mot-clé Principal</label>
                    <input
                      type="text"
                      value={editorSeoKeyword}
                      onChange={(e) => setEditorSeoKeyword(e.target.value)}
                      placeholder="ex: Intelligence Artificielle"
                      className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB : PERSONNALISATION DU SITE (SECTION 9 DU BRIEF)
        ======================================================================== */}
        {activeTab === 'customization' && customizationForm && (
          <form onSubmit={handleSaveCustomization} className="space-y-8 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                  Personnalisation Complète du Site
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Modifiez directement le Header, le Hero, l'activation des sections et le Footer. Changements immédiats !
                </p>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-lg shadow-red-500/20 transition-all cursor-pointer"
              >
                ✓ Enregistrer et Appliquer au Site Public
              </button>
            </div>

            {/* 1. Header du Site */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E2137] border border-[#28445E] space-y-4">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <span>1. En-tête (Header Flottant)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Nom du Média / Logo</label>
                  <input
                    type="text"
                    value={customizationForm.header.logoText}
                    onChange={(e) =>
                      setCustomizationForm({
                        ...customizationForm,
                        header: { ...customizationForm.header, logoText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Badge Lettre du Logo</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={customizationForm.header.logoBadge}
                    onChange={(e) =>
                      setCustomizationForm({
                        ...customizationForm,
                        header: { ...customizationForm.header, logoBadge: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white font-mono uppercase"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="showSubBtn"
                  checked={customizationForm.header.showSubscribeBtn}
                  onChange={(e) =>
                    setCustomizationForm({
                      ...customizationForm,
                      header: { ...customizationForm.header, showSubscribeBtn: e.target.checked },
                    })
                  }
                  className="rounded accent-[#EF4248]"
                />
                <label htmlFor="showSubBtn" className="text-xs text-zinc-300">
                  Afficher le bouton d'abonnement pillule dans le Header
                </label>
              </div>
            </div>

            {/* 2. Hero Immersif Pleine Largeur */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E2137] border border-[#28445E] space-y-4">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <span>2. Hero Banner (Section Immersive d'Accueil)</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Grand Titre du Hero</label>
                  <input
                    type="text"
                    value={customizationForm.hero.mainTitle}
                    onChange={(e) =>
                      setCustomizationForm({
                        ...customizationForm,
                        hero: { ...customizationForm.hero, mainTitle: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-sm font-heading font-bold text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Sous-titre / Extrait du Hero</label>
                  <textarea
                    rows={3}
                    value={customizationForm.hero.subtitle}
                    onChange={(e) =>
                      setCustomizationForm({
                        ...customizationForm,
                        hero: { ...customizationForm.hero, subtitle: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Badge de Catégorie</label>
                    <input
                      type="text"
                      value={customizationForm.hero.categoryBadge}
                      onChange={(e) =>
                        setCustomizationForm({
                          ...customizationForm,
                          hero: { ...customizationForm.hero, categoryBadge: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Temps de Lecture (min)</label>
                    <input
                      type="number"
                      value={customizationForm.hero.readingTime}
                      onChange={(e) =>
                        setCustomizationForm({
                          ...customizationForm,
                          hero: { ...customizationForm.hero, readingTime: Number(e.target.value) },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Image Grand Angle (URL HD)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customizationForm.hero.coverImage}
                      onChange={(e) =>
                        setCustomizationForm({
                          ...customizationForm,
                          hero: { ...customizationForm.hero, coverImage: e.target.value },
                        })
                      }
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (store.media.length > 0) {
                          setCustomizationForm({
                            ...customizationForm,
                            hero: { ...customizationForm.hero, coverImage: store.media[0].url },
                          });
                          notify('Image Hero sélectionnée depuis la médiathèque !');
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-medium"
                    >
                      Médiathèque
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Activation / Désactivation des Sections de la Page d'Accueil */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E2137] border border-[#28445E] space-y-4">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <span>3. Visibilité des Sections Accueil (Activer / Désactiver)</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Cochez ou décochez les zones que vous souhaitez afficher sur la page d'accueil publique.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {[
                  { key: 'showTicker', label: 'Bandeau Ticker Bar (Dernières Minutes)' },
                  { key: 'showCategories', label: '6 Cartes Pastels des Rubriques' },
                  { key: 'showFreshArticles', label: 'Fresh off the Press (Grille 3x2)' },
                  { key: 'showRecentArticles', label: 'Articles Récents & Pagination' },
                  { key: 'showPopularTags', label: 'Tags Populaires dans la Sidebar' },
                  { key: 'showSponsorAd', label: 'Encart Publicitaire Sponsorisé' },
                  { key: 'showNewsletter', label: 'Bannière Newsletter Hebdomadaire' },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="p-4 rounded-2xl bg-[#122B45] border border-[#28445E] flex items-center gap-3 cursor-pointer hover:border-[#EF4248]/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={(customizationForm.sections as any)[item.key]}
                      onChange={(e) =>
                        setCustomizationForm({
                          ...customizationForm,
                          sections: { ...customizationForm.sections, [item.key]: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded accent-[#EF4248]"
                    />
                    <span className="text-xs font-semibold text-white">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Pied de Page (Footer) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E2137] border border-[#28445E] space-y-4">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <span>4. Pied de Page (Footer) & Coordonnées</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Adresse Officielle</label>
                  <input
                    type="text"
                    value={customizationForm.footer.address}
                    onChange={(e) =>
                      setCustomizationForm({
                        ...customizationForm,
                        footer: { ...customizationForm.footer, address: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Email Rédactionnel</label>
                  <input
                    type="email"
                    value={customizationForm.footer.email}
                    onChange={(e) =>
                      setCustomizationForm({
                        ...customizationForm,
                        footer: { ...customizationForm.footer, email: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Téléphone</label>
                  <input
                    type="text"
                    value={customizationForm.footer.phone}
                    onChange={(e) =>
                      setCustomizationForm({
                        ...customizationForm,
                        footer: { ...customizationForm.footer, phone: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Manifeste Court du Footer</label>
                <textarea
                  rows={2}
                  value={customizationForm.footer.bio}
                  onChange={(e) =>
                    setCustomizationForm({
                      ...customizationForm,
                      footer: { ...customizationForm.footer, bio: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-sm font-bold shadow-lg shadow-red-500/25 transition-all cursor-pointer"
              >
                ✓ Enregistrer la Personnalisation
              </button>
            </div>
          </form>
        )}

        {/* =======================================================================
            TAB : MÉDIATHÈQUE NUMÉRIQUE
        ======================================================================== */}
        {activeTab === 'media' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                  Médiathèque Numérique
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Gérez vos images, visuels 4K et documents téléchargeables pour vos articles.
                </p>
              </div>
              <button
                onClick={() => setIsMediaUploadModal(true)}
                className="px-5 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-lg shadow-red-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>+</span>
                <span>Ajouter un Média</span>
              </button>
            </div>

            {/* Grille des Médias */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {store.media.map((med) => (
                <div
                  key={med.id}
                  className="group rounded-2xl bg-[#0E2137] border border-[#28445E] overflow-hidden flex flex-col hover:border-[#EF4248]/50 transition-all"
                >
                  <div className="relative aspect-video w-full bg-black/40 overflow-hidden">
                    {med.type === 'image' ? (
                      <img
                        src={med.url}
                        alt={med.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 p-4">
                        <span className="text-3xl mb-1">
                          {med.type === 'video' ? '🎬' : med.type === 'audio' ? '🎙️' : '📄'}
                        </span>
                        <span className="text-[10px] uppercase font-bold">{med.type}</span>
                      </div>
                    )}
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-white uppercase">
                      {med.fileSize}
                    </span>
                  </div>

                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="font-heading font-bold text-xs text-white truncate">{med.title}</h4>
                      <p className="text-[10px] text-zinc-400 truncate mt-0.5">{med.fileName}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#28445E]/60 text-[11px]">
                      <button
                        onClick={() => handleCopyMediaUrl(med.url)}
                        className="text-zinc-300 hover:text-[#EF4248] font-semibold transition-colors"
                      >
                        Copier Lien
                      </button>
                      <button
                        onClick={() => handleDeleteMedia(med.id)}
                        className="text-red-400 hover:text-red-300 font-semibold"
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

        {/* =======================================================================
            TAB : CATÉGORIES / RUBRIQUES
        ======================================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                  Catégories & Rubriques Éditoriales
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Configurez les rubriques pastels affichées sur l'accueil et dans les menus.
                </p>
              </div>
              <button
                onClick={() => setIsNewCategoryModal(true)}
                className="px-5 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-lg shadow-red-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>+</span>
                <span>Nouvelle Catégorie</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {store.categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-5 rounded-2xl border flex flex-col justify-between"
                  style={{ backgroundColor: cat.badgeBg, borderColor: '#28445E' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs font-bold uppercase tracking-wider font-heading"
                        style={{ color: cat.badgeText }}
                      >
                        {cat.name}
                      </span>
                      <span className="text-[10px] opacity-75 font-mono" style={{ color: cat.badgeText }}>
                        /{cat.slug}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 line-clamp-2 mb-4 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-black/10 text-xs">
                    <span className="font-bold text-zinc-700">
                      {store.articles.filter((a) => a.category.slug === cat.slug).length} articles
                    </span>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-red-600 hover:text-red-700 font-bold"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB : UTILISATEURS & GESTION DES RÔLES
        ======================================================================== */}
        {activeTab === 'users' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                  Gestion des Comptes & Rôles
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Séparez strictement les rôles : Administrateurs, Éditeurs et Lecteurs du média.
                </p>
              </div>
              <button
                onClick={() => setIsNewUserModal(true)}
                className="px-5 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-lg shadow-red-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>+</span>
                <span>Nouvel Utilisateur</span>
              </button>
            </div>

            <div className="rounded-3xl bg-[#0E2137] border border-[#28445E] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#122B45]/70 border-b border-[#28445E] text-zinc-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Utilisateur</th>
                    <th className="py-4 pr-4">Email</th>
                    <th className="py-4 pr-4">Rôle Attribué</th>
                    <th className="py-4 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#28445E]/50">
                  {store.users.map((usr) => (
                    <tr key={usr.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-white flex items-center gap-3">
                        <img
                          src={usr.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
                        />
                        <span>{usr.name}</span>
                      </td>
                      <td className="py-4 pr-4 text-zinc-300 font-mono text-[11px]">{usr.email}</td>
                      <td className="py-4 pr-4">
                        <select
                          value={usr.role}
                          onChange={(e) => handleChangeUserRole(usr.id, e.target.value as any)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                            usr.role === 'administrator'
                              ? 'bg-red-500/20 text-red-300 border-red-500/30'
                              : usr.role === 'editor'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          }`}
                        >
                          <option value="administrator">Administrateur</option>
                          <option value="editor">Éditeur</option>
                          <option value="reader">Lecteur</option>
                        </select>
                      </td>
                      <td className="py-4 pr-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(usr.id)}
                          className="text-red-400 hover:text-red-300 font-semibold text-xs"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB : NEWSLETTER
        ======================================================================== */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                  Abonnés à la Newsletter
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Gestion des abonnements hebdomadaires conformes RGPD et exportation CSV.
                </p>
              </div>
              <button
                onClick={handleExportNewsletterCSV}
                className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>📥</span>
                <span>Exporter en CSV</span>
              </button>
            </div>

            <div className="rounded-3xl bg-[#0E2137] border border-[#28445E] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#122B45]/70 border-b border-[#28445E] text-zinc-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Adresse Email</th>
                    <th className="py-4 pr-4">Date d'Inscription</th>
                    <th className="py-4 pr-4">Statut</th>
                    <th className="py-4 pr-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#28445E]/50">
                  {store.subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono font-medium text-white">{sub.email}</td>
                      <td className="py-4 pr-4 text-zinc-400">{sub.subscribedAt}</td>
                      <td className="py-4 pr-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase">
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-right">
                        <button
                          onClick={() => handleDeleteSubscriber(sub.id)}
                          className="text-red-400 hover:text-red-300 text-xs font-semibold"
                        >
                          Désinscrire
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB : SEO & SITEMAP
        ======================================================================== */}
        {activeTab === 'seo' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                Référencement Naturel & Balises SEO
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Optimisation globale du site, OpenGraph, flux RSS et sitemap XML.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E2137] border border-[#28445E] space-y-4">
              <h3 className="font-heading font-bold text-base text-white">Aperçu SERP Google</h3>
              <div className="p-4 rounded-2xl bg-[#071426] border border-[#28445E] space-y-1">
                <div className="text-xs text-emerald-400 font-mono">https://ontariowp.com</div>
                <div className="font-heading text-lg font-bold text-[#8AB4F8]">
                  {customizationForm?.seo.siteName}
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {customizationForm?.seo.siteDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#28445E]">
                <div className="p-4 rounded-2xl bg-[#122B45] border border-[#28445E] flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-white">Sitemap XML Automatique</h4>
                    <span className="text-[10px] text-zinc-400">/sitemap.xml (100% indexable)</span>
                  </div>
                  <Link
                    href="/sitemap.xml"
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white"
                  >
                    Voir →
                  </Link>
                </div>
                <div className="p-4 rounded-2xl bg-[#122B45] border border-[#28445E] flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-white">Flux RSS Éditorial</h4>
                    <span className="text-[10px] text-zinc-400">/feed.xml (Agrégateurs & Lecteurs)</span>
                  </div>
                  <Link
                    href="/feed.xml"
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white"
                  >
                    Voir →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================================
            TAB : PROFIL ADMINISTRATEUR & CHANGEMENT DE MOT DE PASSE
        ======================================================================== */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                Profil Administrateur & Sécurité
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Gérez vos informations de compte et modifiez votre mot de passe d'accès au CMS.
              </p>
            </div>

            {/* Informations de Profil */}
            <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-3xl bg-[#0E2137] border border-[#28445E] space-y-4">
              <h3 className="font-heading font-bold text-base text-white">Informations Personnelles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Nom Complet</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Adresse Email</label>
                  <input
                    type="email"
                    required
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">URL de l'Avatar</label>
                <input
                  type="text"
                  value={profileAvatar}
                  onChange={(e) => setProfileAvatar(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                />
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all"
                >
                  Enregistrer les Modifications
                </button>
              </div>
            </form>

            {/* Changement de Mot de Passe Sécurisé */}
            <form onSubmit={handleChangePassword} className="p-6 sm:p-8 rounded-3xl bg-[#0E2137] border border-[#28445E] space-y-4">
              <h3 className="font-heading font-bold text-base text-white">Changer mon Mot de Passe</h3>
              {passwordError && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs">
                  {passwordError}
                </div>
              )}
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Mot de passe actuel</label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Nouveau mot de passe (min. 8 car.)</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                >
                  Mettre à Jour le Mot de Passe
                </button>
              </div>
            </form>

            {/* Zone de Danger & Réinitialisation Usine */}
            <div className="p-6 rounded-3xl bg-red-950/20 border border-red-500/30 space-y-3">
              <h4 className="font-heading font-bold text-sm text-red-400">Zone de Réinitialisation</h4>
              <p className="text-xs text-zinc-400">
                En cas de besoin, vous pouvez restaurer l'intégralité du CMS aux réglages d'origine du thème Ontario.
              </p>
              <button
                type="button"
                onClick={handleFactoryReset}
                className="px-4 py-2 rounded-xl bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold transition-all"
              >
                Restaurer les Réglages d'Usine
              </button>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          3. MODALE DE PRÉVISUALISATION EN DIRECT DE L'ARTICLE
      ========================================================================== */}
      {showLivePreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#071426] text-black dark:text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 border-b border-zinc-200 dark:border-[#28445E] flex items-center justify-between bg-zinc-50 dark:bg-[#0E2137]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EF4248]">
                Prévisualisation Réelle sur le Média
              </span>
              <button
                onClick={() => setShowLivePreviewModal(false)}
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              <img
                src={editorCoverImage}
                alt=""
                className="w-full aspect-[16/9] object-cover rounded-2xl shadow-lg"
              />
              <span className="px-3 py-1 rounded-full bg-[#EF4248] text-white text-xs font-bold uppercase">
                {editorCategorySlug}
              </span>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl leading-tight">
                {editorTitle || 'Titre de l’article'}
              </h1>
              <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                {editorExcerpt}
              </p>
              <div className="border-t border-zinc-200 dark:border-[#28445E] pt-6 space-y-4">
                {editorBlocks.map((b) => (
                  <div key={b.id}>
                    {b.type === 'paragraph' && (
                      <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">{b.text}</p>
                    )}
                    {b.type === 'heading' && (
                      <h2 className="font-heading font-bold text-2xl mt-4 mb-2">{b.text}</h2>
                    )}
                    {b.type === 'quote' && (
                      <blockquote className="border-l-4 border-[#EF4248] pl-4 italic my-4 text-lg">
                        {b.text}
                      </blockquote>
                    )}
                    {b.type === 'image' && b.url && (
                      <figure className="my-4">
                        <img src={b.url} alt="" className="w-full rounded-2xl" />
                        {b.caption && (
                          <figcaption className="text-xs text-center text-zinc-400 mt-1">
                            {b.caption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALE CRÉATION CATÉGORIE */}
      {isNewCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleCreateCategory}
            className="w-full max-w-md bg-[#0E2137] border border-[#28445E] rounded-3xl p-6 space-y-4"
          >
            <h3 className="font-heading font-bold text-lg text-white">Ajouter une Rubrique</h3>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Nom de la rubrique</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="ex: Spatial Computing"
                className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Slug</label>
              <input
                type="text"
                value={newCatSlug}
                onChange={(e) => setNewCatSlug(e.target.value)}
                placeholder="spatial-computing"
                className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Couleur Fond Pastel</label>
                <input
                  type="text"
                  value={newCatBg}
                  onChange={(e) => setNewCatBg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Couleur Texte</label>
                <input
                  type="text"
                  value={newCatText}
                  onChange={(e) => setNewCatText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white font-mono"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsNewCategoryModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold"
              >
                Créer la Rubrique
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODALE CRÉATION UTILISATEUR */}
      {isNewUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleCreateUser}
            className="w-full max-w-md bg-[#0E2137] border border-[#28445E] rounded-3xl p-6 space-y-4"
          >
            <h3 className="font-heading font-bold text-lg text-white">Ajouter un Compte</h3>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Nom Complet</label>
              <input
                type="text"
                required
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Jean Martin"
                className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Adresse Email</label>
              <input
                type="email"
                required
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="jean@ontariowp.com"
                className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Rôle</label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
              >
                <option value="administrator">Administrateur (Accès Total)</option>
                <option value="editor">Éditeur (Articles & Médias)</option>
                <option value="reader">Lecteur (Simple consultation)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsNewUserModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold"
              >
                Créer le Compte
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODALE UPLOAD MÉDIA */}
      {isMediaUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleAddMedia}
            className="w-full max-w-md bg-[#0E2137] border border-[#28445E] rounded-3xl p-6 space-y-4"
          >
            <h3 className="font-heading font-bold text-lg text-white">Ajouter un Média</h3>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Titre du média</label>
              <input
                type="text"
                required
                value={newMediaTitle}
                onChange={(e) => setNewMediaTitle(e.target.value)}
                placeholder="Visuel de couverture HD"
                className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Type de Média</label>
              <select
                value={newMediaType}
                onChange={(e) => setNewMediaType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
              >
                <option value="image">Image HD (JPG/PNG/WebP)</option>
                <option value="video">Vidéo (MP4 4K / WebM)</option>
                <option value="audio">Audio / Podcast</option>
                <option value="document">Document PDF</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">URL Directe du Fichier</label>
              <input
                type="text"
                required
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 rounded-xl bg-[#122B45] border border-[#28445E] text-xs text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsMediaUploadModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold"
              >
                Ajouter à la Bibliothèque
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
