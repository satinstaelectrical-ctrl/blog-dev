const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'public', 'app.js');
let content = fs.readFileSync(appJsPath, 'utf8');

// 1. UPDATE STATE & THEME INITIALIZATION (Lines 565 - 645)
const targetStateOld = `let currentView = 'home';
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
  // Charger configuration Carrousel sauvegardée
  const savedCarousel = localStorage.getItem('ontario_carousel_config_v2');
  if (savedCarousel) {
    try {
      HERO_CAROUSEL_CONFIG = { ...HERO_CAROUSEL_CONFIG, ...JSON.parse(savedCarousel) };
    } catch (e) {}
  }
  // Charger configuration AdSense sauvegardée
  const savedAdSense = localStorage.getItem('ontario_adsense_config_v2');
  if (savedAdSense) {
    try {
      ADMIN_ADSENSE = { ...ADMIN_ADSENSE, ...JSON.parse(savedAdSense) };
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
  checkAndRenderCMP();
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
}`;

const targetStateNew = `// ==========================================================================
// ÉTAT GLOBAL DE L'APPLICATION & PERSISTANCE SERVEUR
// ==========================================================================
let currentView = 'home';
let currentSlug = '';
let currentHeroSlide = 0;
let isDarkMode = false;
let currentThemePreference = 'system'; // 'light' | 'dark' | 'system'
let currentUser = null; // { id, email, role: 'reader' | 'admin' | 'editor' | 'author', name }

// Variables synchronisées en temps réel depuis le serveur
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

// Système de notifications Toast en direct
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
  toast.className = \`\${bg} px-4 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2.5 pointer-events-auto transition-all duration-300 transform translate-y-4 opacity-0\`;
  toast.innerHTML = \`
    <span class="text-base flex-shrink-0">\${type === 'error' ? '⚠️' : (type === 'info' ? 'ℹ️' : '✓')}</span>
    <span class="leading-tight">\${message}</span>
  \`;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

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

    console.log('✅ Synchronisation serveur ONTARIO validée : ' + ARTICLES.length + ' articles, ' + CATEGORIES.length + ' catégories.');
  } catch (err) {
    console.warn('⚠️ Mode dégradé ou hors-ligne :', err.message);
  }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();

  // Vérifier la session sur le serveur
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

  // Charger toutes les données serveur
  await loadServerData();

  initRouting();
  initShortcuts();
  checkAndRenderCMP();
});

// GESTION DU THÈME PROFESSIONNEL : CLAIR, SOMBRE (BLEU NUIT #071426) & SYSTÈME
function initTheme() {
  const saved = localStorage.getItem('ontario-theme-preference') || localStorage.getItem('ontario-theme') || 'system';
  currentThemePreference = saved;
  applyTheme(currentThemePreference);

  // Écouteur automatique des changements du système d'exploitation
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
  showToast(\`Thème sélectionné : \${pref === 'dark' ? 'Sombre (Bleu Nuit)' : (pref === 'light' ? 'Clair Éditorial' : 'Système Automatique')}\`, 'info');
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
      btn.title = "Mode Sombre actif (cliquer pour mode Clair)";
    } else if (currentThemePreference === 'light') {
      btn.innerHTML = '<span class="text-xs">☀️</span><span class="text-[10px] font-bold">Clair</span>';
      btn.title = "Mode Clair actif (cliquer pour mode Système)";
    } else {
      btn.innerHTML = '<span class="text-xs">💻</span><span class="text-[10px] font-bold">Système</span>';
      btn.title = "Mode Système actif (suit l'OS, cliquer pour mode Sombre)";
    }
  }
}`;

if (content.includes(targetStateOld)) {
  content = content.replace(targetStateOld, targetStateNew);
  console.log('✅ État et système de thèmes (Clair, Sombre, Système) mis à jour.');
} else {
  console.warn('⚠️ targetStateOld non trouvé exactement, inspection requise.');
}

fs.writeFileSync(appJsPath, content, 'utf8');
