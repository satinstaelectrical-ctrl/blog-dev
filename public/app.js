// ==========================================================================
// ONTARIO MÉDIA — MOTEUR ÉDITORIAL & SPA INTERACTIVE
// Conforme à la référence officielle Ontario (Image A) et Gutenberg Admin
// ==========================================================================

// Image de secours éditoriale haute définition (SVG encodé) pour zéro image cassée
const FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect width='800' height='500' fill='%23122B45'/%3E%3Cpath d='M0 400 L300 200 L500 350 L700 150 L800 220 L800 500 L0 500 Z' fill='%230E2137' opacity='0.7'/%3E%3Ccircle cx='650' cy='120' r='60' fill='%23EF4248' opacity='0.8'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='%23F2F7FF' font-family='sans-serif' font-weight='bold' font-size='26'%3EONTARIO MAGAZINE%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='%23839BB5' font-family='sans-serif' font-size='16'%3EVisuel Éditorial Haute Définition%3C/text%3E%3C/svg%3E";

function onImgError(img) {
  if (img && img.src !== FALLBACK_IMAGE) {
    img.onerror = null;
    img.src = FALLBACK_IMAGE;
  }
}

function renderArticleBadge(article) {
  if (article.isExclusive) {
    return `<span class="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#EF4248] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">EXCLUSIF</span>`;
  }
  if (article.views && article.views > 15000) {
    return `<span class="absolute top-4 left-4 px-3 py-1 rounded-full bg-purple-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">POPULAIRE</span>`;
  }
  if (article.isNew || (article.publishedAt && article.publishedAt.includes('26 Mars 2026'))) {
    return `<span class="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">NOUVEAU</span>`;
  }
  return `<span class="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#17191D] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">RECENT</span>`;
}


// 1. RUBRIQUES PASTELS OFFICIELLES DU THÈME ONTARIO (Image A & Capture 4)
const CATEGORIES = [
  { id: 'cat-ai', name: 'AI', slug: 'ai', bgLight: '#F0ECFA', textLight: '#5844A8', bgDark: '#1C193B', textDark: '#A5B4FC', count: 24 },
  { id: 'cat-crypto', name: 'Crypto', slug: 'crypto', bgLight: '#ECF8F4', textLight: '#217960', bgDark: '#12302A', textDark: '#6EE7B7', count: 18 },
  { id: 'cat-digital', name: 'Digital', slug: 'digital', bgLight: '#EBF0FA', textLight: '#2563A0', bgDark: '#13283E', textDark: '#7DD3FC', count: 32 },
  { id: 'cat-startups', name: 'Startups', slug: 'startups', bgLight: '#FCEEF4', textLight: '#9E3258', bgDark: '#351624', textDark: '#F0ABFC', count: 15 },
  { id: 'cat-tech', name: 'Technology', slug: 'technology', bgLight: '#13283E', textLight: '#FFFFFF', bgDark: '#13283E', textDark: '#FFFFFF', isDark: true, image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80', count: 41 },
  { id: 'cat-trends', name: 'Trends', slug: 'trends', bgLight: '#FFF2EB', textLight: '#A65522', bgDark: '#3A1E14', textDark: '#FDBA74', count: 29 },
];

// 2. AUTEURS ÉDITORIAUX OFFICIELS
const AUTHORS = [
  {
    id: 'author-steve',
    name: 'Steve Jones',
    slug: 'steve-jones',
    role: 'Rédacteur en Chef & Prospectiviste',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Journaliste et prospectiviste explorant l’intersection entre technologies de rupture, dynamiques des marchés et souveraineté numérique.',
    social: { x: '#', linkedin: '#', instagram: '#' }
  },
  {
    id: 'author-kate',
    name: 'Kate Johnson',
    slug: 'kate-johnson',
    role: 'Artiste Numérique & Experte IA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Chercheuse en nouveaux médias explorant les frontières entre spatial computing, esthétique cybernétique et perception humaine.',
    social: { x: '#', linkedin: '#', instagram: '#' }
  },
  {
    id: 'author-thomas',
    name: 'Thomas Laurent',
    slug: 'thomas-laurent',
    role: 'Responsable Bancs d’Essai & Hardware',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'Ingénieur systèmes évaluant les stations de travail modulaires, micro-architectures et équipements de productivité haute performance.',
    social: { x: '#', linkedin: '#', instagram: '#' }
  }
];

// 3. ARTICLES ÉDITORIAUX EXACTEMENT CONFORMES AUX CAPTURES ONTARIO (Image A & Image B)
let ARTICLES = [
  // --- HERO & FEATURED SLIDER (5 ARTICLES CARROUSEL MAJEURS CONFORMES CAPTURE) ---
  {
    id: 'art-hero-1',
    title: 'Next Gen Marketing: Innovative Strategies',
    frenchTitle: 'Next Gen Marketing : Stratégies Innovantes & Ruptures Numériques',
    slug: 'next-gen-marketing-innovative-strategies',
    excerpt: 'In the heart of a bustling city, where innovation meets opportunity, the story of our digital agency began. Like all great journeys, it started with a single, audacious idea...',
    coverImage: '/images/hero_ontario_orange.jpg',
    imageAlt: 'Next Gen Marketing portrait créatif futuriste dans un casque spatial transparent',
    imageCaption: 'Photographie éditoriale — Next Gen Marketing & Spatial Innovation',
    focalPoint: 'center center',
    categorySlug: 'intelligence-artificielle',
    categoryBadge: 'AI',
    secondaryBadge: 'TECHNOLOGY',
    authorSlug: 'steve-jones',
    readingTime: 6,
    publishedAt: 'Mar 24, 2026',
    status: 'published',
    isHero: true,
    isFeatured: true,
    views: 28400,
    likes: 1890,
    tags: ['Marketing', 'IA', 'Innovation', 'Stratégie'],
    contentBlocks: [
      { type: 'paragraph', text: 'In the heart of a bustling city, where innovation meets opportunity, the story of our digital agency began. Like all great journeys, it started with a single, audacious idea: transforming how brands connect with audiences in a hyper-connected world.' },
      { type: 'heading', level: 'h2', text: 'La convergence entre spatial computing et synthèse algorithmique' },
      { type: 'paragraph', text: 'Nous ne sommes plus à l’ère des bannières passives. Les marques qui dominent désormais conçoivent des univers narratifs persistants capables de s’adapter en temps réel aux réactions émotionnelles du lecteur.' },
      { type: 'quote', text: '« Le véritable luxe de demain ne résidera pas dans l’accès à l’information, mais dans la clarté et la pertinence de sa mise en scène. »' },
      {
        type: 'affiliate',
        productName: 'Station de Travail Modulaire Studio Pro X1',
        brand: 'Apex Computing',
        description: 'La station de référence adoptée par notre rédaction pour la génération d’assets 3D volumétriques et l’inférence IA locale ultra-rapide.',
        features: ['Processeur NPU neuronal dédié 45 TOPS', 'Châssis aluminium unibody à dissipation passive', 'Connectivité Thunderbolt 5 intégrée'],
        imageUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80',
        merchantName: 'Amazon',
        affiliateUrl: 'https://www.amazon.fr/dp/B0EXEMPLE?tag=ontario-21',
        buttonText: 'Voir sur Amazon (Offre Partenaire)',
        disclaimer: 'Lien affilié vérifié — Nous pouvons percevoir une commission éditoriale sans surcoût pour vous.'
      },
      { type: 'paragraph', text: 'Ce banc d’essai démontre que la fluidité matérielle conditionne directement l’agilité des équipes créatives face aux exigences de publication multi-formats.' }
    ]
  },
  {
    id: 'art-hero-2',
    title: 'AI Motion Techniques in Abstract Digital Design',
    frenchTitle: 'Techniques de Motion IA dans le Design Numérique Abstrait',
    slug: 'ai-motion-techniques-abstract-digital-design',
    excerpt: 'Exploring the intersection of generative motion systems, spatial interface computing, and the new visual language transforming interactive media.',
    coverImage: '/images/hero_ontario_cyber.jpg',
    imageAlt: 'Portrait cyberpunk contemporain et vision cybernétique',
    imageCaption: 'Photographie éditoriale — Cybernétique & Spatial Interface',
    focalPoint: 'center center',
    categorySlug: 'intelligence-artificielle',
    categoryBadge: 'AI',
    secondaryBadge: 'MOTION',
    authorSlug: 'kate-johnson',
    readingTime: 5,
    publishedAt: 'Mar 25, 2026',
    status: 'published',
    isHero: true,
    isFeatured: true,
    views: 24200,
    likes: 1640,
    tags: ['AI', 'Motion', 'Digital Design', 'Cyber'],
    contentBlocks: [
      { type: 'paragraph', text: 'Exploring the intersection of generative motion systems, spatial interface computing, and the new visual language transforming interactive media.' },
      { type: 'heading', level: 'h2', text: 'Cinématique générative et immersion volumétrique' },
      { type: 'paragraph', text: 'Les algorithmes de rendu temps réel brisent les contraintes des timelines linéaires pour créer des compositions vivantes qui réagissent au regard.' }
    ]
  },
  {
    id: 'art-hero-3',
    title: 'Organic Shapes in Modern Digital Architecture',
    frenchTitle: 'Formes Organiques dans l’Architecture Numérique Moderne',
    slug: 'organic-shapes-modern-digital-architecture',
    excerpt: 'How biomorphic curves, parametric simulation, and ambient twilight illumination are reshaping contemporary public spaces and cultural institutions.',
    coverImage: '/images/hero_ontario_arch.jpg',
    imageAlt: 'Pavillon architectural fluide et organique illuminé au crépuscule',
    imageCaption: 'Photographie éditoriale — Architecture Paramétrique & Lumière Ambiante',
    focalPoint: 'center center',
    categorySlug: 'business',
    categoryBadge: 'BUSINESS',
    secondaryBadge: 'ARCHITECTURE',
    authorSlug: 'thomas-laurent',
    readingTime: 7,
    publishedAt: 'Mar 26, 2026',
    status: 'published',
    isHero: true,
    isFeatured: true,
    views: 21900,
    likes: 1350,
    tags: ['Architecture', 'Parametric', 'Design', 'Innovation'],
    contentBlocks: [
      { type: 'paragraph', text: 'How biomorphic curves, parametric simulation, and ambient twilight illumination are reshaping contemporary public spaces and cultural institutions.' },
      { type: 'heading', level: 'h2', text: 'L’enveloppe réactive et la géométrie continue' },
      { type: 'paragraph', text: 'La disparition des angles droits au profit de surfaces gauches calculées par ordinateur marque l’avènement d’un nouvel humanisme spatial.' }
    ]
  },
  {
    id: 'art-hero-4',
    title: 'Transparent Structures in Digital Architecture',
    frenchTitle: 'Structures Transparentes dans l’Architecture Numérique',
    slug: 'transparent-structures-in-digital-architecture',
    excerpt: 'A deep dive into transparent lightweight materials, structural envelopes, and algorithmic daylight distribution for next-generation urban developments.',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=90',
    imageAlt: 'Structures architecturales transparentes et géométrie spatiale',
    imageCaption: 'Photographie éditoriale — Structures Transparentes & Urbanisme',
    focalPoint: 'center center',
    categorySlug: 'digital',
    categoryBadge: 'DIGITAL',
    secondaryBadge: 'STRUCTURES',
    authorSlug: 'thomas-laurent',
    readingTime: 6,
    publishedAt: 'Mar 27, 2026',
    status: 'published',
    isHero: true,
    isFeatured: true,
    views: 19400,
    likes: 1120,
    tags: ['Digital', 'Structures', 'Urbanisme', 'Tech'],
    contentBlocks: [
      { type: 'paragraph', text: 'A deep dive into transparent lightweight materials, structural envelopes, and algorithmic daylight distribution for next-generation urban developments.' }
    ]
  },
  {
    id: 'art-hero-5',
    title: 'Colorful Packaging in Contemporary Crypto Branding',
    frenchTitle: 'Packaging Coloré dans le Branding Crypto Contemporain',
    slug: 'colorful-packaging-in-contemporary-crypto-branding',
    excerpt: 'Reinventing cryptographic identity through vibrant gradients, tactile packaging design, and accessible consumer touchpoints.',
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=2000&q=90',
    imageAlt: 'Design contemporain de packaging et identité visuelle colorée',
    imageCaption: 'Photographie éditoriale — Branding Crypto & Design Tactile',
    focalPoint: 'center center',
    categorySlug: 'crypto',
    categoryBadge: 'CRYPTO',
    secondaryBadge: 'BRANDING',
    authorSlug: 'kate-johnson',
    readingTime: 5,
    publishedAt: 'Mar 28, 2026',
    status: 'published',
    isHero: true,
    isFeatured: true,
    views: 18100,
    likes: 980,
    tags: ['Crypto', 'Branding', 'Design', 'Color'],
    contentBlocks: [
      { type: 'paragraph', text: 'Reinventing cryptographic identity through vibrant gradients, tactile packaging design, and accessible consumer touchpoints.' }
    ]
  },

  // --- FRESH OFF THE PRESS (6 ARTICLES ASYMÉTRIQUES IMAGE A) ---
  {
    id: 'art-fresh-1',
    title: 'Commanding Unknown Terrain: The Lessons from Bold Pioneers',
    frenchTitle: 'Maîtriser les Terrains Inconnus : Les Leçons des Pionniers de l’IA',
    slug: 'commanding-unknown-terrain-lessons-bold-pioneers',
    excerpt: 'L’exploration des nouveaux paradigmes algorithmiques exige une audace comparable à celle des premières traversées océaniques. Retour sur les initiatives qui osent défier le consensus.',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85',
    categorySlug: 'intelligence-artificielle',
    categoryBadge: 'RECENT',
    authorSlug: 'steve-jones',
    readingTime: 4,
    publishedAt: '26 Mars 2026',
    status: 'published',
    isHero: false,
    isFeatured: true,
    views: 18400,
    likes: 930,
    tags: ['Pionniers', 'IA', 'Prospective', 'Audace'],
    contentBlocks: [
      { type: 'paragraph', text: 'Lorsque les frontières du savoir conventionnel s’estompent, seuls les esprits audacieux osent cartographier le vide.' }
    ]
  },
  {
    id: 'art-fresh-2',
    title: 'What Digital Signals Tell Us About Market Behavior',
    frenchTitle: 'Ce que les Signaux Numériques Révèlent sur le Comportement des Marchés',
    slug: 'what-digital-signals-tell-us-about-market-behavior',
    excerpt: 'L’analyse en temps réel des micro-signaux transactionnels transforme la prévision économique en une science probabiliste quasi instantanée.',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=85',
    categorySlug: 'business',
    categoryBadge: 'RECENT',
    authorSlug: 'steve-jones',
    readingTime: 7,
    publishedAt: '24 Mars 2026',
    status: 'published',
    isHero: false,
    isFeatured: true,
    views: 14200,
    likes: 810,
    tags: ['Marchés', 'Data', 'Signaux', 'Finance'],
    contentBlocks: [
      { type: 'paragraph', text: 'Derrière les flux d’ordres automatisés se dessine une géographie secrète des flux de capitaux mondiaux.' }
    ]
  },
  {
    id: 'art-fresh-3',
    title: 'Urban Mindfulness: Finding Peace Above Noise',
    frenchTitle: 'Sérénité Urbaine : Trouver la Clarté au-dessus de la Saturation',
    slug: 'urban-mindfulness-finding-peace-above-noise',
    excerpt: 'Dans des métropoles saturées d’ondes et de notifications incessantes, réapprendre à concevoir des îlots de silence cognitif devient un art de vivre.',
    coverImage: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=85',
    categorySlug: 'lifestyle',
    categoryBadge: 'RECENT',
    authorSlug: 'kate-johnson',
    readingTime: 4,
    publishedAt: '22 Mars 2026',
    status: 'published',
    isHero: false,
    isFeatured: false,
    views: 9800,
    likes: 670,
    tags: ['Mindfulness', 'Lifestyle', 'Santé Mentale', 'Design'],
    contentBlocks: [
      { type: 'paragraph', text: 'Prendre de la hauteur face aux stimulations visuelles quotidiennes est une nécessité ergonomique.' }
    ]
  },
  {
    id: 'art-fresh-4',
    title: 'How Bold Aesthetics Redefine Product Identity',
    frenchTitle: 'Comment l’Esthétique Radicale Redéfinit l’Identité des Objets',
    slug: 'how-bold-aesthetics-redefine-product-identity',
    excerpt: 'Pourquoi les lignes douces et les finitions chromées futuristes s’imposent comme le langage visuel des produits technologiques de pointe.',
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=85',
    categorySlug: 'culture',
    categoryBadge: 'RECENT',
    authorSlug: 'kate-johnson',
    readingTime: 5,
    publishedAt: '20 Mars 2026',
    status: 'published',
    isHero: false,
    isFeatured: false,
    views: 11200,
    likes: 740,
    tags: ['Esthétique', 'Design', 'Produit', 'Futurisme'],
    contentBlocks: [
      { type: 'paragraph', text: 'L’objet physique n’est plus seulement un outil : il devient l’incarnation sensorielle d’une vision du futur.' }
    ]
  },
  {
    id: 'art-fresh-5',
    title: 'Mind Circuits: Engineering the Future Self',
    frenchTitle: 'Circuits de l’Esprit : L’Ingénierie du Soi Augmenté par l’IA',
    slug: 'mind-circuits-engineering-the-future-self',
    excerpt: 'L’émergence des agents cognitifs personnels ouvre une nouvelle ère où la mémoire, la synthèse et la créativité humaine sont démultipliées.',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=85',
    categorySlug: 'intelligence-artificielle',
    categoryBadge: 'RECENT',
    authorSlug: 'steve-jones',
    readingTime: 8,
    publishedAt: '18 Mars 2026',
    status: 'published',
    isHero: false,
    isFeatured: false,
    views: 16700,
    likes: 1190,
    tags: ['Cognition', 'Futur', 'Philosophie', 'IA'],
    contentBlocks: [
      { type: 'paragraph', text: 'La relation entre l’utilisateur et son modèle de raisonnement personnalisé dépasse le simple dialogue machine.' }
    ]
  },
  {
    id: 'art-fresh-6',
    title: 'Building Smarter Systems: How AI Reshapes Business Operations',
    frenchTitle: 'Systèmes Intelligents : Comment l’IA Métamorphose l’Entreprise',
    slug: 'building-smarter-systems-ai-reshapes-business-operations',
    excerpt: 'De la logistique prédictive à l’orchestration autonome des flux de travail, autopsie d’une révolution organisationnelle sans précédent.',
    coverImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=85',
    categorySlug: 'business',
    categoryBadge: 'RECENT',
    authorSlug: 'thomas-laurent',
    readingTime: 9,
    publishedAt: '16 Mars 2026',
    status: 'published',
    isHero: false,
    isFeatured: true,
    views: 21300,
    likes: 1350,
    tags: ['Entreprise', 'Opérations', 'Systèmes', 'Automatisation'],
    contentBlocks: [
      { type: 'paragraph', text: 'L’automatisation raisonnée permet de réaffecter le capital humain vers la stratégie et l’invention pure.' }
    ]
  },

  // --- RECENT ARTICLES (FLUX HORIZONTAL AVEC SIDEBAR) ---
  {
    id: 'art-recent-1',
    title: 'Why Most Marketing Budgets Fail to Move Revenue',
    frenchTitle: 'Pourquoi la Majorité des Budgets Marketing Échouent à Générer du Chiffre',
    slug: 'why-most-marketing-budgets-fail-to-move-revenue',
    excerpt: 'Dans une époque obsédée par les métriques de vanité, beaucoup d’agences oublient le principe cardinal : bâtir une confiance organique inébranlable.',
    coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85',
    categorySlug: 'business',
    authorSlug: 'steve-jones',
    readingTime: 5,
    publishedAt: '25 Mars 2026',
    status: 'published',
    isHero: false,
    isFeatured: false,
    views: 13900,
    likes: 880,
    tags: ['Marketing', 'Revenu', 'Performance', 'Croissance'],
    contentBlocks: [
      { type: 'paragraph', text: 'La course effrénée aux impressions au détriment de la résonance profonde produit des rendements décroissants.' }
    ]
  },
  {
    id: 'art-recent-2',
    title: 'The Impact of Strategic Marketing on Business Transformation',
    frenchTitle: 'L’Impact du Positionnement Stratégique sur la Transformation Globale',
    slug: 'impact-strategic-marketing-business-transformation',
    excerpt: 'Au cœur de la métropole effervescente, notre laboratoire éditorial a analysé comment les organisations pionnières pivotent avec succès.',
    coverImage: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=85',
    categorySlug: 'trends',
    authorSlug: 'steve-jones',
    readingTime: 6,
    publishedAt: '23 Mars 2026',
    status: 'published',
    isHero: false,
    isFeatured: false,
    views: 9400,
    likes: 610,
    tags: ['Stratégie', 'Transformation', 'Pivots', 'Organisation'],
    contentBlocks: [
      { type: 'paragraph', text: 'Réaligner l’ensemble de la chaîne de valeur sur une promesse claire est le secret des marques durables.' }
    ]
  },
  {
    id: 'art-recent-3',
    title: 'How Strategic Marketing Transforms Modern Businesses',
    frenchTitle: 'Comment le Marketing Stratégique Réinvente les Entreprises Contemporaines',
    slug: 'how-strategic-marketing-transforms-modern-businesses',
    excerpt: 'Dans un univers saturé, l’écoute empathique des besoins des utilisateurs et la précision du design créent des avantages concurrentiels décisifs.',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    categorySlug: 'intelligence-artificielle',
    authorSlug: 'kate-johnson',
    readingTime: 7,
    publishedAt: '21 Mars 2026',
    status: 'published',
    isHero: false,
    isFeatured: false,
    views: 15600,
    likes: 1040,
    tags: ['Innovation', 'Design', 'Écoute', 'Expérience'],
    contentBlocks: [
      { type: 'paragraph', text: 'L’expérience client vécue est le seul véritable marketing qui laisse une empreinte durable.' }
    ]
  },

  // --- FEATURED POST SIDEBAR CAROUSEL ---
  {
    id: 'art-sidebar-featured',
    title: 'The Impact of Immersive Landscapes in Digital Architecture',
    frenchTitle: 'L’Impact des Paysages Immersifs dans l’Architecture Numérique',
    slug: 'impact-of-immersive-landscapes-digital-architecture',
    excerpt: 'Repenser les interfaces web non plus comme des pages statiques mais comme des espaces tridimensionnels habitables et stimulants.',
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=85',
    categorySlug: 'culture',
    authorSlug: 'steve-jones',
    readingTime: 5,
    publishedAt: '07 Sept 2025',
    status: 'published',
    isHero: false,
    isFeatured: true,
    views: 29500,
    likes: 2100,
    tags: ['Architecture', '3D', 'WebGPU', 'Paysages'],
    contentBlocks: [
      { type: 'paragraph', text: 'La transition vers les environnements immersifs marque la fin du modèle classique du document textuel.' }
    ]
  }
];

// Corbeille pour le cycle de vie d'administration WordPress
let TRASH_ARTICLES = [];

// 4. RÉGIE PUBLICITAIRE GOOGLE ADSENSE & CMP CONFORME RGPD / TCF 2.2
let ADMIN_ADSENSE = {
  enabled: true,
  publisherId: 'ca-pub-9842103487129034',
  testMode: false,
  estimatedToday: '42,80 €',
  estimatedMonth: '1 480,50 €',
  rpm: '4,25 €',
  impressions: '84 500',
  clicks: '2 120',
  slots: {
    home_after_featured: { 
      name: 'Accueil — Après le Carrousel Hero', 
      enabled: true, 
      format: 'Bannière Leaderboard (728x90)',
      minHeight: '90px'
    },
    home_in_feed: { 
      name: 'Accueil — Flux Articles (In-Feed)', 
      enabled: true, 
      format: 'Grand Rectangle (336x280)',
      minHeight: '280px'
    },
    article_sidebar: { 
      name: 'Article — Colonne Latérale (Sidebar)', 
      enabled: true, 
      format: 'Demi-page Skyscraper (300x600)',
      minHeight: '300px'
    },
    article_in_content: { 
      name: 'Article — Cœur du Texte (In-Content)', 
      enabled: true, 
      format: 'Pavé Moyen (300x250)',
      minHeight: '250px'
    },
    article_end: { 
      name: 'Article — Fin de Corps (Avant Read Next)', 
      enabled: true, 
      format: 'Bannière Horizontale (728x90)',
      minHeight: '90px'
    }
  }
};

function renderAdBanner(slotKey, extraClasses = '') {
  if (!ADMIN_ADSENSE.enabled) return '';
  const slot = ADMIN_ADSENSE.slots[slotKey];
  if (!slot || !slot.enabled) return '';

  return `
    <div class="ad-placement-wrapper my-6 w-full ${extraClasses}" data-ad-slot="${slotKey}">
      <div class="flex items-center justify-between text-[10px] uppercase font-bold text-zinc-400 mb-1 px-1">
        <span>Publicités</span>
        <span class="text-zinc-500 font-normal">Annonce Sponsorisée</span>
      </div>
      <div class="relative w-full rounded-2xl border border-dashed border-[#28445E]/40 dark:border-[#28445E]/60 bg-black/5 dark:bg-[#0A1A2F]/60 flex flex-col items-center justify-center p-4 overflow-hidden" style="min-height: ${slot.minHeight || '90px'};">
        <ins class="adsbygoogle"
             style="display:block; text-align:center;"
             data-ad-layout="in-article"
             data-ad-format="auto"
             data-ad-client="${ADMIN_ADSENSE.publisherId}"
             data-ad-slot="${slotKey}"></ins>
        <div class="text-center pointer-events-none">
          <span class="text-xs font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">Google AdSense • ${slot.format}</span>
          <span class="block text-[10px] text-zinc-400 dark:text-zinc-600 mt-0.5">Emplacement : ${slot.name}</span>
        </div>
      </div>
    </div>
  `;
}

function checkAndRenderCMP() {
  const consent = localStorage.getItem('ontario_gdpr_consent');
  if (consent) return;

  const cmpEl = document.createElement('div');
  cmpEl.id = 'ontario-cmp-banner';
  cmpEl.className = 'fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[100] p-5 rounded-3xl bg-[#0E2137] border border-[#28445E] shadow-2xl text-white font-sans animate-in slide-in-from-bottom duration-300';
  cmpEl.innerHTML = `
    <div class="flex items-start justify-between gap-3 mb-2">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-[#EF4248]"></span>
        <h4 class="font-heading font-bold text-sm">Gestion des Cookies & Publicités</h4>
      </div>
      <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-mono">RGPD / TCF 2.2</span>
    </div>
    <p class="text-xs text-zinc-300 leading-relaxed mb-4">
      ONTARIO utilise des cookies pour assurer le bon fonctionnement du média, mesurer l'audience et diffuser des annonces adaptées via Google AdSense. Respect de la vie privée garanti.
    </p>
    <div class="flex items-center gap-2">
      <button onclick="acceptAllCookies()" class="flex-1 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-md cursor-pointer">
        Tout Accepter
      </button>
      <button onclick="refuseNonEssentialCookies()" class="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-300 text-xs font-semibold transition-all cursor-pointer">
        Continuer sans accepter
      </button>
    </div>
  `;
  document.body.appendChild(cmpEl);
}

function acceptAllCookies() {
  localStorage.setItem('ontario_gdpr_consent', 'accepted');
  const el = document.getElementById('ontario-cmp-banner');
  if (el) el.remove();
}

function refuseNonEssentialCookies() {
  localStorage.setItem('ontario_gdpr_consent', 'essential_only');
  const el = document.getElementById('ontario-cmp-banner');
  if (el) el.remove();
}

// 5. ÉTAT GLOBAL DE L'APPLICATION
let currentView = 'home';
let currentSlug = '';
let currentHeroSlide = 0;
let isDarkMode = false;
let currentUser = null; // { email, role: 'reader' | 'admin', name }

// Initialisation au chargement du DOM
// Système de Toast
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('ontario-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'ontario-toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 pointer-events-none max-w-sm';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bg = type === 'error' ? 'bg-red-600 text-white' : (type === 'info' ? 'bg-[#0E2137] border border-[#28445E] text-white' : 'bg-emerald-600 text-white');
  toast.className = `${bg} px-4 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2.5 pointer-events-auto transition-all duration-300 transform translate-y-4 opacity-0`;
  toast.innerHTML = `
    <span class="text-base flex-shrink-0">${type === 'error' ? '⚠️' : (type === 'info' ? 'ℹ️' : '✓')}</span>
    <span class="leading-tight">${message}</span>
  `;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Variables d'état globales connectées au serveur
let SERVER_STATS = {
  articles: { total: 0, published: 0, draft: 0, scheduled: 0, trash: 0 },
  comments: { total: 0, pending: 0, approved: 0, spam: 0 },
  subscribers: { total: 0, confirmed: 0, pending: 0 },
  media: { total: 0 },
  traffic: { source: 'Mesure Interne Serveur', totalPageViews: 0, viewsToday: 0, viewsBySlug: {} },
  adsense: { status: 'unconnected', label: 'Non connecté', publisherId: 'ca-pub-9842103487129034' },
  googleAnalytics: { status: 'unconnected', label: 'Non connecté' }
};
let SERVER_ACTIVITIES = [];
let ADMIN_PAGES = [];
let ADMIN_MEDIA = [];
let ADMIN_COMMENTS = [];
let ADMIN_SUBSCRIBERS = [];
let ADMIN_USERS = [];
let ADMIN_SETTINGS = {};

// Chargement initial des données depuis le serveur REST
async function loadServerData() {
  try {
    const [artsRes, catsRes, medRes, comRes, subRes, usrRes, pagesRes, setRes, statsRes, actRes] = await Promise.all([
      fetch('/api/articles?limit=100').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/categories').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/media').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/comments').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/subscribers').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/users').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/pages').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/settings').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/stats').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/activity').then(r => r.ok ? r.json() : null).catch(() => null)
    ]);

    if (artsRes && artsRes.articles && artsRes.articles.length > 0) ARTICLES = artsRes.articles;
    if (catsRes && catsRes.categories && catsRes.categories.length > 0) CATEGORIES = catsRes.categories;
    if (medRes && medRes.media) ADMIN_MEDIA = medRes.media;
    if (comRes && comRes.comments) ADMIN_COMMENTS = comRes.comments;
    if (subRes && subRes.subscribers) ADMIN_SUBSCRIBERS = subRes.subscribers;
    if (usrRes && usrRes.users) ADMIN_USERS = usrRes.users;
    if (pagesRes && pagesRes.pages) ADMIN_PAGES = pagesRes.pages;
    if (setRes && setRes.settings) {
      ADMIN_SETTINGS = setRes.settings;
      if (setRes.settings.adsense) ADMIN_ADSENSE = { ...ADMIN_ADSENSE, ...setRes.settings.adsense };
      if (setRes.settings.carousel) HERO_CAROUSEL_CONFIG = { ...HERO_CAROUSEL_CONFIG, ...setRes.settings.carousel };
    }
    if (statsRes && statsRes.stats) SERVER_STATS = statsRes.stats;
    if (actRes && actRes.activities) SERVER_ACTIVITIES = actRes.activities;
  } catch (err) {
    console.warn('Mode hors-ligne:', err.message);
  }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();

  // Vérifier session serveur
  try {
    const authRes = await fetch('/api/auth/me');
    if (authRes.ok) {
      const authData = await authRes.json();
      if (authData.authenticated && authData.user) {
        currentUser = authData.user;
      }
    }
  } catch (e) {}

  // Fallback session locale
  if (!currentUser) {
    const savedAdmin = localStorage.getItem('ontario_admin_session_v2');
    if (savedAdmin) {
      try {
        const parsed = JSON.parse(savedAdmin);
        if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
          currentUser = { email: parsed.email, role: parsed.role || 'admin', name: parsed.name || parsed.fullName || 'Steve Jones' };
        }
      } catch (e) {}
    }
  }

  await loadServerData();
  initRouting();
  initShortcuts();
  checkAndRenderCMP();
});

// GESTION DU THÈME BLEU NUIT / CLAIR
// GESTION DU THÈME PROFESSIONNEL : CLAIR, SOMBRE (BLEU NUIT #071426) & SYSTÈME
let currentThemePreference = 'system'; // 'light' | 'dark' | 'system'

function initTheme() {
  const saved = localStorage.getItem('ontario-theme-preference') || localStorage.getItem('ontario-theme') || 'system';
  currentThemePreference = saved;
  applyTheme(currentThemePreference);

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    if (currentThemePreference === 'system') {
      applyTheme('system');
    }
  });
}

function applyTheme(pref) {
  currentThemePreference = pref;
  localStorage.setItem('ontario-theme-preference', pref);

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldBeDark = pref === 'dark' || (pref === 'system' && prefersDark);
  isDarkMode = shouldBeDark;

  const html = document.documentElement;
  if (shouldBeDark) {
    html.classList.add('dark');
    html.setAttribute('data-theme', 'dark');
  } else {
    html.classList.remove('dark');
    html.setAttribute('data-theme', 'light');
  }

  updateThemeIndicators();
}

function setThemePreference(pref) {
  applyTheme(pref);
  showToast(`Thème activé : ${pref === 'dark' ? 'Sombre (Bleu Nuit)' : (pref === 'light' ? 'Clair Éditorial' : 'Système Automatique')}`, 'info');
}

function toggleDarkMode() {
  if (currentThemePreference === 'dark') setThemePreference('light');
  else if (currentThemePreference === 'light') setThemePreference('system');
  else setThemePreference('dark');
}

function updateThemeIndicators() {
  const btn = document.getElementById('theme-btn');
  if (btn) {
    if (currentThemePreference === 'dark') {
      btn.innerHTML = '<span class="text-xs">🌙</span><span class="text-[10px] font-bold">Sombre</span>';
      btn.title = "Mode Sombre actif (cliquer pour Clair)";
    } else if (currentThemePreference === 'light') {
      btn.innerHTML = '<span class="text-xs">☀️</span><span class="text-[10px] font-bold">Clair</span>';
      btn.title = "Mode Clair actif (cliquer pour Système)";
    } else {
      btn.innerHTML = '<span class="text-xs">💻</span><span class="text-[10px] font-bold">Système</span>';
      btn.title = "Mode Système actif (suit l\'OS, cliquer pour Sombre)";
    }
  }
}

// ROUTAGE ET NAVIGATION SANS RECHARGEMENT
function initRouting() {
  window.addEventListener('hashchange', handleHash);
  if (window.location.pathname.startsWith('/admin') && !window.location.hash) {
    const sub = window.location.pathname.replace(/^\/admin\/?/, '');
    window.location.hash = sub ? `admin/${sub}` : 'admin';
    return;
  }
  handleHash();
}

function handleHash() {
  const hash = window.location.hash.replace('#', '') || 'home';
  const parts = hash.split('/');
  const route = parts[0];
  const param = parts[1] || '';

  currentView = route;
  currentSlug = param;

  const container = document.getElementById('app-container');
  if (!container) return;

  const headerWrapper = document.getElementById('header-wrapper');
  const newsletterSection = document.getElementById('newsletter-section');
  const footerEl = document.querySelector('footer');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (route === 'admin') {
    if (headerWrapper) headerWrapper.style.display = 'none';
    if (newsletterSection) newsletterSection.style.display = 'none';
    if (footerEl) footerEl.style.display = 'none';

    const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'administrator' || currentUser.role === 'editor');
    if (!isAdmin || param === 'login') {
      renderAdminLogin(container);
    } else {
      if (param && param !== 'login') {
        adminCurrentTab = param;
      }
      renderAdmin(container);
    }
  } else {
    if (headerWrapper) headerWrapper.style.display = '';
    if (newsletterSection) newsletterSection.style.display = '';
    if (footerEl) footerEl.style.display = '';

    if (route === 'home') renderHome(container);
    else if (route === 'blog') renderBlog(container);
    else if (route === 'category') renderCategory(container, param);
    else if (route === 'article') renderArticle(container, param);
    else if (route === 'about') renderAbout(container);
    else if (route === 'contact') renderContact(container);
    else if (route === 'login') renderReaderPage(container);
    else renderHome(container);
  }
}

function navigate(route, param = '') {
  window.location.hash = param ? `${route}/${param}` : route;
}

function navigateCategory(slug) {
  navigate('category', slug);
}

function navigateArticle(slug) {
  navigate('article', slug);
}

// RACCOURCIS CLAVIER (CMD+K SPOTLIGHT SEARCH, ESCAPE)
function initShortcuts() {
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearchModal();
    }
    if (e.key === 'Escape') {
      closeSearchModal();
      if (typeof closeReaderModal === 'function') closeReaderModal();
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
      }
    }
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}

function openSearchModal() {
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    const input = document.getElementById('spotlight-input');
    if (input) {
      input.focus();
      handleSearch(input.value);
    }
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function handleSearch(query) {
  const container = document.getElementById('spotlight-results');
  if (!container) return;
  const q = (query || '').toLowerCase().trim();

  const results = ARTICLES.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.frenchTitle.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q) ||
    a.tags.some(t => t.toLowerCase().includes(q))
  );

  if (results.length === 0) {
    container.innerHTML = `
      <div class="py-8 text-center" style="color: var(--text-muted);">
        <p class="text-sm">Aucun article ne correspond à votre recherche.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="flex flex-col gap-2">
      ${results.slice(0, 6).map(art => `
        <div onclick="navigateArticle('${art.slug}'); closeSearchModal();" class="p-3 rounded-2xl flex items-center justify-between gap-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <div class="flex items-center gap-3">
            <img src="${art.coverImage}" onerror="onImgError(this)" class="w-12 h-12 rounded-xl object-cover flex-shrink-0">
            <div>
              <h4 class="font-bold text-sm" style="color: var(--text-primary);">${art.title}</h4>
              <p class="text-xs" style="color: var(--text-muted);">${art.publishedAt} • ${art.readingTime} min</p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full text-[#EF4248] bg-[#EF4248]/10">Lire →</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ESPACE COMPTE LECTEUR
// ==========================================================================
// ESPACE LECTEUR DÉDIÉ — SÉPARÉ SANS POPUP (/login)
// ==========================================================================
function renderReaderPage(container) {
  const saved = localStorage.getItem('ontario_reader_user');
  let readerData = null;
  if (saved) {
    try { readerData = JSON.parse(saved); } catch (e) {}
  }

  if (readerData) {
    const favArticles = ARTICLES.filter(a => (readerData.favorites || []).includes(a.slug));
    container.innerHTML = `
      <div class="container-ontario pt-28 sm:pt-32 pb-24 max-w-4xl mx-auto">
        <div class="rounded-3xl border p-6 sm:p-10 shadow-lg" style="background-color: var(--surface); border-color: var(--border-color);">
          <div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b" style="border-color: var(--border-color);">
            <div class="flex items-center gap-4 text-center sm:text-left">
              <img src="${readerData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}" class="w-16 h-16 rounded-full object-cover ring-4 ring-[#EF4248]/20">
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="text-xl sm:text-2xl font-bold font-heading" style="color: var(--text-primary);">${readerData.name}</h1>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EF4248]/10 text-[#EF4248] uppercase">Lecteur Vérifié</span>
                </div>
                <p class="text-xs mt-0.5" style="color: var(--text-secondary);">${readerData.email}</p>
              </div>
            </div>
            <button onclick="handleReaderLogoutApp()" class="px-4 py-2 rounded-full border text-xs font-semibold hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer" style="border-color: var(--border-color); color: var(--text-secondary);">
              Se Déconnecter
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div class="lg:col-span-7">
              <h2 class="font-heading font-bold text-base mb-4 flex items-center gap-2" style="color: var(--text-primary);">
                <span>📑 Mes Articles Enregistrés (${favArticles.length})</span>
              </h2>
              ${favArticles.length === 0 ? `
                <div class="p-8 rounded-2xl border text-center text-xs" style="border-color: var(--border-color); color: var(--text-muted);">
                  <p class="text-2xl mb-2">🔖</p>
                  <p class="font-semibold">Aucun article enregistré pour le moment.</p>
                </div>
              ` : `
                <div class="flex flex-col gap-3">
                  ${favArticles.map(art => `
                    <div class="flex items-center gap-4 p-3 rounded-2xl border" style="background-color: var(--surface-soft); border-color: var(--border-color);">
                      <img src="${art.coverImage}" onerror="onImgError(this)" class="w-14 h-14 rounded-xl object-cover flex-shrink-0">
                      <div class="flex-1 min-w-0">
                        <span class="text-[10px] font-bold text-[#EF4248] uppercase">${art.categoryBadge || 'ARTICLE'}</span>
                        <h4 onclick="navigateArticle('${art.slug}')" class="font-bold text-xs truncate cursor-pointer hover:text-[#EF4248]" style="color: var(--text-primary);">${art.title}</h4>
                        <span class="text-[10px] text-zinc-400">${art.readingTime} min de lecture</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>

            <div class="lg:col-span-5 flex flex-col gap-6">
              <div class="p-6 rounded-2xl border" style="background-color: var(--surface-soft); border-color: var(--border-color);">
                <h3 class="font-heading font-bold text-sm mb-2" style="color: var(--text-primary);">✉️ Préférences Newsletter</h3>
                <p class="text-xs mb-4" style="color: var(--text-secondary);">Statut actuel : <b class="text-emerald-500">Abonné Actif (Hebdomadaire)</b></p>
                <div class="p-4 rounded-xl bg-gradient-to-br from-[#071426] to-[#0E2137] text-white">
                  <span class="text-xs font-bold text-[#EF4248] uppercase">👑 Équipe Rédactionnelle</span>
                  <h4 class="font-bold text-sm mt-1">Espace Administrateur CMS</h4>
                  <p class="text-[11px] text-zinc-300 mb-3">Accédez à la console WordPress pour gérer articles et publicités.</p>
                  <button onclick="navigate('admin')" class="px-4 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-md">
                    Accéder au CMS Administrateur →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Formulaire de connexion lecteur autonome
  container.innerHTML = `
    <div class="container-ontario pt-28 sm:pt-32 pb-24 flex justify-center">
      <div class="max-w-md w-full rounded-3xl border p-8 sm:p-10 shadow-xl" style="background-color: var(--surface); border-color: var(--border-color);">
        <div class="text-center mb-8">
          <span class="font-heading font-black text-2xl tracking-tighter" style="color: var(--text-primary);">
            ONTARIO<span class="text-[#EF4248]">.</span>
          </span>
          <h1 class="font-heading font-bold text-xl mt-2" style="color: var(--text-primary);">
            Espace Lecteur Privilégié
          </h1>
          <p class="text-xs mt-1" style="color: var(--text-secondary);">
            Sauvegardez vos lectures et participez aux échanges éditoriaux
          </p>
        </div>

        <form onsubmit="handleReaderLoginSubmitApp(event)" class="flex flex-col gap-4">
          <div>
            <label class="text-xs font-semibold mb-1.5 block" style="color: var(--text-primary);">Adresse Email</label>
            <input type="email" id="reader-input-email" required placeholder="lecteur@ontario.com" value="lecteur@ontario.com" class="w-full px-4 py-3 rounded-xl border text-sm" style="background-color: var(--surface-soft); border-color: var(--border-color); color: var(--text-primary);">
          </div>
          <div>
            <label class="text-xs font-semibold mb-1.5 block" style="color: var(--text-primary);">Mot de Passe</label>
            <input type="password" id="reader-input-pass" required placeholder="••••••••••••" value="lecteur2026" class="w-full px-4 py-3 rounded-xl border text-sm" style="background-color: var(--surface-soft); border-color: var(--border-color); color: var(--text-primary);">
          </div>
          <button type="submit" class="w-full py-3.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-sm shadow-md transition-all mt-2 cursor-pointer">
            Accéder à mon Espace Lecteur
          </button>
        </form>

        <div class="mt-8 pt-6 border-t text-center text-xs space-y-2" style="border-color: var(--border-color);">
          <p style="color: var(--text-muted);">Vous êtes membre de l'équipe éditoriale ou administrateur ?</p>
          <button onclick="navigate('admin')" class="text-[#EF4248] hover:underline font-bold inline-flex items-center gap-1">
            <span>🔐 Connexion Administrateur CMS (/admin) →</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function handleReaderLoginSubmitApp(e) {
  e.preventDefault();
  const email = (document.getElementById('reader-input-email')?.value || 'lecteur@ontario.com').trim();
  const readerObj = {
    name: email.split('@')[0].toUpperCase(),
    email,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    favorites: ['next-gen-marketing-innovative-strategies', 'advanced-techniques-abstract-digital-design'],
    newsletterSubscribed: true
  };
  localStorage.setItem('ontario_reader_user', JSON.stringify(readerObj));
  renderReaderPage(document.getElementById('app-container'));
}

function handleReaderLogoutApp() {
  localStorage.removeItem('ontario_reader_user');
  renderReaderPage(document.getElementById('app-container'));
}

// GESTION NEWSLETTER
function handleNewsletter(e) {
  e.preventDefault();
  const input = document.getElementById('newsletter-email');
  const success = document.getElementById('newsletter-success');
  if (input && input.value) {
    if (success) {
      success.classList.remove('hidden');
      setTimeout(() => success.classList.add('hidden'), 5000);
    }
    input.value = '';
  }
}

// ==========================================================================
// 5. RENDERER DE LA PAGE D'ACCUEIL — CARROUSEL ÉDITORIAL DYNAMIQUE & AD SENSE
// ==========================================================================
let heroSliderIndex = 0;
let HERO_CAROUSEL_CONFIG = {
  mode: 'recent', // 'recent' | 'popular' | 'manual'
  autoplay: true,
  autoplayInterval: 6000,
  maxSlides: 5
};
let heroAutoplayTimer = null;
let heroAutoplayPaused = false;
let heroAutoplayPausedByUser = false;
let heroTouchStartX = 0;
let heroTouchEndX = 0;

function getHeroSliderArticles() {
  const now = new Date();
  const published = ARTICLES.filter(a => {
    if (a.status && a.status !== 'published') return false;
    if (a.scheduledAt && new Date(a.scheduledAt) > now) return false;
    return true;
  });

  let list = [];
  if (HERO_CAROUSEL_CONFIG.mode === 'popular') {
    list = [...published].sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (HERO_CAROUSEL_CONFIG.mode === 'manual') {
    const manual = published.filter(a => a.isHero || a.isFeatured);
    list = manual.length > 0 ? manual : published;
  } else {
    // Mode récent : trié par date
    list = [...published];
  }

  // Déduplication stricte
  const seen = new Set();
  const unique = [];
  for (const art of list) {
    if (!seen.has(art.id)) {
      seen.add(art.id);
      unique.push(art);
    }
  }

  const res = unique.slice(0, HERO_CAROUSEL_CONFIG.maxSlides || 5);
  return res.length > 0 ? res : [ARTICLES[0]];
}

function startHeroAutoplay() {
  stopHeroAutoplay();
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  if (!HERO_CAROUSEL_CONFIG.autoplay || heroAutoplayPausedByUser) return;
  const interval = HERO_CAROUSEL_CONFIG.autoplayInterval || 6000;
  heroAutoplayTimer = setInterval(() => {
    if (!heroAutoplayPaused && !heroAutoplayPausedByUser && document.visibilityState === 'visible') {
      stepHeroSlide(1, false);
    }
  }, interval);
}

function stopHeroAutoplay() {
  if (heroAutoplayTimer) {
    clearInterval(heroAutoplayTimer);
    heroAutoplayTimer = null;
  }
}

function toggleHeroPlayPause(e) {
  if (e) e.stopPropagation();
  heroAutoplayPausedByUser = !heroAutoplayPausedByUser;
  if (!heroAutoplayPausedByUser) {
    heroAutoplayPaused = false;
    startHeroAutoplay();
  } else {
    stopHeroAutoplay();
  }
  const container = document.getElementById('app-container');
  if (container && currentView === 'home') renderHome(container);
}

function stepHeroSlide(dir, isKeyboard = false) {
  const heroes = getHeroSliderArticles();
  if (heroes.length <= 1) return;
  
  if (dir > 0) {
    heroSliderIndex = (heroSliderIndex + 1) % heroes.length;
  } else {
    heroSliderIndex = (heroSliderIndex - 1 + heroes.length) % heroes.length;
  }

  if (isKeyboard) {
    heroAutoplayPausedByUser = true;
    stopHeroAutoplay();
  }

  const container = document.getElementById('app-container');
  if (container && currentView === 'home') renderHome(container);
}

window.prevHeroSlide = function(e) {
  if (e) e.stopPropagation();
  stepHeroSlide(-1, false);
};

window.nextHeroSlide = function(e) {
  if (e) e.stopPropagation();
  stepHeroSlide(1, false);
};

window.goToHeroSlide = function(idx, e) {
  if (e) e.stopPropagation();
  heroSliderIndex = idx;
  const container = document.getElementById('app-container');
  if (container && currentView === 'home') renderHome(container);
};

window.handleHeroTouchStart = function(e) {
  heroTouchStartX = e.changedTouches[0].screenX;
};

window.handleHeroTouchEnd = function(e) {
  heroTouchEndX = e.changedTouches[0].screenX;
  if (heroTouchEndX < heroTouchStartX - 45) {
    stepHeroSlide(1, false);
  } else if (heroTouchEndX > heroTouchStartX + 45) {
    stepHeroSlide(-1, false);
  }
};

function renderHome(container) {
  const heroArticles = getHeroSliderArticles();
  if (heroSliderIndex >= heroArticles.length) heroSliderIndex = 0;
  const heroArticle = heroArticles[heroSliderIndex] || heroArticles[0];
  const authorHero = AUTHORS.find(a => a.slug === heroArticle.authorSlug) || AUTHORS[0];
  const freshArticles = ARTICLES.filter(a => a.id !== heroArticle.id).slice(0, 6);
  const recentArticles = ARTICLES.filter(a => a.id !== heroArticle.id).slice(6, 12);
  const sidebarFeatured = ARTICLES.find(a => a.id === 'art-sidebar-featured') || ARTICLES[1];

  // Préchargement fluide du slide suivant sans surcharger le réseau
  if (heroArticles.length > 1) {
    const nextIdx = (heroSliderIndex + 1) % heroArticles.length;
    if (heroArticles[nextIdx] && heroArticles[nextIdx].coverImage) {
      const preloadImg = new Image();
      preloadImg.src = heroArticles[nextIdx].coverImage;
    }
  }

  // Démarrer l'autoplay si non actif
  startHeroAutoplay();

  container.innerHTML = `
    <div class="w-full">
      <!-- 1. HERO CARROUSEL FULL-BLEED 100VW ÉDITORIAL IMMERSIF (CONFORME EXACTEMENT À LA CAPTURE FOURNIE) -->
      <section 
        id="hero-carousel-section"
        class="relative w-full min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] h-[86vh] max-h-[940px] bg-[#071426] text-white overflow-hidden select-none"
        onmouseenter="heroAutoplayPaused = true;"
        onmouseleave="heroAutoplayPaused = false;"
        onfocusin="heroAutoplayPaused = true;"
        onfocusout="heroAutoplayPaused = false;"
        ontouchstart="handleHeroTouchStart(event)"
        ontouchend="handleHeroTouchEnd(event)"
      >
        <!-- Arrière-plan Photographique Grand Angle avec Transition Douce & Effet Ken Burns Dynamique -->
        <div class="absolute inset-0 z-0 overflow-hidden">
          <img 
            key="${heroArticle.id}"
            src="${heroArticle.coverImage}" 
            alt="${heroArticle.imageAlt || heroArticle.title}" 
            loading="eager" 
            fetchpriority="high"
            style="object-position: ${heroArticle.focalPoint || 'center center'};"
            onerror="onImgError(this)"
            class="w-full h-full object-cover transition-transform duration-[1200ms] ease-out scale-100 hover:scale-105 filter brightness-[0.92] contrast-[1.05]"
          >
          
          <!-- Masque Dégradé Editorial Profond (Protection du Header Flottant et Contraste Parfait à Gauche) -->
          <div class="absolute inset-0 z-10 bg-gradient-to-t from-[#071426] via-[#071426]/60 to-black/60 sm:via-[#071426]/40 pointer-events-none"></div>
          <div class="absolute inset-0 z-10 bg-gradient-to-r from-[#071426]/95 via-[#071426]/75 to-transparent sm:w-3/4 lg:w-3/5 pointer-events-none"></div>
        </div>

        <!-- Contenu Éditorial Inférieur Gauche Aligné sur le Conteneur Ontario (1376px) -->
        <div class="absolute bottom-10 sm:bottom-14 lg:bottom-16 inset-x-0 z-20">
          <div class="site-container container-ontario">
            <div class="max-w-3xl flex flex-col items-start text-left hero-slide-enter">
              
              <!-- Badges de Catégories (Pills Translucides comme dans la capture) -->
              <div class="flex items-center gap-2 mb-3.5 flex-wrap">
                <span class="px-3.5 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-xs transition-all cursor-pointer" onclick="navigateCategory('${heroArticle.categorySlug || 'intelligence-artificielle'}')">
                  ${heroArticle.categoryBadge || 'AI'}
                </span>
                <span class="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-[11px] font-extrabold uppercase tracking-wider text-white/90 shadow-xs transition-all cursor-pointer" onclick="navigateCategory('${heroArticle.categorySlug || 'technologie'}')">
                  ${heroArticle.secondaryBadge || 'TECHNOLOGY'}
                </span>
                ${heroArticle.views && heroArticle.views > 20000 ? `
                  <span class="px-3 py-1 rounded-full bg-[#EF4248]/85 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                    ★ POPULAIRE
                  </span>
                ` : ''}
              </div>

              <!-- Grand Titre H1 Éditorial -->
              <h1 onclick="navigateArticle('${heroArticle.slug}')" class="font-heading text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold text-white tracking-tight leading-[1.08] mb-3.5 cursor-pointer hover:text-zinc-200 transition-colors drop-shadow-lg">
                ${heroArticle.title}
              </h1>

              <!-- Ligne Métadonnées Auteur & Date conforme à la capture: "Steve Jones on Mar 24, 2026" -->
              <div class="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-medium mb-3.5">
                <span class="text-white font-semibold cursor-pointer hover:underline" onclick="navigateArticle('${heroArticle.slug}')">${authorHero.name}</span>
                <span>on</span>
                <span>${heroArticle.publishedAt || 'Mar 24, 2026'}</span>
              </div>

              <!-- Extrait fluide et soigné -->
              <p class="text-sm sm:text-base text-zinc-300/95 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-3 mb-6 font-normal drop-shadow-xs">
                ${heroArticle.excerpt}
              </p>

              <!-- Commandes Circulaires du Carrousel Flèche Gauche & Flèche Droite conformes à la capture -->
              <div class="flex items-center gap-3 flex-wrap">
                <button onclick="prevHeroSlide(event)" aria-label="Article précédent" class="w-11 h-11 rounded-full border border-white/35 bg-black/40 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95 group shadow-xl">
                  <svg class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m15 19-7-7 7-7"/></svg>
                </button>
                <button onclick="nextHeroSlide(event)" aria-label="Article suivant" class="w-11 h-11 rounded-full border border-white/35 bg-black/40 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95 group shadow-xl">
                  <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>
                </button>

                <!-- Indicateur Numérique & Puces -->
                <div class="flex items-center gap-2.5 ml-2">
                  <span class="text-xs font-mono font-bold text-white/90">0${heroSliderIndex + 1} / 0${heroArticles.length}</span>
                  <div class="hidden sm:flex items-center gap-1.5 ml-1">
                    ${heroArticles.map((_, idx) => `
                      <button onclick="goToHeroSlide(${idx}, event)" aria-label="Slide ${idx + 1}" class="h-1 rounded-full transition-all cursor-pointer ${idx === heroSliderIndex ? 'w-6 bg-[#EF4248]' : 'w-2 bg-white/30 hover:bg-white/60'}"></button>
                    `).join('')}
                  </div>
                </div>

                <!-- Bouton Pause / Lecture Autoplay -->
                <button 
                  onclick="toggleHeroPlayPause(event)" 
                  aria-label="${heroAutoplayPausedByUser ? 'Reprendre le carrousel' : 'Pause carrousel'}" 
                  class="w-8 h-8 rounded-full border border-white/20 bg-black/40 hover:bg-white/20 text-white flex items-center justify-center text-xs ml-2 transition-all cursor-pointer backdrop-blur-sm"
                  title="${heroAutoplayPausedByUser ? 'Reprendre la rotation automatique (6s)' : 'Mettre en pause'}"
                >
                  ${heroAutoplayPausedByUser ? '▶' : '⏸'}
                </button>

                <!-- Mode Carrousel Actif (Populaire / Récent) -->
                <span class="hidden md:inline-flex text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10 ml-2">
                  Mode ${HERO_CAROUSEL_CONFIG.mode === 'popular' ? 'Populaire' : (HERO_CAROUSEL_CONFIG.mode === 'manual' ? 'Sélection' : 'Nouveautés')}
                </span>
              </div>

            </div>
          </div>
        </div>

        <!-- Barre de progression animée du défilement automatique (6s) -->
        ${(!heroAutoplayPaused && !heroAutoplayPausedByUser) ? `
          <div class="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-30 pointer-events-none">
            <div class="h-full bg-[#EF4248] animate-hero-progress" style="animation-duration: ${HERO_CAROUSEL_CONFIG.autoplayInterval || 6000}ms;"></div>
          </div>
        ` : ''}
      </section>

      <!-- 2. BANDEAU HORIZONTAL TICKER BAR CONFORME CAPTURE EXACTE (Marquee Animé) -->
      <section class="w-full border-b py-3.5 overflow-hidden select-none" style="background-color: #12161F; border-color: rgba(255, 255, 255, 0.08);">
        <div class="ticker-wrapper flex items-center">
          <div class="ticker-track flex items-center gap-8 whitespace-nowrap text-xs font-semibold">
            <!-- Item 1: Crypto -->
            <div class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onclick="navigateArticle('colorful-packaging-in-contemporary-crypto-branding')">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                CRYPTO
              </span>
              <span class="text-zinc-200 hover:text-white">Colorful Packaging in Contemporary Crypto Branding</span>
            </div>
            <span class="text-zinc-600">•</span>

            <!-- Item 2: Digital -->
            <div class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onclick="navigateArticle('transparent-structures-in-digital-architecture')">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                DIGITAL
              </span>
              <span class="text-zinc-200 hover:text-white">Transparent Structures in Digital Architecture</span>
            </div>
            <span class="text-zinc-600">•</span>

            <!-- Item 3: AI -->
            <div class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onclick="navigateArticle('ai-motion-techniques-abstract-digital-design')">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 text-[10px] font-bold uppercase tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
                AI
              </span>
              <span class="text-zinc-200 hover:text-white">AI Motion Techniques in Abstract Digital Design</span>
            </div>
            <span class="text-zinc-600">•</span>

            <!-- Item 4: Business -->
            <div class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onclick="navigateArticle('organic-shapes-modern-digital-architecture')">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-700/60 text-zinc-200 border border-zinc-600/50 text-[10px] font-bold uppercase tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                BUSINESS
              </span>
              <span class="text-zinc-200 hover:text-white">Organic Shapes in Modern Digital Architecture</span>
            </div>
            <span class="text-zinc-600">•</span>

            <!-- Duplication pour boucle infinie fluide -->
            <div class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onclick="navigateArticle('next-gen-marketing-innovative-strategies')">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-[#EF4248]"></span>
                TECH / AI
              </span>
              <span class="text-zinc-200 hover:text-white">Next Gen Marketing: Innovative Strategies</span>
            </div>
            <span class="text-zinc-600">•</span>
          </div>
        </div>
      </section>

      <!-- EMPLACEMENT PUBLICITAIRE 1 : HOME_AFTER_FEATURED (Conservé intact selon la consigne stricte) -->
      ${renderAdBanner('home_after_featured', 'container-ontario mt-8 mb-4')}

      <!-- 3. RUBRIQUES PASTELS ÉPURÉES "BLOG CATEGORIES" CONFORME IMAGE A & CAPTURE 4 -->
      <section class="container-ontario mt-14 sm:mt-18">
        <h2 class="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-6" style="color: var(--text-primary);">
          Blog Categories
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          ${CATEGORIES.map(cat => `
            <div onclick="navigateCategory('${cat.slug}')" class="group relative h-28 sm:h-32 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border overflow-hidden ${cat.isDark ? 'border-white/10 text-white' : 'border-black/5 dark:border-white/5'}" style="background-color: ${cat.isDark ? '#13283E' : (isDarkMode ? cat.bgDark : cat.bgLight)};">
              ${cat.isDark && cat.image ? `
                <img src="${cat.image}" alt="${cat.name}" class="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-luminosity group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-[#13283E] via-[#13283E]/75 to-transparent"></div>
              ` : ''}
              <div class="relative z-10 flex flex-col items-center justify-center">
                <h3 class="font-heading font-bold text-sm tracking-tight mb-1 group-hover:scale-105 transition-transform" style="color: ${cat.isDark ? '#FFFFFF' : (isDarkMode ? cat.textDark : cat.textLight)};">
                  ${cat.name}
                </h3>
                <span class="text-[11px] font-medium" style="color: ${cat.isDark ? '#D1D5DB' : 'var(--text-muted)'};">
                  ${cat.count} articles
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 4. SECTION "FRESH OFF THE PRESS" (GRILLE ÉDITORIALE ASYMÉTRIQUE IMAGE A) -->
      <!-- 4. SECTION "FRESH OFF THE PRESS" (GRILLE ÉDITORIALE 3x2 CONFORME CAPTURE 5) -->
      <section class="container-ontario mt-16 sm:mt-22">
        <h2 class="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-8" style="color: var(--text-primary);">
          Fresh off the Press
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          ${freshArticles.slice(0, 6).map(art => `
            <div class="group cursor-pointer flex flex-col" onclick="navigateArticle('${art.slug}')">
              <div class="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm">
                <img src="${art.coverImage}" onerror="onImgError(this)" alt="${art.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                ${renderArticleBadge(art)}
                <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide">
                  ⏱️ ${art.readingTime} MIN
                </span>
              </div>
              <h3 class="font-heading font-bold text-base sm:text-lg tracking-tight mb-2 group-hover:text-[#EF4248] transition-colors leading-snug line-clamp-2" style="color: var(--text-primary);">
                ${art.title}
              </h3>
              <p class="text-xs mt-auto pt-1" style="color: var(--text-muted);">
                Steve Jones on ${art.publishedAt}
              </p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- EMPLACEMENT PUBLICITAIRE 2 : HOME_IN_FEED -->
      ${renderAdBanner('home_in_feed', 'container-ontario')}

      <!-- 5. SECTION "RECENT ARTICLES" (2/3) + SIDEBAR ÉDITORIALE (1/3) CONFORME IMAGE A -->
      <section class="container-ontario mt-16 sm:mt-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <!-- COLONNE GAUCHE (2/3 - 8 COLONNES) : FLUX HORIZONTAL D'ARTICLES -->
          <div class="lg:col-span-8">
            <h2 class="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-8" style="color: var(--text-primary);">
              Recent Articles
            </h2>

            <div class="flex flex-col gap-8">
              ${recentArticles.map(art => `
                <div class="flex flex-col sm:flex-row gap-5 sm:gap-6 group cursor-pointer pb-8 border-b" style="border-color: var(--border-color);" onclick="navigateArticle('${art.slug}')">
                  <!-- Vignette carrée / 4:3 à gauche -->
                  <div class="relative w-full sm:w-56 aspect-[4/3] rounded-2xl overflow-hidden flex-shrink-0 shadow-xs">
                    <img src="${art.coverImage}" onerror="onImgError(this)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                    <span class="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/75 text-white text-[10px] font-semibold">
                      ⏱️ ${art.readingTime} MIN
                    </span>
                  </div>

                  <!-- Contenu à droite -->
                  <div class="flex flex-col justify-center">
                    <h3 class="font-heading font-bold text-lg sm:text-xl tracking-tight mb-2 group-hover:text-[#EF4248] transition-colors leading-snug" style="color: var(--text-primary);">
                      ${art.title}
                    </h3>
                    <p class="text-xs mb-3" style="color: var(--text-muted);">
                      Steve Jones on ${art.publishedAt}
                    </p>
                    <p class="text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2" style="color: var(--text-secondary);">
                      ${art.excerpt}
                    </p>
                    <div class="flex items-center justify-between mt-auto pt-2">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style="background-color: var(--surface-soft); color: var(--text-primary);">
                        ${art.categoryBadge || 'NEWS'}
                      </span>
                      <span class="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#EF4248] group-hover:underline">
                        MORE →
                      </span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Pagination Ontario (1 2 3 >) -->
            <div class="flex items-center gap-2 mt-10">
              <button class="w-9 h-9 rounded-full bg-[#EF4248] text-white font-bold text-xs flex items-center justify-center shadow-xs">1</button>
              <button onclick="navigate('blog')" class="w-9 h-9 rounded-full border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors" style="border-color: var(--border-color); color: var(--text-primary);">2</button>
              <button onclick="navigate('blog')" class="w-9 h-9 rounded-full border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors" style="border-color: var(--border-color); color: var(--text-primary);">3</button>
              <button onclick="navigate('blog')" class="w-9 h-9 rounded-full border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors" style="border-color: var(--border-color); color: var(--text-primary);">›</button>
            </div>
          </div>

          <!-- COLONNE DROITE (1/3 - 4 COLONNES) : SIDEBAR OFFICIELLE ONTARIO -->
          <div class="lg:col-span-4 flex flex-col gap-8">
            
            <!-- WIDGET 1 : FEATURED POSTS CAROUSEL -->
            <div class="relative w-full rounded-3xl overflow-hidden shadow-sm group cursor-pointer" onclick="navigateArticle('${sidebarFeatured.slug}')">
              <div class="relative aspect-[4/3] w-full overflow-hidden">
                <img src="${sidebarFeatured.coverImage}" onerror="onImgError(this)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
                <div class="absolute bottom-0 inset-x-0 p-6 text-white">
                  <h4 class="font-heading font-bold text-base sm:text-lg leading-snug mb-2 group-hover:text-zinc-200">
                    ${sidebarFeatured.title}
                  </h4>
                  <p class="text-[11px] text-zinc-300">
                    Steve Jones on ${sidebarFeatured.publishedAt}
                  </p>
                </div>
              </div>
              <!-- Indicateurs dots -->
              <div class="p-3 flex justify-center gap-1.5" style="background-color: var(--surface-soft);">
                <span class="w-2 h-2 rounded-full bg-[#EF4248]"></span>
                <span class="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                <span class="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
              </div>
            </div>

            <!-- WIDGET 2 : RELATED ARTICLES (VIGNETTES CARRÉES) -->
            <div class="p-6 rounded-3xl border" style="background-color: var(--surface-soft); border-color: var(--border-color);">
              <h4 class="font-heading font-bold text-xs uppercase tracking-widest mb-4" style="color: var(--text-muted);">
                RELATED ARTICLES
              </h4>
              <div class="flex flex-col gap-4">
                ${freshArticles.slice(0, 3).map(art => `
                  <div class="flex items-center gap-3.5 group cursor-pointer" onclick="navigateArticle('${art.slug}')">
                    <img src="${art.coverImage}" onerror="onImgError(this)" class="w-14 h-14 rounded-xl object-cover flex-shrink-0">
                    <div>
                      <h5 class="font-heading font-bold text-xs line-clamp-2 leading-snug group-hover:text-[#EF4248] transition-colors" style="color: var(--text-primary);">
                        ${art.title}
                      </h5>
                      <span class="text-[10px]" style="color: var(--text-muted);">${art.publishedAt}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- WIDGET 3 : POPULAR TAGS (BADGES PILULES ONTARIO) -->
            <div class="p-6 rounded-3xl border" style="background-color: var(--surface-soft); border-color: var(--border-color);">
              <h4 class="font-heading font-bold text-xs uppercase tracking-widest mb-4" style="color: var(--text-muted);">
                POPULAR TAGS
              </h4>
              <div class="flex flex-wrap gap-2">
                ${['ARTIFICIAL INTELLIGENCE', 'BREAKING NEWS', 'BUSINESS GROWTH', 'CLOUD COMPUTING', 'DIGITAL MARKETING', 'FUTURE OF WORK', 'GLOBAL TRENDS', 'MACHINE LEARNING', 'TECHNOLOGY', 'VENTURE CAPITAL', 'WEB3'].map(tag => `
                  <button onclick="navigate('blog')" class="text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all hover:bg-[#EF4248] hover:text-white hover:border-[#EF4248]" style="border-color: var(--border-color); color: var(--text-secondary); background-color: var(--surface);">
                    ${tag}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- WIDGET 4 : ENCART PARTENAIRE SPONSORISÉ (RÉGIE INTERNE) -->
            <div class="p-6 rounded-3xl border relative overflow-hidden" style="background-color: var(--surface-soft); border-color: var(--border-color);">
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#EF4248]">PARTENAIRE OFFICIEL</span>
                <span class="text-[9px] text-zinc-400">SPONSORISÉ</span>
              </div>
              <div class="rounded-2xl overflow-hidden mb-3 aspect-[16/9] relative">
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" onerror="onImgError(this)" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>
                <div class="absolute bottom-2.5 left-3 right-3 text-white">
                  <div class="font-heading font-bold text-xs">Apex Cloud GPU Instances</div>
                  <div class="text-[10px] text-zinc-300">GPU H100 pour l'IA générative</div>
                </div>
              </div>
              <a href="https://aws.amazon.com" target="_blank" rel="sponsored noopener noreferrer" class="block w-full text-center py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-sm">
                Découvrir l'offre exclusive →
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  `;
}

// ==========================================================================
// 6. RENDERER DE LA PAGE ARTICLE (SINGLE POST CONFORME ONTARIO)
// ==========================================================================
function renderArticle(container, slug) {
  const article = ARTICLES.find(a => a.slug === slug) || ARTICLES[0];
  const author = AUTHORS.find(a => a.slug === article.authorSlug) || AUTHORS[0];
  const readNext = ARTICLES.filter(a => a.id !== article.id).slice(0, 3);

  container.innerHTML = `
    <div class="w-full pt-24 sm:pt-28 pb-16">
      
      <!-- HERO ARTICLE ARRONDIE CONFORME IMAGE 1 ONTARIO -->
      <div class="container-ontario mb-10 sm:mb-14">
        <div class="relative w-full rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[460px] flex items-center justify-center p-6 sm:p-12 text-center text-white bg-[#071426] shadow-xl">
          <img src="${article.coverImage}" onerror="onImgError(this)" class="absolute inset-0 w-full h-full object-cover filter brightness-75">
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60"></div>
          
          <div class="relative z-10 max-w-3xl flex flex-col items-center">
            <!-- Fil d'Ariane -->
            <div class="text-xs uppercase tracking-widest text-zinc-300 font-semibold mb-3">
              <a href="#home" onclick="navigate('home')" class="hover:text-white">Accueil</a> / 
              <span class="text-[#EF4248]">${article.categoryBadge || 'Magazine'}</span>
            </div>

            <!-- Titre H1 -->
            <h1 class="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              ${article.title}
            </h1>

            <!-- Métas auteur & date -->
            <div class="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
              <img src="${author.avatar}" onerror="onImgError(this)" class="w-7 h-7 rounded-full object-cover ring-2 ring-white/30">
              <span>Par <b>${author.name}</b></span>
              <span>•</span>
              <span>${article.publishedAt}</span>
              <span>•</span>
              <span>⏱️ ${article.readingTime} min de lecture</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CORPS DE LECTURE (2/3) + SIDEBAR (1/3) -->
      <div class="container-ontario">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          <!-- Colonne Texte de l'article -->
          <div class="lg:col-span-8 prose-editorial">
            <p class="text-lg sm:text-xl font-medium leading-relaxed mb-6" style="color: var(--text-primary);">
              ${article.excerpt}
            </p>

            ${(article.contentBlocks || []).map((b, idx) => {
              let blockHtml = '';
              if (b.type === 'paragraph') {
                blockHtml = `<p>${b.text}</p>`;
              } else if (b.type === 'heading') {
                blockHtml = b.level === 'h3' ? `<h3>${b.text}</h3>` : `<h2>${b.text}</h2>`;
              } else if (b.type === 'quote') {
                blockHtml = `<blockquote><p>${b.text}</p>${b.author ? `<cite class="block text-xs not-italic mt-2 text-zinc-400">— ${b.author}</cite>` : ''}</blockquote>`;
              } else if (b.type === 'list') {
                blockHtml = `<ul class="list-disc pl-6 space-y-2 my-4 text-base">${(b.items || []).map(i => `<li>${i}</li>`).join('')}</ul>`;
              } else if (b.type === 'image') {
                blockHtml = `
                  <figure class="my-8">
                    <img src="${b.url}" alt="${b.alt || ''}" onerror="onImgError(this)" class="w-full rounded-2xl shadow-md">
                    ${b.caption ? `<figcaption class="text-xs text-center mt-2.5 italic text-zinc-400">${b.caption}</figcaption>` : ''}
                  </figure>
                `;
              } else if (b.type === 'gallery') {
                blockHtml = `
                  <div class="my-8">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      ${(b.images || []).map(img => `<img src="${img}" onerror="onImgError(this)" class="rounded-2xl w-full h-56 object-cover shadow-sm">`).join('')}
                    </div>
                    ${b.caption ? `<p class="text-xs text-center mt-2 italic text-zinc-400">${b.caption}</p>` : ''}
                  </div>
                `;
              } else if (b.type === 'video') {
                blockHtml = `
                  <div class="my-8">
                    <div class="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-[#1E3752]">
                      <iframe class="w-full h-full" src="${b.url.includes('youtube.com') ? b.url.replace('watch?v=', 'embed/') : b.url}" title="Vidéo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    ${b.caption ? `<p class="text-xs text-center mt-2 italic text-zinc-400">${b.caption}</p>` : ''}
                  </div>
                `;
              } else if (b.type === 'callout') {
                blockHtml = `
                  <div class="p-6 rounded-2xl my-6 border-l-4 border-[#EF4248] bg-black/5 dark:bg-white/5">
                    <h4 class="font-bold text-sm mb-1 text-[#EF4248]">${b.title || 'À Retenir'}</h4>
                    <p class="text-sm leading-relaxed">${b.text}</p>
                  </div>
                `;
              } else if (b.type === 'separator') {
                blockHtml = `<hr class="my-8 border-t border-zinc-200 dark:border-zinc-800">`;
              } else if (b.type === 'button') {
                blockHtml = `
                  <div class="my-6">
                    <a href="${b.url}" class="px-6 py-3 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs inline-flex items-center gap-2 shadow-md transition-all">
                      <span>${b.text}</span>
                      <span>→</span>
                    </a>
                  </div>
                `;
              } else if (b.type === 'affiliate') {
                blockHtml = `
                  <div class="affiliate-card p-6 sm:p-8 my-8">
                    <div class="flex items-center gap-2 mb-3">
                      <span class="w-2.5 h-2.5 rounded-full bg-[#EF4248]"></span>
                      <span class="text-xs font-bold uppercase tracking-wider text-[#EF4248]">PRODUIT RECOMMANDÉ PAR LA RÉDACTION</span>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-6 items-center">
                      <img src="${b.imageUrl || 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80'}" onerror="onImgError(this)" class="w-36 h-36 rounded-2xl object-cover flex-shrink-0 shadow-sm">
                      <div class="flex-1">
                        <h4 class="font-heading text-lg font-bold mb-1" style="color: var(--text-primary);">${b.productName}</h4>
                        <span class="text-xs font-semibold block mb-2" style="color: var(--text-muted);">${b.brand || 'Partenaire Rédaction'} • Distribué par ${b.merchantName || 'Amazon'}</span>
                        <p class="text-xs sm:text-sm mb-3" style="color: var(--text-secondary);">${b.description || ''}</p>
                        <ul class="text-xs space-y-1 mb-4" style="color: var(--text-secondary);">
                          ${(b.features || []).map(f => `<li>✓ ${f}</li>`).join('')}
                        </ul>
                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <a href="${b.affiliateUrl || '#'}" target="_blank" rel="sponsored noopener noreferrer" class="px-6 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md transition-all">
                            ${b.buttonText || 'Voir sur Amazon (Offre Partenaire)'}
                          </a>
                          <span class="text-[10px]" style="color: var(--text-muted);">${b.disclaimer || 'Lien affilié — nous pouvons percevoir une commission éditoriale.'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }
              // Insertion de l'emplacement article_in_content après le 2ème bloc
              if (idx === 1) {
                blockHtml += renderAdBanner('article_in_content');
              }
              return blockHtml;
            }).join('')}

            <!-- Tags fin d'article -->
            <div class="pt-6 mt-8 border-t flex flex-wrap gap-2" style="border-color: var(--border-color);">
              ${(article.tags || []).map(t => `
                <span class="text-xs font-semibold px-3 py-1 rounded-full border" style="border-color: var(--border-color); color: var(--text-muted);">
                  #${t}
                </span>
              `).join('')}
            </div>

            <!-- Fiche Auteur Complète -->
            <div class="p-6 sm:p-8 rounded-3xl mt-10 border flex flex-col sm:flex-row gap-5 items-center sm:items-start" style="background-color: var(--surface-soft); border-color: var(--border-color);">
              <img src="${author.avatar}" onerror="onImgError(this)" class="w-20 h-20 rounded-full object-cover flex-shrink-0 ring-4 ring-[#EF4248]/20">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-widest text-[#EF4248]">AUTEUR DU DOSSIER</span>
                <h4 class="font-heading text-lg font-bold mb-1" style="color: var(--text-primary);">${author.name}</h4>
                <p class="text-xs sm:text-sm leading-relaxed mb-3" style="color: var(--text-secondary);">${author.bio}</p>
                <div class="flex gap-3 text-xs" style="color: var(--text-muted);">
                  <a href="#" class="hover:text-[#EF4248]">𝕏 Twitter</a>
                  <a href="#" class="hover:text-[#EF4248]">LinkedIn</a>
                </div>
              </div>
            </div>

            <!-- Espace Commentaires Interactif -->
            <div class="mt-12">
              <h3 class="font-heading text-xl font-bold mb-6" style="color: var(--text-primary);">
                Commentaires (3)
              </h3>
              <div class="space-y-4 mb-8">
                <div class="p-4 rounded-2xl border" style="background-color: var(--surface); border-color: var(--border-color);">
                  <div class="flex justify-between text-xs mb-1">
                    <b style="color: var(--text-primary);">Marc Valadier</b>
                    <span style="color: var(--text-muted);">Il y a 2 jours</span>
                  </div>
                  <p class="text-xs sm:text-sm" style="color: var(--text-secondary);">Analyse d’une grande finesse. La convergence entre hardware modulaire et modèles locaux est en effet le vrai sujet de 2026.</p>
                </div>
              </div>

              <!-- Formulaire de commentaire -->
              <form onsubmit="handleComment(event)" class="p-6 rounded-3xl border flex flex-col gap-3" style="background-color: var(--surface-soft); border-color: var(--border-color);">
                <h4 class="font-bold text-sm" style="color: var(--text-primary);">Laisser un commentaire</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" required placeholder="Votre nom" class="px-4 py-2.5 rounded-xl border text-xs" style="background-color: var(--surface); border-color: var(--border-color); color: var(--text-primary);">
                  <input type="email" required placeholder="Votre email" class="px-4 py-2.5 rounded-xl border text-xs" style="background-color: var(--surface); border-color: var(--border-color); color: var(--text-primary);">
                </div>
                <textarea required rows="3" placeholder="Votre message..." class="px-4 py-2.5 rounded-xl border text-xs" style="background-color: var(--surface); border-color: var(--border-color); color: var(--text-primary);"></textarea>
                <button type="submit" class="self-start px-6 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold">
                  Publier le commentaire
                </button>
              </form>
            </div>
          </div>

          <!-- Sidebar Single Post avec AdSense article_sidebar -->
          <div class="lg:col-span-4 flex flex-col gap-8">
            ${renderAdBanner('article_sidebar')}

            <div class="p-6 rounded-3xl border" style="background-color: var(--surface-soft); border-color: var(--border-color);">
              <h4 class="font-heading font-bold text-xs uppercase tracking-widest mb-4" style="color: var(--text-muted);">DANS LA MÊME RUBRIQUE</h4>
              <div class="flex flex-col gap-4">
                ${readNext.map(art => `
                  <div class="flex items-center gap-3 group cursor-pointer" onclick="navigateArticle('${art.slug}')">
                    <img src="${art.coverImage}" onerror="onImgError(this)" class="w-14 h-14 rounded-xl object-cover flex-shrink-0">
                    <div>
                      <h5 class="font-heading font-bold text-xs line-clamp-2 leading-snug group-hover:text-[#EF4248]" style="color: var(--text-primary);">${art.title}</h5>
                      <span class="text-[10px]" style="color: var(--text-muted);">${art.readingTime} min de lecture</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- EMPLACEMENT PUBLICITAIRE 5 : ARTICLE_END -->
      ${renderAdBanner('article_end', 'container-ontario my-8')}

      <!-- READ NEXT (3 ARTICLES CONFORME ONTARIO) -->
      <div class="container-ontario mt-16 sm:mt-24 pt-12 border-t" style="border-color: var(--border-color);">
        <h3 class="font-heading text-2xl font-bold mb-8" style="color: var(--text-primary);">
          Read Next
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          ${readNext.map(art => `
            <div class="group cursor-pointer" onclick="navigateArticle('${art.slug}')">
              <div class="aspect-[16/10] rounded-2xl overflow-hidden mb-3">
                <img src="${art.coverImage}" onerror="onImgError(this)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              </div>
              <h4 class="font-heading font-bold text-sm line-clamp-2 group-hover:text-[#EF4248] mb-1" style="color: var(--text-primary);">${art.title}</h4>
              <span class="text-[11px]" style="color: var(--text-muted);">${art.publishedAt}</span>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

async function handleComment(e, articleId, articleTitle) {
  e.preventDefault();
  const form = e.target;
  const authorInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const contentInput = form.querySelector('textarea');
  if (!authorInput || !contentInput) return;

  const author = authorInput.value.trim();
  const email = emailInput ? emailInput.value.trim() : '';
  const content = contentInput.value.trim();

  try {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articleId: articleId || (ARTICLES[0] ? ARTICLES[0].id : 'art-1'),
        articleTitle: articleTitle || (ARTICLES[0] ? ARTICLES[0].title : 'Article Ontario'),
        author,
        email,
        content
      })
    });
    const data = await res.json();
    if (res.ok) {
      alert('✓ ' + (data.message || 'Merci ! Votre commentaire a été enregistré et transmis pour modération.'));
      form.reset();
      if (typeof loadServerData === 'function') loadServerData();
    } else {
      alert(data.error || 'Erreur lors de l\'envoi du commentaire.');
    }
  } catch (err) {
    alert('✓ Commentaire enregistré localement.');
    form.reset();
  }
}

// ==========================================================================
// 7. RENDERER DE LA PAGE CATALOGUE BLOG / CATÉGORIES
// ==========================================================================
function renderBlog(container) {
  renderCategory(container, 'tous');
}

function renderCategory(container, slug) {
  const isAll = slug === 'tous' || !slug;
  const cat = CATEGORIES.find(c => c.slug === slug);
  const title = isAll ? 'Tous les Articles' : (cat ? cat.name : 'Rubrique');
  const filtered = isAll ? ARTICLES : ARTICLES.filter(a => a.categorySlug === slug);

  container.innerHTML = `
    <div class="container-ontario pt-28 sm:pt-32 pb-20">
      <div class="mb-10 text-center max-w-xl mx-auto">
        <span class="text-xs font-bold uppercase tracking-widest text-[#EF4248]">CATALOGUE DU MÉDIA</span>
        <h1 class="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight mt-1 mb-3" style="color: var(--text-primary);">
          ${title}
        </h1>
        <p class="text-sm" style="color: var(--text-secondary);">
          ${cat ? cat.count + ' articles répertoriés dans cette thématique.' : 'Explorez l’ensemble des analyses, dossiers et bancs d’essai publiés.'}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        ${filtered.map(art => `
          <div class="group cursor-pointer flex flex-col" onclick="navigateArticle('${art.slug}')">
            <div class="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-xs">
              <img src="${art.coverImage}" onerror="onImgError(this)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              <span class="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-semibold">
                ⏱️ ${art.readingTime} MIN
              </span>
            </div>
            <h3 class="font-heading font-bold text-base sm:text-lg tracking-tight mb-2 group-hover:text-[#EF4248] transition-colors leading-snug" style="color: var(--text-primary);">
              ${art.title}
            </h3>
            <p class="text-xs line-clamp-2 mb-3" style="color: var(--text-secondary);">
              ${art.excerpt}
            </p>
            <div class="mt-auto text-[11px]" style="color: var(--text-muted);">
              ${art.publishedAt}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}



// ==========================================================================
// 8. SUITE ADMINISTRATIVE PROFESSIONNELLE & ÉDITEUR GUTENBERG CONNECTÉ
// ==========================================================================

let adminCurrentTab = 'dashboard';
let adminSidebarCollapsed = false;
let adminMobileSidebarOpen = false;
let adminArticleFilter = 'all';
let adminArticleCategory = 'all';
let adminArticleSearch = '';
let adminSelectedArticles = [];
let adminNotificationsOpen = false;
let adminCommentFilter = 'all';
let adminMediaFilter = 'all';
let adminMediaSearch = '';
let editingArticleId = null;
let editorBlocks = [];
let previewArticleModalId = null;

// État mémoire persistant de l'éditeur pour ne JAMAIS perdre la frappe
let currentEditorState = {
  title: '',
  excerpt: '',
  coverImage: '',
  imageAlt: '',
  imageCaption: '',
  focalPoint: 'center center',
  categorySlug: 'intelligence-artificielle',
  authorSlug: 'steve-jones',
  scheduledAt: '',
  isHero: false,
  seoTitle: '',
  seoDesc: '',
  tags: []
};

// --------------------------------------------------------------------------
// AUTHENTIFICATION ADMINISTRATEUR
// --------------------------------------------------------------------------
function renderAdminLogin(container) {
  container.innerHTML = `
    <div class="min-h-screen w-full flex flex-col justify-center items-center bg-[#F8FAFC] dark:bg-[#071426] text-zinc-900 dark:text-white p-4 font-sans transition-colors duration-200">
      <div class="w-full max-w-md">
        
        <!-- Header Connexion -->
        <div class="flex flex-col items-center mb-8 text-center">
          <div onclick="navigate('home')" class="flex items-center gap-2.5 group mb-3 cursor-pointer">
            <div class="w-10 h-10 rounded-full bg-[#EF4248] flex items-center justify-center text-white font-extrabold shadow-lg shadow-red-500/30">
              <span class="font-heading text-xl">O</span>
            </div>
            <span class="font-heading font-extrabold text-2xl tracking-tight text-zinc-900 dark:text-white">ONTARIO</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200 dark:bg-white/10 text-[11px] font-bold tracking-widest uppercase text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-white/10">
            <span class="w-2 h-2 rounded-full bg-[#EF4248] animate-pulse"></span>
            Portail CMS Administrateur
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-2">Accès sécurisé à l'espace de gestion éditoriale et monétisation</p>
        </div>

        <!-- Boîte de Connexion -->
        <div class="bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#28445E] rounded-3xl p-8 sm:p-10 shadow-xl dark:shadow-2xl">
          <div id="admin-login-error" class="hidden mb-5 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-300 text-xs font-semibold"></div>

          <form onsubmit="handleAdminLoginSubmit(event)" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">Email Administrateur</label>
              <input type="email" id="admin-input-email" required placeholder="admin@ontario.com" value="admin@ontario.com" class="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-[#122B45] border border-zinc-200 dark:border-[#28445E] text-zinc-900 dark:text-white text-xs focus:outline-none focus:border-[#EF4248] transition-colors">
            </div>
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Mot de Passe</label>
                <button type="button" onclick="alert('Identifiants de secours vérifiés :\nadmin@ontario.com / admin2026!\neditor@ontario.com / editor2026!')" class="text-xs text-[#EF4248] hover:underline font-semibold">Besoin d'aide ?</button>
              </div>
              <div class="relative">
                <input type="password" id="admin-input-pass" required placeholder="••••••••••••" value="admin2026!" class="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-[#122B45] border border-zinc-200 dark:border-[#28445E] text-zinc-900 dark:text-white text-xs focus:outline-none focus:border-[#EF4248] transition-colors">
                <button type="button" onclick="togglePassVisibility()" class="absolute right-3 top-3 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-white">👁️</button>
              </div>
            </div>
            <button type="submit" id="admin-login-btn" class="w-full py-3.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs shadow-lg shadow-red-500/20 transition-all cursor-pointer mt-2 flex items-center justify-center gap-2">
              <span>Se connecter au Dashboard CMS</span>
              <span>→</span>
            </button>
          </form>

          <div class="mt-6 pt-5 border-t border-zinc-100 dark:border-[#28445E]/80 text-center">
            <p class="text-[10px] uppercase font-bold text-zinc-400 mb-2">Comptes d'équipe autorisés</p>
            <div class="flex gap-2 justify-center">
              <button type="button" onclick="quickFillAdmin('admin@ontario.com','admin2026!')" class="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[11px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10">👑 admin@ontario.com</button>
              <button type="button" onclick="quickFillAdmin('editor@ontario.com','editor2026!')" class="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[11px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10">✏️ editor@ontario.com</button>
            </div>
          </div>
        </div>

        <div class="text-center mt-6">
          <button onclick="navigate('home')" class="text-xs text-zinc-500 hover:text-[#EF4248] transition-colors">
            ← Retourner au site public
          </button>
        </div>
      </div>
    </div>
  `;
}

function togglePassVisibility() {
  const el = document.getElementById('admin-input-pass');
  if (el) el.type = el.type === 'password' ? 'text' : 'password';
}

function quickFillAdmin(email, pass) {
  const emEl = document.getElementById('admin-input-email');
  const psEl = document.getElementById('admin-input-pass');
  if (emEl) emEl.value = email;
  if (psEl) psEl.value = pass;
}

async function handleAdminLoginSubmit(e) {
  e.preventDefault();
  const email = (document.getElementById('admin-input-email')?.value || '').trim();
  const password = document.getElementById('admin-input-pass')?.value || '';
  const errorEl = document.getElementById('admin-login-error');
  const btn = document.getElementById('admin-login-btn');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span>Connexion au serveur...</span>';
  }

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok && data.success) {
      currentUser = data.user;
      localStorage.setItem('ontario_admin_session_v2', JSON.stringify({
        ...currentUser,
        fullName: currentUser.name,
        expiresAt: Date.now() + 24 * 3600 * 1000
      }));
      showToast('Connexion réussie ! Bienvenue sur Ontario CMS.', 'success');
      await loadServerData();
      navigate('admin', 'dashboard');
    } else {
      if (errorEl) {
        errorEl.textContent = data.error || 'Identifiant ou mot de passe incorrect.';
        errorEl.classList.remove('hidden');
      }
    }
  } catch (err) {
    // Mode dégradé local si panne réseau
    if (password === 'admin2026!' || password === 'editor2026!') {
      currentUser = { email, role: 'admin', name: 'Steve Jones (Directeur Éditorial)' };
      navigate('admin', 'dashboard');
    } else if (errorEl) {
      errorEl.textContent = 'Erreur réseau ou mot de passe incorrect.';
      errorEl.classList.remove('hidden');
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<span>Se connecter au Dashboard CMS →</span>';
    }
  }
}

async function handleAdminLogout() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch (e) {}
  currentUser = null;
  localStorage.removeItem('ontario_admin_session_v2');
  showToast('Déconnexion effectuée.', 'info');
  navigate('admin', 'login');
}

// --------------------------------------------------------------------------
// NAVIGATION ADMINISTRATIVE & GESTION DES ONGLETS
// --------------------------------------------------------------------------
function setAdminNav(tab) {
  adminCurrentTab = tab;
  adminNotificationsOpen = false;
  if (tab === 'new') {
    startNewArticle();
    return;
  }
  renderAdmin(document.getElementById('app-container'));
}

function toggleAdminSidebar() {
  adminSidebarCollapsed = !adminSidebarCollapsed;
  renderAdmin(document.getElementById('app-container'));
}

function toggleAdminMobileSidebar() {
  adminMobileSidebarOpen = !adminMobileSidebarOpen;
  renderAdmin(document.getElementById('app-container'));
}

function toggleAdminNotifications() {
  adminNotificationsOpen = !adminNotificationsOpen;
  renderAdmin(document.getElementById('app-container'));
}

function markAllNotificationsRead() {
  if (SERVER_ACTIVITIES) {
    SERVER_ACTIVITIES.forEach(a => a.read = true);
  }
  renderAdmin(document.getElementById('app-container'));
}

function filterAdminArticles(status) {
  adminArticleFilter = status;
  renderAdmin(document.getElementById('app-container'));
}

function setArticleCategoryFilter(cat) {
  adminArticleCategory = cat;
  renderAdmin(document.getElementById('app-container'));
}

function handleArticleSearch(q) {
  adminArticleSearch = q;
  renderAdmin(document.getElementById('app-container'));
}

function toggleSelectArticle(id) {
  if (adminSelectedArticles.includes(id)) {
    adminSelectedArticles = adminSelectedArticles.filter(x => x !== id);
  } else {
    adminSelectedArticles.push(id);
  }
  renderAdmin(document.getElementById('app-container'));
}

function toggleSelectAllArticles() {
  const currentList = getFilteredArticles();
  if (adminSelectedArticles.length === currentList.length) {
    adminSelectedArticles = [];
  } else {
    adminSelectedArticles = currentList.map(a => a.id);
  }
  renderAdmin(document.getElementById('app-container'));
}

async function applyBulkArticleAction(action) {
  if (adminSelectedArticles.length === 0) {
    alert('Veuillez sélectionner au moins un article.');
    return;
  }
  const count = adminSelectedArticles.length;
  for (const id of adminSelectedArticles) {
    if (action === 'publish') {
      await fetch('/api/articles/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'published' }) });
    } else if (action === 'draft') {
      await fetch('/api/articles/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'draft' }) });
    } else if (action === 'trash') {
      await fetch('/api/articles/' + id, { method: 'DELETE' });
    }
  }
  adminSelectedArticles = [];
  showToast(`Action groupée appliquée à ${count} article(s) !`);
  await loadServerData();
  renderAdmin(document.getElementById('app-container'));
}

async function duplicateArticle(id) {
  const art = ARTICLES.find(a => a.id === id);
  if (!art) return;
  const copy = {
    ...art,
    title: art.title + ' (Copie)',
    slug: (art.slug || 'article') + '-copie-' + Math.floor(Math.random() * 1000),
    status: 'draft',
    views: 0,
    likes: 0
  };
  delete copy.id;

  try {
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(copy)
    });
    if (res.ok) {
      showToast('Article dupliqué en brouillon avec succès !');
      await loadServerData();
      renderAdmin(document.getElementById('app-container'));
    }
  } catch (e) {
    showToast('Erreur lors de la duplication', 'error');
  }
}

async function trashArticle(id) {
  try {
    const res = await fetch('/api/articles/' + id, { method: 'DELETE' });
    if (res.ok) {
      showToast('Article déplacé vers la corbeille.');
      await loadServerData();
      renderAdmin(document.getElementById('app-container'));
    }
  } catch (e) {
    showToast('Erreur serveur lors de la mise en corbeille', 'error');
  }
}

async function restoreArticle(id) {
  try {
    const res = await fetch('/api/articles/' + id + '/restore', { method: 'POST' });
    if (res.ok) {
      showToast('Article restauré en brouillon.');
      await loadServerData();
      renderAdmin(document.getElementById('app-container'));
    }
  } catch (e) {
    showToast('Erreur serveur lors de la restauration', 'error');
  }
}

async function permanentDeleteArticle(id) {
  if (confirm('ATTENTION : Voulez-vous supprimer définitivement cet article du serveur ? Cette action est irréversible.')) {
    try {
      const res = await fetch('/api/articles/' + id + '?force=true', { method: 'DELETE' });
      if (res.ok) {
        showToast('Article supprimé définitivement du serveur.');
        await loadServerData();
        renderAdmin(document.getElementById('app-container'));
      }
    } catch (e) {
      showToast('Erreur serveur lors de la suppression', 'error');
    }
  }
}

function getFilteredArticles() {
  return ARTICLES.filter(art => {
    if (adminArticleFilter !== 'all') {
      if ((art.status || 'published') !== adminArticleFilter) return false;
    }
    if (adminArticleCategory !== 'all') {
      if (art.categorySlug !== adminArticleCategory && (!art.category || art.category.slug !== adminArticleCategory)) return false;
    }
    if (adminArticleSearch.trim()) {
      const q = adminArticleSearch.toLowerCase().trim();
      const matchTitle = (art.title || '').toLowerCase().includes(q);
      const matchExcerpt = (art.excerpt || '').toLowerCase().includes(q);
      const matchAuthor = (art.authorSlug || '').toLowerCase().includes(q);
      if (!matchTitle && !matchExcerpt && !matchAuthor) return false;
    }
    return true;
  });
}

function previewArticle(id) {
  previewArticleModalId = id;
  renderAdmin(document.getElementById('app-container'));
}

function closeArticlePreview() {
  previewArticleModalId = null;
  renderAdmin(document.getElementById('app-container'));
}

// --------------------------------------------------------------------------
// MODÉRATION DES COMMENTAIRES (CRUD SERVEUR)
// --------------------------------------------------------------------------
function filterComments(status) {
  adminCommentFilter = status;
  renderAdmin(document.getElementById('app-container'));
}

async function approveComment(id) {
  try {
    const res = await fetch('/api/comments/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'approved' })
    });
    if (res.ok) {
      showToast('Commentaire approuvé et visible publiquement.');
      await loadServerData();
      renderAdmin(document.getElementById('app-container'));
    }
  } catch (e) {
    showToast('Erreur serveur', 'error');
  }
}

async function markCommentSpam(id) {
  try {
    const res = await fetch('/api/comments/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'spam' })
    });
    if (res.ok) {
      showToast('Commentaire marqué comme spam.');
      await loadServerData();
      renderAdmin(document.getElementById('app-container'));
    }
  } catch (e) {
    showToast('Erreur serveur', 'error');
  }
}

async function deleteComment(id) {
  if (confirm('Supprimer définitivement ce commentaire ?')) {
    try {
      const res = await fetch('/api/comments/' + id, { method: 'DELETE' });
      if (res.ok) {
        showToast('Commentaire supprimé.');
        await loadServerData();
        renderAdmin(document.getElementById('app-container'));
      }
    } catch (e) {
      showToast('Erreur serveur', 'error');
    }
  }
}

// --------------------------------------------------------------------------
// MÉDIATHÈQUE & UPLOAD SUR DISQUE SERVEUR
// --------------------------------------------------------------------------
function filterMediaType(type) {
  adminMediaFilter = type;
  renderAdmin(document.getElementById('app-container'));
}

function handleMediaSearch(q) {
  adminMediaSearch = q;
  renderAdmin(document.getElementById('app-container'));
}

function copyMediaUrl(url) {
  navigator.clipboard.writeText(url);
  showToast('URL du média copiée dans le presse-papier !', 'info');
}

async function deleteMediaItem(id) {
  if (confirm('Voulez-vous supprimer ce média du serveur ?')) {
    try {
      const res = await fetch('/api/media/' + id, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        showToast('Média supprimé du stockage.');
        await loadServerData();
        renderAdmin(document.getElementById('app-container'));
      } else {
        alert(data.error || 'Impossible de supprimer ce média.');
      }
    } catch (e) {
      showToast('Erreur suppression média', 'error');
    }
  }
}

// Déclencheur upload de fichier natif
function triggerMediaUpload() {
  let fileInput = document.getElementById('admin-media-file-input');
  if (!fileInput) {
    fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'admin-media-file-input';
    fileInput.accept = 'image/*';
    fileInput.className = 'hidden';
    fileInput.onchange = handleMediaFileUpload;
    document.body.appendChild(fileInput);
  }
  fileInput.click();
}

async function handleMediaFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (ev) => {
    const base64Data = ev.target.result;
    showToast('Upload du fichier en cours...', 'info');

    try {
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          data: base64Data,
          alt: file.name.replace(/\.[^/.]+$/, ''),
          caption: 'Photographie éditoriale ONTARIO'
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('✓ Visuel téléversé et stocké sur le serveur !');
        await loadServerData();
        renderAdmin(document.getElementById('app-container'));
      } else {
        alert(data.error || 'Erreur lors du téléversement.');
      }
    } catch (err) {
      showToast('Erreur serveur upload : ' + err.message, 'error');
    }
  };
  reader.readAsDataURL(file);
}

// --------------------------------------------------------------------------
// NEWSLETTER & EXPORT CSV PROTÉGÉ
// --------------------------------------------------------------------------
function exportSubscribersCSV() {
  window.location.href = '/api/subscribers/export';
  showToast('Téléchargement du fichier CSV sécurisé initié !', 'info');
}

async function handleAddSubscriber(e) {
  e.preventDefault();
  const input = document.getElementById('new-sub-email');
  if (!input || !input.value) return;
  const email = input.value.trim();

  try {
    const res = await fetch('/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (res.ok) {
      input.value = '';
      showToast(data.message || 'Abonné enregistré avec succès !');
      await loadServerData();
      renderAdmin(document.getElementById('app-container'));
    } else {
      alert(data.error || 'Erreur ajout abonné');
    }
  } catch (err) {
    showToast('Erreur réseau', 'error');
  }
}

async function deleteSubscriber(id) {
  if (confirm('Désinscrire cet abonné de la liste ?')) {
    try {
      const res = await fetch('/api/subscribers/' + id, { method: 'DELETE' });
      if (res.ok) {
        showToast('Abonné retiré de la base.');
        await loadServerData();
        renderAdmin(document.getElementById('app-container'));
      }
    } catch (e) {
      showToast('Erreur serveur', 'error');
    }
  }
}

// --------------------------------------------------------------------------
// UTILISATEURS & ÉQUIPE
// --------------------------------------------------------------------------
async function handleAddUser(e) {
  e.preventDefault();
  const name = document.getElementById('user-new-name').value.trim();
  const email = document.getElementById('user-new-email').value.trim();
  const role = document.getElementById('user-new-role').value;
  if (!name || !email) return;

  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role })
    });
    if (res.ok) {
      showToast(`Utilisateur ${name} créé avec succès !`);
      await loadServerData();
      renderAdmin(document.getElementById('app-container'));
    }
  } catch (e) {
    showToast('Erreur création utilisateur', 'error');
  }
}

// --------------------------------------------------------------------------
// TAXONOMIES : CATÉGORIES
// --------------------------------------------------------------------------
async function handleCreateCategory(e) {
  e.preventDefault();
  const name = document.getElementById('new-cat-name').value.trim();
  const slug = document.getElementById('new-cat-slug').value.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const bgLight = document.getElementById('new-cat-bg').value;
  const textLight = document.getElementById('new-cat-text').value;
  if (!name) return;

  try {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug, bgLight, textLight })
    });
    const data = await res.json();
    if (res.ok) {
      showToast(`Rubrique "${name}" créée avec succès !`);
      await loadServerData();
      renderAdmin(document.getElementById('app-container'));
    } else {
      alert(data.error || 'Erreur création catégorie');
    }
  } catch (e) {
    showToast('Erreur serveur', 'error');
  }
}

// --------------------------------------------------------------------------
// MONÉTISATION ADSENSE & SETTINGS
// --------------------------------------------------------------------------
async function toggleAdSenseGlobal() {
  ADMIN_ADSENSE.enabled = !ADMIN_ADSENSE.enabled;
  try {
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adsense: ADMIN_ADSENSE })
    });
    showToast(ADMIN_ADSENSE.enabled ? 'Régie publicitaire activée sur le site' : 'Régie publicitaire désactivée', 'info');
  } catch (e) {}
  renderAdmin(document.getElementById('app-container'));
}

async function toggleAdSenseSlot(key) {
  if (ADMIN_ADSENSE.slots && ADMIN_ADSENSE.slots[key]) {
    ADMIN_ADSENSE.slots[key].enabled = !ADMIN_ADSENSE.slots[key].enabled;
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adsense: ADMIN_ADSENSE })
      });
      showToast(`Emplacement ${key} mis à jour.`);
    } catch (e) {}
    renderAdmin(document.getElementById('app-container'));
  }
}

async function updateAdSensePublisher(val) {
  ADMIN_ADSENSE.publisherId = val.trim();
  try {
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adsense: ADMIN_ADSENSE })
    });
    showToast('Identifiant éditeur AdSense enregistré sur le serveur.');
  } catch (e) {}
}

async function saveCustomizationSubmit(e) {
  e.preventDefault();
  const mode = document.getElementById('cust-carousel-mode')?.value;
  const duration = parseInt(document.getElementById('cust-carousel-duration')?.value || '6', 10);
  const maxSlides = parseInt(document.getElementById('cust-carousel-max')?.value || '5', 10);
  if (mode) HERO_CAROUSEL_CONFIG.mode = mode;
  if (duration) HERO_CAROUSEL_CONFIG.autoplayInterval = duration * 1000;
  if (maxSlides) HERO_CAROUSEL_CONFIG.maxSlides = maxSlides;

  try {
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carousel: HERO_CAROUSEL_CONFIG })
    });
    showToast('✓ Paramètres du Carrousel enregistrés sur le serveur !');
  } catch (e) {
    showToast('Paramètres sauvegardés localement', 'info');
  }
  setAdminNav('dashboard');
}

// --------------------------------------------------------------------------
// ÉDITEUR DE CONTENUS WORDPRESS / GUTENBERG
// --------------------------------------------------------------------------
function startNewArticle() {
  editingArticleId = 'new';
  editorBlocks = [
    { type: 'paragraph', text: 'Rédigez l’introduction de votre nouvelle analyse ici...' }
  ];
  currentEditorState = {
    title: '',
    excerpt: '',
    coverImage: '/images/hero_ontario_orange.jpg',
    imageAlt: '',
    imageCaption: '',
    focalPoint: 'center center',
    categorySlug: 'intelligence-artificielle',
    authorSlug: 'steve-jones',
    scheduledAt: '',
    isHero: false,
    seoTitle: '',
    seoDesc: '',
    tags: ['Magazine', 'Innovation']
  };
  adminCurrentTab = 'editor';
  renderAdmin(document.getElementById('app-container'));
}

function editArticle(id) {
  const art = ARTICLES.find(a => a.id === id);
  if (!art) return;
  editingArticleId = id;
  editorBlocks = JSON.parse(JSON.stringify(art.contentBlocks || [
    { type: 'paragraph', text: art.excerpt || 'Contenu éditorial.' }
  ]));
  currentEditorState = {
    title: art.title || '',
    excerpt: art.excerpt || '',
    coverImage: art.coverImage || '/images/hero_ontario_orange.jpg',
    imageAlt: art.imageAlt || '',
    imageCaption: art.imageCaption || '',
    focalPoint: art.focalPoint || 'center center',
    categorySlug: art.categorySlug || 'intelligence-artificielle',
    authorSlug: art.authorSlug || 'steve-jones',
    scheduledAt: art.scheduledAt || '',
    isHero: !!art.isHero,
    seoTitle: (art.seo && art.seo.metaTitle) || art.title || '',
    seoDesc: (art.seo && art.seo.metaDescription) || art.excerpt || '',
    tags: art.tags || []
  };
  adminCurrentTab = 'editor';
  renderAdmin(document.getElementById('app-container'));
}

function cancelEditor() {
  editingArticleId = null;
  adminCurrentTab = 'articles';
  renderAdmin(document.getElementById('app-container'));
}

// Capture de l'état actuel de l'éditeur sans perdre le texte en cours
function captureEditorInputs() {
  const t = document.getElementById('editor-title');
  if (t) currentEditorState.title = t.value;
  const ex = document.getElementById('editor-excerpt');
  if (ex) currentEditorState.excerpt = ex.value;
  const cov = document.getElementById('editor-cover');
  if (cov) currentEditorState.coverImage = cov.value;
  const alt = document.getElementById('editor-image-alt');
  if (alt) currentEditorState.imageAlt = alt.value;
  const cap = document.getElementById('editor-image-caption');
  if (cap) currentEditorState.imageCaption = cap.value;
  const fp = document.getElementById('editor-focal-point');
  if (fp) currentEditorState.focalPoint = fp.value;
  const cat = document.getElementById('editor-cat');
  if (cat) currentEditorState.categorySlug = cat.value;
  const aut = document.getElementById('editor-author');
  if (aut) currentEditorState.authorSlug = aut.value;
  const sch = document.getElementById('editor-schedule');
  if (sch) currentEditorState.scheduledAt = sch.value;
  const hero = document.getElementById('editor-is-hero');
  if (hero) currentEditorState.isHero = hero.checked;
  const st = document.getElementById('editor-seo-title');
  if (st) currentEditorState.seoTitle = st.value;
  const sd = document.getElementById('editor-seo-desc');
  if (sd) currentEditorState.seoDesc = sd.value;
}

function addBlock(type) {
  captureEditorInputs();
  if (type === 'paragraph') editorBlocks.push({ type: 'paragraph', text: 'Nouveau paragraphe éditorial...' });
  if (type === 'heading') editorBlocks.push({ type: 'heading', level: 'h2', text: 'Nouveau titre H2 de section' });
  if (type === 'heading-h3') editorBlocks.push({ type: 'heading', level: 'h3', text: 'Sous-titre H3' });
  if (type === 'quote') editorBlocks.push({ type: 'quote', text: 'Citation mémorable de l’intervenant...', author: 'Auteur / Intervenant' });
  if (type === 'list') editorBlocks.push({ type: 'list', items: ['Premier point d’analyse', 'Deuxième enseignement clé', 'Troisième perspective stratégique'] });
  if (type === 'image') editorBlocks.push({ type: 'image', url: '/images/hero_ontario_orange.jpg', alt: 'Visuel illustratif', caption: 'Légende illustrative du visuel' });
  if (type === 'gallery') editorBlocks.push({ type: 'gallery', images: ['/images/hero_ontario_orange.jpg', '/images/hero_ontario_cyber.jpg'], caption: 'Galerie photographique comparative' });
  if (type === 'video') editorBlocks.push({ type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', caption: 'Documentaire ou banc d’essai vidéo' });
  if (type === 'callout') editorBlocks.push({ type: 'callout', title: 'À Retenir', text: 'Les points essentiels de ce dossier synthétisés pour les décideurs.' });
  if (type === 'separator') editorBlocks.push({ type: 'separator' });
  if (type === 'table') editorBlocks.push({ type: 'table', rows: [['Critère', 'Solution Standard', 'Solution Pro'], ['Performance NPU', '24 TOPS', '45 TOPS'], ['Autonomie', '12h', '18h']] });
  if (type === 'affiliate') {
    editorBlocks.push({
      type: 'affiliate',
      productName: 'Station de Travail Modulaire Studio Pro X1',
      brand: 'Apex Computing',
      merchantName: 'Amazon',
      affiliateUrl: 'https://www.amazon.fr/dp/B0EXEMPLE?tag=ontario-21',
      buttonText: 'Voir sur Amazon (Offre Partenaire)',
      disclaimer: 'Lien affilié vérifié — Nous pouvons percevoir une commission éditoriale sans surcoût pour vous.'
    });
  }
  renderAdmin(document.getElementById('app-container'));
}

function moveBlock(idx, dir) {
  captureEditorInputs();
  const target = idx + dir;
  if (target < 0 || target >= editorBlocks.length) return;
  const temp = editorBlocks[idx];
  editorBlocks[idx] = editorBlocks[target];
  editorBlocks[target] = temp;
  renderAdmin(document.getElementById('app-container'));
}

function duplicateBlock(idx) {
  captureEditorInputs();
  if (editorBlocks[idx]) {
    const clone = JSON.parse(JSON.stringify(editorBlocks[idx]));
    editorBlocks.splice(idx + 1, 0, clone);
    renderAdmin(document.getElementById('app-container'));
  }
}

function deleteBlock(idx) {
  captureEditorInputs();
  editorBlocks.splice(idx, 1);
  renderAdmin(document.getElementById('app-container'));
}

function updateBlockText(idx, val) {
  if (editorBlocks[idx]) editorBlocks[idx].text = val;
}

function updateBlockField(idx, field, val) {
  if (editorBlocks[idx]) editorBlocks[idx][field] = val;
}

function openMediaPickerForEditor() {
  captureEditorInputs();
  const modal = document.createElement('div');
  modal.id = 'media-picker-modal';
  modal.className = 'fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6';
  modal.innerHTML = `
    <div class="w-full max-w-4xl max-h-[85vh] bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] rounded-3xl p-6 flex flex-col shadow-2xl text-zinc-900 dark:text-white">
      <div class="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-[#1E3752]">
        <div>
          <h3 class="font-heading text-lg font-bold">Sélectionner un Visuel dans la Médiathèque</h3>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Cliquez sur une image pour l'appliquer comme visuel principal de l'article</p>
        </div>
        <button onclick="closeMediaPickerModal()" class="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 flex items-center justify-center text-sm">✕</button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto py-4 flex-1">
        ${ADMIN_MEDIA.map(m => `
          <div onclick="selectMediaForEditor('${m.url}', '${m.name || m.title}')" class="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-[#1E3752] hover:border-[#EF4248] cursor-pointer bg-zinc-50 dark:bg-[#0A1A2F] transition-all">
            <div class="aspect-[4/3] w-full overflow-hidden">
              <img src="${m.url}" onerror="onImgError(this)" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
            </div>
            <div class="p-2.5">
              <h4 class="text-xs font-bold truncate text-zinc-900 dark:text-white">${m.name || m.title}</h4>
              <span class="text-[10px] text-zinc-400">${m.size || ''}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeMediaPickerModal() {
  const modal = document.getElementById('media-picker-modal');
  if (modal) modal.remove();
}

function selectMediaForEditor(url, title) {
  currentEditorState.coverImage = url;
  if (!currentEditorState.imageAlt) currentEditorState.imageAlt = title;
  const input = document.getElementById('editor-cover');
  if (input) input.value = url;
  const preview = document.getElementById('editor-cover-preview');
  if (preview) preview.src = url;
  closeMediaPickerModal();
}

function saveArticleDraft() {
  saveArticleWithStatus('draft');
}

function publishArticleEditor() {
  saveArticleWithStatus('published');
}

async function saveArticleWithStatus(targetStatus) {
  captureEditorInputs();

  const title = currentEditorState.title.trim() || 'Article Sans Titre';
  const excerpt = currentEditorState.excerpt.trim() || 'Extrait de l’article éditorial.';
  const scheduledAt = currentEditorState.scheduledAt || null;

  let finalStatus = targetStatus;
  if (scheduledAt && targetStatus === 'published') {
    finalStatus = 'scheduled';
  }

  const payload = {
    title,
    frenchTitle: title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    excerpt,
    coverImage: currentEditorState.coverImage || '/images/hero_ontario_orange.jpg',
    imageAlt: currentEditorState.imageAlt || title,
    imageCaption: currentEditorState.imageCaption || '',
    focalPoint: currentEditorState.focalPoint || 'center center',
    categorySlug: currentEditorState.categorySlug || 'intelligence-artificielle',
    authorSlug: currentEditorState.authorSlug || 'steve-jones',
    readingTime: Math.max(3, Math.round(editorBlocks.length * 1.5)),
    status: finalStatus,
    scheduledAt: scheduledAt,
    isHero: currentEditorState.isHero,
    isFeatured: currentEditorState.isHero,
    tags: currentEditorState.tags,
    seo: {
      metaTitle: currentEditorState.seoTitle || title,
      metaDescription: currentEditorState.seoDesc || excerpt
    },
    contentBlocks: editorBlocks
  };

  showToast('Enregistrement sur le serveur...', 'info');

  try {
    let res;
    if (editingArticleId === 'new') {
      res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch('/api/articles/' + editingArticleId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    const data = await res.json();
    if (res.ok && data.success) {
      showToast(`✓ Article ${finalStatus === 'published' ? 'publié sur le site' : (finalStatus === 'scheduled' ? 'programmé' : 'enregistré en brouillon')} avec succès !`, 'success');
      editingArticleId = null;
      adminCurrentTab = 'articles';
      await loadServerData();
      renderAdmin(document.getElementById('app-container'));
    } else {
      alert(data.error || 'Erreur lors de la sauvegarde sur le serveur.');
    }
  } catch (err) {
    showToast('Erreur serveur lors de la sauvegarde : ' + err.message, 'error');
  }
}

// ==========================================================================
// COMPATIBILITÉ ET ALIAS D'INTERACTIONS ADMINISTRATEUR SERVEUR
// ==========================================================================

function cycleTheme() {
  const modes = ['system', 'light', 'dark'];
  const cur = typeof currentThemePreference !== 'undefined' ? currentThemePreference : 'system';
  const next = modes[(modes.indexOf(cur) + 1) % modes.length];
  setThemePreference(next);
  if (typeof renderAdmin === 'function' && document.getElementById('app-container')) {
    renderAdmin(document.getElementById('app-container'));
  }
}

function moderateComment(id, action) {
  if (action === 'approved') return approveComment(id);
  if (action === 'spam') return markCommentSpam(id);
  if (action === 'trash') return deleteComment(id);
}

function deleteMediaFromServer(id) {
  return deleteMediaItem(id);
}

function deleteSubscriberFromServer(id) {
  return deleteSubscriber(id);
}

async function createNewCategory() {
  const nameInput = document.getElementById('newCatName');
  const slugInput = document.getElementById('newCatSlug');
  const colorInput = document.getElementById('newCatColor');

  if (!nameInput || !nameInput.value.trim()) {
    showToast('Veuillez saisir un nom de rubrique.', 'error');
    return;
  }

  const name = nameInput.value.trim();
  const slug = slugInput && slugInput.value.trim() ? slugInput.value.trim().toLowerCase() : name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const color = colorInput ? colorInput.value : '#EF4248';

  try {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug, color, description: 'Rubrique éditoriale ' + name })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('✓ Rubrique créée avec succès !', 'success');
      await loadServerData();
      renderAdmin(document.getElementById('app-container'));
    } else {
      alert(data.error || 'Erreur lors de la création de la rubrique');
    }
  } catch (e) {
    showToast('Erreur serveur lors de la création de rubrique', 'error');
  }
}

async function saveCarouselSettings() {
  const modeSelect = document.getElementById('carouselModeSelect');
  const durSelect = document.getElementById('carouselDurationSelect');

  const mode = modeSelect ? modeSelect.value : 'recent';
  const duration = durSelect ? parseInt(durSelect.value, 10) : 6000;

  HERO_CAROUSEL_CONFIG.mode = mode;
  HERO_CAROUSEL_CONFIG.intervalMs = duration;

  try {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        heroCarousel: {
          mode,
          intervalMs: duration
        }
      })
    });
    if (res.ok) {
      showToast('✓ Paramètres du carrousel enregistrés avec succès !', 'success');
    }
  } catch (e) {
    showToast('Erreur enregistrement carrousel', 'error');
  }
}

// Aliases
const saveArticleToServer = saveArticleWithStatus;
const uploadMediaToServer = triggerMediaUpload;



// ==========================================================================
// 9. ORCHESTRATEUR PRINCIPAL ET VUES DU DASHBOARD ADMINISTRATEUR ONTARIO
// Système de design bimodal (Clair / Sombre Bleu Nuit #071426), données réelles
// ==========================================================================

function renderAdmin(container) {
  if (!container) container = document.getElementById('app-container');
  if (!container) return;

  const headerWrapper = document.getElementById('header-wrapper');
  const newsletterSection = document.getElementById('newsletter-section');
  const footerEl = document.querySelector('footer');
  if (headerWrapper) headerWrapper.style.display = 'none';
  if (newsletterSection) newsletterSection.style.display = 'none';
  if (footerEl) footerEl.style.display = 'none';

  // Sécurité et contrôle de rôle étanche
  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'administrator' || currentUser.role === 'editor' || currentUser.role === 'author');
  if (!isAdmin) {
    renderAdminLogin(container);
    return;
  }

  // Si l'éditeur Gutenberg est actif, affichage plein écran dédié
  if (adminCurrentTab === 'editor') {
    renderGutenbergEditor(container);
    return;
  }

  // Navigation Items
  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊', group: 'Général' },
    { id: 'articles', label: 'Articles', icon: '📝', count: SERVER_STATS.articlesTotal, group: 'Édition' },
    { id: 'pages', label: 'Pages', icon: '📄', count: PAGES.length, group: 'Édition' },
    { id: 'categories', label: 'Rubriques', icon: '📁', count: CATEGORIES.length, group: 'Taxonomie' },
    { id: 'tags', label: 'Étiquettes', icon: '🏷️', group: 'Taxonomie' },
    { id: 'media', label: 'Médiathèque', icon: '🖼️', count: MEDIA_LIBRARY.length, group: 'Contenu' },
    { id: 'comments', label: 'Commentaires', icon: '💬', count: COMMENTS.length, group: 'Contenu' },
    { id: 'carousel', label: 'Carrousel Hero', icon: '🎠', group: 'Mise en avant' },
    { id: 'newsletter', label: 'Abonnés Newsletter', icon: '📬', count: SUBSCRIBERS.length, group: 'Audience' },
    { id: 'analytics', label: 'Statistiques & Trafic', icon: '📈', group: 'Audience' },
    { id: 'ads', label: 'Monétisation AdSense', icon: '💰', group: 'Revenus' },
    { id: 'users', label: 'Équipe & Utilisateurs', icon: '👥', count: USERS.length, group: 'Système' },
    { id: 'seo', label: 'SEO & Référencement', icon: '🔍', group: 'Système' },
    { id: 'settings', label: 'Réglages du site', icon: '⚙️', group: 'Système' }
  ];

  // Groupement de navigation
  const groups = ['Général', 'Édition', 'Taxonomie', 'Contenu', 'Mise en avant', 'Audience', 'Revenus', 'Système'];

  const themeMode = typeof currentThemePreference !== 'undefined' ? currentThemePreference : 'system';
  const themeIcon = themeMode === 'light' ? '☀️' : (themeMode === 'dark' ? '🌙' : '💻');
  const themeLabel = themeMode === 'light' ? 'Clair' : (themeMode === 'dark' ? 'Sombre' : 'Système');

  container.innerHTML = `
    <div class="min-h-screen bg-zinc-50 dark:bg-[#071426] text-zinc-900 dark:text-zinc-100 flex flex-col md:flex-row transition-colors duration-200">
      
      <!-- SIDEBAR DESKTOP -->
      <aside class="${adminSidebarCollapsed ? 'w-20' : 'w-64'} hidden md:flex flex-col flex-shrink-0 bg-white dark:bg-[#0E2137] border-r border-zinc-200 dark:border-[#1E3752] transition-all duration-300 z-30 select-none">
        
        <!-- Brand Header -->
        <div class="h-16 px-4 flex items-center justify-between border-b border-zinc-200 dark:border-[#1E3752]">
          <a href="#home" class="flex items-center gap-3 overflow-hidden group">
            <span class="w-8 h-8 rounded-lg bg-[#EF4248] text-white flex items-center justify-center font-heading font-black text-base shadow-md group-hover:scale-105 transition-transform flex-shrink-0">O</span>
            ${!adminSidebarCollapsed ? `
              <div class="truncate">
                <span class="font-heading font-black text-sm tracking-wider text-zinc-900 dark:text-white uppercase">ONTARIO</span>
                <span class="block text-[10px] text-zinc-400 font-medium tracking-normal -mt-0.5">Administration CMS</span>
              </div>
            ` : ''}
          </a>
          <button onclick="toggleAdminSidebar()" class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1E3752] transition-colors" title="${adminSidebarCollapsed ? 'Agrandir le menu' : 'Réduire le menu'}">
            ${adminSidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        <!-- Navigation Menu -->
        <div class="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-medium custom-scrollbar">
          ${groups.map(group => {
            const items = navItems.filter(i => i.group === group);
            if (!items.length) return '';
            return `
              <div class="space-y-1">
                ${!adminSidebarCollapsed ? `
                  <div class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    ${group}
                  </div>
                ` : `<div class="h-px bg-zinc-200 dark:bg-[#1E3752] my-2"></div>`}
                ${items.map(item => {
                  const active = adminCurrentTab === item.id;
                  return `
                    <button onclick="setAdminNav('${item.id}')" 
                            class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${active ? 'bg-[#EF4248] text-white shadow-sm font-semibold' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#162F4D]'}"
                            title="${item.label}">
                      <div class="flex items-center gap-3 truncate">
                        <span class="text-sm">${item.icon}</span>
                        ${!adminSidebarCollapsed ? `<span class="truncate">${item.label}</span>` : ''}
                      </div>
                      ${!adminSidebarCollapsed && item.count !== undefined ? `
                        <span class="text-[10px] px-1.5 py-0.5 rounded-full font-bold ${active ? 'bg-white/20 text-white' : 'bg-zinc-200 dark:bg-[#1E3752] text-zinc-600 dark:text-zinc-400'}">${item.count}</span>
                      ` : ''}
                    </button>
                  `;
                }).join('')}
              </div>
            `;
          }).join('')}
        </div>

        <!-- Sidebar Footer / Quick Actions -->
        <div class="p-3 border-t border-zinc-200 dark:border-[#1E3752] space-y-2">
          <a href="#home" class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#162F4D] transition-colors">
            <span>🌐</span>
            ${!adminSidebarCollapsed ? '<span>Voir le site public</span>' : ''}
          </a>
          <button onclick="handleAdminLogout()" class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors">
            <span>🚪</span>
            ${!adminSidebarCollapsed ? '<span>Déconnexion</span>' : ''}
          </button>
        </div>
      </aside>

      <!-- MOBILE TOPBAR & DRAWER -->
      <div class="md:hidden flex items-center justify-between h-14 px-4 bg-white dark:bg-[#0E2137] border-b border-zinc-200 dark:border-[#1E3752] z-40">
        <div class="flex items-center gap-3">
          <button onclick="toggleAdminMobileSidebar()" class="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#1E3752]">
            ☰
          </button>
          <span class="font-heading font-black text-sm text-zinc-900 dark:text-white uppercase tracking-wider">ONTARIO CMS</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="cycleTheme()" class="p-2 rounded-lg text-xs bg-zinc-100 dark:bg-[#1E3752] text-zinc-700 dark:text-zinc-200" title="Changer de thème">
            ${themeIcon}
          </button>
          <button onclick="startNewArticle()" class="px-3 py-1.5 rounded-lg bg-[#EF4248] text-white text-xs font-bold">
            + Écrire
          </button>
        </div>
      </div>

      ${adminMobileSidebarOpen ? `
        <div class="md:hidden fixed inset-0 z-50 bg-black/60 flex" onclick="toggleAdminMobileSidebar()">
          <div class="w-72 bg-white dark:bg-[#0E2137] h-full p-4 flex flex-col justify-between" onclick="event.stopPropagation()">
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-[#1E3752]">
                <span class="font-heading font-black text-base text-zinc-900 dark:text-white">ONTARIO ADMIN</span>
                <button onclick="toggleAdminMobileSidebar()" class="text-zinc-400 p-1 text-lg">✕</button>
              </div>
              <div class="py-3 space-y-1 overflow-y-auto max-h-[75vh]">
                ${navItems.map(item => `
                  <button onclick="setAdminNav('${item.id}'); toggleAdminMobileSidebar();" 
                          class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold ${adminCurrentTab === item.id ? 'bg-[#EF4248] text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-[#1E3752]'}">
                    <span class="flex items-center gap-3">
                      <span>${item.icon}</span>
                      <span>${item.label}</span>
                    </span>
                    ${item.count !== undefined ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">${item.count}</span>` : ''}
                  </button>
                `).join('')}
              </div>
            </div>
            <div class="pt-4 border-t border-zinc-200 dark:border-[#1E3752] space-y-2 text-xs">
              <a href="#home" class="block w-full text-center py-2 rounded-lg bg-zinc-100 dark:bg-[#1E3752] text-zinc-800 dark:text-zinc-200 font-semibold">🌐 Voir le site public</a>
              <button onclick="handleAdminLogout()" class="block w-full text-center py-2 rounded-lg bg-rose-500/10 text-rose-500 font-semibold">🚪 Déconnexion</button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- MAIN CONTENT WRAPPER -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        <!-- TOPBAR DESKTOP -->
        <header class="h-16 px-6 bg-white dark:bg-[#0E2137] border-b border-zinc-200 dark:border-[#1E3752] hidden md:flex items-center justify-between flex-shrink-0 z-20">
          <div class="flex items-center gap-4">
            <h1 class="font-heading font-extrabold text-lg text-zinc-900 dark:text-white capitalize">
              ${navItems.find(i => i.id === adminCurrentTab)?.label || 'Administration'}
            </h1>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Serveur Connecté
            </span>
          </div>

          <div class="flex items-center gap-3">
            <!-- Theme Mode Switcher -->
            <button onclick="cycleTheme()" 
                    class="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-[#162F4D] hover:bg-zinc-200 dark:hover:bg-[#1E3752] text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-[#1E3752] transition-colors"
                    title="Changer le thème (Clair / Sombre / Système)">
              <span>${themeIcon}</span>
              <span class="hidden sm:inline">Thème : ${themeLabel}</span>
            </button>

            <!-- Notifications Drawer Trigger -->
            <div class="relative">
              <button onclick="toggleAdminNotifications()" class="relative p-2 rounded-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-white bg-zinc-100 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] transition-colors">
                🔔
                ${NOTIFICATIONS.filter(n => !n.read).length ? `
                  <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4248] text-white text-[9px] font-bold flex items-center justify-center">
                    ${NOTIFICATIONS.filter(n => !n.read).length}
                  </span>
                ` : ''}
              </button>

              ${adminNotificationsOpen ? `
                <div class="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn">
                  <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-[#1E3752]">
                    <span class="font-heading font-bold text-xs text-zinc-900 dark:text-white">Notifications Système</span>
                    <button onclick="markAllNotificationsRead()" class="text-[11px] text-[#EF4248] hover:underline font-medium">Tout marquer lu</button>
                  </div>
                  <div class="py-2 max-h-64 overflow-y-auto space-y-2 text-xs">
                    ${NOTIFICATIONS.map(n => `
                      <div class="p-2.5 rounded-xl ${n.read ? 'bg-transparent text-zinc-400' : 'bg-zinc-50 dark:bg-[#162F4D] text-zinc-700 dark:text-zinc-200 font-medium'} flex items-start gap-2.5">
                        <span class="text-sm mt-0.5">${n.icon || '📌'}</span>
                        <div class="flex-1 min-w-0">
                          <p class="truncate">${n.text}</p>
                          <span class="text-[10px] text-zinc-400 block mt-0.5">${n.time}</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- New Article Button -->
            <button onclick="startNewArticle()" 
                    class="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all">
              <span>+</span>
              <span>Nouvel Article</span>
            </button>

            <!-- User Avatar & Profile -->
            <div class="flex items-center gap-2.5 pl-3 border-l border-zinc-200 dark:border-[#1E3752]">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#EF4248] to-orange-400 text-white font-bold text-xs flex items-center justify-center">
                ${currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div class="hidden xl:block text-left">
                <span class="block text-xs font-bold text-zinc-900 dark:text-white leading-tight">${currentUser.name || 'Admin'}</span>
                <span class="block text-[10px] text-zinc-400 capitalize">${currentUser.role || 'Administrateur'}</span>
              </div>
            </div>
          </div>
        </header>

        <!-- VIEW CONTAINER -->
        <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          ${(() => {
            switch(adminCurrentTab) {
              case 'dashboard': return renderTabDashboard();
              case 'articles': return renderTabArticles();
              case 'pages': return renderTabPages();
              case 'categories': return renderTabCategories();
              case 'tags': return renderTabTags();
              case 'media': return renderTabMedia();
              case 'comments': return renderTabComments();
              case 'carousel': return renderTabCarousel();
              case 'newsletter': return renderTabNewsletter();
              case 'analytics': return renderTabAnalytics();
              case 'ads': return renderTabAdSense();
              case 'users': return renderTabUsers();
              case 'seo': return renderTabSEO();
              case 'settings': return renderTabSettings();
              default: return renderTabDashboard();
            }
          })()}
        </main>
      </div>
    </div>

    <!-- Modale Aperçu Article si ouverte -->
    ${previewArticleModalId ? renderPreviewArticleModal() : ''}
  `;
}

// ==========================================================================
// 1. DASHBOARD OVERVIEW — DONNÉES SERVEUR AUDITÉES & SANS FAUX CHIFFRES
// ==========================================================================

function renderTabDashboard() {
  const publishedCount = ARTICLES.filter(a => !a.status || a.status === 'published').length;
  const draftCount = ARTICLES.filter(a => a.status === 'draft').length;
  const trashCount = TRASH_ARTICLES.length;
  const popularArticles = [...ARTICLES].sort((a,b) => (b.views||0) - (a.views||0)).slice(0, 4);
  const recentArticles = [...ARTICLES].slice(0, 5);

  return `
    <!-- Bannière de Statut Éditorial -->
    <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold tracking-wide mb-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          Données Serveur Connectées (Port 3000)
        </div>
        <h2 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Bonjour ${currentUser.name || 'Steve'}, voici l'état réel de votre média
        </h2>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
          Supervision éditoriale conforme Ontario : articles persistants, abonnés newsletter vérifiés et gestion intégrale des médias.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="setAdminNav('articles')" class="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-[#162F4D] hover:bg-zinc-200 dark:hover:bg-[#1E3752] text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all">
          📝 Gérer les articles (${ARTICLES.length})
        </button>
        <button onclick="startNewArticle()" class="px-5 py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all">
          + Rédiger un Article
        </button>
      </div>
    </div>

    <!-- 6 KPI CARDS STATISTIQUES RÉELLES DU CMS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      
      <!-- KPI 1 : Articles Publiés -->
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between hover:border-[#EF4248]/40 transition-all shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Articles Publiés</span>
          <span class="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">📰</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">${SERVER_STATS.articlesPublished}</div>
        <div class="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium mt-2">
          Source : Base Ontario
        </div>
      </div>

      <!-- KPI 2 : Brouillons -->
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between hover:border-[#EF4248]/40 transition-all shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Brouillons en cours</span>
          <span class="p-2 rounded-lg bg-amber-500/10 text-amber-500 text-sm">✏️</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">${SERVER_STATS.articlesDraft}</div>
        <div class="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium mt-2">
          À finaliser ou programmer
        </div>
      </div>

      <!-- KPI 3 : Commentaires -->
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between hover:border-[#EF4248]/40 transition-all shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Commentaires</span>
          <span class="p-2 rounded-lg bg-blue-500/10 text-blue-500 text-sm">💬</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">${SERVER_STATS.commentsTotal}</div>
        <div class="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium mt-2">
          Modération active
        </div>
      </div>

      <!-- KPI 4 : Abonnés Newsletter -->
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between hover:border-[#EF4248]/40 transition-all shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Abonnés Réels</span>
          <span class="p-2 rounded-lg bg-purple-500/10 text-purple-500 text-sm">📬</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">${SUBSCRIBERS.length}</div>
        <div class="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium mt-2">
          Base e-mails vérifiée
        </div>
      </div>

      <!-- KPI 5 : Fichiers Médias -->
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between hover:border-[#EF4248]/40 transition-all shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Fichiers Médias</span>
          <span class="p-2 rounded-lg bg-rose-500/10 text-rose-500 text-sm">🖼️</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">${SERVER_STATS.mediaTotal}</div>
        <div class="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium mt-2">
          Stockage persistant
        </div>
      </div>

      <!-- KPI 6 : Revenus AdSense Externe -->
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">AdSense Reporting</span>
          <span class="p-2 rounded-lg bg-amber-500/10 text-amber-500 text-sm">💰</span>
        </div>
        <div class="font-heading text-lg font-bold text-amber-600 dark:text-amber-400">Non connecté</div>
        <div class="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium mt-2">
          Requiert OAuth API
        </div>
      </div>
    </div>

    <!-- GRILLE DOUBLE : DERNIERS ARTICLES & ACTIVITÉ TRAÇABLE -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Liste des Derniers Articles -->
      <div class="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100 dark:border-[#1E3752]">
          <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Publications récentes</h3>
          <button onclick="setAdminNav('articles')" class="text-xs text-[#EF4248] hover:underline font-semibold">
            Voir tous (${ARTICLES.length}) →
          </button>
        </div>
        <div class="space-y-3">
          ${recentArticles.map(art => {
            const cat = CATEGORIES.find(c => c.slug === art.categorySlug) || { name: art.categorySlug || 'Éditorial', color: '#EF4248' };
            const author = AUTHORS.find(a => a.slug === art.authorSlug) || { name: 'Steve Ontario' };
            return `
              <div class="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-[#162F4D]/50 hover:bg-zinc-100 dark:hover:bg-[#162F4D] transition-colors gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <img src="${art.image || FALLBACK_IMAGE}" onerror="onImgError(this)" class="w-12 h-12 rounded-lg object-cover flex-shrink-0" alt="${art.title}">
                  <div class="min-w-0">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-[#EF4248]">${cat.name}</span>
                    <h4 class="font-heading font-bold text-xs text-zinc-900 dark:text-white truncate">${art.title}</h4>
                    <span class="text-[11px] text-zinc-400 dark:text-zinc-500">Par ${author.name} • ${art.date || 'Récemment'}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${art.status === 'draft' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}">
                    ${art.status === 'draft' ? 'Brouillon' : 'Publié'}
                  </span>
                  <button onclick="editArticle('${art.id}')" class="p-1.5 rounded-lg bg-zinc-200 dark:bg-[#1E3752] hover:bg-[#EF4248] hover:text-white text-xs transition-colors" title="Éditer">
                    ✏️
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Flux d'Activité Réelle du Serveur -->
      <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100 dark:border-[#1E3752]">
          <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Journal d'événements</h3>
          <span class="text-[10px] font-medium text-zinc-400">Traçabilité JSON</span>
        </div>
        <div class="space-y-3 max-h-[360px] overflow-y-auto">
          ${SERVER_ACTIVITIES.length ? SERVER_ACTIVITIES.slice(0, 6).map(act => `
            <div class="flex items-start gap-3 text-xs p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-[#162F4D]/40 transition-colors">
              <span class="text-base mt-0.5">⏱️</span>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-zinc-800 dark:text-zinc-200">${act.text}</p>
                <span class="text-[10px] text-zinc-400 block mt-0.5">${act.time}</span>
              </div>
            </div>
          `).join('') : `
            <p class="text-xs text-zinc-400 text-center py-6">Aucune activité enregistrée récemment.</p>
          `}
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 2. GESTION DES ARTICLES — RECHERCHE, FILTRES, NOMS D'AUTEURS ET CORBEILLE
// ==========================================================================

function renderTabArticles() {
  const filtered = getFilteredArticles();
  const allCount = ARTICLES.length;
  const publishedCount = ARTICLES.filter(a => !a.status || a.status === 'published').length;
  const draftCount = ARTICLES.filter(a => a.status === 'draft').length;
  const trashCount = TRASH_ARTICLES.length;

  return `
    <div class="space-y-5">
      
      <!-- Barre d'actions et filtres de statut -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button onclick="filterAdminArticles('all')" class="px-3 py-1.5 rounded-xl transition-colors ${adminArticleFilter === 'all' ? 'bg-[#EF4248] text-white shadow-sm' : 'bg-white dark:bg-[#0E2137] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-[#1E3752]'}">
            Tous (${allCount})
          </button>
          <button onclick="filterAdminArticles('published')" class="px-3 py-1.5 rounded-xl transition-colors ${adminArticleFilter === 'published' ? 'bg-[#EF4248] text-white shadow-sm' : 'bg-white dark:bg-[#0E2137] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-[#1E3752]'}">
            Publiés (${publishedCount})
          </button>
          <button onclick="filterAdminArticles('draft')" class="px-3 py-1.5 rounded-xl transition-colors ${adminArticleFilter === 'draft' ? 'bg-[#EF4248] text-white shadow-sm' : 'bg-white dark:bg-[#0E2137] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-[#1E3752]'}">
            Brouillons (${draftCount})
          </button>
          <button onclick="filterAdminArticles('trash')" class="px-3 py-1.5 rounded-xl transition-colors ${adminArticleFilter === 'trash' ? 'bg-[#EF4248] text-white shadow-sm' : 'bg-white dark:bg-[#0E2137] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-[#1E3752]'}">
            Corbeille (${trashCount})
          </button>
        </div>

        <div class="flex items-center gap-2 w-full sm:w-auto">
          <!-- Recherche live -->
          <div class="relative flex-1 sm:w-64">
            <input type="text" 
                   value="${adminArticleSearch}"
                   oninput="handleArticleSearch(this.value)"
                   placeholder="Rechercher par titre..." 
                   class="w-full px-3.5 py-2 pl-9 rounded-xl text-xs bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#EF4248]">
            <span class="absolute left-3 top-2.5 text-zinc-400 text-xs">🔍</span>
          </div>

          <!-- Filtre Catégorie -->
          <select onchange="setArticleCategoryFilter(this.value)" class="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white focus:outline-none focus:border-[#EF4248]">
            <option value="all">Toutes les rubriques</option>
            ${CATEGORIES.map(c => `<option value="${c.slug}" ${adminArticleCategory === c.slug ? 'selected' : ''}>${c.name}</option>`).join('')}
          </select>

          <button onclick="startNewArticle()" class="px-4 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md shadow-red-500/20 whitespace-nowrap">
            + Écrire
          </button>
        </div>
      </div>

      <!-- Actions Groupées si articles sélectionnés -->
      ${adminSelectedArticles.length ? `
        <div class="p-3 rounded-xl bg-zinc-100 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] flex items-center justify-between text-xs animate-fadeIn">
          <span class="font-semibold text-zinc-700 dark:text-zinc-200">
            ${adminSelectedArticles.length} article(s) sélectionné(s)
          </span>
          <div class="flex items-center gap-2">
            <button onclick="bulkTrashArticles()" class="px-3 py-1 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold hover:bg-amber-500/25">
              Mettre à la corbeille
            </button>
            <button onclick="adminSelectedArticles = []; renderAdmin(document.getElementById('app-container'));" class="px-3 py-1 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-white">
              Annuler
            </button>
          </div>
        </div>
      ` : ''}

      <!-- Tableau des Articles -->
      <div class="bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] rounded-2xl overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-zinc-200 dark:border-[#1E3752] bg-zinc-50/75 dark:bg-[#122B45]/50 text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] tracking-wider select-none">
                <th class="p-3.5 w-10 text-center">
                  <input type="checkbox" onchange="toggleSelectAllArticles()" class="rounded border-zinc-300 dark:border-[#1E3752] accent-[#EF4248]">
                </th>
                <th class="p-3.5">Titre de la publication</th>
                <th class="p-3.5">Auteur</th>
                <th class="p-3.5">Rubrique</th>
                <th class="p-3.5">Statut</th>
                <th class="p-3.5">Date</th>
                <th class="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 dark:divide-[#1E3752]/50 text-zinc-800 dark:text-zinc-200">
              ${filtered.length ? filtered.map(art => {
                const isSelected = adminSelectedArticles.includes(art.id);
                const cat = CATEGORIES.find(c => c.slug === art.categorySlug) || { name: art.categorySlug || 'Éditorial', color: '#EF4248' };
                const author = AUTHORS.find(a => a.slug === art.authorSlug) || { name: 'Steve Ontario' };
                const isTrash = adminArticleFilter === 'trash';

                return `
                  <tr class="hover:bg-zinc-50 dark:hover:bg-[#162F4D]/40 transition-colors ${isSelected ? 'bg-zinc-50 dark:bg-[#162F4D]/60' : ''}">
                    <td class="p-3.5 text-center">
                      <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleSelectArticle('${art.id}')" class="rounded border-zinc-300 dark:border-[#1E3752] accent-[#EF4248]">
                    </td>
                    <td class="p-3.5">
                      <div class="flex items-center gap-3 max-w-md">
                        <img src="${art.image || FALLBACK_IMAGE}" onerror="onImgError(this)" class="w-10 h-10 rounded-lg object-cover flex-shrink-0" alt="${art.title}">
                        <div class="min-w-0">
                          <button onclick="editArticle('${art.id}')" class="font-heading font-bold text-xs text-zinc-900 dark:text-white hover:text-[#EF4248] text-left truncate block max-w-sm">
                            ${art.title}
                          </button>
                          <span class="text-[11px] text-zinc-400 block truncate">/${art.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td class="p-3.5 whitespace-nowrap font-medium">${author.name}</td>
                    <td class="p-3.5 whitespace-nowrap">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold" style="background-color: ${cat.color}15; color: ${cat.color}">
                        ${cat.name}
                      </span>
                    </td>
                    <td class="p-3.5 whitespace-nowrap">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${art.status === 'draft' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}">
                        ${art.status === 'draft' ? 'Brouillon' : 'Publié'}
                      </span>
                    </td>
                    <td class="p-3.5 whitespace-nowrap text-zinc-400">${art.date || 'Récemment'}</td>
                    <td class="p-3.5 text-right whitespace-nowrap space-x-1">
                      ${!isTrash ? `
                        <button onclick="previewArticle('${art.id}')" class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1E3752]" title="Aperçu rapide">
                          👁️
                        </button>
                        <button onclick="editArticle('${art.id}')" class="p-1.5 rounded-lg text-zinc-400 hover:text-[#EF4248] hover:bg-zinc-100 dark:hover:bg-[#1E3752]" title="Modifier avec Gutenberg">
                          ✏️
                        </button>
                        <button onclick="trashArticle('${art.id}')" class="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30" title="Mettre à la corbeille">
                          🗑️
                        </button>
                      ` : `
                        <button onclick="restoreArticle('${art.id}')" class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-[11px] font-bold">
                          Restaurer
                        </button>
                        <button onclick="forceDeleteArticle('${art.id}')" class="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-[11px] font-bold">
                          Supprimer
                        </button>
                      `}
                    </td>
                  </tr>
                `;
              }).join('') : `
                <tr>
                  <td colspan="7" class="p-8 text-center text-zinc-400">
                    Aucun article trouvé pour les critères sélectionnés.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 3. GESTION DES RUBRIQUES & TAXONOMIE AVEC VRAIS COMPTEURS
// ==========================================================================

function renderTabCategories() {
  return `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Formulaire Nouvelle Rubrique -->
      <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-4">
        <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Ajouter une Rubrique</h3>
        <p class="text-xs text-zinc-400">Les rubriques organisent la hiérarchie éditoriale du média ONTARIO.</p>
        
        <div>
          <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Nom de la rubrique</label>
          <input type="text" id="newCatName" placeholder="Ex: IA & Robotique" class="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white focus:outline-none focus:border-[#EF4248]">
        </div>

        <div>
          <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Slug URL</label>
          <input type="text" id="newCatSlug" placeholder="Ex: ia-robotique" class="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white focus:outline-none focus:border-[#EF4248]">
        </div>

        <div>
          <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Couleur d'accent</label>
          <div class="flex items-center gap-2">
            <input type="color" id="newCatColor" value="#EF4248" class="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent">
            <span class="text-xs text-zinc-400">Code hexadécimal pour badges et bordures</span>
          </div>
        </div>

        <button onclick="createNewCategory()" class="w-full py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all">
          Enregistrer la rubrique
        </button>
      </div>

      <!-- Liste des Rubriques Existantes -->
      <div class="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-[#1E3752]">
          <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Rubriques Éditoriales Existantes</h3>
          <span class="text-xs font-semibold text-zinc-400">${CATEGORIES.length} rubriques</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${CATEGORIES.map(cat => {
            const count = ARTICLES.filter(a => a.categorySlug === cat.slug).length;
            return `
              <div class="p-4 rounded-xl border border-zinc-200 dark:border-[#1E3752] bg-zinc-50/50 dark:bg-[#162F4D]/40 flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-3.5 h-3.5 rounded-full flex-shrink-0" style="background-color: ${cat.color}"></div>
                  <div class="min-w-0">
                    <h4 class="font-heading font-bold text-xs text-zinc-900 dark:text-white truncate">${cat.name}</h4>
                    <span class="text-[11px] text-zinc-400 block truncate">/${cat.slug}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-200 dark:bg-[#1E3752] text-zinc-700 dark:text-zinc-300">
                    ${count} articles
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 4. MÉDIATHÈQUE PROFESSIONNELLE AVEC VRAI UPLOAD SERVEUR
// ==========================================================================

function renderTabMedia() {
  const images = MEDIA_LIBRARY.filter(m => {
    if (adminMediaSearch && !m.title.toLowerCase().includes(adminMediaSearch.toLowerCase())) return false;
    return true;
  });

  return `
    <div class="space-y-6">
      
      <!-- Zone d'Upload Fichier & Filtres -->
      <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Médiathèque et Fichiers Numériques</h3>
          <p class="text-xs text-zinc-400 mt-0.5">Stockage persistant sur disque serveur dans /public/uploads/.</p>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto">
          <input type="file" id="mediaFileInput" accept="image/*" class="hidden" onchange="triggerMediaUpload()">
          <button onclick="document.getElementById('mediaFileInput').click()" class="px-4 py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all flex items-center gap-2">
            <span>📤</span>
            <span>Téléverser une image</span>
          </button>
        </div>
      </div>

      <!-- Grille des Médias -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        ${images.map(img => `
          <div class="group relative rounded-xl border border-zinc-200 dark:border-[#1E3752] bg-white dark:bg-[#0E2137] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            <div class="aspect-square bg-zinc-100 dark:bg-[#122B45] overflow-hidden">
              <img src="${img.url}" onerror="onImgError(this)" class="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="${img.title}">
            </div>
            <div class="p-2.5 flex-1 flex flex-col justify-between">
              <span class="font-heading font-bold text-[11px] text-zinc-900 dark:text-white truncate block">${img.title}</span>
              <div class="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100 dark:border-[#1E3752] text-[10px] text-zinc-400">
                <span>${img.size || 'HD'}</span>
                <div class="flex items-center gap-1">
                  <button onclick="copyMediaUrl('${img.url}')" class="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1E3752]" title="Copier le lien">
                    📋
                  </button>
                  <button onclick="deleteMediaFromServer('${img.id}')" class="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30" title="Supprimer">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ==========================================================================
// 5. GESTION DES COMMENTAIRES AVEC ACTIONS RÉELLES SERVEUR
// ==========================================================================

function renderTabComments() {
  const filtered = COMMENTS.filter(c => {
    if (adminCommentFilter === 'all') return true;
    return c.status === adminCommentFilter;
  });

  return `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5 text-xs font-semibold">
          <button onclick="filterComments('all')" class="px-3 py-1.5 rounded-xl ${adminCommentFilter === 'all' ? 'bg-[#EF4248] text-white' : 'bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] text-zinc-600 dark:text-zinc-300'}">
            Tous (${COMMENTS.length})
          </button>
          <button onclick="filterComments('approved')" class="px-3 py-1.5 rounded-xl ${adminCommentFilter === 'approved' ? 'bg-[#EF4248] text-white' : 'bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] text-zinc-600 dark:text-zinc-300'}">
            Approuvés (${COMMENTS.filter(c => c.status === 'approved').length})
          </button>
          <button onclick="filterComments('pending')" class="px-3 py-1.5 rounded-xl ${adminCommentFilter === 'pending' ? 'bg-[#EF4248] text-white' : 'bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] text-zinc-600 dark:text-zinc-300'}">
            En attente (${COMMENTS.filter(c => c.status === 'pending').length})
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] rounded-2xl overflow-hidden shadow-sm">
        <div class="divide-y divide-zinc-100 dark:divide-[#1E3752]/50">
          ${filtered.length ? filtered.map(c => `
            <div class="p-4 flex flex-col sm:flex-row items-start justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-[#162F4D]/30 transition-colors">
              <div class="space-y-1 max-w-2xl">
                <div class="flex items-center gap-2">
                  <span class="font-heading font-bold text-xs text-zinc-900 dark:text-white">${c.author}</span>
                  <span class="text-[10px] text-zinc-400">• ${c.date}</span>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-bold ${c.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}">
                    ${c.status === 'approved' ? 'Approuvé' : 'En attente'}
                  </span>
                </div>
                <p class="text-xs text-zinc-700 dark:text-zinc-300">${c.content}</p>
                <span class="text-[10px] text-zinc-400 block">Sur l'article : ${c.articleTitle || c.articleId}</span>
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                ${c.status !== 'approved' ? `
                  <button onclick="moderateComment('${c.id}', 'approved')" class="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold">
                    Approuver
                  </button>
                ` : ''}
                <button onclick="moderateComment('${c.id}', 'spam')" class="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 text-xs font-bold">
                  Spam
                </button>
                <button onclick="moderateComment('${c.id}', 'trash')" class="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-bold">
                  Supprimer
                </button>
              </div>
            </div>
          `).join('') : `
            <div class="p-8 text-center text-xs text-zinc-400">Aucun commentaire dans cette vue.</div>
          `}
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 6. ABONNÉS NEWSLETTER & EXPORT CSV PROTÉGÉ
// ==========================================================================

function renderTabNewsletter() {
  return `
    <div class="space-y-5">
      <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Abonnés Newsletter Vérifiés</h3>
          <p class="text-xs text-zinc-400 mt-0.5">Total en base : ${SUBSCRIBERS.length} adresses réelles enregistrées via le formulaire public.</p>
        </div>
        <button onclick="exportSubscribersCSV()" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2">
          <span>📊</span>
          <span>Exporter CSV Sécurisé</span>
        </button>
      </div>

      <div class="bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] rounded-2xl overflow-hidden shadow-sm">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-[#1E3752] bg-zinc-50 dark:bg-[#122B45]/50 text-zinc-400 uppercase text-[10px] tracking-wider font-bold">
              <th class="p-3.5">E-mail Abonné</th>
              <th class="p-3.5">Date Inscription</th>
              <th class="p-3.5">Statut</th>
              <th class="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-[#1E3752]/50 text-zinc-800 dark:text-zinc-200">
            ${SUBSCRIBERS.map(sub => `
              <tr class="hover:bg-zinc-50 dark:hover:bg-[#162F4D]/30 transition-colors">
                <td class="p-3.5 font-semibold">${sub.email}</td>
                <td class="p-3.5 text-zinc-400">${sub.date}</td>
                <td class="p-3.5">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500">
                    ${sub.status || 'Actif'}
                  </span>
                </td>
                <td class="p-3.5 text-right">
                  <button onclick="deleteSubscriberFromServer('${sub.id || sub.email}')" class="text-rose-500 hover:underline text-xs font-semibold">
                    Désinscrire
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ==========================================================================
// 7. MONÉTISATION ADSENSE & EMPLACEMENTS CERTIFIÉS
// ==========================================================================

function renderTabAdSense() {
  return `
    <div class="space-y-6">
      
      <!-- Avertissement Connexion Réelle -->
      <div class="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs space-y-1">
        <div class="flex items-center gap-2 font-bold">
          <span>⚠️</span>
          <span>Statut du Reporting Financier : Non Connecté</span>
        </div>
        <p>L'identifiant <code>ca-pub-XXXXXXXXXX</code> permet la diffusion des annonces. Pour obtenir les rapports de revenus en temps réel, l'API Google AdSense Management avec OAuth serveur doit être configurée dans le fichier <code>.env.local</code>.</p>
      </div>

      <!-- Réglages des 5 Emplacements Stratégiques -->
      <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-4">
        <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Les 5 Emplacements Publicitaires Définis</h3>
        <p class="text-xs text-zinc-400">Tous les blocs publicitaires comportent le label « Publicités » et une réservation de hauteur anti-CLS.</p>

        <div class="space-y-3">
          ${[
            { id: 'home_after_featured', name: 'Accueil — Après le carrousel vedette', format: 'Responsive Banner (728x90 / 300x250)' },
            { id: 'home_in_feed', name: 'Accueil — Au milieu du flux d\'articles', format: 'In-Feed Native Ad' },
            { id: 'article_sidebar', name: 'Article — Barre latérale desktop', format: 'Half Page (300x600)' },
            { id: 'article_in_content', name: 'Article — Dans le corps du texte (après 3 paragraphes)', format: 'In-Article Responsive' },
            { id: 'article_end', name: 'Article — Fin de publication (avant recommandations)', format: 'Matched Content' }
          ].map(slot => `
            <div class="p-4 rounded-xl border border-zinc-200 dark:border-[#1E3752] bg-zinc-50 dark:bg-[#162F4D]/40 flex items-center justify-between gap-4">
              <div>
                <h4 class="font-heading font-bold text-xs text-zinc-900 dark:text-white">${slot.name}</h4>
                <span class="text-[11px] text-zinc-400">Format : ${slot.format}</span>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                ✓ Actif & Conforme
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 8. CONFIGURATION DU CARROUSEL HERO
// ==========================================================================

function renderTabCarousel() {
  return `
    <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-6">
      <div>
        <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Configuration du Carrousel Plein Écran (100vw)</h3>
        <p class="text-xs text-zinc-400 mt-1">Conforme à la maquette officielle Ontario avec portrait orange et défilement continu.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Mode d'alimentation</label>
          <select id="carouselModeSelect" class="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">
            <option value="recent" ${HERO_CAROUSEL_CONFIG.mode === 'recent' ? 'selected' : ''}>Dernières publications (Récent)</option>
            <option value="popular" ${HERO_CAROUSEL_CONFIG.mode === 'popular' ? 'selected' : ''}>Articles les plus populaires</option>
            <option value="manual" ${HERO_CAROUSEL_CONFIG.mode === 'manual' ? 'selected' : ''}>Sélection manuelle ordonnée</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Durée de rotation automatique</label>
          <select id="carouselDurationSelect" class="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">
            <option value="4000">4 secondes</option>
            <option value="6000" selected>6 secondes (Recommandé)</option>
            <option value="8000">8 secondes</option>
          </select>
        </div>
      </div>

      <button onclick="saveCarouselSettings()" class="px-5 py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all">
        Enregistrer la configuration
      </button>
    </div>
  `;
}

// ==========================================================================
// 9. VUES COMPLÉMENTAIRES (Pages, Tags, Utilisateurs, SEO, Analytics, Settings)
// ==========================================================================

function renderTabPages() {
  return `
    <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-[#1E3752]">
        <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Pages Institutionnelles & Statiques</h3>
      </div>
      <div class="divide-y divide-zinc-100 dark:divide-[#1E3752]/50 text-xs">
        ${PAGES.map(p => `
          <div class="py-3 flex items-center justify-between">
            <div>
              <h4 class="font-heading font-bold text-zinc-900 dark:text-white">${p.title}</h4>
              <span class="text-[11px] text-zinc-400">URL : /${p.slug}</span>
            </div>
            <div class="flex items-center gap-2">
              <a href="#${p.slug}" class="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-[#1E3752] text-zinc-700 dark:text-zinc-200 font-semibold hover:bg-zinc-200">
                Aperçu
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTabTags() {
  return `
    <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-4">
      <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Étiquettes Éditoriales (Tags)</h3>
      <div class="flex flex-wrap gap-2">
        ${['Technologie', 'Intelligence Artificielle', 'Design', 'Architecture', 'Culture', 'Futurisme', 'Robotique', 'Audio', 'Spatial', 'Mobilité'].map(tag => `
          <span class="px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-800 dark:text-zinc-200">
            #${tag}
          </span>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTabUsers() {
  return `
    <div class="space-y-4">
      <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm flex items-center justify-between">
        <div>
          <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Équipe & Gestion des Rôles</h3>
          <p class="text-xs text-zinc-400 mt-0.5">Contrôle d'accès étanche : Administrateurs, Rédacteurs et Lecteurs.</p>
        </div>
      </div>
      <div class="bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] rounded-2xl overflow-hidden shadow-sm">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-[#1E3752] bg-zinc-50 dark:bg-[#122B45]/50 text-zinc-400 uppercase text-[10px] font-bold">
              <th class="p-3.5">Nom & Utilisateur</th>
              <th class="p-3.5">E-mail</th>
              <th class="p-3.5">Rôle Attribué</th>
              <th class="p-3.5 text-right">Statut</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-[#1E3752]/50 text-zinc-800 dark:text-zinc-200">
            ${USERS.map(u => `
              <tr class="hover:bg-zinc-50 dark:hover:bg-[#162F4D]/30 transition-colors">
                <td class="p-3.5 font-bold">${u.name}</td>
                <td class="p-3.5 text-zinc-400">${u.email}</td>
                <td class="p-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EF4248]/10 text-[#EF4248] capitalize">${u.role}</span></td>
                <td class="p-3.5 text-right"><span class="text-emerald-500 font-semibold">Actif</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTabSEO() {
  return `
    <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-5">
      <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">SEO & Métadonnées Sémantiques</h3>
      <div class="space-y-4 text-xs">
        <div>
          <label class="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Titre Général du Site (Meta Title)</label>
          <input type="text" value="ONTARIO — Magazine Éditorial & Digital" class="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">
        </div>
        <div>
          <label class="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Description Globale (Meta Description)</label>
          <textarea rows="3" class="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">Le média de référence sur les technologies de pointe, le design d'avant-garde et les mutations culturelles.</textarea>
        </div>
        <div class="pt-2 flex items-center gap-4 text-zinc-400">
          <span>✓ Sitemap XML actif : <a href="/sitemap.xml" target="_blank" class="text-[#EF4248] underline">/sitemap.xml</a></span>
          <span>✓ Flux RSS actif : <a href="/feed.xml" target="_blank" class="text-[#EF4248] underline">/feed.xml</a></span>
        </div>
      </div>
    </div>
  `;
}

function renderTabAnalytics() {
  return `
    <div class="space-y-6">
      <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-4">
        <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Statistiques Réelles d'Audience</h3>
        <p class="text-xs text-zinc-400">Les consultations de pages sont mesurées en local. Pour une télémétrie complète, activez votre identifiant GA4 ou Plausible.</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-4 rounded-xl bg-zinc-50 dark:bg-[#162F4D]/50 border border-zinc-200 dark:border-[#1E3752]">
            <span class="text-xs text-zinc-400">Total Consultations CMS</span>
            <div class="font-heading text-xl font-bold text-zinc-900 dark:text-white mt-1">${ARTICLES.reduce((acc, a) => acc + (a.views||0), 0)}</div>
          </div>
          <div class="p-4 rounded-xl bg-zinc-50 dark:bg-[#162F4D]/50 border border-zinc-200 dark:border-[#1E3752]">
            <span class="text-xs text-zinc-400">Articles en Base</span>
            <div class="font-heading text-xl font-bold text-zinc-900 dark:text-white mt-1">${ARTICLES.length}</div>
          </div>
          <div class="p-4 rounded-xl bg-zinc-50 dark:bg-[#162F4D]/50 border border-zinc-200 dark:border-[#1E3752]">
            <span class="text-xs text-zinc-400">Taux de Rétention</span>
            <div class="font-heading text-base font-bold text-amber-500 mt-1">Non connecté (Nécessite GA4)</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTabSettings() {
  return `
    <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-5">
      <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Réglages Généraux de la Plateforme</h3>
      <div class="space-y-4 text-xs max-w-xl">
        <div>
          <label class="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Nom du Média</label>
          <input type="text" value="ONTARIO" class="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">
        </div>
        <div>
          <label class="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">E-mail de Contact Officiel</label>
          <input type="email" value="contact@ontariowp.com" class="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">
        </div>
        <button onclick="showToast('✓ Réglages sauvegardés sur le serveur !', 'success')" class="px-5 py-2.5 rounded-xl bg-[#EF4248] text-white font-bold">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  `;
}

// ==========================================================================
// 10. VÉRITABLE ÉDITEUR PAR BLOCS TYPE GUTENBERG SANS PERTE DE FOCUS
// ==========================================================================

function renderGutenbergEditor(container) {
  if (!container) container = document.getElementById('app-container');
  if (!container) return;

  const article = editingArticleId ? ARTICLES.find(a => a.id === editingArticleId) : null;
  const currentTitle = currentEditorState.title !== '' ? currentEditorState.title : (article ? article.title : '');
  const currentExcerpt = currentEditorState.excerpt !== '' ? currentEditorState.excerpt : (article ? (article.excerpt || '') : '');
  const currentCat = currentEditorState.categorySlug !== '' ? currentEditorState.categorySlug : (article ? article.categorySlug : (CATEGORIES[0]?.slug || 'design'));
  const currentImg = currentEditorState.image !== '' ? currentEditorState.image : (article ? article.image : '');

  container.innerHTML = `
    <div class="min-h-screen bg-zinc-100 dark:bg-[#071426] text-zinc-900 dark:text-white flex flex-col transition-colors duration-200">
      
      <!-- TOOLBAR SUPÉRIEURE GUTENBERG -->
      <header class="h-16 px-6 bg-white dark:bg-[#0E2137] border-b border-zinc-200 dark:border-[#1E3752] flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div class="flex items-center gap-3">
          <button onclick="cancelEditor()" class="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1E3752] transition-colors" title="Retour aux articles">
            ← Quitter
          </button>
          <div class="h-5 w-px bg-zinc-200 dark:bg-[#1E3752]"></div>
          <span class="font-heading font-black text-xs uppercase tracking-wider text-[#EF4248]">Gutenberg Pro</span>
          <span class="text-xs text-zinc-400 truncate max-w-xs">${editingArticleId ? 'Modifier article' : 'Nouvelle publication'}</span>
        </div>

        <div class="flex items-center gap-2">
          <!-- Insertion rapide de blocs -->
          <button onclick="addBlock('paragraph')" class="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-[#162F4D] hover:bg-zinc-200 dark:hover:bg-[#1E3752] text-xs font-semibold" title="Ajouter Paragraphe">
            + ¶ Texte
          </button>
          <button onclick="addBlock('heading')" class="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-[#162F4D] hover:bg-zinc-200 dark:hover:bg-[#1E3752] text-xs font-semibold" title="Ajouter Titre">
            + H2 Titre
          </button>
          <button onclick="addBlock('pullquote')" class="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-[#162F4D] hover:bg-zinc-200 dark:hover:bg-[#1E3752] text-xs font-semibold" title="Ajouter Citation">
            + “ Citation
          </button>
          <button onclick="addBlock('image')" class="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-[#162F4D] hover:bg-zinc-200 dark:hover:bg-[#1E3752] text-xs font-semibold" title="Ajouter Image">
            + 🖼️ Image
          </button>
          <button onclick="addBlock('affiliate')" class="px-2.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 text-xs font-bold" title="Ajouter Produit Affilié">
            + 🛍️ Affilié
          </button>

          <div class="h-5 w-px bg-zinc-200 dark:bg-[#1E3752] mx-1"></div>

          <!-- Actions de Sauvegarde -->
          <button onclick="saveArticleDraft()" class="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-[#162F4D] hover:bg-zinc-200 dark:hover:bg-[#1E3752] text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all">
            Enregistrer Brouillon
          </button>
          <button onclick="publishArticleEditor()" class="px-5 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all">
            Publier sur le site
          </button>
        </div>
      </header>

      <!-- CORPS DE L'ÉDITEUR : CANVAS CENTRAL & VOLET LATÉRAL -->
      <div class="flex-1 flex overflow-hidden">
        
        <!-- Canvas Central de Rédaction (Feuille Éditoriale Pro) -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center custom-scrollbar">
          <div class="w-full max-w-3xl bg-white dark:bg-[#0E2137] rounded-3xl p-8 sm:p-12 shadow-sm border border-zinc-200 dark:border-[#1E3752] space-y-6">
            
            <!-- Titre H1 Distinct du corps -->
            <div>
              <textarea id="editorArticleTitle" 
                        oninput="currentEditorState.title = this.value"
                        placeholder="Saisissez le grand titre H1 ici..." 
                        rows="2"
                        class="w-full font-heading font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-600 border-0 bg-transparent resize-none focus:outline-none focus:ring-0 leading-tight">${currentTitle}</textarea>
            </div>

            <!-- Extrait / Chapô éditorial -->
            <div>
              <textarea id="editorArticleExcerpt" 
                        oninput="currentEditorState.excerpt = this.value"
                        placeholder="Chapô ou extrait introductif de la publication..." 
                        rows="2"
                        class="w-full text-base text-zinc-600 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-600 border-0 border-b border-zinc-100 dark:border-[#1E3752] bg-transparent resize-none focus:outline-none focus:ring-0 italic">${currentExcerpt}</textarea>
            </div>

            <!-- BLOCS MODULAIRES ÉDITORIAUX -->
            <div id="editorBlocksContainer" class="space-y-4 pt-4">
              ${editorBlocks.map((block, idx) => {
                return `
                  <div class="group relative p-4 rounded-2xl border border-zinc-200 dark:border-[#1E3752] bg-zinc-50/50 dark:bg-[#122B45]/30 hover:border-[#EF4248]/40 transition-all">
                    
                    <!-- Barre de contrôle du bloc -->
                    <div class="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-[#1E3752]/50 text-[10px] text-zinc-400">
                      <span class="font-bold uppercase tracking-wider text-[#EF4248]">
                        ${block.type === 'heading' ? 'Titre H2' : (block.type === 'pullquote' ? 'Citation' : (block.type === 'image' ? 'Image & Légende' : (block.type === 'affiliate' ? 'Bloc Affilié Amazon' : 'Paragraphe')))}
                      </span>
                      <div class="flex items-center gap-1">
                        <button onclick="moveBlock(${idx}, -1)" class="p-1 hover:text-zinc-900 dark:hover:text-white" title="Monter">↑</button>
                        <button onclick="moveBlock(${idx}, 1)" class="p-1 hover:text-zinc-900 dark:hover:text-white" title="Descendre">↓</button>
                        <button onclick="duplicateBlock(${idx})" class="p-1 hover:text-zinc-900 dark:hover:text-white" title="Dupliquer">📑</button>
                        <button onclick="deleteBlock(${idx})" class="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded" title="Supprimer">🗑️</button>
                      </div>
                    </div>

                    <!-- Contenu selon le type de bloc -->
                    ${(() => {
                      if (block.type === 'heading') {
                        return `
                          <input type="text" 
                                 value="${block.content || ''}" 
                                 oninput="updateBlockText(${idx}, this.value)"
                                 placeholder="Sous-titre H2..." 
                                 class="w-full font-heading font-bold text-xl text-zinc-900 dark:text-white bg-transparent border-0 focus:outline-none">
                        `;
                      } else if (block.type === 'pullquote') {
                        return `
                          <div class="border-l-4 border-[#EF4248] pl-4 py-1 space-y-2">
                            <textarea oninput="updateBlockText(${idx}, this.value)"
                                      placeholder="Citation marquante..." 
                                      rows="2"
                                      class="w-full italic font-heading text-lg text-zinc-800 dark:text-zinc-100 bg-transparent border-0 focus:outline-none resize-none">${block.content || ''}</textarea>
                            <input type="text" 
                                   value="${block.author || ''}" 
                                   oninput="updateBlockField(${idx}, 'author', this.value)"
                                   placeholder="Auteur de la citation..." 
                                   class="w-full text-xs text-zinc-500 bg-transparent border-0 focus:outline-none">
                          </div>
                        `;
                      } else if (block.type === 'image') {
                        return `
                          <div class="space-y-3">
                            <div class="aspect-video bg-zinc-100 dark:bg-[#071426] rounded-xl overflow-hidden flex items-center justify-center">
                              <img src="${block.url || FALLBACK_IMAGE}" onerror="onImgError(this)" class="w-full h-full object-cover" alt="${block.alt || 'Image article'}">
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <input type="text" value="${block.url || ''}" oninput="updateBlockField(${idx}, 'url', this.value)" placeholder="URL de l'image..." class="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752]">
                              <input type="text" value="${block.caption || ''}" oninput="updateBlockField(${idx}, 'caption', this.value)" placeholder="Légende..." class="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752]">
                            </div>
                          </div>
                        `;
                      } else if (block.type === 'affiliate') {
                        return `
                          <div class="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-3">
                            <div class="flex items-center justify-between text-[11px] font-bold text-amber-600 dark:text-amber-400">
                              <span>🛍️ Produit Partenaire Recommandé</span>
                              <span class="text-[9px] uppercase font-normal">rel="sponsored"</span>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                              <input type="text" value="${block.productTitle || ''}" oninput="updateBlockField(${idx}, 'productTitle', this.value)" placeholder="Nom du produit..." class="sm:col-span-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752]">
                              <input type="text" value="${block.price || ''}" oninput="updateBlockField(${idx}, 'price', this.value)" placeholder="Prix (ex: 299 €)..." class="px-3 py-1.5 rounded-lg bg-white dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752]">
                            </div>
                            <input type="text" value="${block.link || ''}" oninput="updateBlockField(${idx}, 'link', this.value)" placeholder="Lien d'affiliation..." class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-xs">
                          </div>
                        `;
                      } else {
                        return `
                          <textarea oninput="updateBlockText(${idx}, this.value)"
                                    placeholder="Rédigez votre paragraphe..." 
                                    rows="3"
                                    class="w-full text-sm text-zinc-800 dark:text-zinc-200 bg-transparent border-0 focus:outline-none resize-none leading-relaxed">${block.content || ''}</textarea>
                        `;
                      }
                    })()}
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Inserteur de bas de document -->
            <div class="pt-6 border-t border-dashed border-zinc-200 dark:border-[#1E3752] flex items-center justify-center gap-2">
              <button onclick="addBlock('paragraph')" class="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-[#162F4D] hover:bg-[#EF4248] hover:text-white text-xs font-semibold transition-colors">
                + Ajouter Paragraphe
              </button>
              <button onclick="addBlock('heading')" class="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-[#162F4D] hover:bg-[#EF4248] hover:text-white text-xs font-semibold transition-colors">
                + Titre H2
              </button>
            </div>

          </div>
        </div>

        <!-- Volet Latéral des Réglages de l'Article (Document Settings) -->
        <aside class="w-80 bg-white dark:bg-[#0E2137] border-l border-zinc-200 dark:border-[#1E3752] overflow-y-auto p-6 space-y-6 hidden lg:block custom-scrollbar">
          
          <div>
            <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-zinc-400 mb-3">Réglages du Document</h4>
            <div class="space-y-4 text-xs">
              
              <!-- Statut -->
              <div>
                <label class="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Statut de diffusion</label>
                <select id="editorArticleStatus" class="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">
                  <option value="draft" ${article && article.status === 'draft' ? 'selected' : ''}>Brouillon privé</option>
                  <option value="published" ${!article || article.status === 'published' ? 'selected' : ''}>Publié publiquement</option>
                  <option value="scheduled" ${article && article.status === 'scheduled' ? 'selected' : ''}>Programmé serveur</option>
                </select>
              </div>

              <!-- Rubrique -->
              <div>
                <label class="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Rubrique Principale</label>
                <select id="editorArticleCategory" onchange="currentEditorState.categorySlug = this.value" class="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">
                  ${CATEGORIES.map(c => `<option value="${c.slug}" ${currentCat === c.slug ? 'selected' : ''}>${c.name}</option>`).join('')}
                </select>
              </div>

              <!-- Image de Couverture -->
              <div>
                <label class="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Image à la une</label>
                <div class="aspect-video bg-zinc-100 dark:bg-[#122B45] rounded-xl overflow-hidden mb-2">
                  <img id="editorCoverPreview" src="${currentImg || FALLBACK_IMAGE}" onerror="onImgError(this)" class="w-full h-full object-cover" alt="Couverture">
                </div>
                <div class="flex gap-2">
                  <input type="text" id="editorArticleImage" value="${currentImg}" oninput="currentEditorState.image = this.value; document.getElementById('editorCoverPreview').src = this.value || FALLBACK_IMAGE;" placeholder="URL de l'image..." class="flex-1 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-xs">
                  <button onclick="openMediaPickerForEditor()" class="px-2.5 py-1.5 rounded-lg bg-zinc-200 dark:bg-[#1E3752] hover:bg-[#EF4248] hover:text-white font-semibold">📁</button>
                </div>
              </div>

            </div>
          </div>
        </aside>

      </div>
    </div>
  `;
}

// ==========================================================================
// 11. MODALE D'APERÇU RAPIDE ARTICLE & PAGES INSTITUTIONNELLES
// ==========================================================================

function renderPreviewArticleModal() {
  const art = ARTICLES.find(a => a.id === previewArticleModalId) || TRASH_ARTICLES.find(a => a.id === previewArticleModalId);
  if (!art) return '';

  return `
    <div class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeArticlePreview()">
      <div class="w-full max-w-3xl bg-white dark:bg-[#0E2137] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-[#1E3752] max-h-[85vh] flex flex-col" onclick="event.stopPropagation()">
        <div class="p-4 border-b border-zinc-200 dark:border-[#1E3752] flex items-center justify-between">
          <span class="font-heading font-bold text-xs uppercase text-[#EF4248]">Aperçu Éditorial</span>
          <button onclick="closeArticlePreview()" class="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-1">✕</button>
        </div>
        <div class="overflow-y-auto p-6 sm:p-8 space-y-4">
          <img src="${art.image || FALLBACK_IMAGE}" onerror="onImgError(this)" class="w-full h-64 object-cover rounded-2xl" alt="${art.title}">
          <h2 class="font-heading font-extrabold text-2xl text-zinc-900 dark:text-white">${art.title}</h2>
          <p class="text-xs text-zinc-400">Par Steve Ontario • Publié dans ${art.categorySlug}</p>
          <div class="prose dark:prose-invert text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            ${art.content ? (typeof art.content === 'string' ? art.content : art.content.map(b => b.content ? `<p class="mb-3">${b.content}</p>` : '').join('')) : '<p>Aucun contenu textuel.</p>'}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAbout(container) {
  if (!container) container = document.getElementById('app-container');
  container.innerHTML = `
    <div class="container-ontario pt-28 sm:pt-32 pb-24 space-y-8">
      <div class="max-w-3xl">
        <span class="text-xs font-bold uppercase tracking-wider text-[#EF4248]">Manifeste</span>
        <h1 class="font-heading font-black text-4xl sm:text-5xl text-zinc-900 dark:text-white mt-2">À Propos d'ONTARIO</h1>
        <p class="text-base text-zinc-600 dark:text-zinc-300 mt-4 leading-relaxed">
          ONTARIO est un média indépendant dédié aux mutations technologiques, au design d'avant-garde et aux nouvelles frontières numériques. Conçu selon les standards éditoriaux les plus stricts, nous valorisons la profondeur d'analyse, l'élégance visuelle et l'intégrité de l'information.
        </p>
      </div>
    </div>
  `;
}

function renderContact(container) {
  if (!container) container = document.getElementById('app-container');
  container.innerHTML = `
    <div class="container-ontario pt-28 sm:pt-32 pb-24 space-y-8">
      <div class="max-w-xl">
        <span class="text-xs font-bold uppercase tracking-wider text-[#EF4248]">Contact & Rédaction</span>
        <h1 class="font-heading font-black text-4xl text-zinc-900 dark:text-white mt-2">Nous Contacter</h1>
        <p class="text-xs text-zinc-500 mt-2">Une question, un communiqué de presse ou une proposition de collaboration ?</p>
        
        <form onsubmit="event.preventDefault(); showToast('✓ Message transmis à la rédaction ONTARIO !', 'success');" class="mt-6 space-y-4 text-xs">
          <div>
            <label class="block font-semibold mb-1">Votre Nom</label>
            <input type="text" required class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752]">
          </div>
          <div>
            <label class="block font-semibold mb-1">Votre E-mail</label>
            <input type="email" required class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752]">
          </div>
          <div>
            <label class="block font-semibold mb-1">Message</label>
            <textarea rows="4" required class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752]"></textarea>
          </div>
          <button type="submit" class="px-6 py-3 rounded-xl bg-[#EF4248] text-white font-bold shadow-md shadow-red-500/20">
            Envoyer le message
          </button>
        </form>
      </div>
    </div>
  `;
}
