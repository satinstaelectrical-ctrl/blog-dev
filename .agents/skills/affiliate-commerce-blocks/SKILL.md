---
name: affiliate-commerce-blocks
description: Conception et intégration de cartes de produits affiliés (Amazon, marchands partenaires), conformité légale (rel="sponsored", disclaimers), design élégant et suivi éthique.
---

# SKILL 07 — AFFILIATE COMMERCE BLOCKS

## 1. Mission
Créer et maintenir les composants de monétisation éditoriale par affiliation : cartes produits `AffiliateProductCard`, boutons d'action d'achat, comparatifs de caractéristiques, dans le respect scrupuleux des conditions d'utilisation d'Amazon Partenaires et de la législation commerciale (transparence, mention sponsorisée, attributs `rel="sponsored noopener noreferrer"`).

## 2. Quand déclencher ce skill
- Lors de l'insertion ou de la modification d'un bloc produit affilié dans un article.
- Lors de la conception de guides d'achat ou de bancs d'essai comparatifs.
- Lors des audits de conformité aux programmes d'affiliation.

## 3. Fichiers à consulter
- `components/cards/` (ou composant dédié `AffiliateProductCard.tsx`)
- `types/index.ts`
- `data/articles.ts`
- `public/app.js`

## 4. Étapes à effectuer
1. **Conception du composant `AffiliateProductCard`** :
   - Présentation : Fond gris très clair (`#F4F6F9`) ou blanc avec fine bordure, coins arrondis `16px`, ombre légère.
   - Badge supérieur : `PRODUIT RECOMMANDÉ` ou `MEILLEUR RAPPORT QUALITÉ/PRIX`.
   - Visuel produit net avec padding généreux.
   - Titre du produit et marque.
   - Caractéristiques clés avec puces stylisées (3 à 5 points forts).
   - Points positifs / points négatifs éditoriaux.
   - Bouton d'achat rouge corail (`#EF4248`) avec libellé clair : `Voir sur Amazon` ou `Voir l'offre chez le marchand`.
   - Mention légale obligatoire sous le bouton : *« Lien affilié : nous pouvons percevoir une commission sur vos achats sans surcoût pour vous. »*
2. **Conformité technique des liens** :
   - Protocole sécurisé `https://` obligatoire.
   - Attributs obligatoires : `target="_blank" rel="sponsored noopener noreferrer"`.
3. **Variantes graphiques** :
   - Variante 1 : Carte horizontale (desktop) devenant verticale sur mobile.
   - Variante 2 : Encart compact pour insertion en cours de paragraphe.
   - Variante 3 : Tableau comparatif multi-produits.

## 5. Erreurs à éviter
- Fabriquer de faux prix fluctuants ou de fausses notes utilisateurs sans API officielle Amazon active.
- Masquer le caractère commercial du lien.
- Utiliser des redirections obscures ou trompeuses.

## 6. Tests obligatoires
- Vérification de la présence de `rel="sponsored"` sur tous les liens d'affiliation.
- Test de rendu en mode clair et en mode sombre (lisibilité parfaite du texte et du bouton).
- Test de redimensionnement responsive (passage vertical sur mobile).

## 7. Critères d'acceptation
- Le bloc d'affiliation ressemble à un composant éditorial de prestige digne de la presse spécialisée.
- 100% de conformité aux règles de transparence légale et d'Amazon Partenaires.
