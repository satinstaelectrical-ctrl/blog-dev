---
name: production-deployment-engineer
description: Préparation au déploiement en production, intégrité des builds Next.js, gestion des variables d'environnement (.env.example), hygiène Git et monitoring.
---

# SKILL 14 — PRODUCTION DEPLOYMENT ENGINEER

## 1. Mission
Préparer et valider la mise en production de la plateforme média Ontario sur les hébergeurs modernes (Vercel, Node.js VPS, Docker) : compilation irréprochable du build de production (`npm run build`), gestion sécurisée des secrets sans fuite, hygiène du dépôt Git (`.gitignore`, commits atomiques) et documentation de déploiement claire.

## 2. Quand déclencher ce skill
- Avant de pousser sur le dépôt distant Git (`blog-dev.git`).
- Lors de la vérification de la compilabilité du projet.
- Lors de la rédaction des guides de configuration et de déploiement.

## 3. Fichiers à consulter
- `package.json`
- `next.config.ts`
- `.gitignore`
- `.env.example`
- `README.md`

## 4. Étapes à effectuer
1. **Validation du Build de Production** :
   - Exécuter la commande de build et vérifier l'absence d'erreurs de compilation, de modules manquants ou de routes cassées.
2. **Hygiène des Secrets** :
   - Vérifier que `.gitignore` exclut rigoureusement `.env`, `.env.local`, `.env.production`, `node_modules` et `.next`.
   - Fournir un fichier `.env.example` complet avec des valeurs fictives documentées.
3. **Synchronisation Git** :
   - Configurer la branche principale `main`.
   - Lier le remote officiel fourni par l'utilisateur (`https://github.com/satinstaelectrical-ctrl/blog-dev.git`).
   - Effectuer des commits clairs et structurés.

## 5. Erreurs à éviter
- Pousser des clés secrètes ou des identifiants réels dans le dépôt Git.
- Livrer un code qui ne compile pas en mode production (`npm run build` en échec).
- Déployer sans tester au préalable les routes critiques en local.

## 6. Tests obligatoires
- Test d'exécution du build de production.
- Vérification de l'absence de fichiers sensibles traqués par Git (`git status`).

## 7. Critères d'acceptation
- Le build se termine avec succès et sans avertissement critique.
- Le dépôt Git est propre, documenté et prêt pour un déploiement continu.
