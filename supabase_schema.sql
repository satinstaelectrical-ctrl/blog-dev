-- ==============================================================================
-- SCHEMA COMPLET DE LA BASE DE DONNÉES ONTARIO POUR SUPABASE
-- Plateforme Média Éditoriale & Système CMS Professionnel WordPress-like
-- ==============================================================================

-- 1. Table des Catégories / Rubriques
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  bg_light TEXT,
  text_light TEXT,
  bg_dark TEXT,
  text_dark TEXT,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table des Auteurs Éditoriaux
CREATE TABLE IF NOT EXISTS public.authors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  role TEXT,
  avatar TEXT,
  bio TEXT,
  social JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table des Articles & Contenus Éditoriaux
CREATE TABLE IF NOT EXISTS public.articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  french_title TEXT,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  content_blocks JSONB DEFAULT '[]'::jsonb,
  cover_image TEXT,
  category_slug TEXT REFERENCES public.categories(slug) ON DELETE SET NULL,
  category_badge TEXT,
  author_slug TEXT REFERENCES public.authors(slug) ON DELETE SET NULL,
  reading_time INTEGER DEFAULT 5,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'scheduled', 'published', 'trash')),
  is_hero BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_exclusive BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  seo JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table des Commentaires & Modération
CREATE TABLE IF NOT EXISTS public.comments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  article_slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'spam', 'trash')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table des Abonnés Newsletter
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Table des Produits Affiliés Amazon & Partenaires
CREATE TABLE IF NOT EXISTS public.affiliate_products (
  id TEXT PRIMARY KEY,
  product_name TEXT NOT NULL,
  brand TEXT,
  description TEXT,
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  image_url TEXT,
  merchant_name TEXT DEFAULT 'Amazon',
  affiliate_url TEXT NOT NULL,
  button_text TEXT DEFAULT 'Voir sur Amazon',
  disclaimer TEXT DEFAULT 'Lien affilié — nous pouvons percevoir une commission.',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Table des Publicités & Campagnes Partenaires (Régie Interne)
CREATE TABLE IF NOT EXISTS public.advertisements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  placement TEXT NOT NULL CHECK (placement IN ('sidebar', 'in_feed', 'leaderboard', 'popup')),
  image_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  sponsor_name TEXT NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Table de la Médiathèque Numérique (Media Library)
CREATE TABLE IF NOT EXISTS public.media (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video', 'audio', 'document')),
  size TEXT NOT NULL,
  dimensions TEXT,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Table des Tags & Mots-clés Éditoriaux
CREATE TABLE IF NOT EXISTS public.tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Table des Pages Institutionnelles (Pages Statiques)
CREATE TABLE IF NOT EXISTS public.site_pages (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Table des Paramètres du Site & Charte Ontario
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Table des Utilisateurs & Rôles
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('administrator', 'editor', 'author', 'subscriber')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEX DE PERFORMANCE POUR RECHERCHE RAPIDE & REQUÊTES ÉDITORIALES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_articles_status_published_at ON public.articles(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category_slug);
CREATE INDEX IF NOT EXISTS idx_comments_article_status ON public.comments(article_slug, status);
CREATE INDEX IF NOT EXISTS idx_advertisements_placement_active ON public.advertisements(placement, is_active);

-- ==============================================================================
-- POLITIQUES DE SÉCURITÉ RLS (ROW LEVEL SECURITY)
-- ==============================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Politiques de consultation publique (Lecteurs)
CREATE POLICY "Lecture publique des catégories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Lecture publique des auteurs" ON public.authors FOR SELECT USING (true);
CREATE POLICY "Lecture publique des articles publiés" ON public.articles FOR SELECT USING (status = 'published');
CREATE POLICY "Lecture publique des commentaires approuvés" ON public.comments FOR SELECT USING (status = 'approved');
CREATE POLICY "Lecture publique des produits affiliés actifs" ON public.affiliate_products FOR SELECT USING (is_active = true);
CREATE POLICY "Lecture publique des annonces actives" ON public.advertisements FOR SELECT USING (is_active = true);
CREATE POLICY "Lecture publique des médias" ON public.media FOR SELECT USING (true);
CREATE POLICY "Lecture publique des tags" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Lecture publique des pages publiées" ON public.site_pages FOR SELECT USING (is_published = true);
CREATE POLICY "Lecture publique des paramètres du site" ON public.site_settings FOR SELECT USING (true);

-- Politiques d'interactions publiques (Commentaires & Newsletter)
CREATE POLICY "Inscription publique newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Ajout public de commentaires" ON public.comments FOR INSERT WITH CHECK (true);

-- Politiques d'administration complète (Service Role & Admin)
CREATE POLICY "Service Role full access categories" ON public.categories USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access authors" ON public.authors USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access articles" ON public.articles USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access comments" ON public.comments USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access newsletter" ON public.newsletter_subscribers USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access affiliate_products" ON public.affiliate_products USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access advertisements" ON public.advertisements USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access media" ON public.media USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access tags" ON public.tags USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access site_pages" ON public.site_pages USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access site_settings" ON public.site_settings USING (true) WITH CHECK (true);
CREATE POLICY "Service Role full access users" ON public.users USING (true) WITH CHECK (true);
