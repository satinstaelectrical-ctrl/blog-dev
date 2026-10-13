---
name: premium-editorial-design
description: Direction artistique, système de design tokens CSS, typographie éditoriale, palettes claires et mode sombre Bleu Nuit (#071426).
---

# SKILL 02 — PREMIUM EDITORIAL DESIGN

## 1. Mission
Garantir l'excellence de la direction artistique du média, le respect des proportions dorées, la cohérence des échelles typographiques, la subtilité des arrondis et l'application stricte de la palette Bleu Nuit en mode sombre.

## 2. Quand déclencher ce skill
- Lors de la définition ou retouche des variables CSS globales (`:root` et `[data-theme="dark"]`).
- Lors de la création de nouveaux composants graphiques (cartes, bannières, boutons, modales).
- Dès qu'une incohérence de style, de couleur d'accent ou de contraste est constatée.

## 3. Fichiers à consulter
- `app/globals.css`
- `docs/ANALYSE_VISUELLE_ONTARIO.md`
- `public/index.html` (styles en ligne et configuration Tailwind)
- `components/ui/Badge.tsx`, `components/ui/Button.tsx`

## 4. Étapes à effectuer
1. **Calibrage des design tokens** :
   - Mode clair : `--page-bg: #ffffff; --surface: #ffffff; --surface-soft: #f4f6f9; --accent: #ef4248; --border-color: #e9ebef;`.
   - Mode sombre : `--page-bg: #071426; --surface: #0e2137; --surface-soft: #122b45; --accent: #ef5056; --border-color: #28445e;`.
2. **Harmonisation typographique** :
   - Titres : `Space Grotesk` avec lettre-espacement resserré (`-0.025em`) et graisse `700`.
   - Corps de texte : `Inter` avec interligne généreux (`1.75` à `1.85`) pour le confort de lecture prolongée.
3. **Rayons de courbure (Radii)** :
   - Boutons et badges : `rounded-full` (`9999px`).
   - Cartes et blocs de contenu : `rounded-2xl` (`14px` à `16px`).
4. **Micro-interactions** :
   - Transitions douces de 150ms à 250ms avec courbe `cubic-bezier(0.4, 0, 0.2, 1)`.

## 5. Erreurs à éviter
- Utiliser un fond noir OLED (`#000000`) ou gris zinc sans relief pour le dark mode au lieu du Bleu Nuit profond.
- Appliquer des dégradés saturés ou des bordures trop épaisses.
- Utiliser des couleurs génériques non harmonisées.

## 6. Tests obligatoires
- Contrôle de contraste WCAG AA sur tous les niveaux de texte en mode clair et sombre.
- Test de bascule dynamique sans clignotement (`flash of unstyled content`).

## 7. Critères d'acceptation
- Le mode sombre dégage une atmosphère Bleu Nuit luxueuse et feutrée.
- L'accent rouge corail illumine les points d'interaction sans agresser le regard.
- La hiérarchie visuelle entre H1, H2, H3 et métadonnées est limpide.
