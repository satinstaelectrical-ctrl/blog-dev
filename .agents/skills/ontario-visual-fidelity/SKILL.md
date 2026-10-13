---
name: ontario-visual-fidelity
description: Vérification et calibrage de la fidélité visuelle du site par rapport au thème WordPress officiel Ontario (ontariowp.com / ThemeForest).
---

# SKILL 01 — ONTARIO VISUAL FIDELITY

## 1. Mission
Assurer une conformité visuelle absolue entre les composants développés et les captures officielles du thème Ontario. Comparer les compositions, hiérarchies, marges, rayons de courbure, typographies et contrastes.

## 2. Quand déclencher ce skill
- Avant et après toute modification de la mise en page, du header, du hero, de la grille ou du footer.
- Lors des audits de conformité graphique et de revue par le Directeur Artistique.
- Dès qu'un écart visuel est détecté sur une résolution donnée (Desktop, Tablette, Mobile).

## 3. Fichiers à consulter
- `docs/ANALYSE_VISUELLE_ONTARIO.md`
- `app/globals.css` et `app/page.tsx`
- `components/layout/Header.tsx` et `components/layout/Footer.tsx`
- `components/cards/ArticleCardFeatured.tsx`, `components/cards/ArticleCardGrid.tsx`
- `public/index.html` et `public/app.js`

## 4. Étapes à effectuer
1. **Inspection des captures de référence** : examiner Image A (`media_1791853489223.png`) et les détails par section.
2. **Revue du Header flottant** : vérifier la forme de pilule (`rounded-full`), la surélévation au-dessus du Hero, la translucidité avec flou (`backdrop-blur`) et les espacements de navigation.
3. **Revue du Hero** : confirmer le rendu pleine largeur 100vw, le dégradé sombre asymétrique sur la gauche et la lisibilité du titre.
4. **Revue de la grille "Fresh off the Press"** : vérifier le motif asymétrique (1 grand + 2 étroits / 2 étroits + 1 grand).
5. **Revue des rubriques pastel** : contrôler les 6 teintes poudrées, l'alignement et la typographie épurée.
6. **Revue du Footer & Sidebar** : valider le fond gris bleuté clair (`#F4F6F9`) et la hiérarchie des widgets.

## 5. Erreurs à éviter
- Enfermer le Hero dans un conteneur rigide de 1200px.
- Transformer le header en barre rectangulaire opaque ordinaire.
- Utiliser des emojis criards sur les cartes pastel au lieu d'une typographie sobre.
- Proposer une grille 3x1 uniforme au lieu du layout asymétrique magazine.
- Afficher des images cassées ou des ratios déformés.

## 6. Tests obligatoires
- Test visuel sur 1920px, 1440px, 1024px, 768px et 375px.
- Test de contraste du texte superposé sur le Hero (ratio minimum 4.5:1).
- Test du comportement sticky du header lors du défilement vertical.

## 7. Critères d'acceptation
- Le header flotte au-dessus du Hero avec une silhouette de pilule translucide.
- Le Hero occupe 100vw sans marges parasites.
- La grille d'articles respecte l'alternance asymétrique.
- Le rendu général évoque immédiatement l'esthétique minimaliste magazine de la démo officielle.
