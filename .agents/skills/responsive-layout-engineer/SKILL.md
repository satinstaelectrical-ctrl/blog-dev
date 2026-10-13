---
name: responsive-layout-engineer
description: Ingénierie des mises en page adaptatives, gestion des breakpoints, fluidité mobile/tablette et prévention des débordements horizontaux.
---

# SKILL 03 — RESPONSIVE LAYOUT ENGINEER

## 1. Mission
Garantir une adaptation chirurgicale de la mise en page sur tous les formats d'écrans (Desktop 1920/1440, Portable 1280, Tablette 1024/768, Mobile 390/375), éliminer tout scroll horizontal non désiré et optimiser la lisibilité nomade.

## 2. Quand déclencher ce skill
- Lors de la création ou modification des grilles CSS, conteneurs, colonnes ou carrousels.
- Lors de tests de rendu mobile ou lors de l'intégration du tiroir de navigation mobile.
- En cas de signalement de débordement (`horizontal overflow`).

## 3. Fichiers à consulter
- `app/globals.css`
- `components/layout/Header.tsx`
- `components/sidebar/EditorialSidebar.tsx`
- `components/cards/ArticleCardGrid.tsx`
- `public/index.html` et `public/app.js`

## 4. Étapes à effectuer
1. **Calibrage des breakpoints** :
   - `sm` : 640px (passage de 1 à 2 colonnes sur les petites cartes).
   - `md` : 768px (passage à 3 colonnes pour les rubriques).
   - `lg` : 1024px (activation de la grille 2/3 + 1/3 avec sidebar).
   - `xl` : 1280px (activation de la grille 6 colonnes pour les rubriques et layout asymétrique complet).
2. **Gestion du Header sur mobile** :
   - Remplacement de la navigation étendue par une barre condensée avec bouton burger.
   - Tiroir latéral animé avec fermeture par bouton, touche Échap ou tap extérieur.
3. **Gestion du Hero sur mobile** :
   - Hauteur ramenée à `400px` - `440px` avec recentrage focal de l'image.
   - Réduction équilibrée du titrage (`26px` - `30px`) et passage de la métadonnée en version compacte.
4. **Réagencement de la Sidebar sur mobile** :
   - Positionnement naturel de la sidebar après le flux d'articles principal pour ne pas bloquer la lecture.

## 5. Erreurs à éviter
- Utiliser des largeurs fixes en pixels (`width: 1200px` sans `max-width: 100%`).
- Couper les textes ou les contrôles de pagination sur petits écrans.
- Garder le menu desktop compressé et illisible sur tablette.

## 6. Tests obligatoires
- Test d'absence de débordement horizontal (`document.body.scrollWidth === window.innerWidth`).
- Test de la fermeture et accessibilité du menu mobile.
- Test de fluidité du défilement tactile sur les carrousels et ticker bars.

## 7. Critères d'acceptation
- Zéro décalage de layout (`CLS < 0.05`).
- Lisibilité irréprochable des titres et boutons d'action sur écran de 375px.
- Menu mobile fluide et accessible.
