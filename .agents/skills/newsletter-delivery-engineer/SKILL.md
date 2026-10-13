---
name: newsletter-delivery-engineer
description: Système d'inscription à la newsletter professionnelle, validation d'email, double opt-in, gestion des consentements RGPD et intégration des services d'envoi.
---

# SKILL 13 — NEWSLETTER DELIVERY ENGINEER

## 1. Mission
Développer et maintenir le dispositif d'abonnement à la lettre d'information éditoriale : bannières d'inscription épurées, validation syntaxique d'adresse, protocole de double opt-in, gestion des consentements conformes au RGPD, état de confirmation immédiat et adaptateurs pour fournisseurs d'envoi transactionnel (Resend, Brevo, Sendgrid, Mailchimp).

## 2. Quand déclencher ce skill
- Lors de la modification des blocs newsletter sur la page d'accueil, le bas d'article ou le footer.
- Lors de la gestion des abonnés dans le panneau d'administration.
- Lors de l'interfaçage avec un service externe d'envoi d'emails.

## 3. Fichiers à consulter
- `components/newsletter/NewsletterBanner.tsx`
- `app/admin/page.tsx`
- `public/index.html` et `public/app.js`

## 4. Étapes à effectuer
1. **Design du bloc d'inscription** :
   - Présentation fidèle à Ontario : fond gris très clair (`#F4F6F9`) ou blanc avec fine bordure, typographie sobre, champ email arrondi (`rounded-full`), bouton rouge corail (`#EF4248`).
   - Disposition horizontale sur grand écran et empilée sur mobile.
2. **Traitement de l'inscription** :
   - Validation stricte du format email par regex RFC 5322.
   - Enregistrement de l'abonné avec date et statut (`pending_confirmation` ou `active`).
   - Accusé de réception immédiat avec message de succès rassurant.
3. **Gestion dans le tableau de bord** :
   - Table des abonnés avec statut, date d'inscription et possibilité d'export CSV.
   - Séparation stricte : l'inscription à la newsletter ne doit pas créer de compte utilisateur lecteur sans consentement explicite.

## 5. Erreurs à éviter
- Prétendre qu'un e-mail réel a été envoyé si aucun service d'envoi n'est configuré (fournir un adaptateur propre avec logs en mode dev).
- Inscrire un utilisateur sans recueillir son consentement.
- Bloquer l'interface pendant la requête d'inscription.

## 6. Tests obligatoires
- Test d'inscription avec email invalide -> rejet immédiat avec message d'erreur clair.
- Test d'inscription avec email valide -> validation, retour visuel positif et enregistrement dans la liste.

## 7. Critères d'acceptation
- Expérience d'abonnement limpide, sans friction et parfaitement responsive.
- Liste des abonnés administrable et exportable.
