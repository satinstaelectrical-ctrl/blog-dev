---
name: accessibility-motion-engineer
description: Accessibilité numérique WCAG 2.1 AA, navigation au clavier, gestion du focus, contraste visuel et respect de prefers-reduced-motion.
---

# SKILL 11 — ACCESSIBILITY MOTION ENGINEER

## 1. Mission
Garantir que le média Ontario est utilisable par tous les publics, y compris les personnes en situation de handicap : conformité WCAG 2.1 niveau AA, navigation intégrale au clavier sans piège de focus, labels ARIA explicites, et adaptation fluide des animations selon les préférences de réduction de mouvement (`prefers-reduced-motion`).

## 2. Quand déclencher ce skill
- Lors de la conception de modales, menus déroulants, carrousels et tiroirs de navigation.
- Lors de l'implémentation d'animations ou de transitions CSS.
- Lors des revues d'accessibilité et de contraste.

## 3. Fichiers à consulter
- `components/layout/Header.tsx`
- `components/search/SpotlightSearch.tsx`
- `app/globals.css`
- `public/index.html`

## 4. Étapes à effectuer
1. **Navigation au Clavier & Anneau de Focus** :
   - Assurer un indicateur de focus bien visible (`focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none`).
   - Permettre la fermeture de la recherche Spotlight et du menu mobile via la touche `Escape`.
2. **Attributs sémantiques et ARIA** :
   - Définir `aria-label` sur tous les boutons d'icônes (recherche, bascule de thème, fermer).
   - Utiliser des balises HTML5 sémantiques (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
3. **Respect de `prefers-reduced-motion`** :
   - Désactiver les effets de zoom ou défilements automatiques lorsque l'utilisateur a configuré la réduction des mouvements :
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

## 5. Erreurs à éviter
- Retirer l'outline de focus (`outline: none`) sans alternative visible.
- Utiliser un contraste de texte insuffisant sur fond sombre ou pastel.
- Piéger le focus clavier dans une modale sans issue.

## 6. Tests obligatoires
- Test complet de navigation d'une page à l'autre uniquement à l'aide des touches `Tab`, `Entrée` et `Échap`.
- Vérification du contraste chromatique des textes et badges (ratio ≥ 4.5:1 pour le texte normal).

## 7. Critères d'acceptation
- 100% des éléments interactifs sont utilisables sans souris.
- Zéro violation bloquante WCAG AA.
