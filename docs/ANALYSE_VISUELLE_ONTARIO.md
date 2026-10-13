# ANALYSE VISUELLE DU THÈME ONTARIO & DIRECTIVES DE CONCEPTION
**Référence principale :** Capture officielle Ontario WordPress Theme (Image A - `media_1791853489223.png`)  
**Site de démonstration :** `https://ontariowp.com/`  
**État actuel à corriger :** Application locale (Image B)  
**Auteurs :** Direction Artistique & Architectes Frontend  

---

## 1. Philosophie et Direction Artistique Globale

Le thème Ontario incarne la famille esthétique **MINIMAL EDITORIAL MAGAZINE** haut de gamme.
Ses principes directeurs sont :
- **Clarté et respiration** : Fonds ultra-propres (`#ffffff` en mode clair, `#071426` en mode bleu nuit), marges aérées, absence totale de surcharges visuelles ou de dégradés kitsch.
- **Primauté de la photographie** : Des images immersives et impeccablement cadrées qui captent le regard dès le premier coup d'œil.
- **Accents chromatiques précis** : Un rouge corail vibrant (`#EF4248`, hover `#DA343A`) pour les badges d'urgence, les boutons d'action et les puces actives.
- **Géométrie douce** : Coins arrondis modérés (`12px` à `16px` pour les cartes, `9999px` pour les boutons et badges pilules).
- **Typographie éditoriale moderne** : Une police de titrage géométrique à fort caractère (`Space Grotesk`) couplée à une police de lecture sobre et parfaitement lisible (`Inter`).

---

## 2. Décomposition Section par Section (Mesures, Proportions & Rendu)

### 2.1. Header Flottant (Pill Navbar)
- **Positionnement relatif :** Flottant au-dessus du Hero photographique, surélevé avec une marge supérieure de `20px` à `28px` du bord haut de la fenêtre.
- **Largeur & Hauteur :**
  - Largeur : Conteneur centré d'environ `1180px` à `1220px` (ou `90%` de la largeur de fenêtre avec un `max-width: 1220px`).
  - Hauteur : `58px` à `64px`.
- **Forme & Coins :** Capsule parfaite (`border-radius: 9999px`).
- **Fond & Translucidité :**
  - Mode clair sur Hero : Fond blanc semi-translucide `rgba(255, 255, 255, 0.85)` avec filtre de flou `backdrop-filter: blur(16px)` et fine bordure blanche/grise `1px solid rgba(255, 255, 255, 0.4)`.
  - Mode sombre sur Hero : Fond bleu nuit translucide `rgba(14, 33, 55, 0.85)` avec bordure `1px solid rgba(40, 68, 94, 0.6)`.
- **Ombre portée :** `box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.12)`.
- **Composition interne :**
  - **Gauche :** Logo circulaire rouge corail avec lettre stylisée + texte "ONTARIO".
  - **Centre :** Liens horizontaux espacés (`Home` avec flèche dropdown, `Blog`, `Features`, `About`, `Shop`, `Contact`). Espacement `gap: 24px` à `28px`.
  - **Droite :** Bouton recherche (icône loupe), bascule thème (lune/soleil), bouton pilule noir/rouge "S'abonner" (`Subscribe`).
- **Comportement scroll :** Reste fixé en haut (`sticky top-4`) lors du défilement avec renforcement subtil de l'opacité et de l'ombre.
- **Mobile (< 1024px) :** Se replie en barre compacte avec logo, recherche, switch de thème et menu burger ouvrant un tiroir latéral complet.

---

### 2.2. Hero Immersif (Plein écran 100vw)
- **Positionnement & Largeur :** `width: 100vw` (full-bleed sans marges latérales extérieures), s'étend d'un bord à l'autre de l'écran.
- **Hauteur :** `640px` à `740px` sur grand écran (desktop 1920/1440), `500px` sur tablette, `420px` sur mobile.
- **Traitement photographique :**
  - Photographie haute définition (ex. portrait futuriste orange/rouge cyberpunk ou paysage immersif).
  - Dégradé de superposition sombre asymétrique : orienté de gauche à droite (`linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)`) et dégradé léger de bas en haut pour détacher les textes sans obscurcir le sujet photographique.
- **Disposition des textes :**
  - Bloc textuel situé dans la moitié gauche du Hero (`max-width: 580px`), verticalement centré / légèrement abaissé.
  - **Badge catégorie :** Pilule blanc/gris translucide (`TECH / AI`), typographie `11px` majuscule grasse.
  - **Titre principal H1 :** Typographie `38px` à `48px`, graisse `700`, interligne `1.15`, couleur blanche pure `#ffffff`.
  - **Extrait / Sous-titre :** `14px` à `15px`, couleur blanc cassé `rgba(255,255,255,0.8)`, 2 lignes maximum.
  - **Métadonnées :** Auteur et date discrète.
- **Commandes de navigation du Slider :**
  - Flèches précédent/suivant discrètes en bas à gauche sous le texte ou boutons ronds translucides.
  - Puces de pagination circulaires.

---

### 2.3. Bande d'Actualités / Ticker Bar (Sous le Hero)
- **Positionnement :** Placé directement sous le Hero ou dans la première section de contenu.
- **Hauteur :** `44px` à `48px`.
- **Fond :** Blanc ou gris très pâle (`#F8FAFC`), bordure inférieure discrète `1px solid #E9EBEF`.
- **Contenu :** Ruban défilant avec pastilles thématiques colorées (ex. vert émeraude, violet, rose, bleu) suivies de titres d'articles récents cliquables.
- **Comportement :** Défilement doux ou carousel horizontal navigable.

---

### 2.4. Rubriques "Blog Categories" (Cartes Pastel)
- **Titre de section :** "Blog Categories" (H2, `26px`, gras, marge basse `24px`).
- **Disposition :** Grille de 6 colonnes sur desktop (`grid-cols-6`), 3 colonnes sur tablette (`grid-cols-3`), 2 colonnes sur mobile (`grid-cols-2`). Espacement `gap: 16px` à `20px`.
- **Dimensions des cartes :**
  - Hauteur : `110px` à `130px`.
  - Rayon de courbure des coins : `14px` à `16px` (`rounded-2xl`).
- **Palette pastel officielle :**
  1. *All / Tous* : Rose doux poudré (`#FCEEF5`, texte `#A03060`)
  2. *Crypto* : Menthe pastel rafraîchissante (`#EAF8F4`, texte `#217960`)
  3. *Bizrad / Business* : Lavande douce (`#EEEAFE`, texte `#5844A8`)
  4. *Fashion / Lifestyle* : Rose dragée délicat (`#FDEEF3`, texte `#9E3258`)
  5. *Technology* : Bleu ciel pastel givré (`#E7F3FE`, texte `#2563A0`)
  6. *Trends / Tendances* : Pêche orangée douce (`#FEEFE6`, texte `#A65522`)
- **Contenu de chaque carte :**
  - Typographie centrée, sobre et élégante, sans emoji criard.
  - Titre de la rubrique (`15px`, semi-gras).
  - Effet hover : Élévation subtile de `2px` à `3px` avec léger assombrissement harmonieux du fond.

---

### 2.5. Section "Fresh off the Press" (Grille Éditoriale Asymétrique)
- **Largeur conteneur :** `1200px` centré.
- **Structure de la Grille :**
  - **Rangée 1 (3 articles) :**
    - Article 1 (Gauche) : Format large (span 2 colonnes ou largeur équivalente à 50% de la rangée). Grande image panoramique `16:9` avec badge "RECENT" en haut à gauche et temps de lecture en bas à droite de l'image.
    - Article 2 (Centre) & Article 3 (Droite) : Formats standards compacts (span 1 colonne chacun).
  - **Rangée 2 (3 articles) :**
    - Article 4 (Gauche) & Article 5 (Centre) : Formats standards compacts.
    - Article 6 (Droite) : Format large panoramique pour équilibrer la composition asymétrique.
- **Anatomie d'une carte d'article :**
  - **Image :** Coins arrondis (`12px` à `14px`), overflow hidden, ratio maîtrisé, effet zoom `scale-105` très doux au survol (`duration-500`).
  - **Badges sur l'image :**
    - Badge "RECENT" : Pilule noire ou corail en haut à gauche.
    - Temps de lecture : Pastille translucide sombre en bas à droite (`⏱️ 4 MIN`).
  - **Titre H3 :** `18px` à `22px`, gras, interligne `1.3`, couleur texte sombre `#17191d`, passage au rouge corail au survol.
  - **Métadonnées :** Auteur et date sous le titre en gris doux (`#696d76`, `12px` à `13px`).

---

### 2.6. Section "Recent Articles" & Sidebar (Disposition 2/3 + 1/3)
- **Largeur totale :** `1200px` centré.
- **Colonne Principale (Gauche - 2/3, environ 780px) :**
  - Titre de section : "Recent Articles".
  - Liste verticale d'articles au format horizontal :
    - Image à gauche : Format quasi-carré ou `4:3` (`220px` x `170px`), coins arrondis `12px`.
    - Contenu à droite : Titre H3 percutant, date et auteur, court extrait éditorial (2 lignes), lien "LIRE" ou badge.
    - Séparateurs discrets entre articles.
  - **Pagination :** Boutons circulaires en bas de liste (`1` en rouge corail, `2`, `3`, `›`).
- **Sidebar Éditoriale (Droite - 1/3, environ 360px) :**
  - **Widget 1 — Auteur (About Me) :** Carte fond gris très clair (`#F4F6F9`), avatar circulaire avec liseré, nom d'auteur, rôle, biographie soignée, icônes réseaux sociaux.
  - **Widget 2 — Featured Posts Carousel :** Carte avec image immersive plein format, titre superposé en blanc, flèches/puces de pagination sous l'image.
  - **Widget 3 — Categories :** Liste verticale avec compteurs d'articles.
  - **Widget 4 — Related Articles :** Petites vignettes carrées (`60px` x `60px`) avec titre sur 2 lignes et date.
  - **Widget 5 — Popular Tags :** Nuage de tags sous forme de badges pilules gris clair avec texte majuscule discret.

---

### 2.7. Section Newsletter & Footer
- **Bannière Newsletter :**
  - Fond gris très clair (`#F4F6F9`) ou blanc avec fine bordure.
  - Disposition horizontale sur grand écran : Titre "Subscribe to our Newsletter" + sous-titre rassurant à gauche, champ email arrondi + bouton rouge corail à droite.
- **Footer :**
  - Vaste zone sur fond gris-bleuté pâle (`#F4F6F9`), contrastant doucement avec le blanc de la page.
  - 3 colonnes majeures :
    1. Logo Ontario + court manifeste éditorial + liens sociaux.
    2. Navigation catégories.
    3. Coordonnées et adresse de la rédaction.
  - Ligne de copyright inférieure avec mention des droits réservés et bouton de retour en haut de page circulaire.

---

## 3. Spécifications du Mode Sombre "Bleu Nuit"

Contrairement à un noir brut OLED, le thème Ontario adopte un **Bleu Nuit Profond et Lumineux** :
- `--page-bg: #071426` (Toile de fond globale, ciel nocturne profond)
- `--surface: #0e2137` (Cartes principales, widgets sidebar, footer)
- `--surface-soft: #122b45` (Fonds de formulaire, badges discrets)
- `--surface-muted: #183550` (États hover, bordures renforcées)
- `--text-primary: #f2f7ff` (Titres et textes principaux à fort contraste)
- `--text-secondary: #b2c3d6` (Extraits et métadonnées)
- `--text-muted: #839bb5` (Dates, mentions légales, placeholders)
- `--border-color: #28445e` (Séparateurs et bordures de cartes)
- `--accent: #ef5056` (Rouge corail légèrement ajusté pour le contraste nocturne)

---

## 4. Matrice de Conformité et Objectifs de Recette

| Élément | Statut Avant Révision | Cible Attendue |
| :--- | :--- | :--- |
| **Header flottant** | Barre rectangulaire classique | Capsule surélevée au-dessus du Hero |
| **Hero 100vw** | Encart de 1240px | Immersion totale pleine largeur |
| **Asymétrie grille** | Grille 3x1 uniforme | 1 large + 2 étroits / 2 étroits + 1 large |
| **Rubriques pastel** | Cartes avec emojis disparates | 6 cartes pastel épurées minimalistes |
| **Mode Sombre** | Noir neutre zinc | Bleu Nuit `#071426` sur tous les composants |
| **Affiliation** | Aucune carte produit | Bloc `AffiliateProductCard` conforme Amazon |
| **Éditeur CMS** | Textarea simple | Éditeur visuel par blocs type Gutenberg |
