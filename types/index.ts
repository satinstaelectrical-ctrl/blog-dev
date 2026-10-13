export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  website?: string;
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
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}
