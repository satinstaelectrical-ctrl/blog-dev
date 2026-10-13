# RÈGLES ET DIRECTIVES GÉNÉRALES DU PROJET ONTARIO — AGENTS.md

Ce document régit le comportement, les standards de conception, les directives d'ingénierie et les critères de qualité appliqués par tous les agents et développeurs travaillant sur la plateforme multimédia **ONTARIO**.

---

## 1. Identité et Direction Artistique

1. **Fidélité au Thème Ontario** :
   - Le design officiel Ontario (`https://ontariowp.com/` / ThemeForest) est la référence absolue.
   - Ne jamais transformer le site en interface SaaS, en portail tech surchargé ou en simple maquette textuelle.
   - Préserver l'esthétique **Minimal Editorial Magazine** : fonds aérés, typographie soignée (`Space Grotesk` + `Inter`), cartes aux angles arrondis (`12px` à `16px`), accent rouge corail (`#EF4248`), mode sombre **Bleu Nuit** (`#071426`).

2. **Éléments Visuels Prioritaires** :
   - **Header** : capsule flottante translucide (`rounded-full`) superposée sur le Hero, avec effet de flou d'arrière-plan.
   - **Hero** : 100vw pleine largeur (full-bleed), photographie grand angle haute définition, texte dégradé sur la gauche.
   - **Grille "Fresh off the Press"** : composition éditoriale asymétrique (1 large + 2 étroits / 2 étroits + 1 large).
   - **Rubriques** : 6 cartes pastel épurées et minimalistes avec typographie élégante sans emojis surchargés.
   - **Sidebar & Footer** : widgets modulaires calibrés sur la charte Ontario.

---

## 2. Standards d'Ingénierie Logicielle

1. **TypeScript Strict & Zéro Régression** :
   - Tout le code Next.js et TypeScript doit respecter le mode strict, sans `any` implicite ni erreurs de typage.
   - Ne jamais supprimer un composant ou une fonctionnalité existante sans justification technique documentée.

2. **Architecture Hybride & Résilience** :
   - Le socle Next.js App Router assure le rendu serveur, le SEO sémantique et la modularité.
   - La couche client autonome (`public/app.js` + `server.js`) assure l'interactivité instantanée, la navigation fluide et la testabilité locale.
   - Tout changement d'architecture doit maintenir la synchronisation entre les deux couches.

3. **Administration type WordPress / Gutenberg** :
   - La route `/admin` est strictement réservée à l'administrateur authentifié.
   - L'éditeur d'articles permet l'insertion visuelle de blocs (paragraphes, titres H2-H4, pull-quotes, images avec légendes, produits affiliés conformes, vidéos, séparateurs).
   - Prise en charge des statuts d'articles : brouillon, programmé, publié, corbeille, restauration et suppression définitive.

---

## 3. Sécurité, Rôles et Secrets

1. **Séparation Étanche des Rôles** :
   - **Administrateur** : gestion complète des contenus, médias, catégories, produits affiliés et paramètres.
   - **Lecteur** : consultation, favoris, commentaires, profil et gestion de l'abonnement newsletter.
   - Aucun compte lecteur ne doit pouvoir accéder aux endpoints ou interfaces d'administration.

2. **Politique Zéro Fuite de Secrets** :
   - Ne jamais versionner de clés API réelles, de tokens ou de mots de passe de production.
   - Utiliser des variables d'environnement (`.env.local`) et documenter les variables dans `.env.example`.

---

## 4. Affiliation et Conformité Légale

1. **Transparence et Déclaration** :
   - Tout bloc ou lien affilié doit comporter la mention légale appropriée (ex. "Lien affilié — nous pouvons percevoir une commission").
   - Attributs obligatoires pour les liens marchands : `rel="sponsored noopener noreferrer"`.
   - Ne jamais inventer de faux prix dynamiques ou de faux avis Amazon sans connexion API autorisée.

---

## 5. Matrice des 14 Skills Disponibles

Les 14 compétences spécialisées du projet sont localisées dans `.agents/skills/` :
1. `ontario-visual-fidelity` : Vérification et calibrage de la fidélité visuelle face à la référence Ontario.
2. `premium-editorial-design` : Direction artistique, tokens CSS, typographie et palettes.
3. `responsive-layout-engineer` : Grilles, breakpoints, ergonomie tablette et mobile.
4. `wordpress-like-editor` : Expérience rédactionnelle par blocs modulaires de type Gutenberg.
5. `payload-cms-architect` : Modélisation des collections, relations, permissions et administration.
6. `secure-authentication` : Séparation des rôles Admin / Lecteur, sessions et protection CSRF.
7. `affiliate-commerce-blocks` : Cartes produits affiliés conformes Amazon et suivi éthique.
8. `editorial-media-pipeline` : Gestion des médias, ratios d'images, focal points et fallbacks.
9. `technical-seo-engineer` : Métadonnées, JSON-LD schema.org, sitemap, flux RSS et Open Graph.
10. `web-performance-engineer` : Optimisation Core Web Vitals (LCP, CLS, INP) et légèreté du bundle.
11. `accessibility-motion-engineer` : Normes WCAG 2.1 AA, contraste, navigation clavier et prefers-reduced-motion.
12. `automated-quality-assurance` : Tests unitaires, intégration, validation multi-résolutions.
13. `newsletter-delivery-engineer` : Collecte d'abonnés, double opt-in, validation d'emails et conformité RGPD.
14. `production-deployment-engineer` : Configuration CI/CD, scripts de build et vérification pré-déploiement.
