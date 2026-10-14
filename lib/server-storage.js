/**
 * ONTARIO MÉDIA — MOTEUR DE STOCKAGE PERSISTANT SERVEUR
 * Gestion thread-safe du stockage JSON, uploads, activités et scheduler
 */

const fs = require('fs');
const path = require('path');

const STORAGE_DIR = path.join(__dirname, '..', 'data', 'storage');
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');

if (!fs.existsSync(STORAGE_DIR)) fs.mkdirSync(STORAGE_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

function getFilePath(entity) {
  return path.join(STORAGE_DIR, `${entity}.json`);
}

function readData(entity, defaultVal = []) {
  const filePath = getFilePath(entity);
  try {
    if (!fs.existsSync(filePath)) {
      writeData(entity, defaultVal);
      return defaultVal;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Erreur lecture ${entity}:`, err.message);
    return defaultVal;
  }
}

function writeData(entity, data) {
  const filePath = getFilePath(entity);
  const tempPath = filePath + '.tmp.' + Date.now();
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempPath, filePath);
    return true;
  } catch (err) {
    console.error(`Erreur écriture ${entity}:`, err.message);
    try { if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath); } catch (e) {}
    return false;
  }
}

// Initialisation & Seeding
function initializeStorage(initialData = {}) {
  // 1. Articles
  if (!fs.existsSync(getFilePath('articles'))) {
    writeData('articles', initialData.articles || []);
    console.log('✅ Stockage serveur initialisé : articles.json');
  }

  // 2. Categories
  if (!fs.existsSync(getFilePath('categories'))) {
    writeData('categories', initialData.categories || []);
    console.log('✅ Stockage serveur initialisé : categories.json');
  }

  // 3. Pages
  if (!fs.existsSync(getFilePath('pages'))) {
    const defaultPages = [
      { id: 'page-home', title: "Page d'accueil", slug: 'home', status: 'published', updatedAt: '2026-03-26', contentBlocks: [{ type: 'paragraph', text: 'Page principale du magazine éditorial Ontario.' }] },
      { id: 'page-about', title: 'À Propos de la Rédaction', slug: 'about', status: 'published', updatedAt: '2026-03-24', contentBlocks: [{ type: 'paragraph', text: 'Ontario est un média prospectif explorant les technologies de rupture et le design.' }] },
      { id: 'page-contact', title: 'Contact & Rédaction', slug: 'contact', status: 'published', updatedAt: '2026-03-20', contentBlocks: [{ type: 'paragraph', text: 'Contactez notre secrétariat de rédaction.' }] },
      { id: 'page-legal', title: 'Mentions Légales & Confidentialité', slug: 'legal', status: 'published', updatedAt: '2026-03-15', contentBlocks: [{ type: 'paragraph', text: 'Informations juridiques et conformité RGPD.' }] }
    ];
    writeData('pages', defaultPages);
    console.log('✅ Stockage serveur initialisé : pages.json');
  }

  // 4. Media
  if (!fs.existsSync(getFilePath('media'))) {
    const defaultMedia = [
      { id: 'med-1', name: 'hero_ontario_orange.jpg', url: '/images/hero_ontario_orange.jpg', size: '773 Ko', dimensions: '1920x1080', mimeType: 'image/jpeg', alt: 'Portrait futuriste Ontario', caption: 'Portrait éditorial Next Gen Marketing', createdAt: '2026-03-26' },
      { id: 'med-2', name: 'hero_ontario_cyber.jpg', url: '/images/hero_ontario_cyber.jpg', size: '645 Ko', dimensions: '1920x1080', mimeType: 'image/jpeg', alt: 'Cybernétique et vision futuriste', caption: 'Motion design & cybernétique', createdAt: '2026-03-25' },
      { id: 'med-3', name: 'hero_ontario_arch.jpg', url: '/images/hero_ontario_arch.jpg', size: '820 Ko', dimensions: '1920x1080', mimeType: 'image/jpeg', alt: 'Architecture fluide organique', caption: 'Architecture paramétrique au crépuscule', createdAt: '2026-03-24' }
    ];
    writeData('media', defaultMedia);
    console.log('✅ Stockage serveur initialisé : media.json');
  }

  // 5. Comments
  if (!fs.existsSync(getFilePath('comments'))) {
    writeData('comments', initialData.comments || []);
    console.log('✅ Stockage serveur initialisé : comments.json');
  }

  // 6. Subscribers
  if (!fs.existsSync(getFilePath('subscribers'))) {
    const defaultSubscribers = [
      { id: 'sub-1', email: 'clara.dupont@media-agency.fr', status: 'confirmed', createdAt: '2026-03-20' },
      { id: 'sub-2', email: 'marc.leroy@techstudio.com', status: 'confirmed', createdAt: '2026-03-22' },
      { id: 'sub-3', email: 'elena.rostova@design-lab.io', status: 'confirmed', createdAt: '2026-03-24' },
      { id: 'sub-4', email: 'alex.vance@creative-ventures.net', status: 'pending', createdAt: '2026-03-25' },
      { id: 'sub-5', email: 'thomas.morel@startup-foundry.co', status: 'confirmed', createdAt: '2026-03-26' }
    ];
    writeData('subscribers', defaultSubscribers);
    console.log('✅ Stockage serveur initialisé : subscribers.json');
  }

  // 7. Users
  if (!fs.existsSync(getFilePath('users'))) {
    const defaultUsers = [
      { id: 'usr-admin-1', name: 'Directeur de Rédaction', email: 'admin@ontario.com', role: 'admin', active: true, createdAt: '2026-01-10' },
      { id: 'usr-editor-1', name: 'Steve Jones', email: 'steve@ontario.com', role: 'editor', active: true, createdAt: '2026-01-15' },
      { id: 'usr-author-1', name: 'Kate Johnson', email: 'kate@ontario.com', role: 'author', active: true, createdAt: '2026-02-01' },
      { id: 'usr-author-2', name: 'Thomas Laurent', email: 'thomas@ontario.com', role: 'author', active: true, createdAt: '2026-02-05' },
      { id: 'usr-reader-1', name: 'Lecteur Premium', email: 'reader@ontario.com', role: 'reader', active: true, createdAt: '2026-03-01' }
    ];
    writeData('users', defaultUsers);
    console.log('✅ Stockage serveur initialisé : users.json');
  }

  // 8. Settings
  if (!fs.existsSync(getFilePath('settings'))) {
    const defaultSettings = {
      siteName: 'ONTARIO Magazine',
      siteDescription: "Média d'investigation prospective, intelligence artificielle et spatial design.",
      siteUrl: 'http://localhost:3000',
      logoText: 'ONTARIO',
      primaryColor: '#EF4248',
      footerCopyright: '© 2026 ONTARIO Media Inc. Tous droits réservés.',
      adsense: {
        enabled: true,
        publisherId: 'pub-9482910482910394',
        autoAds: false,
        testMode: true,
        reportingConnected: false,
        slots: {
          home_after_featured: { enabled: true, slotId: '8492019481', format: 'responsive', minHeight: 90 },
          home_in_feed: { enabled: true, slotId: '7391028472', format: 'rectangle', minHeight: 250 },
          article_sidebar: { enabled: true, slotId: '9201847192', format: 'half-page', minHeight: 600 },
          article_in_content: { enabled: true, slotId: '6102938471', format: 'fluid', minHeight: 120 },
          article_end: { enabled: true, slotId: '5019283746', format: 'banner', minHeight: 90 }
        }
      },
      carousel: {
        mode: 'popular',
        maxSlides: 5,
        autoplay: true,
        autoplayInterval: 6000
      }
    };
    writeData('settings', defaultSettings);
    console.log('✅ Stockage serveur initialisé : settings.json');
  }

  // 9. Activity Log
  if (!fs.existsSync(getFilePath('activity'))) {
    const defaultActivity = [
      { id: 'act-1', type: 'system', action: 'Démarrage du système de persistance serveur ONTARIO', user: 'Système ONTARIO', timestamp: new Date().toISOString() },
      { id: 'act-2', type: 'publish', action: "Publication de l'article vedette Next Gen Marketing: Innovative Strategies", user: 'Directeur de Rédaction', timestamp: new Date(Date.now() - 3600000).toISOString() }
    ];
    writeData('activity', defaultActivity);
    console.log('✅ Stockage serveur initialisé : activity.json');
  }

  // 10. Analytics
  if (!fs.existsSync(getFilePath('analytics'))) {
    writeData('analytics', { totalPageViews: 14280, viewsBySlug: {}, viewsByDate: {} });
    console.log('✅ Stockage serveur initialisé : analytics.json');
  }
}

// Journal d'audit
function logActivity(type, action, user = 'Admin') {
  const activities = readData('activity', []);
  const newActivity = {
    id: 'act-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    type,
    action,
    user,
    timestamp: new Date().toISOString()
  };
  activities.unshift(newActivity);
  if (activities.length > 100) activities.length = 100;
  writeData('activity', activities);
  return newActivity;
}

// Enregistrement des lectures de pages réelles
function recordPageView(slug) {
  const analytics = readData('analytics', { totalPageViews: 0, viewsBySlug: {}, viewsByDate: {} });
  analytics.totalPageViews = (analytics.totalPageViews || 0) + 1;
  analytics.viewsBySlug = analytics.viewsBySlug || {};
  analytics.viewsBySlug[slug] = (analytics.viewsBySlug[slug] || 0) + 1;

  const today = new Date().toISOString().slice(0, 10);
  analytics.viewsByDate = analytics.viewsByDate || {};
  analytics.viewsByDate[today] = (analytics.viewsByDate[today] || 0) + 1;

  writeData('analytics', analytics);

  // Mettre à jour l'article
  const articles = readData('articles', []);
  const article = articles.find(a => a.slug === slug || a.id === slug);
  if (article) {
    article.views = (article.views || 0) + 1;
    writeData('articles', articles);
  }
}

// Planificateur automatique pour articles programmés
function processScheduledArticles() {
  const articles = readData('articles', []);
  const now = new Date();
  let changed = false;

  for (const art of articles) {
    if (art.status === 'scheduled' && art.scheduledAt) {
      const schedDate = new Date(art.scheduledAt);
      if (schedDate <= now) {
        art.status = 'published';
        art.publishedAt = now.toISOString();
        changed = true;
        logActivity('publish', `Exécution programmée automatique pour : ${art.title}`, 'Planificateur Serveur');
        console.log(`⏰ Publication programmée exécutée pour : ${art.title}`);
      }
    }
  }

  if (changed) {
    writeData('articles', articles);
  }
}

// Lancer la tâche de fond toutes les 30 secondes sans bloquer l'event loop
const schedulerTimer = setInterval(processScheduledArticles, 30000);
if (schedulerTimer && schedulerTimer.unref) schedulerTimer.unref();

module.exports = {
  readData,
  writeData,
  initializeStorage,
  logActivity,
  recordPageView,
  processScheduledArticles,
  UPLOADS_DIR
};

