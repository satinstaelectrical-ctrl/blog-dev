# DESIGN AUDIT — ANALYSE COMPARATIVE & DIRECTIVES DE CONCEPTION ONTARIO
**Fichier :** `DESIGN_AUDIT.md`  
**Date :** 13 Octobre 2026  
**Auteurs :** Équipe d'Architecture & Direction Artistique Ontario  
**Référence Officielle :** Captures ThemeForest / GT3Themes (`https://ontariowp.com/`)

---

## 1. Analyse Visuelle Détaillée Section par Section (Basée sur les 5 Nouvelles Captures)

### 1.1. Header Flottant (Pill Navbar)
* **Forme & Position** :
  * Capsule parfaitement arrondie (`border-radius: 9999px`).
  * Flottante avec marge supérieure de `20px` à `24px` au-dessus du Hero immersif.
  * Effet verre dépoli : `background: rgba(255, 255, 255, 0.85)` avec `backdrop-filter: blur(16px)` en mode clair ; `rgba(14, 33, 55, 0.85)` en mode sombre Bleu Nuit.
* **Composition** :
  * **Gauche** : Logo circulaire rouge corail (`#EF4248`) avec glyphe stylisé + typographie "ONTARIO" en lettres capitales grasses.
  * **Centre** : Liens espacés :
    * `Accueil` (avec pilule blanche active et chevron vers le bas)
    * `Blog` (avec chevron vers le bas)
    * `Features` (avec chevron vers le bas)
    * `À propos`
    * `Shop`
    * `Contact`
  * **Droite** :
    * Bouton recherche (icône loupe)
    * Sélecteur de thème avec icônes Soleil / Lune
    * Bouton pilule noir/rouge : "S'abonner" (`Subscribe` / `Buy Now`)
* **Mobile** :
  * Repli en barre compacte avec tiroir latéral complet (hamburger animé), accessible au clavier.

---

### 1.2. Hero Immersif & Slider Pleine Largeur (100vw)
* **Largeur & Hauteur** : Pleine largeur d'écran (`width: 100vw`), hauteur de `640px` à `720px` sur grand écran.
* **Photographie** : Visuel plein écran haute définition, dégradé sombre asymétrique sur la gauche pour détacher le titre.
* **Contrôles du Slider** :
  * Flèches circulaires translucides gauche (`←`) et droite (`→`) en bas à gauche sous l'extrait.
  * Indicateurs de défilement pour la navigation tactile et clavier.
* **Intégration CMS** : Lié aux articles sélectionnés dans l'administration avec l'option « Mettre en avant dans le Hero ».

---

### 1.3. Barre de Sujets (Ticker Bar sous le Hero)
* **Format** : Bande horizontale fine (`py-3`) placée immédiatement sous le Hero.
* **Contenu** : Pastilles thématiques colorées arrondies :
  * Pastille verte : `CRYPTO` → "Colorful Packaging in Contemporary Crypto Branding"
  * Pastille violette : `DIGITAL` → "Transparent Structures in Digital Architecture"
  * Pastille rose : `AI` → "AI Motion Techniques in Abstract Digital Design"
  * Pastille bleue : `BUSINESS` → "Organic Shapes in Modern Digital Architecture"
* **Comportement** : Défilement horizontal fluide et navigable sur mobile.

---

### 1.4. Rubriques "Blog Categories" (Cartes Pastel Épurées)
* **Titre** : `Blog Categories` (H2 aligné à gauche).
* **Disposition** : Grille de 6 cartes pastel sur une rangée (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`), hauteur `115px`, coins arrondis `16px`.
* **Palette pastel officielle observée** :
  1. *AI* : Lavande pâle douce (`#F0ECFA`, texte `#5844A8`)
  2. *Crypto* : Menthe pastel rafraîchissante (`#ECF8F4`, texte `#217960`)
  3. *Digital* : Bleu periwinkle givré (`#EBF0FA`, texte `#2563A0`)
  4. *Startups* : Rose dragée délicat (`#FCEEF4`, texte `#9E3258`)
  5. *Technology* : Carte sombre avec visuel de robotique (`#13283E`, texte `#ffffff`)
  6. *Trends* : Pêche orangée douce (`#FFF2EB`, texte `#A65522`)

---

### 1.5. Section "Fresh off the Press"
* **Structure de la Grille** :
  * Rangée 1 (3 articles) :
    * Article 1 : Astronaute en combinaison rouge rétro-futuriste (badge `RECENT` haut gauche, `⏱️ 3 MIN` bas droite).
    * Article 2 : Ondes néon bleues fluides (badge `RECENT`, `⏱️ 2 MIN`).
    * Article 3 : Femme méditant face au coucher de soleil (badge `RECENT`, `⏱️ 4 MIN`).
  * Rangée 2 (3 articles) :
    * Article 4 : Disques 3D rouges/roses (badge `RECENT`).
    * Article 5 : Tête androïde avec anneau lumineux (badge `RECENT`).
    * Article 6 : Robot futuriste assis à la console (badge `RECENT`).
* **Anatomie des Cartes** :
  * Coins arrondis `16px`, zoom très doux au survol (`hover:scale-105`), titre H3 gras, auteur et date en gris sobre.

---

### 1.6. Section "Recent Articles" (2/3) + Sidebar Éditoriale (1/3)
* **Colonne Principale (68%)** :
  * Cartes horizontales épurées :
    * Vignette à gauche au ratio 4:3 / 16:10 avec badge de temps de lecture.
    * Colonne droite : Titre H3 gras, auteur et date, extrait de 2 lignes, petit badge de catégorie (ex: `NEWS`).
  * Pagination officielle au bas :
    * Bouton rond rouge corail actif `1` (`#EF4248`, texte blanc)
    * Boutons ronds bordurés `2`, `3`, `›`
* **Sidebar Éditoriale (32%)** :
  * Widget 1 : `FEATURED POSTS` avec grand visuel, titre superposé et carrousel à 3 puces de pagination.
  * Widget 2 : `RELATED ARTICLES` avec 3 vignettes compactes et dates.
  * Widget 3 : `POPULAR TAGS` avec badges pilules arrondis discrets.
  * Widget 4 : Catégories et présentation de l'auteur.

---

### 1.7. Section Newsletter & Footer
* **Newsletter** :
  * Bandeau horizontal fond gris bleuté (`#F4F6F9`) :
    * Gauche : "Subscribe to our Newsletter" + "We'll send you nice letter once per week. No spam."
    * Droite : Champ email pilule + Bouton pilule rouge corail "Subscribe".
* **Footer 3 Colonnes** :
  * Colonne 1 : Logo Ontario + présentation éditoriale + 5 icônes réseaux sociaux (Facebook, X, Instagram, LinkedIn, YouTube).
  * Colonne 2 : Rubriques (Digital, Business, Startups, Trends, Crypto, News).
  * Colonne 3 : "HOW TO FIND US" (Adresse New York, email, téléphone).
  * Barre basse : Copyright 2026 + Bouton circulaire rouge retour en haut avec flèche montante.

---

## 2. Système de Badges Automatiques
* **NOUVEAU** : Règle temporelle (< 7 jours après publication).
* **POPULAIRE** : Calculé automatiquement (vues > 10 000 ou likes > 500).
* **EXCLUSIF** : Option manuelle dans le CMS.
* **RECENT** : Badge Ontario officiel par défaut en fond noir `#17191D`.

---

## 3. Système de Conteneur & Ratios Responsive
* **Desktop Large** : `max-w-[1240px]` centré, padding latéral `24px` à `32px`.
* **Écrans 4K** : Contenu rigoureusement centré sans étirement démesuré.
* **Tablette (768px - 1024px)** : Grille 2 colonnes, sidebar repliée sous le flux.
* **Mobile (375px - 430px)** : Monocolonne fluide, boutons tactiles `44px` minimum, menu tiroir complet.
