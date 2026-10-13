# ONTARIO — Média Numérique & Plateforme Éditoriale Multimédia

Plateforme de blogging multimédia francophone haut de gamme, développée selon l'esthétique **Minimal Editorial Magazine** du thème WordPress officiel **Ontario** (`https://ontariowp.com/` / ThemeForest) avec une expérience éditoriale de type **WordPress / Gutenberg**.

---

## 🌟 Points Forts & Direction Artistique

- **Header Capsule Flottant** : Navbar semi-translucide `header-pill` superposée au-dessus de la photographie du Hero avec effet `backdrop-blur`.
- **Hero Immersif 100vw Full-Bleed** : Photographie panoramique grand format avec dégradé asymétrique de lisibilité et pagination dynamique.
- **Grille Asymétrique "Fresh off the Press"** : Composition éditoriale alternée (1 large + 2 étroits / 2 étroits + 1 large).
- **Rubriques Pastels Épurées** : 6 cartes thématiques aux teintes poudrées douces (`#FCEEF5`, `#EAF8F4`, `#EEEAFE`, `#FDEEF3`, `#E7F3FE`, `#FEEFE6`).
- **Sidebar & Widgets Ontario** : Widget Auteur, Carousel vedette, Nuage de tags pilules et articles associés.
- **Mode Sombre "Bleu Nuit"** : Palette profonde et feutrée `--page-bg: #071426; --surface: #0e2137; --border-color: #28445e; --accent: #ef5056;`.
- **Affiliation Amazon Conforme** : Composant `AffiliateProductCard` avec mention légale obligatoire et attributs `rel="sponsored noopener noreferrer"`.
- **Administration Type WordPress / Gutenberg** :
  - Accès sécurisé `/admin`.
  - Éditeur par blocs modulaires (paragraphes, titres, images, citations, blocs d'affiliation Amazon, vidéos).
  - Gestion du cycle de vie des articles : Brouillons, Programmés, Publiés, Corbeille, Restauration et Suppression définitive.
- **Séparation Étanche des Rôles** : Comptes Administrateurs vs Comptes Lecteurs.

---

## 🛠️ Architecture Technique

- **Framework Principal** : Next.js 16 (App Router) + React 19 + TypeScript 5
- **Moteur de Prévisualisation Autonome** : Serveur Node.js (`server.js`) + SPA interactive sous `public/`
- **Design System** : Tailwind CSS + Tokens CSS personnalisés (`app/globals.css`)
- **SEO & Référencement** : Sitemap XML (`/sitemap.xml`), Robots (`/robots.txt`), Flux RSS 2.0 (`/feed.xml`) et balisage Schema.org

---

## 🚀 Démarrage Rapide

### 1. Démarrer le serveur de prévisualisation interactif (Port 3000)
```bash
node server.js
```
Accédez à [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### 2. Accès aux Espaces
- **Accueil Public** : `http://localhost:3000/#home`
- **Catalogue d'articles** : `http://localhost:3000/#blog`
- **Rubrique IA & Tech** : `http://localhost:3000/#category/intelligence-artificielle`
- **Administration CMS** : `http://localhost:3000/#admin` (Identifiants pré-remplis : `redacteur@ontario.fr` / `admin2026`)

---

## 📂 Documentation du Projet

- `docs/AUDIT_INITIAL.md` : Audit initial complet de l'application et état des composants.
- `docs/ANALYSE_VISUELLE_ONTARIO.md` : Analyse visuelle section par section comparative avec le thème Ontario officiel.
- `AGENTS.md` : Règles générales et directives de conception de la plateforme.
- `.agents/skills/` : 14 compétences d'ingénierie spécialisées (Fidélité visuelle, SEO, Éditeur WordPress, Affiliation, etc.).

---

## 📄 Licence
Licence propriétaire / Thème Ontario. Tous droits réservés.
