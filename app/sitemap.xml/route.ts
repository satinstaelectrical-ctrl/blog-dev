import { ARTICLES } from '@/data/articles';
import { CATEGORIES } from '@/data/categories';
import { AUTHORS } from '@/data/authors';
import { SITE_CONFIG } from '@/lib/seo';

export async function GET() {
  const baseUrl = SITE_CONFIG.url;

  const staticPages = [
    '',
    '/blog',
    '/about',
    '/contact',
    '/search',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>daily</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
  ${CATEGORIES.map(
    (cat) => `
  <url>
    <loc>${baseUrl}/category/${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  ).join('')}
  ${AUTHORS.map(
    (aut) => `
  <url>
    <loc>${baseUrl}/author/${aut.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  ).join('')}
  ${ARTICLES.map(
    (art) => `
  <url>
    <loc>${baseUrl}/article/${art.slug}</loc>
    <lastmod>${art.updatedAt || art.publishedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
  ).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
