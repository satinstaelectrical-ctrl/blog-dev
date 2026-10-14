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
  // Charger session admin existante si valide
  const savedAdmin = localStorage.getItem('ontario_admin_session_v2');
  if (savedAdmin) {
    try {
      const parsed = JSON.parse(savedAdmin);
      if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
        currentUser = { email: parsed.email, role: 'admin', name: parsed.fullName || 'Steve Jones' };
      }
    } catch (e) {}
  }
  // Charger base de données articles modifiée
  const savedDb = localStorage.getItem('ontario_cms_database_v2');
  if (savedDb) {
    try {
      const parsedDb = JSON.parse(savedDb);
      if (parsedDb.articles && parsedDb.articles.length > 0) {
        ARTICLES = parsedDb.articles;
      }
    } catch (e) {}
  }
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

  const headerWrapper = document.getElementById('header-wrapper');
  const newsletterSection = document.getElementById('newsletter-section');
  const footerEl = document.querySelector('footer');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (route === 'admin') {
    if (headerWrapper) headerWrapper.style.display = 'none';
    if (newsletterSection) newsletterSection.style.display = 'none';
    if (footerEl) footerEl.style.display = 'none';

    const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'administrator' || currentUser.role === 'editor');
    if (param === 'login') {
      renderAdminLogin(container);
    } else if (!isAdmin) {
      window.location.hash = 'admin/login';
    } else {
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

function renderAdminLogin(container) {
  container.innerHTML = `
    <div class="min-h-screen w-full flex flex-col justify-center items-center bg-[#071426] text-white p-4 relative font-sans">
      <div class="w-full max-w-md relative z-10">
        <div class="flex flex-col items-center mb-8 text-center">
          <div onclick="navigate('home')" class="flex items-center gap-2.5 group mb-3 cursor-pointer">
            <div class="w-10 h-10 rounded-full bg-[#EF4248] flex items-center justify-center text-white font-extrabold shadow-lg shadow-red-500/30">
              <span class="font-heading text-xl">O</span>
            </div>
            <span class="font-heading font-extrabold text-2xl tracking-tight text-white">ONTARIO</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold tracking-widest uppercase text-zinc-300 border border-white/10">
            <span class="w-2 h-2 rounded-full bg-[#EF4248] animate-pulse"></span>
            Portail CMS Administrateur
          </div>
          <p class="text-xs text-zinc-400 mt-2">Espace de gestion éditoriale, publication et personnalisation du site</p>
        </div>

        <div class="bg-[#0E2137] border border-[#28445E] rounded-3xl p-8 sm:p-10 shadow-2xl relative">
          <div id="admin-login-error" class="hidden mb-5 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs"></div>

          <form onsubmit="handleAdminLoginSubmit(event)" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Email Administrateur</label>
              <input type="email" id="admin-input-email" required placeholder="admin@ontario.com" value="admin@ontario.com" class="w-full px-4 py-3 rounded-xl bg-[#122B45] border border-[#28445E] text-white text-xs focus:outline-none focus:border-[#EF4248]">
            </div>
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-bold text-zinc-300 uppercase tracking-wider">Mot de Passe</label>
                <button type="button" onclick="alert('Code de récupération : ONTARIO-2026-ROOT\\nMot de passe par défaut : admin2026!')" class="text-xs text-[#EF4248] hover:underline">Mot de passe oublié ?</button>
              </div>
              <div class="relative">
                <input type="password" id="admin-input-pass" required placeholder="••••••••••••" value="admin2026!" class="w-full px-4 py-3 rounded-xl bg-[#122B45] border border-[#28445E] text-white text-xs focus:outline-none focus:border-[#EF4248]">
                <button type="button" onclick="togglePassVisibility()" class="absolute right-3 top-3 text-xs text-zinc-400 hover:text-white">👁️</button>
              </div>
            </div>
            <button type="submit" class="w-full py-3.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs shadow-lg shadow-red-500/20 transition-all cursor-pointer mt-2">
              Se connecter au Dashboard CMS →
            </button>
          </form>

          <div class="mt-6 pt-5 border-t border-[#28445E]/80 text-center">
            <p class="text-[10px] uppercase font-bold text-zinc-400 mb-2">Comptes de test autorisés</p>
            <div class="flex gap-2 justify-center">
              <button type="button" onclick="quickFillAdmin('admin@ontario.com','admin2026!')" class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-zinc-300 hover:bg-white/10">👑 admin@ontario.com</button>
              <button type="button" onclick="quickFillAdmin('editor@ontario.com','editor2026!')" class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-zinc-300 hover:bg-white/10">✏️ editor@ontario.com</button>
            </div>
          </div>
        </div>

        <div class="text-center mt-6">
          <button onclick="navigate('home')" class="text-xs text-zinc-400 hover:text-[#EF4248] transition-colors">
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

function handleAdminLoginSubmit(e) {
  e.preventDefault();
  const email = (document.getElementById('admin-input-email')?.value || '').trim();
  const pass = document.getElementById('admin-input-pass')?.value || '';
  const errorEl = document.getElementById('admin-login-error');

  const validPass = (pass === 'admin2026!' || pass === 'admin123' || pass === 'editor2026!');
  if (!validPass) {
    if (errorEl) {
      errorEl.classList.remove('hidden');
      errorEl.textContent = 'Mot de passe administrateur incorrect.';
    }
    return;
  }

  currentUser = {
    email: email || 'admin@ontario.com',
    role: 'admin',
    name: 'Steve Jones (Directeur Éditorial)'
  };
  localStorage.setItem('ontario_admin_session_v2', JSON.stringify({
    ...currentUser,
    fullName: currentUser.name,
    expiresAt: Date.now() + 24 * 3600 * 1000
  }));
  navigate('admin', 'dashboard');
}

function handleAdminLogout() {
  currentUser = null;
  localStorage.removeItem('ontario_admin_session_v2');
  navigate('admin', 'login');
}

// ==========================================================================
// 8. NOUVEAU DASHBOARD CMS ADMINISTRATEUR ONTARIO — NORMES WORDPRESS / SAAS
// Reconstruit avec Sidebar pliable, Analytics, Gutenberg, SEO, AdSense & Customizer
// ==========================================================================

let adminCurrentTab = 'dashboard';
let adminSidebarCollapsed = false;
let adminMobileSidebarOpen = false;
let adminArticleFilter = 'all';
let adminArticleCategory = 'all';
let adminArticleSearch = '';
let adminSelectedArticles = [];
let adminAnalyticsRange = '30d';
let adminNotificationsOpen = false;
let adminCommentFilter = 'all';
let adminMediaFilter = 'all';
let adminMediaSearch = '';
TRASH_ARTICLES = typeof TRASH_ARTICLES !== 'undefined' ? TRASH_ARTICLES : [];
let previewArticleModalId = null;

// Données Médias de la Médiathèque
let ADMIN_MEDIA = [
  { id: 'm-1', title: 'Next Gen Studio Hero', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85', type: 'image', dimensions: '1920 × 1080', size: '428 KB', format: 'WebP', date: '12 Oct 2026' },
  { id: 'm-2', title: 'Digital Signals Waveform', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=85', type: 'image', dimensions: '1280 × 720', size: '315 KB', format: 'JPEG', date: '10 Oct 2026' },
  { id: 'm-3', title: 'Cognitive Circuits Brain', url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=85', type: 'image', dimensions: '1600 × 900', size: '512 KB', format: 'PNG', date: '08 Oct 2026' },
  { id: 'm-4', title: 'Urban Architecture Minimalism', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85', type: 'image', dimensions: '1920 × 1080', size: '390 KB', format: 'WebP', date: '05 Oct 2026' },
  { id: 'm-5', title: 'Workstation Studio Pro X1', url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80', type: 'image', dimensions: '800 × 800', size: '184 KB', format: 'WebP', date: '03 Oct 2026' },
  { id: 'm-6', title: 'Corporate Identity Mockup', url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80', type: 'image', dimensions: '1440 × 900', size: '470 KB', format: 'JPEG', date: '01 Oct 2026' },
  { id: 'm-7', title: 'Steve Jones Avatar', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', type: 'image', dimensions: '400 × 400', size: '64 KB', format: 'WebP', date: '28 Sep 2026' },
  { id: 'm-8', title: 'Kate Johnson Avatar', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', type: 'image', dimensions: '400 × 400', size: '58 KB', format: 'WebP', date: '25 Sep 2026' },
];

// Données Commentaires
let ADMIN_COMMENTS = [
  { id: 'c-1', author: 'Marc Valadier', email: 'marc.valadier@studio.fr', articleSlug: 'next-gen-marketing-innovative-strategies', articleTitle: 'Next Gen Marketing', text: 'Analyse d’une grande finesse. La convergence entre hardware modulaire et modèles locaux est en effet le vrai sujet.', status: 'approved', date: '12 Oct 2026' },
  { id: 'c-2', author: 'Hélène Roche', email: 'helene@agence-nova.com', articleSlug: 'commanding-unknown-terrain-lessons-bold-pioneers', articleTitle: 'Commanding Unknown Terrain', text: 'Article très inspirant pour notre équipe de designers produit. Bravo pour la mise en page soignée !', status: 'approved', date: '11 Oct 2026' },
  { id: 'c-3', author: 'Alexandre Mercier', email: 'alex.m@fintech-paris.com', articleSlug: 'what-digital-signals-tell-us-about-market-behavior', articleTitle: 'What Digital Signals Tell Us', text: 'Les signaux faibles décrits correspondent exactement aux anomalies de volatilité constatées ce trimestre.', status: 'pending', date: '13 Oct 2026' },
  { id: 'c-4', author: 'CryptoBot_99', email: 'promo@free-crypto.xyz', articleSlug: 'next-gen-marketing-innovative-strategies', articleTitle: 'Next Gen Marketing', text: 'Earn 5000$ daily with automated trading tools. Click here now !', status: 'spam', date: '13 Oct 2026' },
  { id: 'c-5', author: 'Julien Perrot', email: 'julien.p@crea.org', articleSlug: 'mind-circuits-engineering-the-future-self', articleTitle: 'Mind Circuits', text: 'La réflexion sur le soi augmenté pose des questions éthiques fondamentales que peu de médias abordent.', status: 'pending', date: '14 Oct 2026' },
];

// Données Utilisateurs & Rôles
let ADMIN_USERS = [
  { id: 'u-1', name: 'Steve Jones', email: 'admin@ontario.com', role: 'Administrateur', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', status: 'Actif', lastActive: 'En ligne', articlesCount: 14 },
  { id: 'u-2', name: 'Kate Johnson', email: 'kate@ontario.com', role: 'Auteur', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', status: 'Actif', lastActive: 'Il y a 2h', articlesCount: 8 },
  { id: 'u-3', name: 'Thomas Laurent', email: 'thomas@ontario.com', role: 'Éditeur', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', status: 'Actif', lastActive: 'Hier', articlesCount: 6 },
  { id: 'u-4', name: 'Sophie Bernard', email: 'sophie.bernard@gmail.com', role: 'Lecteur', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', status: 'Actif', lastActive: 'Il y a 3j', articlesCount: 0 },
  { id: 'u-5', name: 'Lucas Martin', email: 'lucas.martin@free.fr', role: 'Lecteur', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80', status: 'Actif', lastActive: 'Il y a 5j', articlesCount: 0 },
];

// Données Abonnés Newsletter
let ADMIN_SUBSCRIBERS = [
  { id: 's-1', email: 'clara.design@studio.com', date: '14 Oct 2026', status: 'Vérifié (Double Opt-In)', frequency: 'Hebdomadaire' },
  { id: 's-2', email: 'pierre.dupont@orange.fr', date: '13 Oct 2026', status: 'Vérifié (Double Opt-In)', frequency: 'Quotidienne' },
  { id: 's-3', email: 'victor.tech@startup.io', date: '12 Oct 2026', status: 'Vérifié (Double Opt-In)', frequency: 'Hebdomadaire' },
  { id: 's-4', email: 'contact@agence-horizon.fr', date: '11 Oct 2026', status: 'Vérifié (Double Opt-In)', frequency: 'Alertes Spéciales' },
  { id: 's-5', email: 'emma.roux@polytechnique.edu', date: '10 Oct 2026', status: 'Vérifié (Double Opt-In)', frequency: 'Hebdomadaire' },
  { id: 's-6', email: 'arnaud.b@inria.fr', date: '09 Oct 2026', status: 'Vérifié (Double Opt-In)', frequency: 'Quotidienne' },
];

// Notifications Admin
let ADMIN_NOTIFICATIONS = [
  { id: 'n-1', title: 'Nouveau commentaire en attente de modération', time: 'Il y a 10 min', unread: true, icon: '💬' },
  { id: 'n-2', title: 'Nouvel abonné validé : clara.design@studio.com', time: 'Il y a 45 min', unread: true, icon: '✉️' },
  { id: 'n-3', title: 'Rapport AdSense : +18.4% de revenus aujourd’hui', time: 'Il y a 3h', unread: true, icon: '💰' },
  { id: 'n-4', title: 'Sauvegarde automatique du store synchronisée', time: 'Hier à 23h30', unread: false, icon: '💾' },
];

// Configuration AdSense
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
    home_after_hero: { name: 'Accueil — Après le Hero', enabled: true, format: 'Leaderboard (728x90)' },
    home_between_categories: { name: 'Accueil — Entre Catégories', enabled: true, format: 'Bannière Fluide Responsive' },
    home_between_articles: { name: 'Accueil — Flux Articles Fresh', enabled: true, format: 'Grand Rectangle (336x280)' },
    home_sidebar: { name: 'Accueil — Sidebar Latérale', enabled: true, format: 'Demi-page Skyscraper (300x600)' },
    article_after_intro: { name: 'Article — Après le Chapeau', enabled: true, format: 'Bannière Fluide Responsive' },
    article_in_content: { name: 'Article — Cœur du Texte', enabled: true, format: 'Pavé Moyen (300x250)' },
    article_footer: { name: 'Article — Avant Read Next', enabled: true, format: 'Leaderboard (728x90)' },
    article_sidebar: { name: 'Article — Sidebar Droite', enabled: true, format: 'Pavé Moyen (300x250)' },
    mobile_sticky: { name: 'Mobile — Encart Flottant Défilant', enabled: true, format: 'Bannière Mobile (320x50)' },
  }
};

// Données Analytics par Période
const ANALYTICS_DATA = {
  today: { visitors: '12 540', views: '45 200', bounce: '31.2%', readTime: '4m 12s', ctr: '3.9%', chartPoints: [180, 290, 420, 680, 890, 1140, 1560, 2100, 1840, 1420, 1100, 920] },
  '7d': { visitors: '78 900', views: '284 500', bounce: '32.8%', readTime: '4m 28s', ctr: '3.7%', chartPoints: [9800, 11200, 10800, 12540, 13100, 11900, 9560] },
  '30d': { visitors: '342 800', views: '1 245 000', bounce: '32.4%', readTime: '4m 32s', ctr: '3.8%', chartPoints: [10500, 12200, 11400, 13800, 15200, 14100, 12800, 13400, 14900, 16200, 15800, 14700] },
  year: { visitors: '3 840 000', views: '14 200 000', bounce: '33.1%', readTime: '4m 45s', ctr: '3.6%', chartPoints: [240000, 280000, 310000, 342000, 390000, 410000, 380000, 360000, 420000, 450000, 470000, 490000] },
};

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
  ADMIN_NOTIFICATIONS.forEach(n => n.unread = false);
  renderAdmin(document.getElementById('app-container'));
}

function setAnalyticsRange(range) {
  adminAnalyticsRange = range;
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

function applyBulkArticleAction(action) {
  if (adminSelectedArticles.length === 0) {
    alert('Veuillez sélectionner au moins un article.');
    return;
  }
  if (action === 'publish') {
    ARTICLES.forEach(a => {
      if (adminSelectedArticles.includes(a.id)) a.status = 'published';
    });
    alert(adminSelectedArticles.length + ' article(s) publié(s) avec succès !');
  } else if (action === 'draft') {
    ARTICLES.forEach(a => {
      if (adminSelectedArticles.includes(a.id)) a.status = 'draft';
    });
    alert(adminSelectedArticles.length + ' article(s) placé(s) en brouillon.');
  } else if (action === 'trash') {
    for (let i = ARTICLES.length - 1; i >= 0; i--) {
      if (adminSelectedArticles.includes(ARTICLES[i].id)) {
        const [removed] = ARTICLES.splice(i, 1);
        removed.status = 'trash';
        TRASH_ARTICLES.push(removed);
      }
    }
    alert(adminSelectedArticles.length + ' article(s) déplacé(s) vers la corbeille.');
  }
  adminSelectedArticles = [];
  syncStoreAndRender();
}

function duplicateArticle(id) {
  const art = ARTICLES.find(a => a.id === id);
  if (!art) return;
  const copy = JSON.parse(JSON.stringify(art));
  copy.id = 'art-' + Date.now();
  copy.title = copy.title + ' (Copie)';
  copy.slug = copy.slug + '-copie-' + Math.floor(Math.random() * 1000);
  copy.status = 'draft';
  copy.views = 0;
  copy.likes = 0;
  ARTICLES.unshift(copy);
  alert('Article dupliqué en brouillon : "' + copy.title + '"');
  syncStoreAndRender();
}

function trashArticle(id) {
  const index = ARTICLES.findIndex(a => a.id === id);
  if (index !== -1) {
    const [removed] = ARTICLES.splice(index, 1);
    removed.status = 'trash';
    TRASH_ARTICLES.push(removed);
    syncStoreAndRender();
  }
}

function restoreArticle(id) {
  const index = TRASH_ARTICLES.findIndex(a => a.id === id);
  if (index !== -1) {
    const [restored] = TRASH_ARTICLES.splice(index, 1);
    restored.status = 'draft';
    ARTICLES.push(restored);
    syncStoreAndRender();
  }
}

function permanentDeleteArticle(id) {
  if (confirm('ATTENTION : Voulez-vous supprimer définitivement cet article ? Cette action est irréversible.')) {
    TRASH_ARTICLES = TRASH_ARTICLES.filter(a => a.id !== id);
    syncStoreAndRender();
  }
}

function syncStoreAndRender() {
  localStorage.setItem('ontario_cms_database_v2', JSON.stringify({ articles: ARTICLES }));
  renderAdmin(document.getElementById('app-container'));
}

function getFilteredArticles() {
  return ARTICLES.filter(art => {
    if (adminArticleFilter !== 'all') {
      if ((art.status || 'published') !== adminArticleFilter) return false;
    }
    if (adminArticleCategory !== 'all') {
      if (art.categorySlug !== adminArticleCategory) return false;
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

function filterComments(status) {
  adminCommentFilter = status;
  renderAdmin(document.getElementById('app-container'));
}

function approveComment(id) {
  const comm = ADMIN_COMMENTS.find(c => c.id === id);
  if (comm) comm.status = 'approved';
  renderAdmin(document.getElementById('app-container'));
}

function markCommentSpam(id) {
  const comm = ADMIN_COMMENTS.find(c => c.id === id);
  if (comm) comm.status = 'spam';
  renderAdmin(document.getElementById('app-container'));
}

function deleteComment(id) {
  ADMIN_COMMENTS = ADMIN_COMMENTS.filter(c => c.id !== id);
  renderAdmin(document.getElementById('app-container'));
}

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
  alert('URL du média copiée dans le presse-papier !\n' + url);
}

function deleteMediaItem(id) {
  if (confirm('Supprimer ce média de la bibliothèque ?')) {
    ADMIN_MEDIA = ADMIN_MEDIA.filter(m => m.id !== id);
    renderAdmin(document.getElementById('app-container'));
  }
}

function uploadMediaPrompt() {
  const url = prompt("Entrez l'URL de l'image ou de la ressource média à ajouter :");
  if (!url) return;
  const title = prompt("Titre ou nom du média :") || "Nouveau média éditorial";
  ADMIN_MEDIA.unshift({
    id: 'm-' + Date.now(),
    title,
    url,
    type: 'image',
    dimensions: '1920 × 1080',
    size: '380 KB',
    format: 'WebP',
    date: 'Aujourd\'hui'
  });
  alert('Média ajouté avec succès à la médiathèque !');
  renderAdmin(document.getElementById('app-container'));
}

function exportSubscribersCSV() {
  let csv = "ID,Email,Date,Statut,Frequence\n";
  ADMIN_SUBSCRIBERS.forEach(s => {
    csv += s.id + "," + s.email + "," + s.date + "," + s.status + "," + s.frequency + "\n";
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "abonnes_newsletter_ontario_" + Date.now() + ".csv";
  a.click();
}

function handleAddSubscriber(e) {
  e.preventDefault();
  const input = document.getElementById('new-sub-email');
  if (!input || !input.value) return;
  ADMIN_SUBSCRIBERS.unshift({
    id: 's-' + Date.now(),
    email: input.value.trim(),
    date: "Aujourd'hui",
    status: 'Vérifié (Double Opt-In)',
    frequency: 'Hebdomadaire'
  });
  input.value = '';
  alert('Nouvel abonné enregistré avec succès !');
  renderAdmin(document.getElementById('app-container'));
}

function deleteSubscriber(id) {
  ADMIN_SUBSCRIBERS = ADMIN_SUBSCRIBERS.filter(s => s.id !== id);
  renderAdmin(document.getElementById('app-container'));
}

function handleAddUser(e) {
  e.preventDefault();
  const name = document.getElementById('user-new-name').value.trim();
  const email = document.getElementById('user-new-email').value.trim();
  const role = document.getElementById('user-new-role').value;
  if (!name || !email) return;
  ADMIN_USERS.push({
    id: 'u-' + Date.now(),
    name,
    email,
    role,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    status: 'Actif',
    lastActive: "Aujourd'hui",
    articlesCount: 0
  });
  alert('Utilisateur ' + name + ' (' + role + ') ajouté avec succès !');
  renderAdmin(document.getElementById('app-container'));
}

function changeUserRole(id, newRole) {
  const u = ADMIN_USERS.find(x => x.id === id);
  if (u) {
    u.role = newRole;
    alert('Rôle de ' + u.name + ' mis à jour vers : ' + newRole);
    renderAdmin(document.getElementById('app-container'));
  }
}

function deleteUser(id) {
  if (id === 'u-1') {
    alert("Impossible de supprimer le Super-Administrateur principal.");
    return;
  }
  if (confirm("Supprimer ce compte utilisateur ?")) {
    ADMIN_USERS = ADMIN_USERS.filter(u => u.id !== id);
    renderAdmin(document.getElementById('app-container'));
  }
}

function handleCreateCategory(e) {
  e.preventDefault();
  const name = document.getElementById('new-cat-name').value.trim();
  const slug = document.getElementById('new-cat-slug').value.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const bg = document.getElementById('new-cat-bg').value;
  const text = document.getElementById('new-cat-text').value;
  if (!name) return;
  CATEGORIES.push({
    id: 'cat-' + Date.now(),
    name,
    slug,
    bgLight: bg,
    textLight: text,
    bgDark: '#13283E',
    textDark: '#FFFFFF',
    count: 0
  });
  alert('Nouvelle catégorie "' + name + '" créée avec succès !');
  renderAdmin(document.getElementById('app-container'));
}

function toggleAdSenseGlobal() {
  ADMIN_ADSENSE.enabled = !ADMIN_ADSENSE.enabled;
  renderAdmin(document.getElementById('app-container'));
}

function toggleAdSenseSlot(key) {
  if (ADMIN_ADSENSE.slots[key]) {
    ADMIN_ADSENSE.slots[key].enabled = !ADMIN_ADSENSE.slots[key].enabled;
    renderAdmin(document.getElementById('app-container'));
  }
}

function changeAdSenseFormat(key, fmt) {
  if (ADMIN_ADSENSE.slots[key]) {
    ADMIN_ADSENSE.slots[key].format = fmt;
    renderAdmin(document.getElementById('app-container'));
  }
}

function updateAdSensePublisher(val) {
  ADMIN_ADSENSE.publisherId = val.trim();
}

function startNewArticle() {
  editingArticleId = 'new';
  editorBlocks = [
    { type: 'paragraph', text: 'Rédigez l’introduction de votre nouvel article ici...' }
  ];
  adminCurrentTab = 'editor';
  renderAdmin(document.getElementById('app-container'));
}

function editArticle(id) {
  const art = ARTICLES.find(a => a.id === id);
  if (art) {
    editingArticleId = id;
    editorBlocks = JSON.parse(JSON.stringify(art.contentBlocks || [
      { type: 'paragraph', text: art.excerpt }
    ]));
    adminCurrentTab = 'editor';
    renderAdmin(document.getElementById('app-container'));
  }
}

function cancelEditor() {
  editingArticleId = null;
  adminCurrentTab = 'articles';
  renderAdmin(document.getElementById('app-container'));
}

function addBlock(type) {
  if (type === 'paragraph') editorBlocks.push({ type: 'paragraph', text: 'Nouveau paragraphe éditorial...' });
  if (type === 'heading') editorBlocks.push({ type: 'heading', level: 'h2', text: 'Nouveau titre de section' });
  if (type === 'quote') editorBlocks.push({ type: 'quote', text: 'Citation mémorable de l’intervenant...' });
  if (type === 'image') editorBlocks.push({ type: 'image', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=85', caption: 'Légende illustrative du visuel' });
  if (type === 'video') editorBlocks.push({ type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', caption: 'Documentaire ou banc d’essai vidéo' });
  if (type === 'table') editorBlocks.push({ type: 'table', rows: [['Caractéristique', 'Modèle Standard', 'Modèle Pro'], ['Architecture NPU', '24 TOPS', '45 TOPS'], ['Autonomie', '12h', '18h']] });
  if (type === 'button') editorBlocks.push({ type: 'button', text: 'En savoir plus sur l’offre', url: 'https://ontariowp.com' });
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
  const target = idx + dir;
  if (target < 0 || target >= editorBlocks.length) return;
  const temp = editorBlocks[idx];
  editorBlocks[idx] = editorBlocks[target];
  editorBlocks[target] = temp;
  renderAdmin(document.getElementById('app-container'));
}

function deleteBlock(idx) {
  editorBlocks.splice(idx, 1);
  renderAdmin(document.getElementById('app-container'));
}

function updateBlockText(idx, val) {
  if (editorBlocks[idx]) editorBlocks[idx].text = val;
}

function updateAffiliateField(idx, field, val) {
  if (editorBlocks[idx]) editorBlocks[idx][field] = val;
}

function saveArticleDraft() {
  saveArticleWithStatus('draft');
}

function publishArticleEditor() {
  saveArticleWithStatus('published');
}

function saveArticleWithStatus(targetStatus) {
  const title = (document.getElementById('editor-title')?.value || '').trim() || 'Article Sans Titre';
  const excerpt = (document.getElementById('editor-excerpt')?.value || '').trim() || 'Extrait de l’article';
  const catSlug = document.getElementById('editor-cat')?.value || 'ai';
  const coverImage = (document.getElementById('editor-cover')?.value || '').trim() || FALLBACK_IMAGE;
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
      publishedAt: '14 Oct 2026',
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

  alert("Article " + (targetStatus === 'published' ? 'publié avec succès sur le site public' : 'enregistré en brouillon') + " !");
  editingArticleId = null;
  adminCurrentTab = 'articles';
  syncStoreAndRender();
}

function saveCustomizationSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('cust-hero-title')?.value;
  const desc = document.getElementById('cust-hero-desc')?.value;
  const img = document.getElementById('cust-hero-img')?.value;

  if (ARTICLES[0]) {
    if (title) ARTICLES[0].title = title;
    if (desc) ARTICLES[0].excerpt = desc;
    if (img) ARTICLES[0].coverImage = img;
  }

  localStorage.setItem('ontario_cms_database_v2', JSON.stringify({ articles: ARTICLES }));
  alert("✓ Personnalisation sauvegardée ! Les modifications sont appliquées sur la page d'accueil.");
  setAdminNav('dashboard');
}

function saveAdminProfileSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('profile-name')?.value;
  const email = document.getElementById('profile-email')?.value;
  const avatar = document.getElementById('profile-avatar')?.value;
  const newPass = document.getElementById('profile-new-pass')?.value;

  if (currentUser) {
    if (name) currentUser.name = name;
    if (email) currentUser.email = email;
    if (avatar) currentUser.avatar = avatar;
    localStorage.setItem('ontario_admin_session_v2', JSON.stringify({
      ...currentUser,
      fullName: currentUser.name,
      expiresAt: Date.now() + 24 * 3600 * 1000
    }));
  }
  alert("✓ Profil administrateur mis à jour avec succès !");
  setAdminNav('dashboard');
}

// ==========================================================================
// RENDERERS DÉTAILLÉS DES 15 ONGLETS DU DASHBOARD
// ==========================================================================

function renderTabDashboard() {
  const publishedCount = ARTICLES.filter(a => !a.status || a.status === 'published').length;
  const draftCount = ARTICLES.filter(a => a.status === 'draft').length;
  const trashCount = TRASH_ARTICLES.length;
  const popularArticles = [...ARTICLES].sort((a,b) => (b.views||0) - (a.views||0)).slice(0, 4);
  const pendingArticles = ARTICLES.filter(a => a.status === 'draft').slice(0, 3);

  return `
    <!-- Bannière de Bienvenue Pro -->
    <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0E2137] via-[#122B45] to-[#0A1A2F] border border-[#1E3752] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF4248]/15 border border-[#EF4248]/30 text-[#EF4248] text-[11px] font-bold uppercase tracking-wider mb-2">
          <span class="w-2 h-2 rounded-full bg-[#EF4248] animate-ping"></span>
          Système Opérationnel • Édition Pro
        </div>
        <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Bonjour Steve, voici l'état de votre média aujourd'hui
        </h1>
        <p class="text-xs text-zinc-400 mt-1 max-w-xl">
          Supervision éditoriale en temps réel, audience certifiée, monétisation AdSense et contrôle complet de la plateforme ONTARIO.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="setAdminNav('analytics')" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all">
          📈 Voir Analytics
        </button>
        <button onclick="startNewArticle()" class="px-5 py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-lg shadow-red-500/25 transition-all">
          + Rédiger Article
        </button>
      </div>
    </div>

    <!-- 6 KPI CARDS STATISTIQUES PRINCIPALES -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752] flex flex-col justify-between hover:border-[#EF4248]/40 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-400">Visiteurs Aujourd'hui</span>
          <span class="p-2 rounded-lg bg-blue-500/10 text-blue-400 text-sm">👤</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-white">12 540</div>
        <div class="text-[11px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
          <span>↑ +18.4%</span>
          <span class="text-zinc-500 font-normal">vs hier</span>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752] flex flex-col justify-between hover:border-[#EF4248]/40 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-400">Pages Vues</span>
          <span class="p-2 rounded-lg bg-purple-500/10 text-purple-400 text-sm">👁️</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-white">45 200</div>
        <div class="text-[11px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
          <span>↑ +12.1%</span>
          <span class="text-zinc-500 font-normal">vs hier</span>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752] flex flex-col justify-between hover:border-[#EF4248]/40 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-400">Articles Publiés</span>
          <span class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm">📝</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-white">${publishedCount}</div>
        <div class="text-[11px] text-zinc-400 mt-2">
          <b class="text-amber-400">${draftCount}</b> brouillons • <b class="text-red-400">${trashCount}</b> corbeille
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752] flex flex-col justify-between hover:border-[#EF4248]/40 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-400">Abonnés Newsletter</span>
          <span class="p-2 rounded-lg bg-pink-500/10 text-pink-400 text-sm">✉️</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-white">3 840</div>
        <div class="text-[11px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
          <span>↑ +240</span>
          <span class="text-zinc-500 font-normal">ce mois</span>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752] flex flex-col justify-between hover:border-[#EF4248]/40 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-400">Revenus AdSense</span>
          <span class="p-2 rounded-lg bg-amber-500/10 text-amber-400 text-sm">💰</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-white">1 480,50 €</div>
        <div class="text-[11px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
          <span>↑ +15.8%</span>
          <span class="text-zinc-500 font-normal">RPM 4,25 €</span>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752] flex flex-col justify-between hover:border-[#EF4248]/40 transition-all">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-400">Taux de Rebond</span>
          <span class="p-2 rounded-lg bg-teal-500/10 text-teal-400 text-sm">🎯</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-white">32.4%</div>
        <div class="text-[11px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
          <span>↓ -3.1%</span>
          <span class="text-zinc-500 font-normal">Très bon</span>
        </div>
      </div>
    </div>

    <!-- SECTION PERFORMANCE CONTENU (GRILLE 2 COLS) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Col Gauche : Articles les plus performants (8 Cols) -->
      <div class="lg:col-span-8 p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-heading font-extrabold text-base text-white">Articles les Plus Populaires de la Semaine</h2>
            <p class="text-xs text-zinc-400">Classement selon le volume de lectures uniques et le taux de complétion</p>
          </div>
          <button onclick="setAdminNav('articles')" class="text-xs text-[#EF4248] hover:underline font-bold">
            Voir tout le catalogue →
          </button>
        </div>

        <div class="space-y-3">
          ${popularArticles.map((art, idx) => `
            <div class="p-4 rounded-2xl bg-[#0A1A2F] border border-[#1E3752] flex items-center justify-between gap-4 hover:border-white/20 transition-all">
              <div class="flex items-center gap-4 min-w-0">
                <span class="w-6 text-center font-heading font-extrabold text-sm ${idx === 0 ? 'text-[#EF4248]' : 'text-zinc-500'}">0${idx + 1}</span>
                <img src="${art.coverImage}" onerror="onImgError(this)" class="w-14 h-14 rounded-xl object-cover flex-shrink-0">
                <div class="min-w-0">
                  <span class="text-[10px] font-bold text-[#EF4248] uppercase tracking-wider">${art.categoryBadge || 'DOSSIER'}</span>
                  <h4 class="font-bold text-xs text-white truncate hover:text-[#EF4248] cursor-pointer" onclick="previewArticle('${art.id}')">${art.title}</h4>
                  <span class="text-[10px] text-zinc-400">${art.readingTime || 5} min de lecture • Publié le ${art.publishedAt || 'Récemment'}</span>
                </div>
              </div>
              <div class="text-right flex-shrink-0">
                <div class="font-heading font-extrabold text-sm text-white">${(art.views || 14200).toLocaleString()} <span class="text-[10px] font-normal text-zinc-400">vues</span></div>
                <div class="text-[10px] text-emerald-400 font-semibold">${(art.likes || 850)} ❤️ likes</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Col Droite : Articles en attente & Audit Logs (4 Cols) -->
      <div class="lg:col-span-4 space-y-6">
        
        <!-- Brouillons à finaliser -->
        <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752]">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-heading font-bold text-sm text-white">Brouillons en Attente (${pendingArticles.length})</h3>
            <button onclick="startNewArticle()" class="text-xs text-[#EF4248] hover:underline font-bold">+ Nouveau</button>
          </div>
          ${pendingArticles.length === 0 ? `
            <p class="text-xs text-zinc-400 py-4 text-center">Aucun brouillon en attente. Tout est publié !</p>
          ` : `
            <div class="space-y-3">
              ${pendingArticles.map(art => `
                <div class="p-3 rounded-xl bg-[#0A1A2F] border border-[#1E3752] flex items-center justify-between gap-2">
                  <div class="min-w-0">
                    <h5 class="text-xs font-bold text-white truncate">${art.title}</h5>
                    <span class="text-[10px] text-zinc-400">Modifié récemment</span>
                  </div>
                  <button onclick="editArticle('${art.id}')" class="px-2.5 py-1 rounded-lg bg-[#EF4248]/20 text-[#EF4248] text-[10px] font-bold hover:bg-[#EF4248] hover:text-white transition-all">
                    Éditer
                  </button>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Journal d'Audit Récent -->
        <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752]">
          <h3 class="font-heading font-bold text-sm text-white mb-4">Dernières Activités</h3>
          <div class="space-y-3 text-xs">
            <div class="flex items-start gap-3">
              <span class="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
              <div>
                <p class="text-white font-medium">Article publié avec succès</p>
                <span class="text-[10px] text-zinc-500">Steve Jones • Il y a 25 min</span>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></span>
              <div>
                <p class="text-white font-medium">Nouveau commentaire approuvé</p>
                <span class="text-[10px] text-zinc-500">Hélène Roche • Il y a 1h</span>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="w-2 h-2 rounded-full bg-[#EF4248] mt-1.5 flex-shrink-0"></span>
              <div>
                <p class="text-white font-medium">Campagne AdSense optimisée</p>
                <span class="text-[10px] text-zinc-500">Algorithme Google • Il y a 3h</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;
}

function renderTabAnalytics() {
  const data = ANALYTICS_DATA[adminAnalyticsRange] || ANALYTICS_DATA['30d'];
  const maxPoint = Math.max(...data.chartPoints);
  const minPoint = Math.min(...data.chartPoints);

  // Génération de la courbe SVG fluide
  const svgWidth = 800;
  const svgHeight = 220;
  const step = svgWidth / (data.chartPoints.length - 1);
  const points = data.chartPoints.map((val, idx) => {
    const x = idx * step;
    const y = svgHeight - 20 - ((val - minPoint) / (maxPoint - minPoint || 1)) * (svgHeight - 40);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const areaPoints = points + ` ${svgWidth},${svgHeight} 0,${svgHeight}`;

  return `
    <div class="space-y-8">
      
      <!-- En-tête Analytics avec commutateur de période -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">AUDIENCE & DONNÉES CERTIFIÉES</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Analytics & Comportement des Lecteurs
          </h1>
          <p class="text-xs text-zinc-400">Données agrégées de fréquentation, temps d'attention et performance des canaux</p>
        </div>
        
        <!-- Sélecteur de Période -->
        <div class="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0E2137] border border-[#1E3752] self-start sm:self-auto">
          <button onclick="setAnalyticsRange('today')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${adminAnalyticsRange === 'today' ? 'bg-[#EF4248] text-white shadow-sm' : 'text-zinc-400 hover:text-white'}">Aujourd'hui</button>
          <button onclick="setAnalyticsRange('7d')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${adminAnalyticsRange === '7d' ? 'bg-[#EF4248] text-white shadow-sm' : 'text-zinc-400 hover:text-white'}">7 jours</button>
          <button onclick="setAnalyticsRange('30d')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${adminAnalyticsRange === '30d' ? 'bg-[#EF4248] text-white shadow-sm' : 'text-zinc-400 hover:text-white'}">30 jours</button>
          <button onclick="setAnalyticsRange('year')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${adminAnalyticsRange === 'year' ? 'bg-[#EF4248] text-white shadow-sm' : 'text-zinc-400 hover:text-white'}">Année</button>
        </div>
      </div>

      <!-- Graphique Vectoriel Haute Résolution -->
      <div class="p-6 sm:p-8 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span class="text-xs font-semibold text-zinc-400">Courbe de Fréquentation Globale</span>
            <div class="font-heading text-3xl font-extrabold text-white mt-0.5">${data.visitors} <span class="text-sm font-normal text-zinc-400">visiteurs uniques</span></div>
          </div>
          <div class="flex items-center gap-6 text-xs">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#EF4248]"></span>
              <span class="text-zinc-300 font-semibold">${data.views} Pages Vues</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
              <span class="text-zinc-300 font-semibold">${data.bounce} Rebond</span>
            </div>
          </div>
        </div>

        <!-- Rendu Graphique SVG Fluide -->
        <div class="w-full h-56 relative overflow-hidden rounded-2xl bg-[#0A1A2F] border border-[#1E3752]/60 p-4">
          <svg viewBox="0 0 800 220" class="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#EF4248" stop-opacity="0.45" />
                <stop offset="100%" stop-color="#EF4248" stop-opacity="0.0" />
              </linearGradient>
            </defs>
            <!-- Lignes de repère -->
            <line x1="0" y1="40" x2="800" y2="40" stroke="#1E3752" stroke-dasharray="4 4" stroke-width="1" />
            <line x1="0" y1="110" x2="800" y2="110" stroke="#1E3752" stroke-dasharray="4 4" stroke-width="1" />
            <line x1="0" y1="180" x2="800" y2="180" stroke="#1E3752" stroke-dasharray="4 4" stroke-width="1" />

            <!-- Aire dégradée -->
            <polygon points="${areaPoints}" fill="url(#curveGradient)" />
            <!-- Courbe principale -->
            <polyline points="${points}" fill="none" stroke="#EF4248" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <!-- Métriques d'Attention & Sources de Trafic (Grille 2 Cols) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Sources de Trafic -->
        <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-5">
          <h3 class="font-heading font-extrabold text-base text-white">Répartition des Sources d'Acquisition</h3>
          <p class="text-xs text-zinc-400">Origine des sessions analysées selon les référents et moteurs de recherche</p>
          
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-white flex items-center gap-2">🔍 Google Search (Organique SEO)</span>
                <span class="text-[#EF4248] font-bold">48% (21 696 visites)</span>
              </div>
              <div class="w-full h-2 rounded-full bg-[#0A1A2F] overflow-hidden">
                <div class="h-full rounded-full bg-[#EF4248]" style="width: 48%;"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-white flex items-center gap-2">📱 Réseaux Sociaux (𝕏, LinkedIn, Threads)</span>
                <span class="text-purple-400 font-bold">24% (10 848 visites)</span>
              </div>
              <div class="w-full h-2 rounded-full bg-[#0A1A2F] overflow-hidden">
                <div class="h-full rounded-full bg-purple-500" style="width: 24%;"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-white flex items-center gap-2">⚡ Trafic Direct (Accès URL & Favoris)</span>
                <span class="text-blue-400 font-bold">18% (8 136 visites)</span>
              </div>
              <div class="w-full h-2 rounded-full bg-[#0A1A2F] overflow-hidden">
                <div class="h-full rounded-full bg-blue-500" style="width: 18%;"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-white flex items-center gap-2">🔗 Sites Référents & Partenaires</span>
                <span class="text-emerald-400 font-bold">10% (4 520 visites)</span>
              </div>
              <div class="w-full h-2 rounded-full bg-[#0A1A2F] overflow-hidden">
                <div class="h-full rounded-full bg-emerald-500" style="width: 10%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Métriques d'Attention & Engagement -->
        <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-5">
          <h3 class="font-heading font-extrabold text-base text-white">Qualité de Lecture & Rétention</h3>
          <p class="text-xs text-zinc-400">Temps passé et fidélité de la communauté de lecteurs</p>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl bg-[#0A1A2F] border border-[#1E3752]">
              <span class="text-[11px] text-zinc-400 block mb-1">Temps Moyen de Lecture</span>
              <div class="font-heading text-xl font-bold text-white">${data.readTime}</div>
              <span class="text-[10px] text-emerald-400 font-bold">↑ +28s vs moyenne média</span>
            </div>
            <div class="p-4 rounded-2xl bg-[#0A1A2F] border border-[#1E3752]">
              <span class="text-[11px] text-zinc-400 block mb-1">Taux de Clic (CTR)</span>
              <div class="font-heading text-xl font-bold text-white">${data.ctr}</div>
              <span class="text-[10px] text-emerald-400 font-bold">↑ +0.5% d'efficacité</span>
            </div>
            <div class="p-4 rounded-2xl bg-[#0A1A2F] border border-[#1E3752]">
              <span class="text-[11px] text-zinc-400 block mb-1">Lecteurs Fidèles (Retour)</span>
              <div class="font-heading text-xl font-bold text-white">54.2%</div>
              <span class="text-[10px] text-emerald-400 font-bold">Excellente récurrence</span>
            </div>
            <div class="p-4 rounded-2xl bg-[#0A1A2F] border border-[#1E3752]">
              <span class="text-[11px] text-zinc-400 block mb-1">Pages par Session</span>
              <div class="font-heading text-xl font-bold text-white">3.6</div>
              <span class="text-[10px] text-emerald-400 font-bold">Navigation fluide</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;
}

function renderTabArticles() {
  const publishedCount = ARTICLES.filter(a => !a.status || a.status === 'published').length;
  const draftCount = ARTICLES.filter(a => a.status === 'draft').length;
  const trashCount = TRASH_ARTICLES.length;
  const currentList = getFilteredArticles();

  return `
    <div class="space-y-6">
      
      <!-- En-tête Articles -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">CATALOGUE ÉDITORIAL</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">Gestion Complète des Articles</h1>
          <p class="text-xs text-zinc-400">Édition, modération des statuts, duplication et suppression d'articles</p>
        </div>
        <button onclick="startNewArticle()" class="px-5 py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs shadow-md shadow-red-500/20 transition-all self-start sm:self-auto">
          + Nouvel Article (Gutenberg)
        </button>
      </div>

      <!-- Filtres et Recherche -->
      <div class="p-4 rounded-2xl bg-[#0E2137] border border-[#1E3752] flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- Onglets de statut -->
        <div class="flex flex-wrap items-center gap-2 text-xs font-bold w-full md:w-auto">
          <button onclick="filterAdminArticles('all')" class="px-3 py-1.5 rounded-xl transition-all ${adminArticleFilter === 'all' ? 'bg-[#EF4248] text-white shadow-xs' : 'text-zinc-400 hover:text-white hover:bg-white/5'}">
            Tous (${ARTICLES.length})
          </button>
          <button onclick="filterAdminArticles('published')" class="px-3 py-1.5 rounded-xl transition-all ${adminArticleFilter === 'published' ? 'bg-[#EF4248] text-white shadow-xs' : 'text-zinc-400 hover:text-white hover:bg-white/5'}">
            Publiés (${publishedCount})
          </button>
          <button onclick="filterAdminArticles('draft')" class="px-3 py-1.5 rounded-xl transition-all ${adminArticleFilter === 'draft' ? 'bg-[#EF4248] text-white shadow-xs' : 'text-zinc-400 hover:text-white hover:bg-white/5'}">
            Brouillons (${draftCount})
          </button>
          <button onclick="filterAdminArticles('trash')" class="px-3 py-1.5 rounded-xl transition-all ${adminArticleFilter === 'trash' ? 'bg-[#EF4248] text-white shadow-xs' : 'text-zinc-400 hover:text-white hover:bg-white/5'}">
            Corbeille (${trashCount})
          </button>
        </div>

        <!-- Barre de recherche & Filtre Catégorie -->
        <div class="flex items-center gap-3 w-full md:w-auto">
          <input type="text" oninput="handleArticleSearch(this.value)" value="${adminArticleSearch}" placeholder="Rechercher par titre, auteur..." class="px-3 py-2 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#EF4248] w-full md:w-56">
          <select onchange="setArticleCategoryFilter(this.value)" class="px-3 py-2 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white focus:outline-none focus:border-[#EF4248]">
            <option value="all">Toutes Rubriques</option>
            ${CATEGORIES.map(c => `<option value="${c.slug}" ${adminArticleCategory === c.slug ? 'selected' : ''}>${c.name}</option>`).join('')}
          </select>
        </div>

      </div>

      <!-- Actions Groupées (Bulk Actions) -->
      ${adminSelectedArticles.length > 0 ? `
        <div class="p-3 rounded-xl bg-[#EF4248]/10 border border-[#EF4248]/30 flex items-center justify-between text-xs">
          <span class="font-bold text-white">${adminSelectedArticles.length} article(s) sélectionné(s)</span>
          <div class="flex items-center gap-2">
            <button onclick="applyBulkArticleAction('publish')" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700">Publier</button>
            <button onclick="applyBulkArticleAction('draft')" class="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700">Brouillon</button>
            <button onclick="applyBulkArticleAction('trash')" class="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700">Corbeille</button>
          </div>
        </div>
      ` : ''}

      <!-- Tableau Riche WordPress -->
      <div class="rounded-3xl border border-[#1E3752] bg-[#0E2137] overflow-hidden shadow-xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="uppercase font-bold tracking-wider border-b border-[#1E3752] bg-[#0A1A2F] text-zinc-400">
              <tr>
                <th class="p-4 w-10 text-center">
                  <input type="checkbox" onchange="toggleSelectAllArticles()" ${adminSelectedArticles.length === currentList.length && currentList.length > 0 ? 'checked' : ''} class="rounded">
                </th>
                <th class="p-4 w-16">Visuel</th>
                <th class="p-4">Titre & Extrait</th>
                <th class="p-4">Auteur</th>
                <th class="p-4">Catégorie</th>
                <th class="p-4">Statut</th>
                <th class="p-4">Date</th>
                <th class="p-4">Vues</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#1E3752]/70">
              ${currentList.length === 0 ? `
                <tr>
                  <td colspan="9" class="p-8 text-center text-zinc-400">
                    Aucun article ne correspond à votre filtre.
                  </td>
                </tr>
              ` : currentList.map(art => `
                <tr class="hover:bg-white/5 transition-colors group">
                  <td class="p-4 text-center">
                    <input type="checkbox" onchange="toggleSelectArticle('${art.id}')" ${adminSelectedArticles.includes(art.id) ? 'checked' : ''} class="rounded">
                  </td>
                  <td class="p-4">
                    <img src="${art.coverImage}" onerror="onImgError(this)" class="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform">
                  </td>
                  <td class="p-4 max-w-xs sm:max-w-md">
                    <div class="font-bold text-white text-xs truncate cursor-pointer hover:text-[#EF4248]" onclick="editArticle('${art.id}')">${art.title}</div>
                    <p class="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">${art.excerpt}</p>
                  </td>
                  <td class="p-4 text-zinc-300 font-semibold">${art.authorSlug || 'Steve Jones'}</td>
                  <td class="p-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EF4248]/10 text-[#EF4248] uppercase">
                      ${art.categorySlug}
                    </span>
                  </td>
                  <td class="p-4">
                    ${art.status === 'published' || !art.status ? `
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Publié
                      </span>
                    ` : art.status === 'draft' ? `
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Brouillon
                      </span>
                    ` : `
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400">
                        Corbeille
                      </span>
                    `}
                  </td>
                  <td class="p-4 text-zinc-400">${art.publishedAt || '12 Oct 2026'}</td>
                  <td class="p-4 font-bold text-white">${(art.views || 14200).toLocaleString()}</td>
                  <td class="p-4 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                      <button onclick="editArticle('${art.id}')" title="Modifier dans Gutenberg" class="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-xs">✏️</button>
                      <button onclick="duplicateArticle('${art.id}')" title="Dupliquer" class="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-xs">📋</button>
                      <button onclick="previewArticle('${art.id}')" title="Prévisualiser" class="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-xs">👁️</button>
                      <button onclick="trashArticle('${art.id}')" title="Mettre à la corbeille" class="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all text-xs">🗑️</button>
                    </div>
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

function renderTabPages() {
  const pages = [
    { title: 'Page d\'Accueil', slug: '/', status: 'Publié', date: '14 Oct 2026' },
    { title: 'Catalogue Blog & Dossiers', slug: '/blog', status: 'Publié', date: '12 Oct 2026' },
    { title: 'Manifeste Éditorial (À Propos)', slug: '/about', status: 'Publié', date: '10 Oct 2026' },
    { title: 'Contacter la Rédaction', slug: '/contact', status: 'Publié', date: '08 Oct 2026' },
    { title: 'Mentions Légales & RGPD', slug: '/legal', status: 'Brouillon', date: '05 Oct 2026' },
  ];

  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-6 border-b border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">STRUCTURE DU SITE</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">Pages Institutionnelles</h1>
          <p class="text-xs text-zinc-400">Gestion des pages statiques et institutionnelles de la plateforme</p>
        </div>
      </div>

      <div class="rounded-3xl border border-[#1E3752] bg-[#0E2137] overflow-hidden">
        <table class="w-full text-left text-xs">
          <thead class="bg-[#0A1A2F] text-zinc-400 uppercase font-bold border-b border-[#1E3752]">
            <tr>
              <th class="p-4">Titre de la Page</th>
              <th class="p-4">URL Slug</th>
              <th class="p-4">Statut</th>
              <th class="p-4">Dernière Révision</th>
              <th class="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#1E3752]">
            ${pages.map(p => `
              <tr class="hover:bg-white/5 transition-colors">
                <td class="p-4 font-bold text-white">${p.title}</td>
                <td class="p-4 text-[#EF4248] font-mono">${p.slug}</td>
                <td class="p-4">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${p.status === 'Publié' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}">
                    ${p.status}
                  </span>
                </td>
                <td class="p-4 text-zinc-400">${p.date}</td>
                <td class="p-4 text-right">
                  <button onclick="navigate('home')" class="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white">Voir ↗</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTabMedia() {
  const filtered = ADMIN_MEDIA.filter(m => {
    if (adminMediaFilter !== 'all' && m.type !== adminMediaFilter) return false;
    if (adminMediaSearch.trim()) {
      return m.title.toLowerCase().includes(adminMediaSearch.toLowerCase().trim());
    }
    return true;
  });

  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">ASSETS NUMÉRIQUES</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">Médiathèque Professionnelle</h1>
          <p class="text-xs text-zinc-400">Bibliothèque d'images haute définition, bannières et ressources visuelles</p>
        </div>
        <button onclick="uploadMediaPrompt()" class="px-5 py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs shadow-md transition-all">
          + Téléverser un Média
        </button>
      </div>

      <div class="p-4 rounded-2xl bg-[#0E2137] border border-[#1E3752] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-xs font-bold">
          <button onclick="filterMediaType('all')" class="px-3 py-1.5 rounded-xl ${adminMediaFilter === 'all' ? 'bg-[#EF4248] text-white' : 'text-zinc-400 hover:text-white'}">Tous (${ADMIN_MEDIA.length})</button>
          <button onclick="filterMediaType('image')" class="px-3 py-1.5 rounded-xl ${adminMediaFilter === 'image' ? 'bg-[#EF4248] text-white' : 'text-zinc-400 hover:text-white'}">Images</button>
        </div>
        <input type="text" oninput="handleMediaSearch(this.value)" value="${adminMediaSearch}" placeholder="Rechercher par nom de fichier..." class="px-3 py-2 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white focus:outline-none focus:border-[#EF4248] w-full sm:w-64">
      </div>

      <!-- Grille des Médias -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        ${filtered.map(m => `
          <div class="rounded-2xl bg-[#0E2137] border border-[#1E3752] overflow-hidden group hover:border-[#EF4248]/50 transition-all flex flex-col">
            <div class="aspect-video relative overflow-hidden bg-black/40">
              <img src="${m.url}" onerror="onImgError(this)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              <span class="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[9px] font-bold uppercase">
                ${m.format}
              </span>
            </div>
            <div class="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="font-bold text-xs text-white truncate mb-1">${m.title}</h4>
                <div class="flex items-center justify-between text-[10px] text-zinc-400">
                  <span>${m.dimensions}</span>
                  <span>${m.size}</span>
                </div>
              </div>
              <div class="flex items-center justify-between pt-3 mt-3 border-t border-[#1E3752]">
                <button onclick="copyMediaUrl('${m.url}')" class="text-[11px] text-[#EF4248] hover:underline font-bold">
                  Copier l'URL
                </button>
                <button onclick="deleteMediaItem('${m.id}')" class="text-xs text-zinc-500 hover:text-red-400">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTabCategories() {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-6 border-b border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">TAXONOMIE ÉDITORIALE</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">Catégories & Rubriques Pastels</h1>
          <p class="text-xs text-zinc-400">Gestion des 6 rubriques pastel officielles du thème Ontario</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Liste des Catégories (8 Cols) -->
        <div class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${CATEGORIES.map(c => `
            <div class="p-5 rounded-2xl border flex items-center justify-between gap-4" style="background-color: ${c.bgDark || '#0E2137'}; border-color: #1E3752;">
              <div>
                <span class="text-[10px] uppercase font-bold tracking-widest text-[#EF4248]">Rubrique Ontario</span>
                <h3 class="font-heading font-extrabold text-lg text-white mt-0.5">${c.name}</h3>
                <span class="text-xs text-zinc-400 font-mono">/${c.slug}</span>
              </div>
              <div class="text-right">
                <span class="px-3 py-1 rounded-full text-xs font-extrabold bg-white/10 text-white">
                  ${c.count || 24} articles
                </span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Formulaire Nouvelle Catégorie (4 Cols) -->
        <div class="lg:col-span-4 p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-4">
          <h3 class="font-heading font-bold text-sm text-white">Ajouter une Rubrique</h3>
          <form onsubmit="handleCreateCategory(event)" class="space-y-3">
            <div>
              <label class="block text-xs text-zinc-400 mb-1">Nom de la Catégorie</label>
              <input type="text" id="new-cat-name" required placeholder="Ex : Cyber-Sécurité" class="w-full px-3 py-2 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white">
            </div>
            <div>
              <label class="block text-xs text-zinc-400 mb-1">Slug URL (optionnel)</label>
              <input type="text" id="new-cat-slug" placeholder="cyber-securite" class="w-full px-3 py-2 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white">
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10px] text-zinc-400 mb-1">Couleur Pastel Fond</label>
                <input type="color" id="new-cat-bg" value="#F0ECFA" class="w-full h-8 rounded-lg bg-transparent cursor-pointer">
              </div>
              <div>
                <label class="block text-[10px] text-zinc-400 mb-1">Couleur Texte</label>
                <input type="color" id="new-cat-text" value="#5844A8" class="w-full h-8 rounded-lg bg-transparent cursor-pointer">
              </div>
            </div>
            <button type="submit" class="w-full py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs shadow-md mt-2">
              Créer la Catégorie
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function renderTabTags() {
  const tags = ['IA', 'Machine Learning', 'Marchés', 'Finance', 'Design', 'Crypto', 'Productivité', 'Hardware', 'Spatial Computing', 'Web3', 'Stratégie', 'Innovation'];
  return `
    <div class="space-y-6">
      <div class="pb-6 border-b border-[#1E3752]">
        <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">MOTS-CLÉS ÉDITORIAUX</span>
        <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">Tags & Mots-Clés</h1>
      </div>
      <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752]">
        <div class="flex flex-wrap gap-3">
          ${tags.map(t => `
            <span class="px-4 py-2 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs font-semibold text-zinc-300 hover:border-[#EF4248] hover:text-[#EF4248] transition-all cursor-pointer">
              #${t} <b class="text-zinc-500 font-normal ml-1">(${Math.floor(Math.random() * 12 + 3)})</b>
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderTabComments() {
  const filtered = ADMIN_COMMENTS.filter(c => {
    if (adminCommentFilter !== 'all' && c.status !== adminCommentFilter) return false;
    return true;
  });

  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-6 border-b border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">ÉCHANGES LECTEURS</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">Modération des Commentaires</h1>
          <p class="text-xs text-zinc-400">Approbation, réponse et lutte contre le spam</p>
        </div>
      </div>

      <div class="flex gap-2 p-1.5 rounded-2xl bg-[#0E2137] border border-[#1E3752] w-fit text-xs font-bold">
        <button onclick="filterComments('all')" class="px-3 py-1.5 rounded-xl ${adminCommentFilter === 'all' ? 'bg-[#EF4248] text-white' : 'text-zinc-400 hover:text-white'}">Tous (${ADMIN_COMMENTS.length})</button>
        <button onclick="filterComments('pending')" class="px-3 py-1.5 rounded-xl ${adminCommentFilter === 'pending' ? 'bg-[#EF4248] text-white' : 'text-zinc-400 hover:text-white'}">En attente (${ADMIN_COMMENTS.filter(c=>c.status==='pending').length})</button>
        <button onclick="filterComments('approved')" class="px-3 py-1.5 rounded-xl ${adminCommentFilter === 'approved' ? 'bg-[#EF4248] text-white' : 'text-zinc-400 hover:text-white'}">Approuvés (${ADMIN_COMMENTS.filter(c=>c.status==='approved').length})</button>
        <button onclick="filterComments('spam')" class="px-3 py-1.5 rounded-xl ${adminCommentFilter === 'spam' ? 'bg-[#EF4248] text-white' : 'text-zinc-400 hover:text-white'}">Spam (${ADMIN_COMMENTS.filter(c=>c.status==='spam').length})</button>
      </div>

      <div class="space-y-4">
        ${filtered.map(c => `
          <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] flex flex-col sm:flex-row items-start justify-between gap-6">
            <div class="space-y-2 flex-1">
              <div class="flex items-center gap-3">
                <span class="font-bold text-white text-sm">${c.author}</span>
                <span class="text-xs text-zinc-400">${c.email}</span>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold ${c.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : c.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}">
                  ${c.status.toUpperCase()}
                </span>
              </div>
              <p class="text-xs text-zinc-300 leading-relaxed">${c.text}</p>
              <div class="text-[10px] text-zinc-400">
                Sur l'article : <b class="text-white">${c.articleTitle}</b> • ${c.date}
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              ${c.status !== 'approved' ? `
                <button onclick="approveComment('${c.id}')" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">Approuver</button>
              ` : ''}
              <button onclick="markCommentSpam('${c.id}')" class="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold">Spam</button>
              <button onclick="deleteComment('${c.id}')" class="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs">🗑️</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTabUsers() {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-6 border-b border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">ÉQUIPE & DROITS</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">Utilisateurs & Rôles</h1>
          <p class="text-xs text-zinc-400">Gestion des permissions éditoriales (Administrateur, Éditeur, Auteur, Lecteur)</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Table Utilisateurs (8 Cols) -->
        <div class="lg:col-span-8 rounded-3xl border border-[#1E3752] bg-[#0E2137] overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-[#0A1A2F] text-zinc-400 uppercase font-bold border-b border-[#1E3752]">
              <tr>
                <th class="p-4">Utilisateur</th>
                <th class="p-4">Rôle</th>
                <th class="p-4">Articles</th>
                <th class="p-4">Activité</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#1E3752]">
              ${ADMIN_USERS.map(u => `
                <tr class="hover:bg-white/5 transition-colors">
                  <td class="p-4 flex items-center gap-3">
                    <img src="${u.avatar}" onerror="onImgError(this)" class="w-9 h-9 rounded-full object-cover">
                    <div>
                      <div class="font-bold text-white">${u.name}</div>
                      <div class="text-[10px] text-zinc-400">${u.email}</div>
                    </div>
                  </td>
                  <td class="p-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${u.role === 'Administrateur' ? 'bg-[#EF4248]/20 text-[#EF4248]' : 'bg-white/10 text-zinc-300'}">
                      ${u.role}
                    </span>
                  </td>
                  <td class="p-4 font-bold text-white">${u.articlesCount}</td>
                  <td class="p-4 text-emerald-400">${u.lastActive}</td>
                  <td class="p-4 text-right">
                    <button onclick="deleteUser('${u.id}')" class="text-xs text-zinc-400 hover:text-red-400 p-1">🗑️</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Formulaire Nouvel Utilisateur (4 Cols) -->
        <div class="lg:col-span-4 p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-4">
          <h3 class="font-heading font-bold text-sm text-white">Ajouter un Utilisateur</h3>
          <form onsubmit="handleAddUser(event)" class="space-y-3 text-xs">
            <div>
              <label class="block text-zinc-400 mb-1">Nom Complet</label>
              <input type="text" id="user-new-name" required placeholder="Ex : Claire Voisin" class="w-full px-3 py-2 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-white">
            </div>
            <div>
              <label class="block text-zinc-400 mb-1">Adresse Email</label>
              <input type="email" id="user-new-email" required placeholder="claire@ontario.com" class="w-full px-3 py-2 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-white">
            </div>
            <div>
              <label class="block text-zinc-400 mb-1">Rôle Attribué</label>
              <select id="user-new-role" class="w-full px-3 py-2 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-white">
                <option value="Éditeur">Éditeur (Rédaction & Publication)</option>
                <option value="Auteur">Auteur (Brouillons uniquement)</option>
                <option value="Lecteur">Lecteur Abonné</option>
                <option value="Administrateur">Administrateur Complet</option>
              </select>
            </div>
            <button type="submit" class="w-full py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold shadow-md mt-2">
              Créer le Compte
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function renderTabNewsletter() {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">DIFFUSION DIRECTE</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">Gestion de la Newsletter</h1>
          <p class="text-xs text-zinc-400">Collecte RGPD, gestion des abonnés et export de la base de contacts</p>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="exportSubscribersCSV()" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-2">
            <span>📥</span>
            <span>Exporter en CSV</span>
          </button>
        </div>
      </div>

      <!-- Métriques Newsletter -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752]">
          <span class="text-xs text-zinc-400 block mb-1">Abonnés Actifs Totaux</span>
          <div class="font-heading text-3xl font-extrabold text-white">3 840</div>
          <span class="text-xs text-emerald-400 font-bold mt-2 block">Double Opt-In Certifié</span>
        </div>
        <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752]">
          <span class="text-xs text-zinc-400 block mb-1">Taux d'Ouverture Moyen</span>
          <div class="font-heading text-3xl font-extrabold text-white">42.8%</div>
          <span class="text-xs text-emerald-400 font-bold mt-2 block">Supérieur au standard (22%)</span>
        </div>
        <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752]">
          <span class="text-xs text-zinc-400 block mb-1">Taux de Clic Moyen</span>
          <div class="font-heading text-3xl font-extrabold text-white">8.4%</div>
          <span class="text-xs text-emerald-400 font-bold mt-2 block">Fort engagement éditorial</span>
        </div>
      </div>

      <!-- Table Abonnés -->
      <div class="rounded-3xl border border-[#1E3752] bg-[#0E2137] overflow-hidden">
        <div class="p-4 border-b border-[#1E3752] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="font-bold text-white text-xs">Liste des Abonnés Référencés (${ADMIN_SUBSCRIBERS.length})</span>
          <form onsubmit="handleAddSubscriber(event)" class="flex items-center gap-2 w-full sm:w-auto">
            <input type="email" id="new-sub-email" required placeholder="ajouter.email@domaine.com" class="px-3 py-1.5 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white">
            <button type="submit" class="px-3 py-1.5 rounded-xl bg-[#EF4248] text-white font-bold text-xs">+ Ajouter</button>
          </form>
        </div>
        <table class="w-full text-left text-xs">
          <thead class="bg-[#0A1A2F] text-zinc-400 uppercase font-bold border-b border-[#1E3752]">
            <tr>
              <th class="p-4">Adresse Email</th>
              <th class="p-4">Date d'Inscription</th>
              <th class="p-4">Statut Consentement</th>
              <th class="p-4">Fréquence</th>
              <th class="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#1E3752]">
            ${ADMIN_SUBSCRIBERS.map(s => `
              <tr class="hover:bg-white/5 transition-colors">
                <td class="p-4 font-bold text-white">${s.email}</td>
                <td class="p-4 text-zinc-400">${s.date}</td>
                <td class="p-4 text-emerald-400 font-semibold">${s.status}</td>
                <td class="p-4 text-zinc-300">${s.frequency}</td>
                <td class="p-4 text-right">
                  <button onclick="deleteSubscriber('${s.id}')" class="text-zinc-500 hover:text-red-400">🗑️</button>
                </td>
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
    <div class="space-y-6">
      <div class="pb-6 border-b border-[#1E3752]">
        <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">RÉFÉRENCEMENT NATUREL GOOGLE</span>
        <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">Audit SEO & Indexabilité</h1>
        <p class="text-xs text-zinc-400">Surveillance des robots d'exploration, méta-données et fichiers XML</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Score SEO & Fichiers Techniques (8 Cols) -->
        <div class="lg:col-span-8 space-y-6">
          <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] flex items-center justify-between gap-6">
            <div>
              <span class="text-xs font-semibold text-zinc-400">Score de Santé SEO Global</span>
              <div class="font-heading text-3xl font-extrabold text-white mt-1">94 / 100 <span class="text-sm font-normal text-emerald-400">(Excellent)</span></div>
              <p class="text-xs text-zinc-400 mt-2">Structure sémantique HTML5, balisage Schema.org, Open Graph et sitemap valides.</p>
            </div>
            <div class="w-20 h-20 rounded-full border-4 border-emerald-500 flex items-center justify-center font-heading font-extrabold text-2xl text-emerald-400 flex-shrink-0">
              94%
            </div>
          </div>

          <!-- Prévisualisation Google Search SERP -->
          <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-4">
            <h3 class="font-heading font-bold text-sm text-white">Aperçu Réel dans les Résultats Google (SERP)</h3>
            <div class="p-5 rounded-2xl bg-white text-black max-w-xl font-sans">
              <div class="flex items-center gap-2 text-xs text-zinc-600 mb-1">
                <span class="w-4 h-4 rounded-full bg-[#EF4248] text-[9px] text-white flex items-center justify-center font-bold">O</span>
                <span>https://ontariowp.com</span>
              </div>
              <h4 class="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer">
                ONTARIO — Magazine Éditorial & Prospective Numérique
              </h4>
              <p class="text-xs text-[#4d5156] mt-1 leading-snug">
                Magazine de référence dédié à l'intelligence artificielle, aux ruptures technologiques, au design et aux modèles émergents. Analyses indépendantes et dossiers de fond.
              </p>
            </div>
          </div>

          <!-- Directives Robots & Sitemap -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752] flex items-center justify-between">
              <div>
                <h4 class="font-bold text-xs text-white">Fichier robots.txt</h4>
                <p class="text-[10px] text-emerald-400 font-semibold">Accessible & Configuré</p>
              </div>
              <a href="/robots.txt" target="_blank" class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-bold">Inspecter ↗</a>
            </div>

            <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752] flex items-center justify-between">
              <div>
                <h4 class="font-bold text-xs text-white">Sitemap XML (Index Google)</h4>
                <p class="text-[10px] text-emerald-400 font-semibold">Généré avec Stylesheet XSL</p>
              </div>
              <a href="/sitemap.xml" target="_blank" class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-bold">Consulter ↗</a>
            </div>
          </div>
        </div>

        <!-- Checklist SEO (4 Cols) -->
        <div class="lg:col-span-4 p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-4">
          <h3 class="font-heading font-bold text-sm text-white">Checklist Technique Google</h3>
          <div class="space-y-3 text-xs">
            <div class="flex items-center gap-2 text-emerald-400">
              <span>✓</span>
              <span>Balise H1 unique par article</span>
            </div>
            <div class="flex items-center gap-2 text-emerald-400">
              <span>✓</span>
              <span>Images avec balises ALT & fallbacks</span>
            </div>
            <div class="flex items-center gap-2 text-emerald-400">
              <span>✓</span>
              <span>Balises Open Graph & Twitter Cards</span>
            </div>
            <div class="flex items-center gap-2 text-emerald-400">
              <span>✓</span>
              <span>Flux RSS 2.0 valide (/feed.xml)</span>
            </div>
            <div class="flex items-center gap-2 text-emerald-400">
              <span>✓</span>
              <span>Blocage /admin/ dans robots.txt</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

function renderTabAdSense() {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">MONÉTISATION MÉDIA</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">Gestion des Publicités & Google AdSense</h1>
          <p class="text-xs text-zinc-400">Contrôle des 9 emplacements publicitaires et suivi des revenus estimés</p>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="toggleAdSenseGlobal()" class="px-5 py-2.5 rounded-xl ${ADMIN_ADSENSE.enabled ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-zinc-700 hover:bg-zinc-600'} text-white font-bold text-xs shadow-md transition-all">
            ${ADMIN_ADSENSE.enabled ? '✓ Publicités Actives sur le Site' : '✕ Publicités Désactivées'}
          </button>
        </div>
      </div>

      <!-- KPIs Financiers AdSense -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752]">
          <span class="text-xs text-zinc-400 block mb-1">Revenus Estimés (Aujourd'hui)</span>
          <div class="font-heading text-2xl font-bold text-white">${ADMIN_ADSENSE.estimatedToday}</div>
        </div>
        <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752]">
          <span class="text-xs text-zinc-400 block mb-1">Revenus Ce Mois</span>
          <div class="font-heading text-2xl font-bold text-emerald-400">${ADMIN_ADSENSE.estimatedMonth}</div>
        </div>
        <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752]">
          <span class="text-xs text-zinc-400 block mb-1">RPM Page Moyen</span>
          <div class="font-heading text-2xl font-bold text-white">${ADMIN_ADSENSE.rpm}</div>
        </div>
        <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752]">
          <span class="text-xs text-zinc-400 block mb-1">Impressions Totales</span>
          <div class="font-heading text-2xl font-bold text-white">${ADMIN_ADSENSE.impressions}</div>
        </div>
        <div class="p-5 rounded-2xl bg-[#0E2137] border border-[#1E3752]">
          <span class="text-xs text-zinc-400 block mb-1">Clics Comptabilisés</span>
          <div class="font-heading text-2xl font-bold text-white">${ADMIN_ADSENSE.clicks}</div>
        </div>
      </div>

      <!-- Paramètres Publisher ID -->
      <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 class="font-heading font-bold text-sm text-white">Identifiant Éditeur Google AdSense</h3>
          <p class="text-xs text-zinc-400">Ce code est automatiquement injecté dans les bannières publicitaires</p>
        </div>
        <input type="text" onchange="updateAdSensePublisher(this.value)" value="${ADMIN_ADSENSE.publisherId}" class="px-4 py-2 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white font-mono w-full sm:w-80">
      </div>

      <!-- Grille des 9 Emplacements Configurables -->
      <h3 class="font-heading font-bold text-base text-white pt-2">Configuration par Zone d'Affichage</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${Object.entries(ADMIN_ADSENSE.slots).map(([key, s]) => `
          <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] uppercase font-bold text-[#EF4248]">${key.replace(/_/g, ' ')}</span>
                <button onclick="toggleAdSenseSlot('${key}')" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${s.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-700 text-zinc-400'}">
                  ${s.enabled ? '✓ Activé' : '✕ Désactivé'}
                </button>
              </div>
              <h4 class="font-bold text-sm text-white">${s.name}</h4>
              <p class="text-xs text-zinc-400 mt-1">Format configuré : <b class="text-zinc-300">${s.format}</b></p>
            </div>

            <!-- Aperçu réaliste du bloc -->
            <div class="p-4 rounded-xl border border-dashed border-[#1E3752] bg-[#0A1A2F] text-center text-[10px] text-zinc-500 flex flex-col items-center justify-center h-20">
              <span class="text-xs font-bold text-zinc-400">Google AdSense</span>
              <span>${s.format}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTabCustomization() {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-6 border-b border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">CONSTRUCTEUR VISUEL SANS CODE</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">Personnalisation du Site Public</h1>
          <p class="text-xs text-zinc-400">Modifiez le Header, le Hero, les Sections et le Footer sans toucher au code</p>
        </div>
      </div>

      <form onsubmit="saveCustomizationSubmit(event)" class="space-y-6 max-w-4xl">
        <!-- 1. HERO -->
        <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-4">
          <h3 class="font-heading font-bold text-base text-white">1. Hero Section (Grand Titre & Image)</h3>
          <div>
            <label class="block text-xs text-zinc-400 mb-1">Grand Titre Principal du Hero</label>
            <input type="text" id="cust-hero-title" value="${ARTICLES[0]?.title || ''}" class="w-full px-4 py-2.5 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-sm text-white font-bold">
          </div>
          <div>
            <label class="block text-xs text-zinc-400 mb-1">Extrait d'Accroche</label>
            <textarea id="cust-hero-desc" rows="2" class="w-full px-4 py-2 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white">${ARTICLES[0]?.excerpt || ''}</textarea>
          </div>
          <div>
            <label class="block text-xs text-zinc-400 mb-1">Image Grand Angle (URL)</label>
            <input type="text" id="cust-hero-img" value="${ARTICLES[0]?.coverImage || ''}" class="w-full px-4 py-2.5 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white">
          </div>
        </div>

        <button type="submit" class="w-full py-3.5 rounded-2xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-sm shadow-xl shadow-red-500/25 transition-all">
          ✓ Enregistrer et Appliquer Immédiatement sur la Page d'Accueil
        </button>
      </form>
    </div>
  `;
}

function renderTabSettings() {
  return `
    <div class="space-y-6">
      <div class="pb-6 border-b border-[#1E3752]">
        <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">PARAMÈTRES & PROFIL</span>
        <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">Paramètres du Site & Profil Super-Admin</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
        <!-- Paramètres Généraux -->
        <div class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-4">
          <h3 class="font-heading font-bold text-base text-white">Paramètres Généraux du Média</h3>
          <div>
            <label class="block text-xs text-zinc-400 mb-1">Nom du Média</label>
            <input type="text" value="ONTARIO Magazine" class="w-full px-4 py-2.5 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white">
          </div>
          <div>
            <label class="block text-xs text-zinc-400 mb-1">Langue Principale</label>
            <input type="text" value="Français (fr-FR)" disabled class="w-full px-4 py-2.5 rounded-xl bg-[#0A1A2F]/50 border border-[#1E3752] text-xs text-zinc-400">
          </div>
          <div>
            <label class="block text-xs text-zinc-400 mb-1">Fuseau Horaire</label>
            <input type="text" value="Europe/Paris (UTC+1)" disabled class="w-full px-4 py-2.5 rounded-xl bg-[#0A1A2F]/50 border border-[#1E3752] text-xs text-zinc-400">
          </div>
        </div>

        <!-- Profil Administrateur -->
        <form onsubmit="saveAdminProfileSubmit(event)" class="p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-4">
          <h3 class="font-heading font-bold text-base text-white">Mon Profil Super-Administrateur</h3>
          <div>
            <label class="block text-xs text-zinc-400 mb-1">Nom d'Affichage</label>
            <input type="text" id="profile-name" value="${currentUser?.name || 'Steve Jones'}" class="w-full px-4 py-2.5 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white">
          </div>
          <div>
            <label class="block text-xs text-zinc-400 mb-1">Adresse Email</label>
            <input type="email" id="profile-email" value="${currentUser?.email || 'admin@ontario.com'}" class="w-full px-4 py-2.5 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white">
          </div>
          <div>
            <label class="block text-xs text-zinc-400 mb-1">Avatar (URL)</label>
            <input type="text" id="profile-avatar" value="${currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'}" class="w-full px-4 py-2.5 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white">
          </div>
          <button type="submit" class="w-full py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs shadow-md mt-2">
            Mettre à Jour Mon Profil
          </button>
        </form>
      </div>
    </div>
  `;
}

function renderPreviewArticleModal() {
  if (!previewArticleModalId) return '';
  const art = ARTICLES.find(a => a.id === previewArticleModalId);
  if (!art) return '';

  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onclick="closeArticlePreview()">
      <div class="relative w-full max-w-4xl max-h-[90vh] bg-[#0E2137] border border-[#1E3752] rounded-3xl overflow-y-auto p-6 sm:p-10 shadow-2xl" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between pb-4 border-b border-[#1E3752] mb-6">
          <span class="text-xs font-bold uppercase tracking-wider text-[#EF4248]">PRÉVISUALISATION DIRECTE</span>
          <button onclick="closeArticlePreview()" class="text-zinc-400 hover:text-white font-bold text-lg">✕</button>
        </div>
        <img src="${art.coverImage}" onerror="onImgError(this)" class="w-full h-72 object-cover rounded-2xl mb-6">
        <h1 class="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-4">${art.title}</h1>
        <p class="text-base text-zinc-300 leading-relaxed mb-6">${art.excerpt}</p>
        <div class="prose-editorial text-sm text-zinc-300 space-y-4">
          ${(art.contentBlocks || []).map(b => `
            ${b.type === 'paragraph' ? `<p>${b.text}</p>` : ''}
            ${b.type === 'heading' ? `<h2 class="font-bold text-xl text-white mt-4">${b.text}</h2>` : ''}
            ${b.type === 'quote' ? `<blockquote class="border-l-4 border-[#EF4248] pl-4 italic text-zinc-200">${b.text}</blockquote>` : ''}
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderGutenbergEditor(container) {
  const isNew = editingArticleId === 'new';
  const article = isNew ? {
    title: '',
    excerpt: '',
    categorySlug: 'ai',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    status: 'draft'
  } : ARTICLES.find(a => a.id === editingArticleId);

  container.innerHTML = `
    <div class="min-h-screen bg-[#071426] text-white p-6 sm:p-10 font-sans">
      <div class="max-w-7xl mx-auto space-y-6">
        <div class="flex items-center justify-between pb-6 border-b border-[#1E3752]">
          <div class="flex items-center gap-3">
            <button onclick="cancelEditor()" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white">
              ← Retour au Dashboard
            </button>
            <span class="text-xs text-zinc-400 font-bold">
              ${isNew ? 'Création d’un Nouvel Article Gutenberg' : 'Modification de l’Article'}
            </span>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="saveArticleDraft()" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white">
              Enregistrer Brouillon
            </button>
            <button onclick="publishArticleEditor()" class="px-5 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md">
              Publier sur le Site
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Zone Rédaction Gutenberg (8 Cols) -->
          <div class="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-4">
            <input type="text" id="editor-title" placeholder="Titre principal de l'article..." value="${article.title}" class="w-full font-heading text-2xl sm:text-4xl font-extrabold bg-transparent focus:outline-none text-white placeholder-zinc-500">
            <textarea id="editor-excerpt" rows="2" placeholder="Extrait éditorial ou chapeau de l'article..." class="w-full text-xs text-zinc-300 bg-transparent border-b border-[#1E3752] pb-3 focus:outline-none placeholder-zinc-500">${article.excerpt}</textarea>

            <!-- Blocs Éditoriaux -->
            <div class="space-y-3 pt-4">
              ${editorBlocks.map((b, idx) => `
                <div class="p-4 rounded-2xl bg-[#0A1A2F] border border-[#1E3752] relative group">
                  <div class="flex items-center justify-between text-[10px] text-zinc-400 mb-2">
                    <span class="font-bold uppercase tracking-wider text-[#EF4248]">${b.type}</span>
                    <div class="flex items-center gap-2">
                      <button onclick="moveBlock(${idx}, -1)" class="hover:text-white p-1">↑</button>
                      <button onclick="moveBlock(${idx}, 1)" class="hover:text-white p-1">↓</button>
                      <button onclick="deleteBlock(${idx})" class="text-red-400 hover:text-red-300 p-1">🗑️</button>
                    </div>
                  </div>
                  ${b.type === 'paragraph' ? `
                    <textarea onchange="updateBlockText(${idx}, this.value)" rows="3" class="w-full text-xs bg-transparent border border-[#1E3752] p-3 rounded-xl focus:outline-none text-white">${b.text}</textarea>
                  ` : ''}
                  ${b.type === 'heading' ? `
                    <input type="text" onchange="updateBlockText(${idx}, this.value)" value="${b.text}" class="w-full font-bold text-sm bg-transparent border border-[#1E3752] p-2.5 rounded-xl focus:outline-none text-white">
                  ` : ''}
                  ${b.type === 'quote' ? `
                    <textarea onchange="updateBlockText(${idx}, this.value)" rows="2" class="w-full italic text-xs bg-transparent border border-[#1E3752] p-3 rounded-xl focus:outline-none text-zinc-200">${b.text}</textarea>
                  ` : ''}
                  ${b.type === 'affiliate' ? `
                    <div class="space-y-2 text-xs">
                      <input type="text" placeholder="Nom du produit" value="${b.productName || ''}" onchange="updateAffiliateField(${idx}, 'productName', this.value)" class="w-full p-2 bg-[#122B45] border border-[#1E3752] rounded-xl text-white">
                      <input type="text" placeholder="URL Affiliée Amazon" value="${b.affiliateUrl || ''}" onchange="updateAffiliateField(${idx}, 'affiliateUrl', this.value)" class="w-full p-2 bg-[#122B45] border border-[#1E3752] rounded-xl text-white">
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>

            <!-- Insertion de Nouveaux Blocs -->
            <div class="pt-4 border-t border-[#1E3752] flex flex-wrap gap-2">
              <button onclick="addBlock('paragraph')" class="px-3 py-1.5 rounded-xl border border-[#1E3752] text-xs font-semibold hover:bg-white/5">+ Paragraphe</button>
              <button onclick="addBlock('heading')" class="px-3 py-1.5 rounded-xl border border-[#1E3752] text-xs font-semibold hover:bg-white/5">+ Titre H2</button>
              <button onclick="addBlock('quote')" class="px-3 py-1.5 rounded-xl border border-[#1E3752] text-xs font-semibold hover:bg-white/5">+ Citation</button>
              <button onclick="addBlock('image')" class="px-3 py-1.5 rounded-xl border border-[#1E3752] text-xs font-semibold hover:bg-white/5">+ Image</button>
              <button onclick="addBlock('video')" class="px-3 py-1.5 rounded-xl border border-[#1E3752] text-xs font-semibold hover:bg-white/5">+ Vidéo</button>
              <button onclick="addBlock('affiliate')" class="px-3 py-1.5 rounded-xl border border-[#EF4248] text-xs font-bold text-[#EF4248] hover:bg-[#EF4248]/10">+ Produit Affilié</button>
            </div>
          </div>

          <!-- Panneau Latéral Publication (4 Cols) -->
          <div class="lg:col-span-4 p-6 rounded-3xl bg-[#0E2137] border border-[#1E3752] space-y-4">
            <h4 class="font-bold text-sm text-white">Réglages de Publication</h4>
            <div>
              <label class="text-xs text-zinc-400 block mb-1">Catégorie Principale</label>
              <select id="editor-cat" class="w-full p-2.5 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white">
                ${CATEGORIES.map(c => `
                  <option value="${c.slug}" ${c.slug === article.categorySlug ? 'selected' : ''}>${c.name}</option>
                `).join('')}
              </select>
            </div>
            <div>
              <label class="text-xs text-zinc-400 block mb-1">Image de Couverture (URL)</label>
              <input type="text" id="editor-cover" value="${article.coverImage}" class="w-full p-2.5 rounded-xl bg-[#0A1A2F] border border-[#1E3752] text-xs text-white">
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
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
