import { SITE_CONFIG } from '@/lib/seo';

export async function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin/*

Sitemap: ${SITE_CONFIG.url}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
