---
name: secure-authentication
description: Sécurisation des accès, séparation étanche entre comptes Administrateur et Lecteurs, gestion des sessions, cookies sécurisés et protection contre les attaques.
---

# SKILL 06 — SECURE AUTHENTICATION

## 1. Mission
Garantir la sécurité intégrale de l'application : interdiction absolue d'accès au tableau de bord `/admin` pour les lecteurs simples, protection des sessions, cookies sécurisés (`HttpOnly`, `SameSite=Lax`, `Secure`), hachage fort et prévention des attaques CSRF et injections.

## 2. Quand déclencher ce skill
- Lors de la configuration des routes `/admin`, `/login`, `/register`, `/profil`.
- Lors de la validation des sessions et tokens.
- Avant chaque mise en production ou validation sécurité.

## 3. Fichiers à consulter
- `app/admin/page.tsx`
- `types/index.ts`
- `public/app.js` (gestion des états d'authentification)

## 4. Étapes à effectuer
1. **Séparation étanche des rôles** :
   - Rôle `ADMIN` : Accès exclusif à la route `/admin` et aux mutations de contenu.
   - Rôle `READER` : Accès aux favoris, préférences de lecture, commentaires et gestion newsletter.
2. **Protection de la route `/admin`** :
   - Redirection automatique vers l'écran de connexion si non authentifié en tant qu'admin.
   - Pas de lien direct vers l'administration dans le header public pour les visiteurs.
3. **Contrôle d'intégrité** :
   - Validation stricte des entrées utilisateurs (emails, slugs, contenus).
   - Protection contre le Cross-Site Scripting (XSS) lors du rendu des contenus éditoriaux.

## 5. Erreurs à éviter
- Permettre à un compte lecteur de poster des articles ou d'accéder au CMS.
- Exposer des mots de passe ou tokens dans le `localStorage` non chiffré ou les logs du navigateur.

## 6. Tests obligatoires
- Test de tentative d'accès à `/admin` avec un rôle lecteur -> accès refusé immédiat.
- Test de déconnexion et invalidation de session.

## 7. Critères d'acceptation
- Zéro accès non autorisé au dashboard d'administration.
- Écran de connexion ergonomique et sécurisé.
