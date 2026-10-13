import { Article } from '@/types';
import { CATEGORIES } from './categories';
import { AUTHORS } from './authors';

const catAI = CATEGORIES.find((c) => c.slug === 'ai' || c.slug === 'intelligence-artificielle')!;
const catTech = CATEGORIES.find((c) => c.slug === 'technology' || c.slug === 'technologie')!;
const catLifestyle = CATEGORIES.find((c) => c.slug === 'lifestyle')!;
const catCulture = CATEGORIES.find((c) => c.slug === 'culture' || c.slug === 'digital')!;
const catSociete = CATEGORIES.find((c) => c.slug === 'societe')!;
const catGuides = CATEGORIES.find((c) => c.slug === 'guides')!;
const catComparatifs = CATEGORIES.find((c) => c.slug === 'comparatifs')!;

const authorKate = AUTHORS.find((a) => a.slug === 'kate-johnson')!;
const authorSteve = AUTHORS.find((a) => a.slug === 'steve-jones')!;
const authorClara = AUTHORS.find((a) => a.slug === 'clara-moreau')!;
const authorThomas = AUTHORS.find((a) => a.slug === 'thomas-laurent')!;

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Ce que les signaux numériques révèlent sur le comportement des marchés modernes',
    slug: 'ce-que-les-signaux-numeriques-revelent-sur-le-comportement-des-marches',
    excerpt: 'L’étincelle qui a allumé notre laboratoire est née au cœur d’une métropole effervescente. Derrière les flux de données brutes se cachent les nouvelles dynamiques de consommation et d’arbitrage algorithmique.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
    coverCaption: 'Visualisation générative des flux de télémesure et micro-signaux financiers',
    category: catAI,
    author: authorSteve,
    tags: ['Intelligence Artificielle', 'Data', 'Marchés', 'Tendances', 'Algorithmes'],
    readingTime: 7,
    publishedAt: '2026-03-26',
    isFeatured: true,
    isEditorChoice: true,
    isTrending: true,
    format: 'standard',
    views: 14250,
    likes: 890,
    commentsCount: 24,
    seo: {
      metaTitle: 'Signaux Numériques & Comportement des Marchés | Média Éditorial',
      metaDescription: 'Analyse approfondie de la capture des signaux faibles par les modèles de fondation et leur impact sur les décisions d’investissement modernes.',
    },
    content: `
### La genèse d'une rupture analytique

Les signaux numériques ont cessé d'être de simples relevés de clics ou des empreintes résiduelles. Aujourd’hui, ils incarnent le système nerveux central des écosystèmes connectés. Dans un monde saturé de stimuli, la valeur ne réside plus dans le volume de données collectées, mais dans la finesse d’extraction des variations imperceptibles.

> "L'analyse prédictive moderne ne cherche plus à deviner le futur : elle cartographie avec une précision millimétrique les résonances du présent."
> — Steve Jones, Enquête Tech

### Les trois piliers de la détection précoce

Pour comprendre comment les géants de la tech et les fonds quantitatifs exploitent ces micro-variations, il convient d'isoler trois dynamiques fondamentales :

1. **La vitesse de sédimentation des flux** : La réduction de la latence entre l’émission d’un signal comportemental et son intégration dans les modèles décisionnels.
2. **La corrélation multidimensionnelle** : Les modèles de langage et d’embedding connectent désormais des sources jadis hétérogènes (recherches textuelles, flux logistiques, requêtes API).
3. **L’immunité au bruit ambiant** : Les architectures neuronales récentes éliminent le spam statistique pour isoler les mouvements structurels profonds.

### Pourquoi les budgets marketing traditionnels échouent

La majorité des approches conventionnelles continuent d’évaluer la performance selon des métriques dépassées : coût par clic, impressions brutes ou taux d'ouverture artificiels. Or, l'attention humaine s'est fragmentée. Ce qui compte désormais, c'est l'engagement contextuel et la rémanence du signal.

Les organisations qui réussissent leur mutation investissent massivement dans des infrastructures de streaming temps réel, privilégiant la justesse contextuelle à l'agressivité publicitaire.
    `,
  },
  {
    id: 'art-2',
    title: 'L’impact des paysages immersifs dans l’esthétique numérique contemporaine',
    slug: 'impact-des-paysages-immersifs-dans-esthetique-numerique',
    excerpt: 'Explorer les frontières poreuses entre spatial computing, rendu volumétrique et abstraction sensorielle pour inventer une nouvelle grammaire visuelle du web.',
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=85',
    coverCaption: 'Environnement volumétrique dynamique généré en temps réel WebGPU',
    category: catCulture,
    author: authorKate,
    tags: ['Design', '3D', 'WebGPU', 'Art Numérique', 'Immersion'],
    readingTime: 5,
    publishedAt: '2026-03-24',
    isFeatured: true,
    isEditorChoice: false,
    isTrending: true,
    format: 'gallery',
    views: 18900,
    likes: 1240,
    commentsCount: 31,
    galleryImages: [
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1633493106115-46f9064ea277?auto=format&fit=crop&w=1200&q=85',
    ],
    seo: {
      metaTitle: 'Paysages Immersifs & Esthétique Numérique 2026',
      metaDescription: 'Comment le design volumétrique et la 3D interactive redéfinissent l’expérience utilisateur sur les interfaces éditoriales de prestige.',
    },
    content: `
### Vers une nouvelle matérialité de l'écran

L'écran plat n'est plus une barrière infranchissable : il est devenu une membrane translucide. Grâce aux progrès fulgurants de WebGPU et des shaders procéduraux, les interfaces éditoriales de 2026 intègrent des environnements immersifs capables de réagir en douceur aux mouvements de l'utilisateur.

L'objectif n'est pas d'encombrer le lecteur d'effets superflus, mais de créer une sensation de profondeur et de gravité visuelle qui ancre l'attention.

### La synthèse entre minimalisme et spatialité

* **Ombres physiques douces** : Fini les boîtes plates sans relief ; le design adopte une diffraction lumineuse subtile.
* **Typographie cinétique** : Les titres s'animent avec une retenue aristocratique, guidant naturellement le regard.
* **Micro-interactions tactiles** : Chaque carte et élément graphique possède une inertie calculée, proche des objets de luxe.
    `,
  },
  {
    id: 'art-3',
    title: 'Appareils modulaires et leur rôle décisif dans les workflows modernes',
    slug: 'appareils-modulaires-role-decisif-workflows-modernes',
    excerpt: 'Face à l’obsolescence programmée et à la rigidité des configurations monolithiques, l’écosystème matériel opère un retour en force vers les blocs interchangeables et l’ingénierie réparable.',
    coverImage: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1600&q=85',
    coverCaption: 'Poste de travail modulaire et modules d’entrées/sorties magnétiques',
    category: catTech,
    author: authorThomas,
    tags: ['Hardware', 'Productivité', 'Setup', 'Modularité', 'Innovation'],
    readingTime: 6,
    publishedAt: '2026-03-21',
    isFeatured: true,
    isEditorChoice: true,
    isTrending: false,
    format: 'review',
    views: 9800,
    likes: 670,
    commentsCount: 18,
    review: {
      productName: 'Station Modulaire Studio Pro X1',
      score: 9.4,
      pros: [
        'Architecture 100% réparable sans outils spécifiques',
        'Consommation énergétique ultra-maîtrisée (NPU dédié)',
        'Qualité de fabrication en aluminium recyclé brossé',
        'Compatibilité multi-OS instantanée sans pilotes propriétaires',
      ],
      cons: [
        'Tarif d’entrée élevé pour les modules d’extension PCIe',
        'Disponibilité initiale restreinte aux précommandes pro',
      ],
      verdict: 'Une référence absolue pour les créatifs et développeurs exigeant longévité, évolutivité et performances sans compromis.',
      price: '1 890 €',
      affiliateUrl: '#',
      affiliateLabel: 'Découvrir la station chez le constructeur',
    },
    seo: {
      metaTitle: 'Appareils Modulaires & Workflows 2026 | Test & Analyse',
      metaDescription: 'Enquête et banc d’essai sur les nouveaux matériels modulaires qui bouleversent l’organisation des studios numériques.',
    },
    content: `
### Pourquoi la rigidité industrielle touche à sa fin

Depuis plus d'une décennie, l'industrie électronique grand public nous a habitués à des appareils soudés, scellés sous vide, impossibles à réparer ou à faire évoluer. Mais une révolte silencieuse, menée par les développeurs, créateurs et partisans de la durabilité, renverse enfin la donne.

### L'avènement du plug-and-play magnétique

Les nouveaux standards de transmission à très haut débit permettent désormais de déporter les cartes d'accélération neuronale, les contrôleurs haptiques et les unités de stockage ultra-rapides en modules magnétiques amovibles à chaud.
    `,
  },
  {
    id: 'art-4',
    title: 'Mind Circuits : Ingénierie cognitive et transformation de soi par l’IA',
    slug: 'mind-circuits-ingenierie-cognitive-transformation-ia',
    excerpt: 'Quand l’intelligence artificielle cesse d’être un simple moteur de recherche pour devenir une prothèse intellectuelle et un miroir introspectif pour les penseurs contemporains.',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=85',
    coverCaption: 'Modélisation des réseaux neuronaux et représentations sémantiques',
    category: catAI,
    author: authorSteve,
    tags: ['Intelligence Artificielle', 'Cognition', 'Futur', 'Philosophie'],
    readingTime: 8,
    publishedAt: '2026-03-20',
    isFeatured: false,
    isEditorChoice: true,
    isTrending: true,
    format: 'standard',
    views: 12100,
    likes: 812,
    commentsCount: 19,
    seo: {
      metaTitle: 'Mind Circuits : L’IA comme Prothèse Cognitive',
      metaDescription: 'Réflexion prospective sur l’hybridation entre intelligence humaine et modèles de raisonnement avancés.',
    },
    content: `
### Le passage de l'automatisation à l'amplification

Les premiers débats autour de l'intelligence artificielle se sont concentrés sur la substitution : qui allait perdre son emploi ? Quels processus répétitifs allaient disparaître ?

Aujourd’hui, la question s'est métamorphosée. Nous constatons que les esprits les plus créatifs utilisent les modèles comme des caisses de résonance dialectique. Loin d'abêtir la réflexion, l'IA bien orchestrée pousse l'analyste à questionner ses angles morts et à confronter ses hypothèses avec une rigueur inédite.
    `,
  },
  {
    id: 'art-5',
    title: 'Sérénité urbaine : Trouver le calme au milieu de la saturation numérique',
    slug: 'serenite-urbaine-trouver-le-calme-saturation-numerique',
    excerpt: 'Dans des villes saturées de stimuli et d’écrans invasifs, réapprendre à concevoir des rituels de déconnexion volontaire et d’hygiène informationnelle devient un impératif vital.',
    coverImage: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=85',
    coverCaption: 'Pratique matinale de méditation et déconnexion en milieu métropolitain',
    category: catLifestyle,
    author: authorClara,
    tags: ['Lifestyle', 'Santé Mentale', 'Minimalisme', 'Méditation', 'Ville'],
    readingTime: 4,
    publishedAt: '2026-03-18',
    isFeatured: false,
    isEditorChoice: false,
    isTrending: false,
    format: 'standard',
    views: 7450,
    likes: 540,
    commentsCount: 12,
    seo: {
      metaTitle: 'Sérénité Urbaine & Hygiène Numérique | Guide Lifestyle',
      metaDescription: 'Conseils pratiques et rituels éprouvés pour préserver son attention et sa clarté mentale dans un quotidien hyper-connecté.',
    },
    content: `
### L'écologie de l'attention

Notre attention est la ressource la plus convoitée et la plus pillée du XXIe siècle. Chaque notification push, chaque voyant clignotant est une tentative de capture neuronale.

Pour préserver sa santé psychique sans pour autant fuir dans une cabane isolée au fond des bois, la solution réside dans la mise en place de zones franches technologiques au sein même de nos logements et de nos journées.
    `,
  },
  {
    id: 'art-6',
    title: 'Architecture autonome : Comment les agents intelligents redéfinissent l’entreprise',
    slug: 'architecture-autonome-agents-intelligents-redefinissent-entreprise',
    excerpt: 'Du simple bot conversationnel aux collectifs d’agents autonomes coordonnés par des protocoles décentralisés, plongée dans la nouvelle colonne vertébrale des organisations de pointe.',
    coverImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1600&q=85',
    coverCaption: 'Réseau d’agents autonomes et flux de synchronisation multi-modèles',
    category: catTech,
    author: authorKate,
    tags: ['Agents IA', 'Architecture Logicielle', 'Entreprise', 'Cloud', 'Automatisation'],
    readingTime: 9,
    publishedAt: '2026-03-15',
    isFeatured: false,
    isEditorChoice: true,
    isTrending: true,
    format: 'standard',
    views: 15300,
    likes: 1105,
    commentsCount: 27,
    seo: {
      metaTitle: 'Systèmes Autonomes & Agents IA en Entreprise | Dossier Tech',
      metaDescription: 'Comment les équipes d’ingénierie conçoivent et orchestrent des flottes d’agents intelligents pour démultiplier leur vélocité opérationnelle.',
    },
    content: `
### L'avènement des écosystèmes multi-agents

Les architectures logicielles connaissent leur plus grand bouleversement depuis l'avènement des micro-services au début des années 2010. Les entreprises les plus agiles ne conçoivent plus des applications comme des séquences statiques de code, mais comme des symphonies d'agents spécialisés capables de négocier, de valider et d'itérer en temps réel.
    `,
  },
  {
    id: 'art-7',
    title: 'L’utilisation des courbes fluides dans le design interactif de nouvelle génération',
    slug: 'utilisation-courbes-fluides-design-interactif',
    excerpt: 'Pourquoi la géométrie stricte et les grilles rigides cèdent la place à des transitions biomimétiques et des courbes organiques inspirées de la dynamique des fluides.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85',
    coverCaption: 'Courbes nurbs et shaders chromatiques pour interfaces dynamiques',
    category: catCulture,
    author: authorKate,
    tags: ['UI/UX', 'Design', 'Animation', 'Tendances', 'Ergonomie'],
    readingTime: 5,
    publishedAt: '2026-03-12',
    isFeatured: false,
    isEditorChoice: false,
    isTrending: false,
    format: 'standard',
    views: 8200,
    likes: 620,
    commentsCount: 15,
    seo: {
      metaTitle: 'Courbes Fluides & Design d’Interface 2026',
      metaDescription: 'Analyse des principes ergonomiques et mathématiques qui président au renouveau des courbes dans l’expérience web moderne.',
    },
    content: `
### L'adieu aux angles vifs

Pendant des décennies, le design numérique a été prisonnier des limitations de rendu du pixel raster. Les rectangles régnaient sans partage. Aujourd'hui, avec la puissance de calcul des puces graphiques intégrées et les capacités vectorielles des navigateurs modernes, la courbe fluide s'impose comme le langage de prédilection de l'élégance.
    `,
  },
  {
    id: 'art-8',
    title: 'Guide Ultime : Déployer et maîtriser des modèles de raisonnement en local',
    slug: 'guide-ultime-deployer-modeles-raisonnement-local',
    excerpt: 'Un tutoriel complet pas-à-pas pour configurer une station de travail privée, quantifier les poids de modèles open-source et préserver une confidentialité absolue sans dépendre du cloud.',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85',
    coverCaption: 'Cluster de calcul local et monitoring thermique sous charge d’inférence',
    category: catGuides,
    author: authorThomas,
    tags: ['Guides', 'Open Source', 'LLM', 'Local AI', 'Confidentialité'],
    readingTime: 12,
    publishedAt: '2026-03-08',
    isFeatured: false,
    isEditorChoice: true,
    isTrending: true,
    format: 'standard',
    views: 22400,
    likes: 1980,
    commentsCount: 45,
    seo: {
      metaTitle: 'Guide Déploiement IA en Local 2026 | Tutoriel Complet',
      metaDescription: 'Apprenez à installer, quantifier et orchestrer vos propres modèles de fondation sur votre machine sans aucune fuite de données.',
    },
    content: `
### La souveraineté de calcul à portée de main

Ne plus dépendre d'APIs tierces fermées, garantir le secret professionnel de ses données sensibles, et continuer à travailler hors-ligne : voilà les trois promesses majeures de l'IA locale.

Ce guide exhaustif détaille le dimensionnement matériel requis, le choix des quantifications (GGUF, EXL2) et la mise en place d'un serveur d'inférence sécurisé avec accélération matérielle.
    `,
  },
  {
    id: 'art-9',
    title: 'Comparatif 2026 : Les 5 meilleures stations de travail pour créatifs et développeurs',
    slug: 'comparatif-2026-meilleures-stations-travail-creatifs',
    excerpt: 'Nous avons soumis les cinq machines professionnelles les plus en vue à des séries de benchmarks intensifs : rendu 3D, compilation volumineuse, inférence IA et silence thermique.',
    coverImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=85',
    coverCaption: 'Banc de test comparatif des 5 stations professionnelles de référence',
    category: catComparatifs,
    author: authorThomas,
    tags: ['Comparatifs', 'Hardware', 'Benchmarks', 'PC Pro', 'Mac Studio'],
    readingTime: 10,
    publishedAt: '2026-03-02',
    isFeatured: false,
    isEditorChoice: true,
    isTrending: false,
    format: 'review',
    views: 17600,
    likes: 1340,
    commentsCount: 38,
    review: {
      productName: 'Apex Studio Ultimate Gen-4',
      score: 9.7,
      pros: [
        'Performances brutes inégalées en compilation et inférence',
        'Refroidissement par chambre à vapeur totalement inaudible',
        'Connectique Thunderbolt 5 complète en façade',
      ],
      cons: [
        'Prix stratosphérique réservé aux studios professionnels',
        'Poids conséquent pour les déplacements ponctuels',
      ],
      verdict: 'Le champion incontesté de l’année pour les équipes ne tolérant aucun compromis de temps de rendu.',
      price: '3 490 €',
      affiliateUrl: '#',
      affiliateLabel: 'Consulter l’offre de test partenaire',
    },
    seo: {
      metaTitle: 'Comparatif 2026 : Stations de Travail Professionnelles',
      metaDescription: 'Classement objectif et mesures réelles des meilleures stations pour graphistes, ingénieurs et monteurs vidéo.',
    },
    content: `
### Méthodologie et protocole de test

Pour garantir une équité absolue, chaque machine a été testée dans des conditions climatiques contrôlées (21°C ambiant), avec un protocole normalisé comprenant :
* Compilation complète d'un monorepo TypeScript de 150 000 lignes
* Rendu 4K d'une scène Blender volumétrique complexe
* Inférence soutenue sur un modèle de 70B de paramètres pendant 30 minutes consécutives
* Mesure du bruit en décibels à 50 cm de distance
    `,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return ARTICLES.filter((a) => a.isFeatured);
}

export function getRecentArticles(limit = 6): Article[] {
  return [...ARTICLES]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
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
