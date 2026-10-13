// ==============================================================================
// ONTARIO CMS — MAGASIN CENTRALISÉ DE CONTENU & PERSISTANCE RÉACTIVE
// Synchronisation temps réel entre le Dashboard Administrateur et le Site Public
// ==============================================================================

import {
  Article,
  Category,
  Author,
  Advertisement,
  MediaItem,
  TagItem,
  Comment,
  SitePage,
  UserAccount,
} from '@/types';
import { ARTICLES as defaultArticles } from '@/data/articles';
import { CATEGORIES as defaultCategories } from '@/data/categories';
import { AUTHORS as defaultAuthors } from '@/data/authors';
import { ADVERTISEMENTS as defaultAds } from '@/data/advertisements';
import { MEDIA_LIBRARY as defaultMedia } from '@/data/media';
import { TAGS_LIST as defaultTags } from '@/data/tags';
import { COMMENTS_LIST as defaultComments } from '@/data/comments';
import { SITE_PAGES as defaultPages } from '@/data/pages';
import { USER_ACCOUNTS as defaultUsers } from '@/data/users';

export interface SiteCustomization {
  header: {
    logoText: string;
    logoBadge: string;
    showSubscribeBtn: boolean;
    subscribeBtnText: string;
  };
  hero: {
    mainTitle: string;
    subtitle: string;
    categoryBadge: string;
    coverImage: string;
    readingTime: number;
    featuredArticleSlugs: string[];
  };
  sections: {
    showTicker: boolean;
    showCategories: boolean;
    showFreshArticles: boolean;
    showRecentArticles: boolean;
    showPopularTags: boolean;
    showSponsorAd: boolean;
    showNewsletter: boolean;
  };
  footer: {
    bio: string;
    address: string;
    email: string;
    phone: string;
    copyright: string;
    socialLinks: {
      x: string;
      linkedin: string;
      instagram: string;
      youtube: string;
    };
  };
  seo: {
    siteName: string;
    siteDescription: string;
    defaultKeywords: string;
    ogImage: string;
  };
  adsense: AdSenseConfig;
}

export interface AdSenseSlotConfig {
  id: string;
  name: string;
  position: 'home' | 'article' | 'sidebar' | 'mobile';
  enabled: boolean;
  format: 'leaderboard' | 'rectangle' | 'skyscraper' | 'fluid' | 'responsive';
  adSlot: string;
  label: string;
}

export interface AdSenseConfig {
  enabled: boolean;
  publisherId: string;
  autoAdsEnabled: boolean;
  testMode: boolean;
  slots: Record<string, AdSenseSlotConfig>;
  revenueStats: {
    estimatedToday: number;
    estimatedMonth: number;
    impressionsToday: number;
    clicksToday: number;
    rpm: number;
  };
}

export interface ContentStoreState {
  articles: Article[];
  categories: Category[];
  authors: Author[];
  ads: Advertisement[];
  media: MediaItem[];
  tags: TagItem[];
  comments: Comment[];
  sitePages: SitePage[];
  users: UserAccount[];
  subscribers: { id: string; email: string; subscribedAt: string; status: 'confirmed' | 'unsubscribed' }[];
  customization: SiteCustomization;
  updatedAt: string;
}

const STORAGE_KEY = 'ontario_cms_database_v2';
const EVENT_NAME = 'ontario_content_store_updated';

export const DEFAULT_CUSTOMIZATION: SiteCustomization = {
  header: {
    logoText: 'ONTARIO',
    logoBadge: 'O',
    showSubscribeBtn: true,
    subscribeBtnText: "S'abonner",
  },
  hero: {
    mainTitle: 'Next Gen Marketing: Innovative Strategies',
    subtitle:
      'Dans un écosystème où l’attention est devenue la denrée la plus disputée, les modèles algorithmiques génératifs et les expériences immersives redéfinissent la relation entre marques et communautés.',
    categoryBadge: 'TECH / AI',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=90',
    readingTime: 6,
    featuredArticleSlugs: [
      'next-gen-marketing-innovative-strategies',
      'advanced-techniques-abstract-digital-design',
      'organic-shapes-modern-digital-architecture',
    ],
  },
  sections: {
    showTicker: true,
    showCategories: true,
    showFreshArticles: true,
    showRecentArticles: true,
    showPopularTags: true,
    showSponsorAd: true,
    showNewsletter: true,
  },
  footer: {
    bio: 'Média numérique francophone d’analyses prospectives, intelligence artificielle, design contemporain et technologies de rupture.',
    address: '27 Division St, New York, NY 10002',
    email: 'contact@ontariowp.com',
    phone: '+1 (212) 555-0199',
    copyright: '© 2026 ONTARIO Magazine. Tous droits réservés.',
    socialLinks: {
      x: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
    },
  },
  seo: {
    siteName: 'ONTARIO — Magazine Numérique d’Avant-Garde',
    siteDescription:
      'Magazine éditorial d’analyses approfondies, prospectives technologiques, intelligence artificielle et bancs d’essai indépendants.',
    defaultKeywords: 'IA, Tech, Design, Marketing, Web3, Architecture Numérique, Innovation',
    ogImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
  },
  adsense: {
    enabled: true,
    publisherId: 'ca-pub-9842187654321098',
    autoAdsEnabled: true,
    testMode: true,
    revenueStats: {
      estimatedToday: 42.80,
      estimatedMonth: 1284.50,
      impressionsToday: 28450,
      clicksToday: 736,
      rpm: 3.82,
    },
    slots: {
      home_after_hero: {
        id: 'home_after_hero',
        name: 'Accueil — Après le Hero (Bannière Leaderboard)',
        position: 'home',
        enabled: true,
        format: 'leaderboard',
        adSlot: '1092837461',
        label: 'Emplacement Leaderboard 728x90 / Fluide',
      },
      home_between_categories: {
        id: 'home_between_categories',
        name: 'Accueil — Entre Catégories & Articles',
        position: 'home',
        enabled: true,
        format: 'responsive',
        adSlot: '2093847512',
        label: 'Encart In-Feed Responsive',
      },
      home_between_articles: {
        id: 'home_between_articles',
        name: 'Accueil — Entre Articles Récents',
        position: 'home',
        enabled: false,
        format: 'responsive',
        adSlot: '3049586721',
        label: 'Grille In-Feed Éditoriale',
      },
      home_sidebar: {
        id: 'home_sidebar',
        name: 'Accueil — Sidebar Latérale',
        position: 'sidebar',
        enabled: true,
        format: 'rectangle',
        adSlot: '4059687123',
        label: 'Pavé MPU 300x250',
      },
      article_after_intro: {
        id: 'article_after_intro',
        name: 'Article — Après l’Introduction (Chapeau)',
        position: 'article',
        enabled: true,
        format: 'responsive',
        adSlot: '5069784312',
        label: 'Encart Chapeau Article',
      },
      article_in_content: {
        id: 'article_in_content',
        name: 'Article — Milieu de Contenu Éditorial',
        position: 'article',
        enabled: true,
        format: 'responsive',
        adSlot: '6078912345',
        label: 'Format In-Article Fluide',
      },
      article_before_conclusion: {
        id: 'article_before_conclusion',
        name: 'Article — Avant la Conclusion',
        position: 'article',
        enabled: false,
        format: 'responsive',
        adSlot: '7089123456',
        label: 'Encart Fin de Lecture',
      },
      article_sidebar: {
        id: 'article_sidebar',
        name: 'Article — Sidebar Sticky Déroulante',
        position: 'sidebar',
        enabled: true,
        format: 'skyscraper',
        adSlot: '8091234567',
        label: 'Grand Skyscraper / Demi-page 300x600',
      },
      article_footer: {
        id: 'article_footer',
        name: 'Article — Pied d’Article & Commentaires',
        position: 'article',
        enabled: true,
        format: 'leaderboard',
        adSlot: '9012345678',
        label: 'Bannière Leaderboard Inférieure',
      },
      mobile_sticky: {
        id: 'mobile_sticky',
        name: 'Mobile — Bannière Ancrée Bas d’Écran',
        position: 'mobile',
        enabled: true,
        format: 'responsive',
        adSlot: '9923456781',
        label: 'Format Mobile Adaptatif 320x50',
      },
    },
  },
};

export const INITIAL_STORE_STATE: ContentStoreState = {
  articles: defaultArticles,
  categories: defaultCategories,
  authors: defaultAuthors,
  ads: defaultAds,
  media: defaultMedia,
  tags: defaultTags,
  comments: defaultComments,
  sitePages: defaultPages,
  users: defaultUsers,
  subscribers: [
    { id: 'sub-1', email: 'alain.dupont@entreprise.fr', subscribedAt: '2026-03-24', status: 'confirmed' },
    { id: 'sub-2', email: 'claire.martin@studio.design', subscribedAt: '2026-03-25', status: 'confirmed' },
    { id: 'sub-3', email: 'david.leroy@techgroup.io', subscribedAt: '2026-03-26', status: 'confirmed' },
  ],
  customization: DEFAULT_CUSTOMIZATION,
  updatedAt: new Date().toISOString(),
};

/**
 * Récupère le magasin de contenu depuis le stockage local (avec initialisation par défaut)
 */
export function getContentStore(): ContentStoreState {
  if (typeof window === 'undefined') {
    return INITIAL_STORE_STATE;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STORE_STATE));
      return INITIAL_STORE_STATE;
    }
    const parsed = JSON.parse(raw) as ContentStoreState;
    // Rétrocompatibilité : s'assurer que les sections indispensables existent
    if (!parsed.customization) {
      parsed.customization = DEFAULT_CUSTOMIZATION;
    } else if (!parsed.customization.adsense) {
      parsed.customization.adsense = DEFAULT_CUSTOMIZATION.adsense;
    }
    if (!parsed.articles || parsed.articles.length === 0) parsed.articles = defaultArticles;
    if (!parsed.categories || parsed.categories.length === 0) parsed.categories = defaultCategories;
    if (!parsed.users || parsed.users.length === 0) parsed.users = defaultUsers;
    return parsed;
  } catch (err) {
    console.error('Erreur lecture ContentStore:', err);
    return INITIAL_STORE_STATE;
  }
}

/**
 * Sauvegarde le magasin et émet un événement universel pour rafraîchir tous les composants abonnés
 */
export function saveContentStore(state: ContentStoreState): void {
  if (typeof window === 'undefined') return;

  try {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: state }));
  } catch (err) {
    console.error('Erreur écriture ContentStore:', err);
  }
}

/**
 * Réinitialise complètement le magasin de contenu avec les données d'origine
 */
export function resetContentStore(): ContentStoreState {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STORE_STATE));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: INITIAL_STORE_STATE }));
  }
  return INITIAL_STORE_STATE;
}

/**
 * Permet à un composant React de s'abonner aux changements du ContentStore
 */
export function subscribeToContentStore(callback: (state: ContentStoreState) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleUpdate = (e: Event) => {
    const customEvent = e as CustomEvent<ContentStoreState>;
    callback(customEvent.detail || getContentStore());
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback(getContentStore());
    }
  };

  window.addEventListener(EVENT_NAME, handleUpdate);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(EVENT_NAME, handleUpdate);
    window.removeEventListener('storage', handleStorage);
  };
}
