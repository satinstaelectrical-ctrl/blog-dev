---
name: web-performance-engineer
description: Optimisation des Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms), minification, préchargement critique et efficacité d'affichage.
---

# SKILL 10 — WEB PERFORMANCE ENGINEER

## 1. Mission
Assurer une vélocité maximale de chargement et d'interaction sur mobile et desktop : réduction drastique du temps jusqu'au premier octet (TTFB), préchargement de l'image LCP du Hero, limitation du blocage du thread principal par JavaScript et stabilité visuelle intégrale (zéro saut de contenu).

## 2. Quand déclencher ce skill
- Lors de l'ajout de dépendances ou de scripts externes.
- Lors de l'optimisation des images et des polices.
- Lors des audits de performance pré-livraison.

## 3. Fichiers à consulter
- `app/layout.tsx`
- `app/globals.css`
- `next.config.ts`
- `public/index.html`

## 4. Étapes à effectuer
1. **Optimisation du Largest Contentful Paint (LCP)** :
   - Précharger l'image de couverture du Hero via `<link rel="preload" as="image">` ou `priority={true}` sur `next/image`.
   - Héberger les polices ou utiliser `font-display: swap` pour éliminer le FOIT (Flash of Invisible Text).
2. **Élimination du Cumulative Layout Shift (CLS)** :
   - Attribuer des ratios fixes ou dimensions explicites (`aspect-ratio`, `width`, `height`) sur tous les conteneurs d'images et bannières.
3. **Réduction de l'Interaction to Next Paint (INP)** :
   - Éviter les calculs bloquants dans les gestionnaires de clic.
   - Utiliser `requestAnimationFrame` ou du CSS matériel (`transform`, `opacity`) pour les animations.

## 5. Erreurs à éviter
- Charger des vidéos lourdes en autoplay avant l'interaction utilisateur.
- Injecter des dizaines de trackers tiers sans chargement différé (`defer` / `async`).

## 6. Tests obligatoires
- Mesure du LCP, CLS et INP via les outils de performance navigateur.
- Vérification du temps de rendu sous émulation réseau 4G lente.

## 7. Critères d'acceptation
- LCP ≤ 2,5 s au 75e percentile.
- CLS ≤ 0,1.
- INP ≤ 200 ms.
