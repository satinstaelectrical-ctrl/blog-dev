---
name: payload-cms-architect
description: Architecture des collections, schémas de données, intégrité référentielle, relations et migrations pour le CMS éditorial.
---

# SKILL 05 — PAYLOAD CMS ARCHITECT

## 1. Mission
Structurer les schémas de données et collections du système de gestion de contenu : `Articles`, `Categories`, `Authors`, `AffiliateProducts`, `NewsletterSubscribers`, `Comments`, `Media`, en assurant l'intégrité référentielle, le typage strict et la modularité.

## 2. Quand déclencher ce skill
- Lors de la modélisation ou de la modification des types de données et schémas.
- Lors de la mise en place de migrations de données ou de nouvelles collections.
- Lors de l'interfaçage entre la base de données (PostgreSQL / SQLite / adaptateur local) et les composants.

## 3. Fichiers à consulter
- `types/index.ts`
- `data/articles.ts`, `data/categories.ts`, `data/authors.ts`
- `public/app.js` (structures de collections)

## 4. Étapes à effectuer
1. **Définition des collections centrales** :
   - `Articles` : `id`, `title`, `slug`, `excerpt`, `content` (blocs JSON), `coverImage`, `categorySlug`, `authorSlug`, `readingTime`, `status` (`draft`, `scheduled`, `published`, `trash`), `isFeatured`, `publishedAt`, `tags`, `views`, `likes`.
   - `Categories` : `id`, `name`, `slug`, `accentColor`, `badgeBg`, `badgeText`, `description`, `order`.
   - `Authors` : `id`, `name`, `slug`, `role`, `avatar`, `bio`, `socialLinks`.
   - `AffiliateProducts` : `id`, `name`, `brand`, `description`, `features`, `imageUrl`, `merchantName`, `affiliateUrl`, `buttonText`, `status`.
   - `NewsletterSubscribers` : `id`, `email`, `status`, `confirmedAt`, `createdAt`.
2. **Intégrité référentielle** :
   - La suppression d'un article ne doit jamais supprimer les médias associés ni la catégorie parente.
   - La suppression d'un auteur doit empêcher les orphelins (réaffectation vers un auteur par défaut).

## 5. Erreurs à éviter
- Stocker des données non typées ou des chaînes libres pour des relations critiques.
- Coupler lourdement les modèles à des services cloud payants superflus.

## 6. Tests obligatoires
- Validation de conformité TypeScript des modèles.
- Test d'intégrité : liaison d'un article à une catégorie et un auteur valides.

## 7. Critères d'acceptation
- Modélisation exhaustive couvrant 100% des cas d'usage éditoriaux du média Ontario.
