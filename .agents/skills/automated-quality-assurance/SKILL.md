---
name: automated-quality-assurance
description: Assurance qualité automatisée, tests unitaires, validation TypeScript strict, non-régression et recette multi-résolutions.
---

# SKILL 12 — AUTOMATED QUALITY ASSURANCE

## 1. Mission
Vérifier de manière rigoureuse et systématique le bon fonctionnement de chaque composant, route et formulaire du média Ontario. Éradiquer les régressions, valider l'intégrité TypeScript et documenter les résultats de tests avec preuves d'exécution.

## 2. Quand déclencher ce skill
- Avant de déclarer toute tâche terminée.
- Après chaque modification de composant ou de logique de données.
- Avant chaque build de production ou livraison Git.

## 3. Fichiers à consulter
- `package.json`
- `tsconfig.json`
- `app/` et `components/`
- `public/app.js`

## 4. Étapes à effectuer
1. **Contrôle TypeScript Strict** :
   - Exécuter la vérification des types (`npx tsc --noEmit` ou équivalent).
   - Corriger toute anomalie de type, variable orpheline ou signature erronée.
2. **Contrôle de l'Intégrité Fonctionnelle** :
   - Tester le parcours lecteur : Accueil -> Clic article -> Lecture -> Commentaire -> Favori.
   - Tester le parcours administrateur : Connexion -> Création article -> Insertion bloc -> Sauvegarde -> Publication.
   - Tester l'inscription à la newsletter avec validation d'adresse.
3. **Contrôle Multi-Résolutions** :
   - Vérifier le rendu sur résolutions représentatives : 1920px (Desktop large), 1440px (Desktop standard), 1024px (Tablette paysage), 768px (Tablette portrait), 375px (Mobile compact).

## 5. Erreurs à éviter
- Déclarer qu'une fonctionnalité est terminée sans l'avoir réellement exécutée.
- Masquer une erreur de console sans la résoudre.
- Simuler des résultats de tests non exécutés.

## 6. Tests obligatoires
- Test complet du cycle de publication d'article.
- Test de compilation du build sans erreur ni warning bloquant.

## 7. Critères d'acceptation
- Aucune erreur TypeScript, aucune exception non gérée dans la console.
- Preuve explicite de bon fonctionnement fournie dans le rapport de recette.
