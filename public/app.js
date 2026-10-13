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
  // --- HERO & FEATURED SLIDER ---
  {
    id: 'art-hero-1',
    title: 'Next Gen Marketing: Innovative Strategies',
    frenchTitle: 'Next Gen Marketing : Stratégies Innovantes & Ruptures Numériques',
    slug: 'next-gen-marketing-innovative-strategies',
    excerpt: 'Dans un écosystème où l’attention est devenue la denrée la plus disputée, les modèles algorithmiques génératifs et les expériences immersives redéfinissent la relation entre marques et communautés.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=90',
    categorySlug: 'intelligence-artificielle',
    categoryBadge: 'TECH / AI',
    authorSlug: 'steve-jones',
    readingTime: 6,
    publishedAt: '26 Mars 2026',
    status: 'published',
    isHero: true,
    isFeatured: true,
    views: 24800,
    likes: 1420,
    tags: ['Marketing', 'IA', 'Innovation', 'Stratégie'],
    contentBlocks: [
      { type: 'paragraph', text: 'L’étincelle qui a propulsé notre rédaction est née de l’observation des bouleversements sans précédent survenus dans l’arbitrage de l’attention. Derrière les flux de données brutes se cachent les nouvelles dynamiques de consommation.' },
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

// 4. ÉTAT GLOBAL DE L'APPLICATION
let currentView = 'home';
let currentSlug = '';
let currentHeroSlide = 0;
let isDarkMode = false;
let currentUser = null; // { email, role: 'reader' | 'admin', name }

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouting();
  initShortcuts();
});

// GESTION DU THÈME BLEU NUIT / CLAIR
function initTheme() {
  const saved = localStorage.getItem('ontario-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    enableDarkMode(true);
  } else {
    enableDarkMode(false);
  }
}

function enableDarkMode(dark) {
  isDarkMode = dark;
  const html = document.documentElement;
  if (dark) {
    html.classList.add('dark');
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('ontario-theme', 'dark');
  } else {
    html.classList.remove('dark');
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('ontario-theme', 'light');
  }
}

function toggleDarkMode() {
  enableDarkMode(!isDarkMode);
}

// ROUTAGE ET NAVIGATION SANS RECHARGEMENT
function initRouting() {
  window.addEventListener('hashchange', handleHash);
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

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (route === 'home') renderHome(container);
  else if (route === 'blog') renderBlog(container);
  else if (route === 'category') renderCategory(container, param);
  else if (route === 'article') renderArticle(container, param);
  else if (route === 'about') renderAbout(container);
  else if (route === 'contact') renderContact(container);
  else if (route === 'admin') renderAdmin(container);
  else renderHome(container);
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
      closeReaderModal();
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
function openReaderModal() {
  const modal = document.getElementById('reader-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    updateReaderModalState();
  }
}

function closeReaderModal() {
  const modal = document.getElementById('reader-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function updateReaderModalState() {
  const authView = document.getElementById('reader-auth-view');
  const profileView = document.getElementById('reader-profile-view');
  const userBadge = document.getElementById('user-badge');

  if (currentUser) {
    if (authView) authView.classList.add('hidden');
    if (profileView) profileView.classList.remove('hidden');
    const nameEl = document.getElementById('reader-profile-name');
    const emailEl = document.getElementById('reader-profile-email');
    if (nameEl) nameEl.textContent = currentUser.name;
    if (emailEl) emailEl.textContent = currentUser.email;
    if (userBadge) userBadge.textContent = currentUser.name.split(' ')[0];
  } else {
    if (authView) authView.classList.remove('hidden');
    if (profileView) profileView.classList.add('hidden');
    if (userBadge) userBadge.textContent = 'Connexion';
  }
}

function handleReaderLogin(e) {
  e.preventDefault();
  const email = document.getElementById('reader-email').value;
  currentUser = {
    email,
    role: 'reader',
    name: email.split('@')[0].toUpperCase()
  };
  updateReaderModalState();
}

function handleReaderLogout() {
  currentUser = null;
  updateReaderModalState();
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
// 5. RENDERER DE LA PAGE D'ACCUEIL — 100% FIDÈLE À ONTARIO (IMAGE A & CAPTURES 1-5)
// ==========================================================================
let heroSliderIndex = 0;

function getHeroSliderArticles() {
  const heroes = ARTICLES.filter(a => a.isHero || a.isFeatured);
  return heroes.length > 0 ? heroes : [ARTICLES[0]];
}

window.prevHeroSlide = function(e) {
  if (e) e.stopPropagation();
  const heroes = getHeroSliderArticles();
  heroSliderIndex = (heroSliderIndex === 0) ? heroes.length - 1 : heroSliderIndex - 1;
  const container = document.getElementById('main-content');
  if (container) renderHome(container);
};

window.nextHeroSlide = function(e) {
  if (e) e.stopPropagation();
  const heroes = getHeroSliderArticles();
  heroSliderIndex = (heroSliderIndex === heroes.length - 1) ? 0 : heroSliderIndex + 1;
  const container = document.getElementById('main-content');
  if (container) renderHome(container);
};

function renderHome(container) {
  const heroArticles = getHeroSliderArticles();
  const heroArticle = heroArticles[heroSliderIndex] || heroArticles[0];
  const authorHero = AUTHORS.find(a => a.slug === heroArticle.authorSlug) || AUTHORS[0];
  const freshArticles = ARTICLES.filter(a => a.id !== heroArticle.id).slice(0, 6);
  const recentArticles = ARTICLES.filter(a => a.id !== heroArticle.id).slice(6, 12);
  const sidebarFeatured = ARTICLES.find(a => a.id === 'art-sidebar-featured') || ARTICLES[1];

  container.innerHTML = `
    <div class="w-full">
      <!-- 1. HERO IMMERSIF PLEINE LARGEUR (100VW FULL-BLEED) CONFORME IMAGE A -->
      <section class="relative w-full h-[580px] sm:h-[660px] lg:h-[720px] overflow-hidden bg-[#071426]">
        <img src="${heroArticle.coverImage}" onerror="onImgError(this)" alt="${heroArticle.title}" class="w-full h-full object-cover object-center filter brightness-95 transition-all duration-700 ease-out hover:scale-105">
        
        <!-- Superposition sombre dégradée sur la gauche pour lisibilité parfaite -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#071426]/90 via-transparent to-transparent"></div>

        <!-- Contenu textuel aligné sur la grille éditoriale -->
        <div class="absolute inset-0 flex items-center">
          <div class="container-ontario w-full pt-16 sm:pt-20">
            <div class="max-w-2xl text-white">
              <!-- Pastille Catégorie Pill Translucide -->
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider mb-4">
                <span class="w-2 h-2 rounded-full bg-[#EF4248]"></span>
                <span>${heroArticle.categoryBadge || 'TECH / AI'}</span>
              </div>

              <!-- Grand Titre H1 Éditorial -->
              <h1 onclick="navigateArticle('${heroArticle.slug}')" class="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5 cursor-pointer hover:text-zinc-200 transition-colors">
                ${heroArticle.title}
              </h1>

              <!-- Métadonnées & Auteur -->
              <div class="flex items-center gap-3 text-xs sm:text-sm text-zinc-300 mb-4">
                <span>Par <b class="text-white">${authorHero.name}</b></span>
                <span>•</span>
                <span>${heroArticle.publishedAt}</span>
                <span>•</span>
                <span>⏱️ ${heroArticle.readingTime} min</span>
              </div>

              <!-- Extrait fluide -->
              <p class="text-sm sm:text-base text-zinc-200/90 leading-relaxed mb-6 line-clamp-2 sm:line-clamp-3">
                ${heroArticle.excerpt}
              </p>

              <!-- Flèches de navigation Slider Hero -->
              <div class="flex items-center gap-3 flex-wrap">
                <button onclick="navigateArticle('${heroArticle.slug}')" class="px-6 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-md">
                  Lire l'article complet →
                </button>
                <div class="flex items-center gap-2">
                  <button onclick="prevHeroSlide(event)" aria-label="Article précédent" class="w-9 h-9 rounded-full border border-white/40 bg-black/30 backdrop-blur-md hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer">‹</button>
                  <button onclick="nextHeroSlide(event)" aria-label="Article suivant" class="w-9 h-9 rounded-full border border-white/40 bg-black/30 backdrop-blur-md hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer">›</button>
                  <span class="text-[11px] font-mono font-medium text-zinc-300 ml-1">0${heroSliderIndex + 1} / 0${heroArticles.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. BANDEAU HORIZONTAL TICKER BAR CONFORME ONTARIO -->
      <section class="w-full border-b py-3" style="background-color: var(--surface-soft); border-color: var(--border-color);">
        <div class="container-ontario">
          <div class="flex items-center gap-6 overflow-x-auto no-scrollbar text-xs font-semibold whitespace-nowrap" style="color: var(--text-secondary);">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span class="hover:text-[#EF4248] cursor-pointer" onclick="navigateArticle('${ARTICLES[1].slug}')">ADVANCED TECHNIQUES IN ABSTRACT DIGITAL DESIGN</span>
            </div>
            <span class="text-zinc-400">•</span>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-purple-500"></span>
              <span class="hover:text-[#EF4248] cursor-pointer" onclick="navigateArticle('${ARTICLES[2].slug}')">ORGANIC SHAPES IN MODERN DIGITAL ARCHITECTURE</span>
            </div>
            <span class="text-zinc-400">•</span>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-500"></span>
              <span class="hover:text-[#EF4248] cursor-pointer" onclick="navigateArticle('${ARTICLES[3].slug}')">HOLISTIC PACKAGING IN CONTEMPORARY SPATIAL BRANDING</span>
            </div>
          </div>
        </div>
      </section>

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
      <section class="container-ontario mt-16 sm:mt-22">
        <h2 class="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-8" style="color: var(--text-primary);">
          Fresh off the Press
        </h2>

        <!-- RANGÉE 1 ASYMÉTRIQUE : 1 LARGE (GAUCHE) + 2 ÉTROITS (DROITE) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8">
          <!-- Article 1 : Format Large Panoramique (span 6) -->
          <div class="lg:col-span-6 group cursor-pointer" onclick="navigateArticle('${freshArticles[0].slug}')">
            <div class="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 shadow-sm">
              <img src="${freshArticles[0].coverImage}" onerror="onImgError(this)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              ${renderArticleBadge(freshArticles[0])}
              <span class="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold">
                ⏱️ ${freshArticles[0].readingTime} MIN
              </span>
            </div>
            <h3 class="font-heading font-bold text-lg sm:text-xl tracking-tight mb-2 group-hover:text-[#EF4248] transition-colors leading-snug" style="color: var(--text-primary);">
              ${freshArticles[0].title}
            </h3>
            <p class="text-xs" style="color: var(--text-muted);">
              Steve Jones on ${freshArticles[0].publishedAt}
            </p>
          </div>

          <!-- Article 2 : Format Standard Étroit (span 3) -->
          <div class="lg:col-span-3 group cursor-pointer" onclick="navigateArticle('${freshArticles[1].slug}')">
            <div class="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm">
              <img src="${freshArticles[1].coverImage}" onerror="onImgError(this)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              ${renderArticleBadge(freshArticles[1])}
              <span class="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold">
                ⏱️ ${freshArticles[1].readingTime} MIN
              </span>
            </div>
            <h3 class="font-heading font-bold text-base sm:text-lg tracking-tight mb-2 group-hover:text-[#EF4248] transition-colors leading-snug" style="color: var(--text-primary);">
              ${freshArticles[1].title}
            </h3>
            <p class="text-xs" style="color: var(--text-muted);">
              Steve Jones on ${freshArticles[1].publishedAt}
            </p>
          </div>

          <!-- Article 3 : Format Standard Étroit (span 3) -->
          <div class="lg:col-span-3 group cursor-pointer" onclick="navigateArticle('${freshArticles[2].slug}')">
            <div class="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm">
              <img src="${freshArticles[2].coverImage}" onerror="onImgError(this)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              ${renderArticleBadge(freshArticles[2])}
              <span class="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold">
                ⏱️ ${freshArticles[2].readingTime} MIN
              </span>
            </div>
            <h3 class="font-heading font-bold text-base sm:text-lg tracking-tight mb-2 group-hover:text-[#EF4248] transition-colors leading-snug" style="color: var(--text-primary);">
              ${freshArticles[2].title}
            </h3>
            <p class="text-xs" style="color: var(--text-muted);">
              Steve Jones on ${freshArticles[2].publishedAt}
            </p>
          </div>
        </div>

        <!-- RANGÉE 2 ASYMÉTRIQUE : 2 ÉTROITS (GAUCHE) + 1 LARGE (DROITE) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <!-- Article 4 : Format Standard Étroit (span 3) -->
          <div class="lg:col-span-3 group cursor-pointer" onclick="navigateArticle('${freshArticles[3].slug}')">
            <div class="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm">
              <img src="${freshArticles[3].coverImage}" onerror="onImgError(this)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              ${renderArticleBadge(freshArticles[3])}
              <span class="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold">
                ⏱️ ${freshArticles[3].readingTime} MIN
              </span>
            </div>
            <h3 class="font-heading font-bold text-base sm:text-lg tracking-tight mb-2 group-hover:text-[#EF4248] transition-colors leading-snug" style="color: var(--text-primary);">
              ${freshArticles[3].title}
            </h3>
            <p class="text-xs" style="color: var(--text-muted);">
              Kate Johnson on ${freshArticles[3].publishedAt}
            </p>
          </div>

          <!-- Article 5 : Format Standard Étroit (span 3) -->
          <div class="lg:col-span-3 group cursor-pointer" onclick="navigateArticle('${freshArticles[4].slug}')">
            <div class="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm">
              <img src="${freshArticles[4].coverImage}" onerror="onImgError(this)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              ${renderArticleBadge(freshArticles[4])}
              <span class="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold">
                ⏱️ ${freshArticles[4].readingTime} MIN
              </span>
            </div>
            <h3 class="font-heading font-bold text-base sm:text-lg tracking-tight mb-2 group-hover:text-[#EF4248] transition-colors leading-snug" style="color: var(--text-primary);">
              ${freshArticles[4].title}
            </h3>
            <p class="text-xs" style="color: var(--text-muted);">
              Steve Jones on ${freshArticles[4].publishedAt}
            </p>
          </div>

          <!-- Article 6 : Format Large Panoramique (span 6) -->
          <div class="lg:col-span-6 group cursor-pointer" onclick="navigateArticle('${freshArticles[5].slug}')">
            <div class="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 shadow-sm">
              <img src="${freshArticles[5].coverImage}" onerror="onImgError(this)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              ${renderArticleBadge(freshArticles[5])}
              <span class="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold">
                ⏱️ ${freshArticles[5].readingTime} MIN
              </span>
            </div>
            <h3 class="font-heading font-bold text-lg sm:text-xl tracking-tight mb-2 group-hover:text-[#EF4248] transition-colors leading-snug" style="color: var(--text-primary);">
              ${freshArticles[5].title}
            </h3>
            <p class="text-xs" style="color: var(--text-muted);">
              Steve Jones on ${freshArticles[5].publishedAt}
            </p>
          </div>
        </div>
      </section>

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

            ${(article.contentBlocks || []).map(b => {
              if (b.type === 'paragraph') {
                return `<p>${b.text}</p>`;
              }
              if (b.type === 'heading') {
                return `<h2>${b.text}</h2>`;
              }
              if (b.type === 'quote') {
                return `<blockquote>${b.text}</blockquote>`;
              }
              if (b.type === 'affiliate') {
                return `
                  <div class="affiliate-card p-6 sm:p-8 my-8">
                    <div class="flex items-center gap-2 mb-3">
                      <span class="w-2.5 h-2.5 rounded-full bg-[#EF4248]"></span>
                      <span class="text-xs font-bold uppercase tracking-wider text-[#EF4248]">PRODUIT RECOMMANDÉ PAR LA RÉDACTION</span>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-6 items-center">
                      <img src="${b.imageUrl}" onerror="onImgError(this)" class="w-36 h-36 rounded-2xl object-cover flex-shrink-0 shadow-sm">
                      <div class="flex-1">
                        <h4 class="font-heading text-lg font-bold mb-1" style="color: var(--text-primary);">${b.productName}</h4>
                        <span class="text-xs font-semibold block mb-2" style="color: var(--text-muted);">${b.brand} • Distribué par ${b.merchantName}</span>
                        <p class="text-xs sm:text-sm mb-3" style="color: var(--text-secondary);">${b.description}</p>
                        <ul class="text-xs space-y-1 mb-4" style="color: var(--text-secondary);">
                          ${(b.features || []).map(f => `<li>✓ ${f}</li>`).join('')}
                        </ul>
                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <a href="${b.affiliateUrl}" target="_blank" rel="sponsored noopener noreferrer" class="px-6 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md transition-all">
                            ${b.buttonText}
                          </a>
                          <span class="text-[10px]" style="color: var(--text-muted);">${b.disclaimer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }
              return '';
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

          <!-- Sidebar Single Post -->
          <div class="lg:col-span-4 flex flex-col gap-8">
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

function handleComment(e) {
  e.preventDefault();
  alert('Merci ! Votre commentaire a été enregistré et transmis pour modération éditoriale.');
  e.target.reset();
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
// 8. RENDERER DU DASHBOARD CMS ADMIN TYPE WORDPRESS / GUTENBERG
// ==========================================================================
let adminTab = 'all'; // 'all', 'published', 'draft', 'trash', 'new'
let editingArticleId = null;
let editorBlocks = [];

function renderAdmin(container) {
  // Vérification de la session admin
  const isAdmin = currentUser && currentUser.role === 'admin';

  if (!isAdmin) {
    container.innerHTML = `
      <div class="container-ontario pt-32 pb-24 flex items-center justify-center">
        <div class="w-full max-w-md p-8 rounded-3xl border shadow-xl text-center" style="background-color: var(--surface); border-color: var(--border-color);">
          <div class="w-12 h-12 rounded-full bg-[#EF4248] text-white flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            🔒
          </div>
          <h2 class="font-heading text-2xl font-bold mb-2" style="color: var(--text-primary);">Administration Sécurisée</h2>
          <p class="text-xs mb-6" style="color: var(--text-secondary);">
            Ce portail est strictement réservé à la rédaction et aux administrateurs du média Ontario. Les lecteurs simples n'y ont aucun droit.
          </p>
          <form onsubmit="handleAdminLogin(event)" class="flex flex-col gap-3">
            <input type="email" id="admin-login-email" required value="redacteur@ontario.fr" class="px-4 py-3 rounded-xl border text-sm" style="background-color: var(--surface-soft); border-color: var(--border-color); color: var(--text-primary);">
            <input type="password" id="admin-login-pass" required value="admin2026" class="px-4 py-3 rounded-xl border text-sm" style="background-color: var(--surface-soft); border-color: var(--border-color); color: var(--text-primary);">
            <button type="submit" class="py-3 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-sm shadow-md transition-all mt-2">
              Se connecter au CMS WordPress
            </button>
          </form>
        </div>
      </div>
    `;
    return;
  }

  // Si mode éditeur Gutenberg activé
  if (adminTab === 'new' || editingArticleId) {
    renderGutenbergEditor(container);
    return;
  }

  // Dashboard de gestion WordPress
  const publishedCount = ARTICLES.filter(a => a.status === 'published').length;
  const draftCount = ARTICLES.filter(a => a.status === 'draft').length;
  const trashCount = TRASH_ARTICLES.length;

  let currentList = ARTICLES;
  if (adminTab === 'published') currentList = ARTICLES.filter(a => a.status === 'published');
  if (adminTab === 'draft') currentList = ARTICLES.filter(a => a.status === 'draft');
  if (adminTab === 'trash') currentList = TRASH_ARTICLES;

  container.innerHTML = `
    <div class="container-ontario pt-28 sm:pt-32 pb-24">
      <!-- En-tête Admin WordPress -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b mb-8" style="border-color: var(--border-color);">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">ADMINISTRATION ONTARIO</span>
            <span class="text-xs" style="color: var(--text-muted);">Connecté en tant que <b>${currentUser.name}</b></span>
          </div>
          <h1 class="font-heading text-3xl font-extrabold tracking-tight mt-1" style="color: var(--text-primary);">
            Gestion des Articles & Contenus
          </h1>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="startNewArticle()" class="px-5 py-2.5 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs shadow-md transition-all">
            + Nouvel Article (Éditeur de Blocs)
          </button>
          <button onclick="handleAdminLogout()" class="px-4 py-2.5 rounded-full border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition-colors" style="border-color: var(--border-color); color: var(--text-primary);">
            Déconnexion
          </button>
        </div>
      </div>

      <!-- Métriques d'activité WordPress -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div class="p-5 rounded-2xl border" style="background-color: var(--surface); border-color: var(--border-color);">
          <span class="text-xs font-semibold" style="color: var(--text-muted);">Articles Publiés</span>
          <div class="font-heading text-2xl font-bold mt-1 text-[#EF4248]">${publishedCount}</div>
        </div>
        <div class="p-5 rounded-2xl border" style="background-color: var(--surface); border-color: var(--border-color);">
          <span class="text-xs font-semibold" style="color: var(--text-muted);">Brouillons</span>
          <div class="font-heading text-2xl font-bold mt-1" style="color: var(--text-primary);">${draftCount}</div>
        </div>
        <div class="p-5 rounded-2xl border" style="background-color: var(--surface); border-color: var(--border-color);">
          <span class="text-xs font-semibold" style="color: var(--text-muted);">Corbeille</span>
          <div class="font-heading text-2xl font-bold mt-1 text-amber-500">${trashCount}</div>
        </div>
        <div class="p-5 rounded-2xl border" style="background-color: var(--surface); border-color: var(--border-color);">
          <span class="text-xs font-semibold" style="color: var(--text-muted);">Abonnés Newsletter</span>
          <div class="font-heading text-2xl font-bold mt-1 text-emerald-500">1 420</div>
        </div>
      </div>

      <!-- Onglets de statut -->
      <div class="flex gap-4 border-b pb-3 mb-6 text-xs font-bold" style="border-color: var(--border-color);">
        <button onclick="setAdminTab('all')" class="hover:text-[#EF4248] ${adminTab === 'all' ? 'text-[#EF4248] border-b-2 border-[#EF4248] pb-3 -mb-3' : ''}" style="color: ${adminTab === 'all' ? '#EF4248' : 'var(--text-secondary)'};">
          Tous (${ARTICLES.length})
        </button>
        <button onclick="setAdminTab('published')" class="hover:text-[#EF4248] ${adminTab === 'published' ? 'text-[#EF4248] border-b-2 border-[#EF4248] pb-3 -mb-3' : ''}" style="color: ${adminTab === 'published' ? '#EF4248' : 'var(--text-secondary)'};">
          Publiés (${publishedCount})
        </button>
        <button onclick="setAdminTab('draft')" class="hover:text-[#EF4248] ${adminTab === 'draft' ? 'text-[#EF4248] border-b-2 border-[#EF4248] pb-3 -mb-3' : ''}" style="color: ${adminTab === 'draft' ? '#EF4248' : 'var(--text-secondary)'};">
          Brouillons (${draftCount})
        </button>
        <button onclick="setAdminTab('trash')" class="hover:text-[#EF4248] ${adminTab === 'trash' ? 'text-[#EF4248] border-b-2 border-[#EF4248] pb-3 -mb-3' : ''}" style="color: ${adminTab === 'trash' ? '#EF4248' : 'var(--text-secondary)'};">
          Corbeille (${trashCount})
        </button>
      </div>

      <!-- Tableau des articles façon WordPress -->
      <div class="rounded-3xl border overflow-hidden shadow-xs" style="background-color: var(--surface); border-color: var(--border-color);">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="uppercase font-bold tracking-wider border-b" style="background-color: var(--surface-soft); border-color: var(--border-color); color: var(--text-muted);">
              <tr>
                <th class="p-4 w-16">Image</th>
                <th class="p-4">Titre</th>
                <th class="p-4">Catégorie</th>
                <th class="p-4">Statut</th>
                <th class="p-4">Date</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y" style="border-color: var(--border-color);">
              ${currentList.map(art => `
                <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td class="p-4">
                    <img src="${art.coverImage}" onerror="onImgError(this)" class="w-12 h-12 rounded-xl object-cover shadow-xs">
                  </td>
                  <td class="p-4">
                    <div class="font-bold text-sm" style="color: var(--text-primary);">${art.title}</div>
                    <div class="text-[11px] text-zinc-400">slug : /${art.slug}</div>
                  </td>
                  <td class="p-4 font-semibold" style="color: var(--text-secondary);">
                    ${art.categoryBadge || 'Magazine'}
                  </td>
                  <td class="p-4">
                    <span class="px-2.5 py-1 rounded-full font-bold text-[10px] ${art.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}">
                      ${art.status === 'published' ? 'Publié' : (adminTab === 'trash' ? 'Dans la corbeille' : 'Brouillon')}
                    </span>
                  </td>
                  <td class="p-4 text-zinc-400">
                    ${art.publishedAt}
                  </td>
                  <td class="p-4 text-right space-x-2">
                    ${adminTab !== 'trash' ? `
                      <button onclick="editArticle('${art.id}')" class="px-3 py-1 rounded-lg border hover:bg-[#EF4248] hover:text-white transition-colors" style="border-color: var(--border-color); color: var(--text-primary);">
                        Modifier
                      </button>
                      <button onclick="navigateArticle('${art.slug}')" class="px-3 py-1 rounded-lg border hover:bg-black/5 dark:hover:bg-white/10" style="border-color: var(--border-color); color: var(--text-primary);">
                        Voir
                      </button>
                      <button onclick="trashArticle('${art.id}')" class="px-3 py-1 rounded-lg text-amber-600 hover:bg-amber-500/10">
                        Mettre à la corbeille
                      </button>
                    ` : `
                      <button onclick="restoreArticle('${art.id}')" class="px-3 py-1 rounded-lg bg-emerald-500 text-white font-bold">
                        Restaurer
                      </button>
                      <button onclick="permanentDeleteArticle('${art.id}')" class="px-3 py-1 rounded-lg bg-red-600 text-white font-bold">
                        Supprimer définitivement
                      </button>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// LOGIQUE DES ACTIONS D'ADMINISTRATION
function handleAdminLogin(e) {
  e.preventDefault();
  currentUser = { email: 'redacteur@ontario.fr', role: 'admin', name: 'Rédacteur Chef Ontario' };
  renderAdmin(document.getElementById('app-container'));
}

function handleAdminLogout() {
  currentUser = null;
  renderAdmin(document.getElementById('app-container'));
}

function setAdminTab(tab) {
  adminTab = tab;
  renderAdmin(document.getElementById('app-container'));
}

function trashArticle(id) {
  const index = ARTICLES.findIndex(a => a.id === id);
  if (index !== -1) {
    const [removed] = ARTICLES.splice(index, 1);
    TRASH_ARTICLES.push(removed);
    renderAdmin(document.getElementById('app-container'));
  }
}

function restoreArticle(id) {
  const index = TRASH_ARTICLES.findIndex(a => a.id === id);
  if (index !== -1) {
    const [restored] = TRASH_ARTICLES.splice(index, 1);
    restored.status = 'draft';
    ARTICLES.push(restored);
    renderAdmin(document.getElementById('app-container'));
  }
}

function permanentDeleteArticle(id) {
  if (confirm('ATTENTION : Voulez-vous supprimer définitivement cet article ? Cette action est irréversible.')) {
    TRASH_ARTICLES = TRASH_ARTICLES.filter(a => a.id !== id);
    renderAdmin(document.getElementById('app-container'));
  }
}

function startNewArticle() {
  editingArticleId = 'new';
  editorBlocks = [
    { type: 'paragraph', text: 'Rédigez l’introduction de votre nouvel article ici...' }
  ];
  renderGutenbergEditor(document.getElementById('app-container'));
}

function editArticle(id) {
  const art = ARTICLES.find(a => a.id === id);
  if (art) {
    editingArticleId = id;
    editorBlocks = JSON.parse(JSON.stringify(art.contentBlocks || [
      { type: 'paragraph', text: art.excerpt }
    ]));
    renderGutenbergEditor(document.getElementById('app-container'));
  }
}

// ==========================================================================
// 9. ÉDITEUR DE BLOCS VISUEL TYPE GUTENBERG
// ==========================================================================
function renderGutenbergEditor(container) {
  const isNew = editingArticleId === 'new';
  const article = isNew ? {
    title: '',
    excerpt: '',
    categorySlug: 'intelligence-artificielle',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    status: 'draft'
  } : ARTICLES.find(a => a.id === editingArticleId);

  container.innerHTML = `
    <div class="container-ontario pt-28 sm:pt-32 pb-24">
      <div class="flex items-center justify-between pb-6 border-b mb-8" style="border-color: var(--border-color);">
        <div class="flex items-center gap-3">
          <button onclick="cancelEditor()" class="p-2 rounded-xl border text-xs" style="border-color: var(--border-color); color: var(--text-primary);">
            ← Retour aux articles
          </button>
          <span class="text-xs font-bold" style="color: var(--text-muted);">
            ${isNew ? 'Création d’un nouvel article' : 'Modification de l’article'}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="saveArticleDraft()" class="px-4 py-2 rounded-full border text-xs font-bold hover:bg-black/5 dark:hover:bg-white/10" style="border-color: var(--border-color); color: var(--text-primary);">
            Enregistrer Brouillon
          </button>
          <button onclick="publishArticleEditor()" class="px-6 py-2 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md">
            Publier sur le site
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Zone Rédaction Gutenberg (8 Cols) -->
        <div class="lg:col-span-8 p-6 sm:p-8 rounded-3xl border" style="background-color: var(--surface); border-color: var(--border-color);">
          <input type="text" id="editor-title" placeholder="Titre de l'article..." value="${article.title}" class="w-full font-heading text-2xl sm:text-4xl font-extrabold mb-4 bg-transparent focus:outline-none" style="color: var(--text-primary);">
          
          <textarea id="editor-excerpt" rows="2" placeholder="Extrait éditorial ou chapeau..." class="w-full text-sm mb-8 bg-transparent border-b pb-3 focus:outline-none" style="color: var(--text-secondary); border-color: var(--border-color);">${article.excerpt}</textarea>

          <!-- Liste des blocs éditoriaux -->
          <div id="editor-blocks-list" class="space-y-4 mb-8">
            ${editorBlocks.map((b, idx) => `
              <div class="p-4 rounded-2xl border relative group" style="background-color: var(--surface-soft); border-color: var(--border-color);">
                <div class="flex items-center justify-between text-xs mb-2" style="color: var(--text-muted);">
                  <span class="font-bold uppercase">${b.type}</span>
                  <div class="flex items-center gap-2">
                    <button onclick="moveBlock(${idx}, -1)" class="hover:text-black">↑</button>
                    <button onclick="moveBlock(${idx}, 1)" class="hover:text-black">↓</button>
                    <button onclick="deleteBlock(${idx})" class="text-red-500 font-bold hover:underline">Supprimer</button>
                  </div>
                </div>
                ${b.type === 'paragraph' ? `
                  <textarea onchange="updateBlockText(${idx}, this.value)" rows="3" class="w-full text-sm bg-transparent border p-2 rounded-xl focus:outline-none" style="border-color: var(--border-color); color: var(--text-primary);">${b.text}</textarea>
                ` : ''}
                ${b.type === 'heading' ? `
                  <input type="text" onchange="updateBlockText(${idx}, this.value)" value="${b.text}" class="w-full font-bold text-base bg-transparent border p-2 rounded-xl focus:outline-none" style="border-color: var(--border-color); color: var(--text-primary);">
                ` : ''}
                ${b.type === 'quote' ? `
                  <textarea onchange="updateBlockText(${idx}, this.value)" rows="2" class="w-full italic text-sm bg-transparent border p-2 rounded-xl focus:outline-none" style="border-color: var(--border-color); color: var(--text-primary);">${b.text}</textarea>
                ` : ''}
                ${b.type === 'affiliate' ? `
                  <div class="text-xs space-y-2">
                    <input type="text" placeholder="Nom du produit" value="${b.productName || ''}" onchange="updateAffiliateField(${idx}, 'productName', this.value)" class="w-full p-2 border rounded-xl" style="border-color: var(--border-color);">
                    <input type="text" placeholder="URL Affiliée Amazon" value="${b.affiliateUrl || ''}" onchange="updateAffiliateField(${idx}, 'affiliateUrl', this.value)" class="w-full p-2 border rounded-xl" style="border-color: var(--border-color);">
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>

          <!-- Boutons d'insertion de blocs Gutenberg -->
          <div class="pt-4 border-t flex flex-wrap gap-2" style="border-color: var(--border-color);">
            <button onclick="addBlock('paragraph')" class="px-3 py-1.5 rounded-full border text-xs font-semibold hover:bg-black/5" style="border-color: var(--border-color); color: var(--text-primary);">+ Paragraphe</button>
            <button onclick="addBlock('heading')" class="px-3 py-1.5 rounded-full border text-xs font-semibold hover:bg-black/5" style="border-color: var(--border-color); color: var(--text-primary);">+ Titre H2</button>
            <button onclick="addBlock('quote')" class="px-3 py-1.5 rounded-full border text-xs font-semibold hover:bg-black/5" style="border-color: var(--border-color); color: var(--text-primary);">+ Citation</button>
            <button onclick="addBlock('affiliate')" class="px-3 py-1.5 rounded-full border text-xs font-bold text-[#EF4248] hover:bg-[#EF4248]/10" style="border-color: #EF4248;">+ Bloc Produit Affilié Amazon</button>
          </div>
        </div>

        <!-- Panneau latéral Réglages d'Article (4 Cols) -->
        <div class="lg:col-span-4 p-6 rounded-3xl border flex flex-col gap-4" style="background-color: var(--surface); border-color: var(--border-color);">
          <h4 class="font-bold text-sm" style="color: var(--text-primary);">Réglages de Publication</h4>
          
          <div>
            <label class="text-xs font-semibold block mb-1" style="color: var(--text-muted);">Catégorie principale</label>
            <select id="editor-cat" class="w-full p-2.5 rounded-xl border text-xs" style="background-color: var(--surface-soft); border-color: var(--border-color); color: var(--text-primary);">
              ${CATEGORIES.map(c => `
                <option value="${c.slug}" ${c.slug === article.categorySlug ? 'selected' : ''}>${c.name}</option>
              `).join('')}
            </select>
          </div>

          <div>
            <label class="text-xs font-semibold block mb-1" style="color: var(--text-muted);">Image de couverture (URL)</label>
            <input type="text" id="editor-cover" value="${article.coverImage}" class="w-full p-2.5 rounded-xl border text-xs" style="background-color: var(--surface-soft); border-color: var(--border-color); color: var(--text-primary);">
          </div>
        </div>
      </div>
    </div>
  `;
}

function cancelEditor() {
  editingArticleId = null;
  adminTab = 'all';
  renderAdmin(document.getElementById('app-container'));
}

function addBlock(type) {
  if (type === 'paragraph') editorBlocks.push({ type: 'paragraph', text: 'Nouveau paragraphe...' });
  if (type === 'heading') editorBlocks.push({ type: 'heading', level: 'h2', text: 'Nouveau titre de section' });
  if (type === 'quote') editorBlocks.push({ type: 'quote', text: 'Citation mémorable...' });
  if (type === 'affiliate') {
    editorBlocks.push({
      type: 'affiliate',
      productName: 'Accessoire Recommandé',
      brand: 'Marque Partenaire',
      description: 'Présentation éditoriale du produit testé.',
      features: ['Caractéristique A', 'Caractéristique B'],
      imageUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=600&q=80',
      merchantName: 'Amazon',
      affiliateUrl: 'https://amazon.fr/dp/B0EXEMPLE?tag=ontario-21',
      buttonText: 'Voir sur Amazon',
      disclaimer: 'Lien sponsorisé vérifié.'
    });
  }
  renderGutenbergEditor(document.getElementById('app-container'));
}

function moveBlock(index, dir) {
  const target = index + dir;
  if (target >= 0 && target < editorBlocks.length) {
    const temp = editorBlocks[index];
    editorBlocks[index] = editorBlocks[target];
    editorBlocks[target] = temp;
    renderGutenbergEditor(document.getElementById('app-container'));
  }
}

function deleteBlock(index) {
  editorBlocks.splice(index, 1);
  renderGutenbergEditor(document.getElementById('app-container'));
}

function updateBlockText(index, val) {
  if (editorBlocks[index]) editorBlocks[index].text = val;
}

function updateAffiliateField(index, field, val) {
  if (editorBlocks[index]) editorBlocks[index][field] = val;
}

function saveArticleDraft() {
  saveArticleInternal('draft');
}

function publishArticleEditor() {
  saveArticleInternal('published');
}

function saveArticleInternal(targetStatus) {
  const title = document.getElementById('editor-title').value.trim() || 'Sans titre';
  const excerpt = document.getElementById('editor-excerpt').value.trim() || 'Extrait de l’article';
  const catSlug = document.getElementById('editor-cat').value;
  const coverImage = document.getElementById('editor-cover').value.trim() || FALLBACK_IMAGE;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  if (editingArticleId === 'new') {
    const newArt = {
      id: 'art-' + Date.now(),
      title,
      frenchTitle: title,
      slug,
      excerpt,
      coverImage,
      categorySlug: catSlug,
      categoryBadge: 'RÉCENT',
      authorSlug: 'steve-jones',
      readingTime: Math.max(3, Math.round(editorBlocks.length * 1.5)),
      publishedAt: '13 Oct 2026',
      status: targetStatus,
      isHero: false,
      isFeatured: false,
      views: 1,
      likes: 0,
      tags: ['Nouveau', 'Magazine'],
      contentBlocks: editorBlocks
    };
    ARTICLES.unshift(newArt);
  } else {
    const art = ARTICLES.find(a => a.id === editingArticleId);
    if (art) {
      art.title = title;
      art.frenchTitle = title;
      art.slug = slug;
      art.excerpt = excerpt;
      art.coverImage = coverImage;
      art.categorySlug = catSlug;
      art.status = targetStatus;
      art.contentBlocks = editorBlocks;
    }
  }

  alert(`Article ${targetStatus === 'published' ? 'publié avec succès sur le site public' : 'enregistré en brouillon'} !`);
  editingArticleId = null;
  adminTab = 'all';
  renderAdmin(document.getElementById('app-container'));
}

// ==========================================================================
// 10. PAGES INSTITUTIONNELLES (À PROPOS & CONTACT)
// ==========================================================================
function renderAbout(container) {
  container.innerHTML = `
    <div class="container-ontario pt-28 sm:pt-32 pb-24">
      <div class="max-w-3xl mx-auto prose-editorial">
        <span class="text-xs font-bold uppercase tracking-widest text-[#EF4248]">QUI SOMMES-NOUS</span>
        <h1 class="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight mt-1 mb-6" style="color: var(--text-primary);">
          Manifeste Éditorial d’ONTARIO
        </h1>
        <p class="text-lg leading-relaxed">
          ONTARIO est né d’une conviction : à l’ère de l’instantanéité et des flux d’actualités éphémères, les penseurs et créateurs du numérique ont besoin d’un espace de recul critique, d’esthétique soignée et d’analyses indépendantes sans complaisance.
        </p>
        <h2>Notre Ligne Déontologique</h2>
        <p>
          Chaque dossier fait l’objet de recherches rigoureuses, de bancs d’essai en conditions réelles et d’une transparence absolue sur nos relations avec les constructeurs et partenaires affiliés.
        </p>
      </div>
    </div>
  `;
}

function renderContact(container) {
  container.innerHTML = `
    <div class="container-ontario pt-28 sm:pt-32 pb-24">
      <div class="max-w-2xl mx-auto p-8 rounded-3xl border shadow-sm" style="background-color: var(--surface); border-color: var(--border-color);">
        <h1 class="font-heading text-3xl font-extrabold tracking-tight mb-2" style="color: var(--text-primary);">
          Contacter la Rédaction
        </h1>
        <p class="text-xs mb-6" style="color: var(--text-secondary);">
          Une question sur un banc d'essai, une proposition de partenariat ou un retour de lecture ? Nos journalistes vous répondent sous 48h.
        </p>
        <form onsubmit="event.preventDefault(); alert('Votre message a bien été envoyé à la rédaction !'); event.target.reset();" class="flex flex-col gap-3">
          <input type="text" required placeholder="Votre nom complet" class="px-4 py-3 rounded-xl border text-sm" style="background-color: var(--surface-soft); border-color: var(--border-color); color: var(--text-primary);">
          <input type="email" required placeholder="Votre adresse email" class="px-4 py-3 rounded-xl border text-sm" style="background-color: var(--surface-soft); border-color: var(--border-color); color: var(--text-primary);">
          <textarea required rows="4" placeholder="Votre message pour la rédaction..." class="px-4 py-3 rounded-xl border text-sm" style="background-color: var(--surface-soft); border-color: var(--border-color); color: var(--text-primary);"></textarea>
          <button type="submit" class="py-3 rounded-full bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-sm shadow-md transition-all mt-2">
            Envoyer le message →
          </button>
        </form>
      </div>
    </div>
  `;
}
