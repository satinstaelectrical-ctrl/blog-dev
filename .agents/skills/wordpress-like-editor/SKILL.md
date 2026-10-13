---
name: wordpress-like-editor
description: Expérience rédactionnelle riche de type Gutenberg / WordPress (blocs modulaires, insertion par slash commande /, médias, produits affiliés, corbeille et historique).
---

# SKILL 04 — WORDPRESS LIKE EDITOR

## 1. Mission
Fournir au propriétaire du média une expérience d'administration et de rédaction comparable à l'éditeur Gutenberg de WordPress : composition par blocs interchangeables, insertion de médias riches, formatage sans code, prévisualisation en direct, cycle de vie complet des articles (brouillon, programmé, publié, corbeille, restauration).

## 2. Quand déclencher ce skill
- Lors de l'amélioration ou de la création des formulaires d'édition d'article sous `/admin`.
- Lors de l'ajout de nouveaux types de blocs (produits affiliés, vidéo, citation, tableau).
- Lors de la gestion des états de publication et de la corbeille.

## 3. Fichiers à consulter
- `app/admin/page.tsx`
- `types/index.ts`
- `data/articles.ts`
- `public/app.js` (module CMS & admin modal)

## 4. Étapes à effectuer
1. **Architecture par blocs éditoriaux** :
   - Définir le modèle de blocs : `ParagraphBlock`, `HeadingBlock` (H2/H3/H4), `ImageBlock` (avec légende et alt), `QuoteBlock` (pull-quote), `AffiliateBlock` (carte produit), `VideoBlock` (YouTube / MP4), `CodeBlock`.
2. **Menu d'insertion rapide** :
   - Proposer une palette d'insertion déclenchée par un bouton `+` ou la commande `/` au clavier.
   - Permettre la réorganisation des blocs (monter, descendre, dupliquer, supprimer).
3. **Panneau latéral de réglages d'article** :
   - Statut : Brouillon, En relecture, Programmé, Publié.
   - Date effective de publication.
   - Catégorie principale et tags.
   - Image de couverture avec prévisualisation et point focal.
   - Calcul automatique et ajustement du temps de lecture.
   - Champs SEO : Titre méta, description méta, slug personnalisé.
4. **Gestion du cycle de vie & Corbeille** :
   - Mise à la corbeille réversible avec confirmation.
   - Restauration en 1 clic vers le statut brouillon.
   - Suppression définitive protégée par confirmation explicite.

## 5. Erreurs à éviter
- Forcer le rédacteur à saisir du code HTML brut.
- Perdre les données en cours de saisie lors d'un rafraîchissement (nécessité d'un autosave).
- Permettre la suppression définitive sans confirmation de sécurité.

## 6. Tests obligatoires
- Test complet du flux : création de brouillon -> insertion de 3 blocs variés -> prévisualisation -> publication -> mise à la corbeille -> restauration.
- Test de vérification que l'article publié apparaît immédiatement sur la page d'accueil sans recompilation du code.

## 7. Critères d'acceptation
- L'administrateur peut rédiger et mettre en page un article complet avec visuels et liens affiliés sans toucher au code source.
- Les états brouillon et corbeille sont strictement isolés de la vue publique.
