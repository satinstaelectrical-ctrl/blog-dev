import { Author } from '@/types';

export const AUTHORS: Author[] = [
  {
    id: 'author-kate',
    name: 'Kate Johnson',
    slug: 'kate-johnson',
    role: 'Artiste Numérique & Experte IA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Je suis une artiste et chercheuse numérique explorant les intersections entre technologies émergentes, créativité algorithmique et culture contemporaine. Je partage ici analyses critiques, prospectives et retours d’expérience.',
    socials: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      website: 'https://katejohnson.design',
    },
    articleCount: 14,
  },
  {
    id: 'author-steve',
    name: 'Steve Jones',
    slug: 'steve-jones',
    role: 'Rédacteur en Chef & Prospectiviste',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Journaliste tech depuis plus de dix ans. Passionné par l’architecture des systèmes, la cybersécurité et l’impact macro-économique des plateformes numériques.',
    socials: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    articleCount: 29,
  },
  {
    id: 'author-clara',
    name: 'Clara Moreau',
    slug: 'clara-moreau',
    role: 'Journaliste Société & Éthique Tech',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    bio: 'Observatrice des mutations culturelles et des nouveaux usages générés par les algorithmes, les réseaux décentralisés et le travail nomade.',
    socials: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
    articleCount: 18,
  },
  {
    id: 'author-thomas',
    name: 'Thomas Laurent',
    slug: 'thomas-laurent',
    role: 'Responsable Lab & Bancs d’Essai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'Ingénieur de formation, testeur intransigeant de composants, stations de travail modulaires et périphériques ergonomiques.',
    socials: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
    articleCount: 22,
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}
