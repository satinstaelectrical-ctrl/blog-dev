import { Article, Author } from '@/types';

export const SITE_CONFIG = {
  name: 'ONTARIO Média',
  tagline: 'Média Numérique & Prospectives Technologiques',
  description: 'Analyses approfondies, essais critiques, guides et dossiers sur l’IA, les technologies émergentes et la culture numérique.',
  url: 'https://ontario-media.fr',
  locale: 'fr_FR',
  twitterHandle: '@ontariomedia',
  contactEmail: 'contact@ontario-media.fr',
};

export function generateArticleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: [
      {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
        url: `${SITE_CONFIG.url}/author/${article.author.slug}`,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/article/${article.slug}`,
    },
    articleSection: article.category.name,
    keywords: article.tags.join(', '),
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    sameAs: [
      'https://twitter.com',
      'https://linkedin.com',
      'https://instagram.com',
    ],
  };
}
