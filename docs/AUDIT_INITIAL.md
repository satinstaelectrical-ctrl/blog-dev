# AUDIT INITIAL DU PROJET MÉDIA ONTARIO
**Date :** 13 Octobre 2026  
**Auteurs :** Équipe d’architecture & Direction Artistique Ontario  
**Statut :** Document de cadrage et d'audit pré-intervention  

---

## 1. Ce qui existe dans le projet

Le projet est structuré comme une application hybride de publication éditoriale multimédia intégrant deux moteurs complémentaires :
1. **Socle Next.js 16.4 (App Router) + React 19 + TypeScript 5** :
   - Structure de routes sous `app/` (`/`, `/blog`, `/article/[slug]`, `/category/[slug]`, `/author/[slug]`, `/about`, `/contact`, `/search`, `/admin`).
   - Endpoints SEO et flux RSS natifs (`/sitemap.xml`, `/robots.txt`, `/feed.xml`).
   - Couche de composants modulaires sous `components/` (`layout`, `cards`, `sidebar`, `newsletter`, `search`, `ui`).
   - Modélisation de données typée sous `types/` et jeux de données initiaux sous `data/` (`articles.ts`, `categories.ts`, `authors.ts`).
2. **Couche de prévisualisation autonome ultra-rapide (`public/` + `server.js`)** :
   - Serveur Node.js natif (`server.js`) servant l'application interactive sur `http://localhost:3000`.
   - Single Page Application complète (`public/index.html` + `public/app.js`) permettant de tester instantanément le routage, la recherche spotlight, le filtrage par catégories, les commentaires, le dark mode et le simulateur d'administration.

---

## 2. Ce qui fonctionne déjà

1. **Routage client et navigation SPA** :
   - Navigation fluide sans rechargement de page entre l'accueil, le catalogue d'articles, les pages catégories, la lecture d'article individuel, les profils auteurs, la recherche et le panneau d'administration.
2. **Système de recherche Spotlight** :
   - Recherche textuelle instantanée multi-critères (titre, extrait, catégorie, auteur, tags) avec raccourci clavier `Cmd/Ctrl + K` et interface modale.
3. **Persistance locale des interactions** :
   - Bascule mode clair / mode sombre avec persistance `localStorage`.
   - Sauvegarde des commentaires en session locale.
   - Compteurs de likes interactifs.
   - Inscription newsletter avec validation d'email et accusé de réception visuel.
4. **Structure éditoriale et typographie de base** :
   - Intégration des polices Google Fonts `Space Grotesk` (titres et identité) et `Inter` (corps de texte).
   - Métadonnées complètes pour les articles (temps de lecture, auteur, date, tags, catégorie).

---

## 3. Ce qui ne fonctionne pas ou présente des anomalies majeures

1. **Header (Divergence visuelle majeure)** :
   - Le header actuel est une barre blanche pleine rectangulaire classique épinglée en haut avec bordure inférieure.
   - Sur la référence Ontario officielle (Image A), le header est une **capsule flottante arrondie (pill bar)**, surélevée avec marge supérieure, semi-translucide avec effet de flou (`backdrop-blur`), superposée directement au-dessus de la photographie immersive du Hero.
2. **Hero de la page d'accueil (Divergence d'immersion)** :
   - Le Hero actuel est enfermé dans le conteneur centré (`container-media` de 1240px) avec des bords arrondis et un dégradé violet/noir.
   - Sur Ontario officiel, le Hero est **100% pleine largeur d'écran (full-bleed 100vw)**, avec une photographie éditoriale monumentale, un dégradé sombre asymétrique sur la gauche pour détacher le titre, et des contrôles de slider raffinés.
3. **Grille "Fresh off the Press" (Composition trop régulière)** :
   - La grille actuelle affiche 3 colonnes symétriques rigides.
   - La référence Ontario utilise une composition asymétrique magazine (Rangée 1 : 1 grand article panoramique à gauche + 2 articles compacts à droite ; Rangée 2 : 2 articles compacts à gauche + 1 grand article à droite).
4. **Chargement et ratios des images** :
   - Certaines URLs distantes Unsplash peuvent ralentir le rendu ou présenter des ratios inégaux lors de variations de réseau. Un pipeline d'images avec fallbacks fiables, dimensions calibrées et points focaux est nécessaire.
5. **Palette du Mode Sombre** :
   - Le mode sombre actuel utilise une base neutre noire/zinc (`#09090B`).
   - Le cahier des charges exige expressément un thème **Bleu Nuit Premium** (`--page-bg: #071426; --surface: #0e2137; --border-color: #28445e;`).
6. **Bouton d'administration dans le Header public** :
   - Un bouton « CMS Admin » est actuellement visible dans la barre de navigation publique, ce qui ne correspond pas aux standards d'un média professionnel. La route `/admin` doit être protégée avec un écran de connexion dédié et des privilèges distincts (Admin vs Lecteur).
7. **Éditeur d'articles du CMS** :
   - L'administration actuelle propose un formulaire standard avec textarea. Elle doit évoluer vers une véritable expérience éditoriale de type WordPress / Gutenberg avec insertion de blocs modulaires (paragraphes, titres H2-H4, pull-quotes, images avec légendes, produits affiliés Amazon conformes, vidéos, séparateurs, corbeille et historique de révisions).

---

## 4. Tableau comparatif : Référence Ontario vs État Actuel

| Composant / Section | Référence Thème Ontario Officiel (Image A) | État Actuel du Projet (Image B) | Action Requise |
| :--- | :--- | :--- | :--- |
| **Header** | Capsule flottante translucide (`rounded-full`), superposée au Hero, marges top nettes | Barre blanche rectangulaire classique `sticky top-0` | **Reconstruction prioritaire** : header capsule flottant sur le Hero |
| **Hero Slider** | Pleine largeur 100vw, photo éditoriale immersive, titre aligné à gauche | Boîte 1240px arrondie à dégradé violet | **Reconstruction** : full-bleed 100vw avec slider fonctionnel |
| **Bande Ticker** | Ruban sobre sous le hero avec puces colorées de catégories | Bandeau présent mais styles à affiner pour coller à la référence | Harmonisation typographique et espacements |
| **Rubriques** | 6 cartes pastel épurées, typographie sobre, fond teinté doux sans gros emojis | Cartes avec icônes emojis et hauteurs disparates | Remplacer par 6 cartes pastel ultra-minimales et élégantes |
| **Fresh off the Press** | Grille asymétrique (1 large + 2 étroits / 2 étroits + 1 large) | Grille 3x1 symétrique uniforme | Implémenter le layout asymétrique magazine |
| **Recent Articles** | Liste verticale épurée à gauche (vignette carrée/16:10 à gauche, métas sobres) + Sidebar à droite | Liste correcte mais proportions à recalibrer | Ajuster marges, tailles de police et pagination |
| **Sidebar** | Widgets clairs arrondis : Auteur, Carrousel vedette, Catégories, Récents, Tags | Widgets présents mais contrastes et paddings à perfectionner | Calibrer chaque widget au pixel |
| **Footer** | Vaste zone gris bleuté clair (`#F4F6F9`), 3 colonnes structurées, copyright propre | Footer présent mais teintes à harmoniser | Aligner sur la palette Ontario |
| **Palette Dark Mode** | Non testé sur la capture / Spécifié **Bleu Nuit** (`#071426`) | Gris neutre / Zinc sombre | Basculer sur le bleu nuit profond haute fidélité |

---

## 5. Risques techniques identifiés

1. **Régression lors de la superposition Header / Hero** :
   - Risque de collision du header flottant avec le contenu des pages secondaires (ex. `/blog` ou `/article/...` qui n'ont pas forcément de Hero 100vw).
   - *Mitigation* : Le header doit adapter sa classe (overlay transparent sur la Home avec Hero, ou barre capsule flottante avec fond translucide et marge propre sur les sous-pages).
2. **Gestion des images et résilience réseau** :
   - Dépendance à des images distantes non chargées si la connexion flanche.
   - *Mitigation* : Définir des images SVG ou WebP locales fiables et un gestionnaire d'erreur `onerror` pour fallback immédiat.
3. **Séparation étanche Admin vs Lecteurs** :
   - Risque d'exposition des données de gestion éditoriale aux utilisateurs simples.
   - *Mitigation* : Modèle de rôles strict (`admin` vs `reader`), contrôle d'authentification et isolation complète de la route `/admin`.

---

## 6. Éléments à conserver impérativement

- L'architecture de données typée (`types/index.ts`, `data/`).
- La recherche Spotlight ultra-rapide par raccourci clavier.
- Le système de routes Next.js avec métadonnées SEO (`sitemap.xml`, `robots.txt`, `feed.xml`).
- Le serveur local interactif `server.js` qui offre un aperçu immédiat sans dépendance externe.
- La compatibilité responsive multi-appareils (desktop 1920/1440, tablette 768/1024, mobile 375/390).

---

## 7. Éléments à corriger et refactoriser

1. **Header** : passer à la capsule flottante surélevée avec effet verre dépoli et placement au-dessus du Hero.
2. **Hero** : sortir du conteneur fixe pour devenir un véritable plein-écran 100vw immersif avec typographie géante à gauche et flèches de navigation.
3. **Rubriques** : épurer les cartes pastel pour retrouver la finesse graphique de l'image de référence.
4. **Grille d'articles** : restructurer le layout asymétrique de "Fresh off the Press".
5. **Dashboard Admin** : implémenter un éditeur de blocs inspiré de Gutenberg (paragraphe, titre, image, citation, produit affilié, YouTube) avec états brouillon, publié, corbeille.
6. **Affiliation** : créer le composant `AffiliateProductCard` conforme aux obligations légales (mention sponsorisée, bouton rouge corail, caractéristiques techniques).
7. **Thème sombre** : basculer l'ensemble de l'application sur la palette Bleu Nuit `#071426`.

---

## 8. Plan d'intervention par phases

- **Phase 1** : Documentation d'audit (`docs/AUDIT_INITIAL.md`) et analyse visuelle comparative détaillée (`docs/ANALYSE_VISUELLE_ONTARIO.md`).
- **Phase 2** : Création des 14 skills Antigravity sous `.agents/skills/` et du guide projet `AGENTS.md`.
- **Phase 3** : Refonte visuelle majeure du frontend (Header flottant, Hero 100vw, Grille asymétrique, Cartes pastel, Sidebar, Footer, Dark mode Bleu Nuit).
- **Phase 4** : Panneau d'administration WordPress-like avec éditeur Gutenberg riche, gestion de corbeille et statuts d'articles.
- **Phase 5** : Espace lecteur et sécurité d'authentification.
- **Phase 6** : Blocs d'affiliation Amazon/Partenaires conformes et newsletter.
- **Phase 7** : Validation qualité, SEO, responsive, accessibilité et livraison Git.
