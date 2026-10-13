import { ARTICLES } from '@/data/articles';
import { SITE_CONFIG } from '@/lib/seo';

export async function GET() {
  const baseUrl = SITE_CONFIG.url;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name}</title>
    <link>${baseUrl}</link>
    <description>${SITE_CONFIG.description}</description>
    <language>fr-fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${ARTICLES.map(
      (art) => `
    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>${baseUrl}/article/${art.slug}</link>
      <guid>${baseUrl}/article/${art.slug}</guid>
      <pubDate>${new Date(art.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${art.excerpt}]]></description>
      <author>${art.author.name}</author>
      <category>${art.category.name}</category>
    </item>`
    ).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
