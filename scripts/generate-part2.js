const fs = require('fs');
const path = require('path');

const part2Content = `
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
  container.innerHTML = \`
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
                <button type="button" onclick="alert('Identifiants de secours vérifiés :\\nadmin@ontario.com / admin2026!\\neditor@ontario.com / editor2026!')" class="text-xs text-[#EF4248] hover:underline font-semibold">Besoin d'aide ?</button>
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
  \`;
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
  showToast(\`Action groupée appliquée à \${count} article(s) !\`);
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
          alt: file.name.replace(/\\.[^/.]+$/, ''),
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
      showToast(\`Utilisateur \${name} créé avec succès !\`);
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
      showToast(\`Rubrique "\${name}" créée avec succès !\`);
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
      showToast(\`Emplacement \${key} mis à jour.\`);
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
  modal.innerHTML = \`
    <div class="w-full max-w-4xl max-h-[85vh] bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] rounded-3xl p-6 flex flex-col shadow-2xl text-zinc-900 dark:text-white">
      <div class="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-[#1E3752]">
        <div>
          <h3 class="font-heading text-lg font-bold">Sélectionner un Visuel dans la Médiathèque</h3>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Cliquez sur une image pour l'appliquer comme visuel principal de l'article</p>
        </div>
        <button onclick="closeMediaPickerModal()" class="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 flex items-center justify-center text-sm">✕</button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto py-4 flex-1">
        \${ADMIN_MEDIA.map(m => \`
          <div onclick="selectMediaForEditor('\${m.url}', '\${m.name || m.title}')" class="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-[#1E3752] hover:border-[#EF4248] cursor-pointer bg-zinc-50 dark:bg-[#0A1A2F] transition-all">
            <div class="aspect-[4/3] w-full overflow-hidden">
              <img src="\${m.url}" onerror="onImgError(this)" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
            </div>
            <div class="p-2.5">
              <h4 class="text-xs font-bold truncate text-zinc-900 dark:text-white">\${m.name || m.title}</h4>
              <span class="text-[10px] text-zinc-400">\${m.size || ''}</span>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`;
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
      showToast(\`✓ Article \${finalStatus === 'published' ? 'publié sur le site' : (finalStatus === 'scheduled' ? 'programmé' : 'enregistré en brouillon')} avec succès !\`, 'success');
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
`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'app.part2_helpers.js'), part2Content, 'utf8');
console.log("Part 2 helpers saved.");
