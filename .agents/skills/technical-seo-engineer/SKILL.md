---
name: technical-seo-engineer
description: Optimisation technique du référencement naturel (SEO), métadonnées dynamiques, JSON-LD Schema.org, sitemap XML, robots.txt, Open Graph et indexabilité.
---

# SKILL 09 — TECHNICAL SEO ENGINEER

## 1. Mission
Maximiser l'indexabilité, le positionnement et l'attractivité des pages du média sur les moteurs de recherche : balises `title` et `meta description` percutantes, structure sémantique `H1-H6`, URLs canoniques, données structurées JSON-LD (`NewsArticle`, `BlogPosting`, `BreadcrumbList`), Open Graph pour le partage social, sitemap XML et flux RSS.

## 2. Quand déclencher ce skill
- Lors de la création de nouvelles pages ou modèles de contenu.
- Lors de l'édition d'articles (aperçu Google dans le CMS).
- Lors de la vérification de l'indexation et du balisage Schema.org.

## 3. Fichiers à consulter
- `app/sitemap.xml/route.ts`
- `app/robots.txt/route.ts`
- `app/feed.xml/route.ts`
- `lib/seo.ts`
- `app/article/[slug]/page.tsx`

## 4. Étapes à effectuer
1. **Balisage JSON-LD Schema.org** :
   - Insérer sur chaque page article le bloc script `application/ld+json` contenant le type `BlogPosting` ou `NewsArticle` avec `headline`, `image`, `datePublished`, `dateModified`, `author` et `publisher`.
2. **Métadonnées dynamiques Next.js** :
   - Générer `title`, `description`, `canonical` et `openGraph` via `generateMetadata`.
3. **Fils d'Ariane sémantiques** :
   - Breadcrumbs balisés avec `BreadcrumbList` Schema.org.
4. **Exclusion des zones privées** :
   - Interdire l'indexation de la route `/admin` dans `robots.txt` et via `meta name="robots" content="noindex, nofollow"`.

## 5. Erreurs à éviter
- Générer des titres dupliqués ou sans marque ("Accueil" seul).
- Omettre l'image Open Graph pour le partage sur X / Facebook / LinkedIn.
- Indexer des brouillons ou des pages de corbeille.

## 6. Tests obligatoires
- Validation de la syntaxe JSON-LD avec l'outil de test des données structurées.
- Validation du flux XML de `sitemap.xml` et `feed.xml`.

## 7. Critères d'acceptation
- 100% des articles possèdent des métadonnées complètes, un titre SEO optimisé et des données structurées valides.
- Sitemap et flux RSS immédiatement consultables et conformes aux spécifications W3C.
