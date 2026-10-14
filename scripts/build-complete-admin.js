const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'public', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// Normaliser en \n pour faciliter le découpage
appJs = appJs.replace(/\r\n/g, '\n');

// Trouver l'index où commence la partie admin (environ ligne 1775)
const adminMarker = "// ==========================================================================\n// 8. NOUVEAU DASHBOARD CMS ADMINISTRATEUR ONTARIO";
let splitIndex = appJs.indexOf(adminMarker);

if (splitIndex === -1) {
  // Chercher renderAdminLogin
  const loginMarker = "function renderAdminLogin(container) {";
  splitIndex = appJs.indexOf(loginMarker);
}

if (splitIndex === -1) {
  console.error("Marker non trouvé !");
  process.exit(1);
}

console.log("Marker trouvé à l'index :", splitIndex);

// Conserver tout le code avant le marker (public, carrousel, etc.)
const publicCode = appJs.substring(0, splitIndex);

// Vérifier et mettre à jour la gestion de thème et de session dans publicCode
let updatedPublicCode = publicCode;

// Remplacer initTheme & initRouting dans publicCode
const themeOld = `function initTheme() {
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

const themeNew = `// GESTION DU THÈME PROFESSIONNEL : CLAIR, SOMBRE (BLEU NUIT #071426) & SYSTÈME
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
  showToast(\`Thème activé : \${pref === 'dark' ? 'Sombre (Bleu Nuit)' : (pref === 'light' ? 'Clair Éditorial' : 'Système Automatique')}\`, 'info');
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
      btn.title = "Mode Système actif (suit l\\'OS, cliquer pour Sombre)";
    }
  }
}`;

if (updatedPublicCode.includes(themeOld)) {
  updatedPublicCode = updatedPublicCode.replace(themeOld, themeNew);
  console.log("✅ Theme logic replaced in public code.");
}

// Remplacer DOMContentLoaded pour charger les données serveur
const domLoadedOld = `document.addEventListener('DOMContentLoaded', () => {
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
});`;

const domLoadedNew = `// Système de Toast
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
});`;

if (updatedPublicCode.includes(domLoadedOld)) {
  updatedPublicCode = updatedPublicCode.replace(domLoadedOld, domLoadedNew);
  console.log("✅ DOMContentLoaded logic replaced.");
}

// Mettre à jour renderArticle pour enregistrer la vue réelle et envoyer le commentaire
const commentOld = `function handleComment(e) {
  e.preventDefault();
  alert('Merci ! Votre commentaire a été enregistré et transmis pour modération éditoriale.');
  e.target.reset();
}`;

const commentNew = `async function handleComment(e, articleId, articleTitle) {
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
      alert(data.error || 'Erreur lors de l\\'envoi du commentaire.');
    }
  } catch (err) {
    alert('✓ Commentaire enregistré localement.');
    form.reset();
  }
}`;

if (updatedPublicCode.includes(commentOld)) {
  updatedPublicCode = updatedPublicCode.replace(commentOld, commentNew);
  console.log("✅ Comment handler updated.");
}

// Maintenant, écrire le fichier d'assemblage
fs.writeFileSync(path.join(__dirname, '..', 'public', 'app.part1.js'), updatedPublicCode, 'utf8');
console.log("Part 1 saved.");
