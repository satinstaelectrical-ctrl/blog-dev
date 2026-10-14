import { Article } from '@/types';
import { CATEGORIES } from './categories';
import { AUTHORS } from './authors';

const catAI = CATEGORIES.find((c) => c.slug === 'ai' || c.slug === 'intelligence-artificielle')!;
const catCrypto = CATEGORIES.find((c) => c.slug === 'crypto')!;
const catDigital = CATEGORIES.find((c) => c.slug === 'digital' || c.slug === 'culture')!;
const catStartups = CATEGORIES.find((c) => c.slug === 'startups')!;
const catTech = CATEGORIES.find((c) => c.slug === 'technology' || c.slug === 'technologie')!;
const catTrends = CATEGORIES.find((c) => c.slug === 'trends')!;
const catLifestyle = CATEGORIES.find((c) => c.slug === 'lifestyle')!;
const catGuides = CATEGORIES.find((c) => c.slug === 'guides')!;
const catComparatifs = CATEGORIES.find((c) => c.slug === 'comparatifs')!;

const authorSteve = AUTHORS.find((a) => a.slug === 'steve-jones')!;
const authorKate = AUTHORS.find((a) => a.slug === 'kate-johnson')!;
const authorThomas = AUTHORS.find((a) => a.slug === 'thomas-laurent')!;
const authorClara = AUTHORS.find((a) => a.slug === 'clara-moreau')!;

export const ARTICLES: Article[] = [
  // =========================================================================
  // 1. HERO SLIDER ARTICLES (Capture 4 Theme Ontario)
  // =========================================================================
  {
    id: 'art-hero-1',
    title: 'Next Gen Marketing: Innovative Strategies',
    slug: 'next-gen-marketing-innovative-strategies',
    excerpt: 'In a city where ambition meets innovation, our agency’s story found its beginning. With one small idea, we created a space where creativity and generative models work side by side to transform modern business narratives.',
    coverImage: '/images/hero_ontario_orange.jpg',
    coverCaption: 'Next Gen Creative Studio — Stratégie digitale et convergence IA',
    category: catAI,
    author: authorSteve,
    tags: ['TECH / AI', 'Digital Marketing', 'Innovation', 'Future of Work'],
    readingTime: 6,
    publishedAt: '2026-03-26',
    isHero: true,
    isFeatured: true,
    isEditorChoice: true,
    isTrending: true,
    status: 'published',
    format: 'standard',
    views: 28400,
    likes: 1890,
    commentsCount: 34,
    seo: {
      metaTitle: 'Next Gen Marketing: Innovative Strategies | Ontario Magazine',
      metaDescription: 'Explore the fusion between generative algorithms and spatial computing redefining contemporary digital marketing.',
    },
    content: `
### La genèse d'une rupture narrative

L’étincelle qui a propulsé notre rédaction est née de l’observation des bouleversements sans précédent survenus dans l’arbitrage de l’attention. Derrière les flux de données brutes se cachent les nouvelles dynamiques de consommation et d'affinité émotionnelle.

> "Le véritable luxe de demain ne résidera pas dans l’accès universel à l’information, mais dans la clarté et la pertinence de sa mise en scène."
> — Steve Jones, Enquête Tech

### Les trois piliers de la transformation

1. **La vitesse de sédimentation des flux** : La réduction de la latence entre l’émission d’un signal comportemental et son intégration dans les modèles décisionnels.
2. **La corrélation multidimensionnelle** : Les modèles de langage et d’embedding connectent désormais des sources jadis hétérogènes.
3. **L’immunité au bruit ambiant** : Les architectures neuronales récentes éliminent le spam statistique pour isoler les mouvements structurels profonds.
    `,
  },

  // =========================================================================
  // 2. FRESH OFF THE PRESS (Capture 5 — 6 Cartes Exactes de la Grille)
  // =========================================================================
  {
    id: 'art-fresh-1',
    title: 'Commanding Unknown Terrain: the Lessons from Bold Pioneers',
    slug: 'commanding-unknown-terrain-lessons-bold-pioneers',
    excerpt: 'L’exploration des nouveaux paradigmes algorithmiques exige une audace comparable à celle des premières traversées océaniques. Retour sur les initiatives qui osent défier le consensus.',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85',
    coverCaption: 'Explorateur en scaphandre rétro-futuriste orange',
    category: catAI,
    author: authorSteve,
    tags: ['ARTIFICIAL INTELLIGENCE', 'GLOBAL TRENDS', 'INNOVATION'],
    readingTime: 3,
    publishedAt: '2026-03-26',
    isHero: false,
    isFeatured: true,
    isEditorChoice: true,
    isTrending: true,
    status: 'published',
    format: 'standard',
    views: 18200,
    likes: 940,
    commentsCount: 22,
    seo: {
      metaTitle: 'Commanding Unknown Terrain | Lessons from Bold Pioneers',
      metaDescription: 'Découvrez comment les pionniers de la tech ouvrent la voie à des territoires inexplorés.',
    },
    content: `Lorsque les frontières du savoir conventionnel s’estompent, seuls les esprits audacieux osent cartographier le vide.`,
  },
  {
    id: 'art-fresh-2',
    title: 'What Digital Signals Tell Us About Market Behavior',
    slug: 'what-digital-signals-tell-us-about-market-behavior',
    excerpt: 'Derrière les fluctuations en apparence chaotiques des cours boursiers se déploie une partition complexe de signaux faibles que les modèles de fondation apprennent à décoder.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    coverCaption: 'Visualisation dynamique des flux de télémesure et micro-signaux',
    category: catCrypto,
    author: authorSteve,
    tags: ['CRYPTO', 'MACHINE LEARNING', 'MARKETS'],
    readingTime: 2,
    publishedAt: '2026-03-26',
    isHero: false,
    isFeatured: false,
    isEditorChoice: true,
    isTrending: true,
    status: 'published',
    format: 'standard',
    views: 14250,
    likes: 890,
    commentsCount: 24,
    seo: {
      metaTitle: 'What Digital Signals Tell Us About Market Behavior',
      metaDescription: 'Analyse approfondie de la capture des signaux faibles par les modèles de fondation.',
    },
    content: `Les signaux numériques ont cessé d'être de simples relevés de clics. Aujourd’hui, ils incarnent le système nerveux central des marchés connectés.`,
  },
  {
    id: 'art-fresh-3',
    title: 'Urban Mindfulness: Finding Peace Above Noise',
    slug: 'urban-mindfulness-finding-peace-above-noise',
    excerpt: 'Dans un environnement métropolitain saturé de stimuli sensoriels, concevoir des rituels de pause attentionnelle n’est plus un luxe mais une discipline de survie cognitive.',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85',
    coverCaption: 'Méditation face au crépuscule urbain',
    category: catLifestyle,
    author: authorSteve,
    tags: ['LIFESTYLE', 'FUTURE OF WORK', 'WELLNESS'],
    readingTime: 4,
    publishedAt: '2026-03-26',
    isHero: false,
    isFeatured: false,
    isEditorChoice: false,
    isTrending: false,
    status: 'published',
    format: 'standard',
    views: 9400,
    likes: 670,
    commentsCount: 16,
    seo: {
      metaTitle: 'Urban Mindfulness: Finding Peace Above Noise',
      metaDescription: 'Rituels et principes pour préserver sa clarté mentale en milieu métropolitain.',
    },
    content: `Notre attention est la ressource la plus convoitée du siècle. Réapprendre à la protéger est le premier acte d'émancipation.`,
  },
  {
    id: 'art-fresh-4',
    title: 'How Bold Aesthetics Redefine Product Identity',
    slug: 'how-bold-aesthetics-redefine-product-identity',
    excerpt: 'L’époque du minimalisme stérile et des surfaces uniformes s’efface devant le retour des textures tactiles, des réflexions prismatiques et des contrastes assumés.',
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=85',
    coverCaption: 'Formes organiques 3D avec finitions laquées et chromatiques',
    category: catDigital,
    author: authorSteve,
    tags: ['DIGITAL', 'DESIGN', 'BRANDING'],
    readingTime: 2,
    publishedAt: '2026-03-26',
    isHero: false,
    isFeatured: false,
    isEditorChoice: true,
    isTrending: true,
    status: 'published',
    format: 'gallery',
    views: 16700,
    likes: 1120,
    commentsCount: 29,
    seo: {
      metaTitle: 'How Bold Aesthetics Redefine Product Identity',
      metaDescription: 'Comment le design volumétrique et les couleurs affirmées renouvellent l’identité des produits haut de gamme.',
    },
    content: `Les objets qui captivent ne cherchent plus à s'effacer : ils revendiquent une présence matérielle puissante.`,
  },
  {
    id: 'art-fresh-5',
    title: 'Mind Circuits: Engineering the Future Self',
    slug: 'mind-circuits-engineering-the-future-self',
    excerpt: 'Quand l’intelligence artificielle cesse d’être un simple moteur de recherche pour devenir une prothèse intellectuelle et un miroir introspectif pour les penseurs contemporains.',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=85',
    coverCaption: 'Cyborg avec halo doré lumineux',
    category: catAI,
    author: authorSteve,
    tags: ['ARTIFICIAL INTELLIGENCE', 'TECHNOLOGY', 'COGNITION'],
    readingTime: 4,
    publishedAt: '2026-03-26',
    isHero: false,
    isFeatured: false,
    isEditorChoice: true,
    isTrending: true,
    status: 'published',
    format: 'standard',
    views: 13500,
    likes: 870,
    commentsCount: 19,
    seo: {
      metaTitle: 'Mind Circuits: Engineering the Future Self',
      metaDescription: 'Réflexion prospective sur l’hybridation entre cognition humaine et assistants neuronaux.',
    },
    content: `Loin d'abêtir la réflexion, l'IA bien orchestrée pousse l'analyste à questionner ses angles morts avec une rigueur inédite.`,
  },
  {
    id: 'art-fresh-6',
    title: 'Building Smarter Systems: How AI Reshapes Business Operations',
    slug: 'building-smarter-systems-ai-reshapes-business-operations',
    excerpt: 'Du simple bot conversationnel aux flottes d’agents autonomes coordonnés, découvrez la nouvelle colonne vertébrale des entreprises à haute vélocité.',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85',
    coverCaption: 'Robot androïde futuriste à la console de contrôle',
    category: catTech,
    author: authorSteve,
    tags: ['BUSINESS GROWTH', 'TECHNOLOGY', 'AGENTS IA'],
    readingTime: 3,
    publishedAt: '2026-03-26',
    isHero: false,
    isFeatured: false,
    isEditorChoice: true,
    isTrending: true,
    status: 'published',
    format: 'standard',
    views: 19800,
    likes: 1450,
    commentsCount: 31,
    seo: {
      metaTitle: 'Building Smarter Systems: How AI Reshapes Business Operations',
      metaDescription: 'Comment les flottes d’agents intelligents redéfinissent l’efficacité opérationnelle des leaders de l’industrie.',
    },
    content: `L'entreprise de 2026 ne gère plus des organigrammes rigides, mais orchestre des écosystèmes d'agents collaboratifs.`,
  },

  // =========================================================================
  // 3. RECENT ARTICLES (Capture 2 & 3 — Cartes Horizontales & Sidebar)
  // =========================================================================
  {
    id: 'art-recent-1',
    title: 'Why Most Marketing Budgets Fail to Move Revenue',
    slug: 'why-most-marketing-budgets-fail-to-move-revenue',
    excerpt: 'In a city where ambition meets innovation, our agency’s story found its beginning. With one small idea, we created a space where creativity and technology work side by side to transform business outcomes.',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    coverCaption: 'Portrait éditorial contemporain avec textures corail',
    category: catStartups,
    author: authorSteve,
    tags: ['NEWS', 'BUSINESS GROWTH', 'MARKETING'],
    readingTime: 2,
    publishedAt: '2026-03-25',
    isHero: false,
    isFeatured: false,
    isEditorChoice: true,
    isTrending: true,
    status: 'published',
    format: 'standard',
    views: 15400,
    likes: 910,
    commentsCount: 28,
    seo: {
      metaTitle: 'Why Most Marketing Budgets Fail to Move Revenue',
      metaDescription: 'Analyse des erreurs récurrentes dans l’allocation des budgets publicitaires modernes.',
    },
    content: `L'illusion de la portée brute a conduit des générations de marques à gaspiller leurs investissements sur des métriques de vanité.`,
  },
  {
    id: 'art-recent-2',
    title: 'The Impact of Strategic Marketing on Business Transformation',
    slug: 'impact-strategic-marketing-business-transformation',
    excerpt: 'In a city where ambition meets innovation, our agency’s story found its beginning. With one small idea, we created a space where creativity and technology work side by side to transform...',
    coverImage: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=85',
    coverCaption: 'Robot assis dans un espace paysager féerique',
    category: catTech,
    author: authorSteve,
    tags: ['NEWS', 'DIGITAL MARKETING', 'TRANSFORMATION'],
    readingTime: 2,
    publishedAt: '2026-03-25',
    isHero: false,
    isFeatured: false,
    isEditorChoice: false,
    isTrending: false,
    status: 'published',
    format: 'standard',
    views: 11200,
    likes: 740,
    commentsCount: 15,
    seo: {
      metaTitle: 'The Impact of Strategic Marketing on Business Transformation',
      metaDescription: 'Comment le positionnement stratégique précède l’exécution technique.',
    },
    content: `La stratégie n'est pas un document statique : c'est une boussole adaptative mise à l'épreuve des rétroactions client en temps réel.`,
  },
  {
    id: 'art-recent-3',
    title: 'How Strategic Marketing Transforms Businesses',
    slug: 'how-strategic-marketing-transforms-businesses',
    excerpt: 'In the heart of a bustling city, where innovation meets opportunity, the story of our digital agency began. Like all great journeys, it started with a single creative spark and relentless curiosity.',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=85',
    coverCaption: 'Portrait futuriste avec écouteurs audio haute fidélité',
    category: catDigital,
    author: authorSteve,
    tags: ['NEWS', 'FUTURE OF WORK', 'BRANDING'],
    readingTime: 3,
    publishedAt: '2026-03-24',
    isHero: false,
    isFeatured: false,
    isEditorChoice: false,
    isTrending: false,
    status: 'published',
    format: 'standard',
    views: 8900,
    likes: 580,
    commentsCount: 11,
    seo: {
      metaTitle: 'How Strategic Marketing Transforms Businesses',
      metaDescription: 'La transformation des entreprises à travers le prisme de l’identité narrative.',
    },
    content: `L'adhésion d'une communauté ne s'achète pas avec des clics sponsorisés : elle se mérite par la cohérence du propos.`,
  },

  // =========================================================================
  // 4. SIDEBAR FEATURED POSTS (Capture 2 & 3 — Carrousel à 3 Puces)
  // =========================================================================
  {
    id: 'art-sidebar-1',
    title: 'The Impact of Immersive Landscapes in Digital Aesthetics',
    slug: 'impact-immersive-landscapes-digital-aesthetics',
    excerpt: 'Explorer les frontières poreuses entre spatial computing, rendu volumétrique et abstraction sensorielle pour inventer une nouvelle grammaire visuelle du web.',
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=85',
    coverCaption: 'Paysages volumétriques procéduraux 3D',
    category: catDigital,
    author: authorSteve,
    tags: ['DIGITAL', '3D', 'LANDSCAPES'],
    readingTime: 5,
    publishedAt: '2025-09-07',
    isHero: false,
    isFeatured: true,
    isEditorChoice: true,
    isTrending: true,
    status: 'published',
    format: 'standard',
    views: 24500,
    likes: 1680,
    commentsCount: 42,
    seo: {
      metaTitle: 'The Impact of Immersive Landscapes in Digital Aesthetics',
      metaDescription: 'Le design volumétrique et les shaders procéduraux au service de la narration.',
    },
    content: `L'écran plat n'est plus une frontière infranchissable : il devient un vitrail dynamique sur des mondes persistants.`,
  },
  {
    id: 'art-sidebar-2',
    title: 'Modular Devices and Their Role in Modern Workflows',
    slug: 'modular-devices-and-their-role-in-modern-workflows',
    excerpt: 'Face à l’obsolescence programmée et à la rigidité des configurations monolithiques, l’écosystème matériel opère un retour en force vers les blocs interchangeables et l’ingénierie réparable.',
    coverImage: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1600&q=85',
    coverCaption: 'Poste de travail modulaire en vue isométrique 3D',
    category: catTech,
    author: authorSteve,
    tags: ['HARDWARE', 'MODULAR', 'PRODUCTIVITY'],
    readingTime: 6,
    publishedAt: '2025-09-07',
    isHero: false,
    isFeatured: true,
    isEditorChoice: true,
    isTrending: false,
    status: 'published',
    format: 'review',
    views: 18900,
    likes: 1220,
    commentsCount: 26,
    seo: {
      metaTitle: 'Modular Devices and Their Role in Modern Workflows',
      metaDescription: 'Enquête sur les nouveaux postes de travail modulaires et l’ingénierie réparable.',
    },
    content: `Les nouveaux standards d'interconnexion à très haut débit permettent enfin de détacher la puissance de calcul du boîtier principal.`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return ARTICLES.filter((a) => a.isFeatured);
}

export function getHeroArticles(): Article[] {
  return ARTICLES.filter((a) => a.isHero || a.isFeatured);
}

export function getFreshArticles(): Article[] {
  return ARTICLES.filter((a) => a.id.startsWith('art-fresh-'));
}

export function getRecentArticles(limit = 6): Article[] {
  const recent = ARTICLES.filter((a) => a.id.startsWith('art-recent-') || a.id.startsWith('art-fresh-'));
  return recent.slice(0, limit);
}

export function getTrendingArticles(limit = 5): Article[] {
  return ARTICLES.filter((a) => a.isTrending).slice(0, limit);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return ARTICLES.filter((a) => a.category.slug === categorySlug);
}

export function getArticlesByAuthor(authorSlug: string): Article[] {
  return ARTICLES.filter((a) => a.author.slug === authorSlug);
}

export function getRelatedArticles(currentSlug: string, categorySlug: string, limit = 3): Article[] {
  return ARTICLES.filter((a) => a.slug !== currentSlug && a.category.slug === categorySlug).slice(0, limit);
}
