# RAPPORT D'ANALYSE DE DESIGN & DIRECTIVES D'INGÉNIERIE ONTARIO
**Document de Référence :** `DESIGN_ANALYSIS.md`  
**Date :** 13 Octobre 2026  
**Auteurs :** Équipe d’architecture & Direction Artistique Ontario  
**Référence Officielle :** Thème WordPress Ontario (Captures Image 1, Image 2, Image 3, Image 4 & `https://ontariowp.com/`)

---

## 1. Analyse Visuelle Détaillée des Captures de Référence

### 1.1. Capture 4 : Page d'Accueil Principale (Full Page Overview)
* **Header Flottant (Pill Navbar)** :
  * **Forme** : Capsule arrondie complète (`border-radius: 9999px`), surélevée de `24px` par rapport au sommet de la fenêtre, superposée directement au Hero immersif.
  * **Fond & Transparence** : Verre dépoli blanc semi-translucide `rgba(255, 255, 255, 0.85)` avec flou d'arrière-plan `backdrop-filter: blur(16px)` en mode clair ; `rgba(14, 33, 55, 0.85)` avec bordure `rgba(40, 68, 94, 0.6)` en mode sombre Bleu Nuit.
  * **Agencement** :
    * Gauche : Logo circulaire rouge corail (`#EF4248`) avec glyphe blanc stylisé + typographie "ONTARIO" en `Space Grotesk` gras.
    * Centre : Navigation aérée (`Accueil`, `Blog` avec dropdown, `Intelligence Artificielle`, `Technologie`, `Guides`, `Comparatifs`, `À Propos`, `Contact`).
    * Droite : Bouton loupe (recherche spotlight), bascule de thème clair/sombre, bouton pilule rouge corail "S'abonner" (`Subscribe`).
* **Hero Immersif (Full-Bleed 100vw)** :
  * **Largeur** : 100vw, s'étendant d'un bord à l'autre de l'écran sans conteneur bridé.
  * **Visuel** : Photographie cinématographique monumentale haute définition (visuel cyberpunk portrait orange / ambient lighting).
  * **Superposition dégradée** : Dégradé sombre asymétrique de gauche à droite (`rgba(0,0,0,0.85)` à transparent) pour assurer une lisibilité absolue des textes.
  * **Hiérarchie textuelle** :
    * Badge catégorie pilule translucide : `TECH / AI`.
    * Titre H1 géant : `Next Gen Marketing: Innovative Strategies` (`38px` à `48px`, graisse 700).
    * Métadonnées : `Steve Jones on Mar 26, 2026`.
    * Extrait éditorial : 2 à 3 lignes équilibrées (`15px`, interligne 1.6).
    * Commandes du slider : Deux boutons circulaires translucides flèche gauche et flèche droite.
* **Barre d'Actualités (Ticker Bar sous le Hero)** :
  * Ruban horizontal épuré (`py-3`) avec pastilles pastel colorées (vert émeraude, violet, bleu, rose) séparant les titres récents cliquables.
* **Rubriques "Blog Categories" (Cartes Pastel Minimales)** :
  * Grille de 6 colonnes (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`), hauteur `115px`, coins arrondis `16px`.
  * Couleurs pastel officielles :
    1. *All* : Rose doux poudré (`#FCEEF5`, texte `#A03060`)
    2. *Crypto* : Menthe rafraîchissante (`#EAF8F4`, texte `#217960`)
    3. *Business* : Lavande douce (`#EEEAFE`, texte `#5844A8`)
    4. *Lifestyle* : Rose dragée (`#FDEEF3`, texte `#9E3258`)
    5. *Technology* : Bleu ciel givré (`#E7F3FE`, texte `#2563A0`)
    6. *Trends* : Pêche orangée (`#FEEFE6`, texte `#A65522`)
* **Section "Fresh off the Press"** :
  * Grille magazine dynamique (2 rangées de 3 cartes avec badges `RECENT` en haut à gauche et badge temps de lecture `⏱️ 4 MIN` en bas à droite de l'image).
* **Section "Recent Articles" (2/3) + Sidebar Éditoriale (1/3)** :
  * Colonne gauche : Cartes horizontales épurées avec vignette à gauche, métas sobres, extrait et lien `MORE →` en rouge corail.
  * Colonne droite : 5 widgets calibrés (Auteur Kate Johnson, Carrousel Featured Posts à 3 puces, Rubriques, Articles associés, Tags populaires).
* **Bannière Newsletter** :
  * Bloc horizontal fond gris bleuté (`#F4F6F9`), titre à gauche, input email + bouton rouge corail arrondi à droite.
* **Footer Éditorial** :
  * 3 colonnes structurées (Identité & Réseaux, Rubriques, Coordonnées "HOW TO FIND US") + barre copyright avec bouton retour en haut circulaire.

---

### 1.2. Capture 2 : Page Article Individuel (Single Post Page)
* **Bannière d'En-tête Arrondie** :
  * Grande image panoramique `16:9` avec coins arrondis `24px`.
  * Fil d'Ariane : `Accueil > Rubrique > Titre de l'article`.
  * Titre H1 centré en blanc pur, métadonnées complètes centrées (Auteur, date, temps de lecture).
* **Barre d'Interactions Sociale Flottante** :
  * Colonne fixe à gauche du contenu avec icônes de partage (Email, Facebook, X/Twitter, Instagram, Pinterest, Pocket, Reddit).
* **Corps de l'Article Format Long** :
  * Typographie confortable (`Inter`, `17px`, interligne `1.75`).
  * Titres H2 ("The Spark of an Idea") avec espacement généreux.
  * Listes à puces avec puces stylisées.
  * Image centrale plein format avec légende éditoriale.
  * Bloc citation en pull-quote avec grand guillemet décoratif.
  * Cartes de produits affiliés conformes (Amazon, marchands partenaires).
* **Bas d'Article** :
  * Badges tags cliquables.
  * Navigation précédent / suivant vers les articles adjacents.
  * Boîte auteur détaillée (avatar rond, biographie, liens sociaux).
  * Système de commentaires interactif (Formulaire avec nom, email, commentaire, case RGPD et bouton soumettre).
  * Section "Read Next" (3 cartes d'articles suggérés).

---

### 1.3. Capture 1 & 3 : Archives / Blog & Variantes de Disposition
* Grille 2 colonnes régulière sur les pages d'archives avec pagination réelle (1, 2, 3, ›).
* Sidebar persistante et parfaitement synchronisée avec la charte graphique.

---

## 2. Synthèse : Éléments Présents, Éléments Manquants & Plan d'Action

| Composant | Éléments Déjà Présents | Éléments Manquants / À Perfectionner | Action Corrective Implémentée |
| :--- | :--- | :--- | :--- |
| **Header** | Capsule flottante, logo, recherche, thème toggle, navigation | Menu déroulant rubriques enrichi, gestion réactive mobile | Perfectionnement des dropdowns et tiroir mobile complet |
| **Hero Slider** | Full-bleed 100vw, image, titre dégradé, contrôles | Synchronisation slider avec sélection CMS dynamique | Option "Mettre en avant dans le slider" dans l'administration |
| **Badges Automatiques** | Badges statiques "RECENT" | Règle automatique < 7 jours pour "NOUVEAU", "POPULAIRE" basé sur les vues/likes | Calcul automatique des badges dans les composants |
| **Dashboard Admin** | CRUD basique articles, onglets, simulateur SEO | Éditeur Gutenberg complet avec blocs multiples, gestion corbeille, restauration, bulk actions | Éditeur de blocs riche (/ commande, paragraphes, citations, affiliés, médias) + corbeille |
| **Base de Données** | Données locales en mémoire (`data/articles.ts`) | Connexion Supabase réelle | Intégration Supabase (`@supabase/supabase-js`, client sécurisé, sync locale) |
| **Affiliation** | Composant basique | Formats multiples (horizontal, vertical, bouton, comparatif), mention légale Amazon stricte | Composants `AffiliateProductCard` & `AffiliateButton` conformes FTC / Amazon |
| **Mode Sombre** | Tokens CSS initiaux | Palette Bleu Nuit `#071426` sur 100% des composants (modales, commentaires, formulaires) | Audit WCAG et calibrage chromatique complet |

---

## 3. Architecture Technique Recommandée

1. **Couche Hybride Résiliente** :
   * **Next.js 16.4 App Router (RSC + SSR)** : Rendu haute performance, SEO parfait, flux RSS `/feed.xml`, sitemap `/sitemap.xml`, robots `/robots.txt`.
   * **Base Supabase Cloud** : Modélisation des tables `articles`, `categories`, `authors`, `comments`, `newsletter_subscribers`, `affiliate_products`.
   * **Couche Client Autonome (`public/app.js` + `server.js`)** : Démonstrateur instantané zéro latence avec synchronisation bi-directionnelle.
2. **Design Tokens Ontario** :
   * Couleurs primaires : `#ffffff` (clair), `#071426` (sombre).
   * Surfaces : `#f4f6f9` (clair), `#0e2137` / `#122b45` (sombre).
   * Accent : Rouge corail `#EF4248` (hover `#DA343A`).
   * Typographie : `Space Grotesk` (titres et identité), `Inter` (lecture et métas).
