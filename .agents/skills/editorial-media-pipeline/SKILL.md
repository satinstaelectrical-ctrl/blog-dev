---
name: editorial-media-pipeline
description: Pipeline de traitement, gestion, ratios, points focaux et fallbacks robustes pour les images et médias éditoriaux.
---

# SKILL 08 — EDITORIAL MEDIA PIPELINE

## 1. Mission
Éradiquer toute anomalie d'image cassée, d'affichage d'alt text laid ou de distorsion de format. Assurer des ratios harmonieux (panoramique pour le Hero, 16:9 pour les cartes principales, carré pour la sidebar), des dimensions optimisées, un point focal préservé et un système de secours immédiat en cas d'erreur de chargement.

## 2. Quand déclencher ce skill
- Lors de l'ajout de nouvelles images ou articles.
- Lors de l'intégration de téléversements dans le CMS.
- En cas de détection d'une image déformée, floue ou non chargée.

## 3. Fichiers à consulter
- `data/articles.ts`
- `components/cards/`
- `public/app.js`

## 4. Étapes à effectuer
1. **Ratios standardisés** :
   - Hero : Panoramique immersif (`21:9` ou `16:9` large).
   - Carte "Fresh off the Press" (grand format) : `16:9`.
   - Carte "Fresh off the Press" (standard) : `16:10`.
   - Miniature "Recent Articles" et Sidebar : `4:3` ou `1:1`.
2. **Système de Fallback Automatique** :
   - Attacher un gestionnaire `onerror` à chaque balise `<img>` pointant vers un visuel SVG/WebP vectoriel éditorial de secours garantissant qu'aucun espace gris vide n'apparaisse.
3. **Optimisation Next.js Image** :
   - Déclarer les domaines distants autorisés dans `next.config.ts`.
   - Définir les attributs `sizes` et `priority` sur l'image du Hero pour accélérer le LCP.

## 5. Erreurs à éviter
- Utiliser des images arbitraires sans rapport avec le sujet de l'article.
- Laisser une image échouer sans déclencher de fallback élégant.
- Omettre le texte alternatif (`alt`) descriptif.

## 6. Tests obligatoires
- Test de coupure réseau simulée sur une URL d'image -> vérification de l'activation immédiate du visuel de secours.
- Contrôle de non-déformation du sujet principal lors du redimensionnement mobile.

## 7. Critères d'acceptation
- Zéro image cassée visible sur l'ensemble de la plateforme.
- Cadrages impeccables et transitions fluides au survol.
