import { SitePage } from '@/types';

export const SITE_PAGES: SitePage[] = [
  {
    id: 'page-about',
    title: 'À Propos d’Ontario Magazine',
    slug: 'about',
    content: `
# L'Esprit Éditorial Ontario

Né de la volonté d'offrir un journalisme technologique et culturel exigeant, **Ontario Magazine** explore les frontières où l'innovation logicielle rencontre l'esthétique contemporaine et les mutations sociétales.

### Notre Charte Déontologique
1. **Rigueur et Indépendance** : Nos bancs d’essai sont réalisés en totale autonomie, sans droit de relecture des fabricants.
2. **Transparence d'Affiliation** : Chaque partenariat ou lien marchand est clairement déclaré auprès de nos lecteurs.
3. **Sobriété et Beauté** : Nous défendons une expérience de lecture apaisée, sans popups intrusifs ni bannières agressives.
    `,
    updatedAt: '2026-03-20',
    isPublished: true,
    metaDescription: 'Découvrez la vision éditoriale d’Ontario Magazine, média d’avant-garde dédié aux technologies, au design et aux cultures numériques.',
  },
  {
    id: 'page-contact',
    title: 'Nous Contacter & Rédaction',
    slug: 'contact',
    content: `
# Entrer en Contact avec la Rédaction

Que vous souhaitiez soumettre une tribune, nous alerter sur une innovation de rupture ou proposer un partenariat institutionnel, notre équipe vous répond sous 48 heures.

- **Rédaction générale** : redaction@ontariowp.com
- **Partenariats & Régie Média** : partenariats@ontariowp.com
- **Bureaux** : 27 Division St, New York, NY 10002, United States
    `,
    updatedAt: '2026-03-18',
    isPublished: true,
    metaDescription: 'Coordonnées de la rédaction d’Ontario Magazine, contacts presse et partenariats.',
  },
  {
    id: 'page-mentions',
    title: 'Mentions Légales & Confidentialité',
    slug: 'legal',
    content: `
# Mentions Légales & RGPD

Conformément à la réglementation européenne sur la protection des données personnelles (RGPD), Ontario Magazine garantit le respect absolu de votre vie privée.

- **Éditeur** : Ontario Média Group Inc.
- **Hébergement** : Infrastructure Cloud sécurisée à haute résilience.
- **Cookies & Traceurs** : Nous n’utilisons que des cookies techniques strictement nécessaires à votre session de navigation.
    `,
    updatedAt: '2026-01-10',
    isPublished: true,
    metaDescription: 'Mentions légales, politique de confidentialité et conformité RGPD d’Ontario Magazine.',
  },
];
