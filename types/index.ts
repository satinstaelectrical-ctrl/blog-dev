export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  website?: string;
  facebook?: string;
  youtube?: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  avatar: string;
  bio: string;
  socials: SocialLinks;
  articleCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  icon?: string;
  count?: number;
  image?: string;
  isDark?: boolean;
}

export interface ProductReview {
  productName: string;
  score: number; // e.g. 9.4
  pros: string[];
  cons: string[];
  verdict: string;
  affiliateUrl?: string;
  affiliateLabel?: string;
  price?: string;
}

export interface ArticleSeo {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export type ArticleFormat = 'standard' | 'video' | 'podcast' | 'gallery' | 'review';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Rich markdown / HTML formatted content
  coverImage: string;
  coverCaption?: string;
  category: Category;
  author: Author;
  tags: string[];
  readingTime: number; // in minutes
  publishedAt: string;
  updatedAt?: string;
  status?: 'draft' | 'scheduled' | 'published' | 'trash';
  isFeatured?: boolean;
  isHero?: boolean;
  isExclusive?: boolean;
  isEditorChoice?: boolean;
  isTrending?: boolean;
  contentBlocks?: any[];
  format: ArticleFormat;
  galleryImages?: string[];
  videoUrl?: string;
  podcastUrl?: string;
  review?: ProductReview;
  seo: ArticleSeo;
  views: number;
  likes: number;
  commentsCount: number;
}

export interface Comment {
  id: string;
  articleId: string;
  articleTitle?: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  status: 'approved' | 'pending' | 'spam';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status?: 'confirmed' | 'pending' | 'unsubscribed';
  subscribedAt: string;
}

// 1. SYSTÈME PUBLICITAIRE / ANNONCES INTERNES
export type AdType = 'banner' | 'sponsor' | 'popup' | 'card' | 'featured_ad';
export type AdPosition = 'header' | 'sidebar' | 'between_sections' | 'in_article' | 'footer' | 'popup_modal';

export interface Advertisement {
  id: string;
  title: string;
  type: AdType;
  position: AdPosition;
  imageUrl: string;
  description?: string;
  targetUrl: string;
  sponsorName: string;
  sponsorLogo?: string;
  badgeLabel?: string; // ex: "SPONSORISÉ", "PARTENAIRE OFFICIEL"
  callToAction?: string; // ex: "En savoir plus", "Découvrir l'offre"
  startDate: string;
  endDate?: string;
  isActive: boolean;
  viewsCount: number;
  clicksCount: number;
  priority?: number; // 1 à 10 pour l'ordonnancement
}

// 2. MÉDIATHÈQUE COMPLÈTE TYPE WORDPRESS
export type MediaType = 'image' | 'video' | 'audio' | 'document';

export interface MediaItem {
  id: string;
  title: string;
  fileName: string;
  fileSize: string; // ex: "1.4 MB"
  mimeType: string; // ex: "image/jpeg", "video/mp4", "audio/mp3", "application/pdf"
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: string;
  dimensions?: string; // ex: "1920x1080"
  duration?: string; // ex: "04:30" pour vidéo/audio
  altText?: string;
  caption?: string;
}

// 3. TAGS ÉDITORIAUX
export interface TagItem {
  id: string;
  name: string;
  slug: string;
  count: number;
}

// 4. PAGES INSTITUTIONNELLES
export interface SitePage {
  id: string;
  title: string;
  slug: string;
  content: string;
  updatedAt: string;
  isPublished: boolean;
  metaDescription?: string;
}

// 5. GESTION DES UTILISATEURS & RÔLES
export type UserRole = 'administrator' | 'editor' | 'author' | 'reader';

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
  articlesCount?: number;
}

// 6. PARAMÈTRES GLOBAUX DU SITE
export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  siteUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  metaTitle: string;
  metaDescription: string;
  adsEnabled: boolean;
  allowComments: boolean;
  socials: SocialLinks;
}
