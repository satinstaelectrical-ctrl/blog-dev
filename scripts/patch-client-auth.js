const fs = require('fs');

const app = fs.readFileSync('public/app.js', 'utf8');
const lines = app.split('\n');

// 1. New Routing Code (replaces lines 752 to 822)
const newRoutingLines = `
// ==========================================================================
// 4. ROUTAGE ET GESTION ÉTANCHE DES SESSIONS & PERMISSIONS SERVEUR
// ==========================================================================

async function verifyServerSession() {
  try {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      if (data.authenticated && data.user) {
        currentUser = data.user;
        updateHeaderUserBadge();
        return { ok: true, user: data.user };
      }
    } else if (res.status === 401) {
      currentUser = null;
      updateHeaderUserBadge();
      return { ok: true, user: null };
    }
  } catch (err) {
    console.error('Erreur vérification session serveur:', err);
    return { ok: false, error: err };
  }
  return { ok: true, user: null };
}

function updateHeaderUserBadge() {
  const badge = document.getElementById('user-badge');
  if (badge) {
    if (currentUser) {
      badge.textContent = currentUser.role === 'admin' ? 'Admin' : (currentUser.role === 'editor' ? 'Éditeur' : (currentUser.role === 'author' ? 'Auteur' : 'Lecteur'));
      badge.classList.remove('hidden');
    } else {
      badge.textContent = 'Connexion';
    }
  }
}

function initRouting() {
  window.addEventListener('hashchange', handleHash);
  if (window.location.pathname.startsWith('/admin') && !window.location.hash) {
    const sub = window.location.pathname.replace(/^\\/admin\\/?/, '');
    window.location.hash = sub ? \`admin/\${sub}\` : 'admin';
    return;
  }
  handleHash();
}

async function handleHash() {
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

  // AIGUILLAGE DU PARCOURS ADMINISTRATIF (/admin)
  if (route === 'admin') {
    if (headerWrapper) headerWrapper.style.display = 'none';
    if (newsletterSection) newsletterSection.style.display = 'none';
    if (footerEl) footerEl.style.display = 'none';

    // 1. Vérification session serveur faisant autorité
    const sessionResult = await verifyServerSession();
    if (!sessionResult.ok) {
      renderAdminAuthError(container, sessionResult.error);
      return;
    }

    const user = sessionResult.user || currentUser;

    // 2. Non authentifié -> Portail de connexion administrative
    if (!user || param === 'login') {
      renderAdminLogin(container);
      return;
    }

    // 3. Authentifié mais rôle LECTEUR -> REFUS D'ACCÈS 403 SÉCURISÉ
    const hasAdminRights = (user.role === 'admin' || user.role === 'administrator' || user.role === 'editor' || user.role === 'author');
    if (!hasAdminRights) {
      renderAdminAccessDenied(container, user);
      return;
    }

    // 4. Authentifié avec droits -> DASHBOARD DU CMS
    if (param && param !== 'login' && param !== 'dashboard') {
      adminCurrentTab = param;
    } else {
      adminCurrentTab = 'dashboard';
    }
    renderAdmin(container);
    return;
  }

  // RESTAURATION DES ÉLÉMENTS PUBLICS HORS ADMINISTRATION
  if (headerWrapper) headerWrapper.style.display = '';
  if (newsletterSection) newsletterSection.style.display = '';
  if (footerEl) footerEl.style.display = '';

  // ESPACE COMPTE LECTEUR & CONNEXION PUBLIQUE
  if (route === 'compte' || route === 'login') {
    await verifyServerSession();
    if (currentUser) {
      renderReaderPage(container, currentUser);
    } else {
      renderReaderLoginPage(container);
    }
    return;
  }

  // AUTRES PAGES PUBLIQUES
  if (route === 'home') renderHome(container);
  else if (route === 'blog') renderBlog(container);
  else if (route === 'category') renderCategory(container, param);
  else if (route === 'article') renderArticle(container, param);
  else if (route === 'about') renderAbout(container);
  else if (route === 'contact') renderContact(container);
  else renderHome(container);
}

function navigate(route, param = '') {
  window.location.hash = param ? \`\${route}/\${param}\` : route;
}

function navigateCategory(slug) {
  navigate('category', slug);
}

function navigateArticle(slug) {
  navigate('article', slug);
}
`.trim().split('\n');

// 2. New Reader & Auth Views Code (replaces lines 905 to 1045)
const newReaderLines = `
// ==========================================================================
// 5. ESPACE COMPTE PERSONNEL (/compte) & ÉCRANS DE CONTRÔLE D'ACCÈS
// ==========================================================================

function renderReaderPage(container, user) {
  if (!user) user = currentUser || { name: 'Membre Ontario', email: 'lecteur@ontario.com', role: 'reader' };
  
  const favSlugs = ['next-gen-marketing-innovative-strategies', 'advanced-techniques-abstract-digital-design'];
  const favArticles = ARTICLES.filter(a => favSlugs.includes(a.slug));

  const roleLabels = {
    admin: { label: 'Administrateur', badgeClass: 'bg-[#EF4248]/15 text-[#EF4248] border-[#EF4248]/30' },
    editor: { label: 'Rédacteur en Chef', badgeClass: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30' },
    author: { label: 'Auteur Éditorial', badgeClass: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' },
    reader: { label: 'Lecteur Membre', badgeClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' }
  };
  const currentRoleInfo = roleLabels[user.role] || roleLabels.reader;
  const hasAdminRights = (user.role === 'admin' || user.role === 'editor' || user.role === 'author');

  container.innerHTML = \`
    <div class="container-ontario pt-28 sm:pt-32 pb-24 max-w-4xl mx-auto">
      <div class="rounded-3xl border p-6 sm:p-10 shadow-lg bg-white dark:bg-[#0E2137] border-zinc-200 dark:border-[#28445E]">
        
        <!-- En-tête Profil Utilisateur -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-[#28445E]">
          <div class="flex items-center gap-4 text-center sm:text-left">
            <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-[#EF4248] to-orange-400 text-white font-heading font-black text-2xl flex items-center justify-center shadow-lg ring-4 ring-[#EF4248]/20 flex-shrink-0">
              \${user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 class="text-xl sm:text-2xl font-bold font-heading text-zinc-900 dark:text-white">\${user.name}</h1>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider \${currentRoleInfo.badgeClass}">
                  \${currentRoleInfo.label}
                </span>
              </div>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">\${user.email} • Rôle certifié par le serveur</p>
            </div>
          </div>
          <button onclick="handleReaderLogoutApp()" class="px-5 py-2.5 rounded-full border border-zinc-200 dark:border-[#28445E] text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-500 hover:border-rose-500/30 transition-all cursor-pointer">
            Se Déconnecter
          </button>
        </div>

        <!-- Contenu Espace Personnel -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          <!-- Articles Enregistrés -->
          <div class="lg:col-span-7">
            <h2 class="font-heading font-bold text-base mb-4 flex items-center gap-2 text-zinc-900 dark:text-white">
              <span>📑 Mes Articles Enregistrés (\${favArticles.length})</span>
            </h2>
            \${favArticles.length === 0 ? \`
              <div class="p-8 rounded-2xl border border-zinc-200 dark:border-[#28445E] text-center text-xs text-zinc-400">
                <p class="text-2xl mb-2">🔖</p>
                <p class="font-semibold">Aucun article enregistré pour le moment.</p>
              </div>
            \` : \`
              <div class="flex flex-col gap-3">
                \${favArticles.map(art => \`
                  <div class="flex items-center gap-4 p-3 rounded-2xl border border-zinc-200 dark:border-[#28445E] bg-zinc-50 dark:bg-[#122B45]/50 hover:border-[#EF4248]/40 transition-colors">
                    <img src="\${art.coverImage || art.image || FALLBACK_IMAGE}" onerror="onImgError(this)" class="w-14 h-14 rounded-xl object-cover flex-shrink-0" alt="\${art.title}">
                    <div class="flex-1 min-w-0">
                      <span class="text-[10px] font-bold text-[#EF4248] uppercase tracking-wider">\${art.categorySlug || 'ARTICLE'}</span>
                      <h4 onclick="navigateArticle('\${art.slug}')" class="font-bold text-xs truncate cursor-pointer hover:text-[#EF4248] text-zinc-900 dark:text-white">\${art.title}</h4>
                      <span class="text-[10px] text-zinc-400">\${art.readingTime || 4} min de lecture</span>
                    </div>
                  </div>
                \`).join('')}
              </div>
            \`}
          </div>

          <!-- Colonne Latérale : Préférences & Accès CMS si Autorisé -->
          <div class="lg:col-span-5 flex flex-col gap-6">
            
            <!-- Préférences Newsletter -->
            <div class="p-6 rounded-2xl border border-zinc-200 dark:border-[#28445E] bg-zinc-50 dark:bg-[#122B45]/40 space-y-3">
              <h3 class="font-heading font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                <span>✉️ Préférences Newsletter</span>
              </h3>
              <p class="text-xs text-zinc-500 dark:text-zinc-400">
                Statut actuel : <span class="font-bold text-emerald-500">Abonné Actif (Hebdomadaire)</span>
              </p>
              <p class="text-[11px] text-zinc-400 leading-relaxed">
                Vous recevez nos sélections éditoriales, analyses prospectives et bancs d'essai chaque jeudi matin.
              </p>
            </div>

            <!-- BOÎTE D'ACCÈS CMS ADMINISTRATEUR (Affichée UNIQUEMENT si l'utilisateur possède les droits) -->
            \${hasAdminRights ? \`
              <div class="p-6 rounded-2xl bg-gradient-to-br from-[#0E2137] via-[#122B45] to-[#071426] text-white border border-[#28445E] shadow-xl space-y-3 animate-fadeIn">
                <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EF4248]/20 border border-[#EF4248]/30 text-[#EF4248] text-[10px] font-bold uppercase tracking-wider">
                  <span>👑 Équipe Rédactionnelle ONTARIO</span>
                </div>
                <h4 class="font-heading font-bold text-base text-white">Espace Administration CMS</h4>
                <p class="text-xs text-zinc-300 leading-relaxed">
                  Votre compte dispose des droits d'administration. Accédez au tableau de bord pour rédiger, modérer les commentaires et gérer la plateforme.
                </p>
                <button onclick="navigate('admin', 'dashboard')" class="w-full py-3 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 cursor-pointer mt-2">
                  <span>Accéder au CMS Administrateur</span>
                  <span>→</span>
                </button>
              </div>
            \` : \`
              <div class="p-5 rounded-2xl border border-zinc-200 dark:border-[#28445E] bg-zinc-50/50 dark:bg-[#122B45]/20 text-xs text-zinc-400 space-y-1">
                <span class="font-semibold text-zinc-600 dark:text-zinc-300 block">Compte Lecteur Vérifié</span>
                <p>Vous consultez le média avec votre abonnement membre. Les outils de publication et de modération sont réservés à l'équipe de rédaction.</p>
              </div>
            \`}

          </div>
        </div>
      </div>
    </div>
  \`;
}

// FORMULAIRE DE CONNEXION LECTEUR AUTONOME
function renderReaderLoginPage(container) {
  container.innerHTML = \`
    <div class="container-ontario pt-28 sm:pt-32 pb-24 flex justify-center">
      <div class="max-w-md w-full rounded-3xl border p-8 sm:p-10 shadow-xl bg-white dark:bg-[#0E2137] border-zinc-200 dark:border-[#28445E]">
        <div class="text-center mb-8">
          <span class="font-heading font-black text-3xl tracking-tighter text-zinc-900 dark:text-white">
            ONTARIO<span class="text-[#EF4248]">.</span>
          </span>
          <h1 class="font-heading font-bold text-xl mt-2 text-zinc-900 dark:text-white">
            Espace Lecteur Privilégié
          </h1>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Connectez-vous pour retrouver vos favoris et vos échanges éditoriaux
          </p>
        </div>

        <div id="reader-login-error" class="hidden mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-300 text-xs font-semibold"></div>

        <form onsubmit="handleReaderLoginSubmitApp(event)" class="space-y-4">
          <div>
            <label class="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">Adresse Email</label>
            <input type="email" id="reader-input-email" required placeholder="reader@ontario.com" value="reader@ontario.com" class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-[#28445E] bg-zinc-50 dark:bg-[#122B45] text-zinc-900 dark:text-white text-xs focus:outline-none focus:border-[#EF4248]">
          </div>
          <div>
            <label class="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">Mot de Passe</label>
            <input type="password" id="reader-input-pass" required placeholder="••••••••••••" value="reader2026!" class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-[#28445E] bg-zinc-50 dark:bg-[#122B45] text-zinc-900 dark:text-white text-xs focus:outline-none focus:border-[#EF4248]">
          </div>
          <button type="submit" id="reader-login-btn" class="w-full py-3.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs shadow-md transition-all mt-2 cursor-pointer">
            Accéder à mon Espace Membre →
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-zinc-100 dark:border-[#28445E] text-center text-xs space-y-2">
          <p class="text-zinc-400">Vous êtes membre de l'équipe éditoriale ou administrateur ?</p>
          <button onclick="navigate('admin')" class="text-[#EF4248] hover:underline font-bold inline-flex items-center gap-1">
            <span>🔐 Connexion Administrateur CMS (/admin) →</span>
          </button>
        </div>
      </div>
    </div>
  \`;
}

async function handleReaderLoginSubmitApp(e) {
  e.preventDefault();
  const email = (document.getElementById('reader-input-email')?.value || '').trim();
  const password = document.getElementById('reader-input-pass')?.value || '';
  const errorEl = document.getElementById('reader-login-error');
  const btn = document.getElementById('reader-login-btn');

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Vérification en cours...';
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
      updateHeaderUserBadge();

      // Si c'est un compte administrateur qui se connecte, redirection intelligente vers le CMS
      if (currentUser.role === 'admin' || currentUser.role === 'editor' || currentUser.role === 'author') {
        showToast(\`Bienvenue \${currentUser.name} ! Ouverture de l'administration...\`, 'success');
        navigate('admin', 'dashboard');
      } else {
        showToast(\`Bienvenue \${currentUser.name} sur votre espace lecteur !\`, 'success');
        navigate('compte');
      }
    } else {
      if (errorEl) {
        errorEl.textContent = data.error || 'Identifiant ou mot de passe incorrect.';
        errorEl.classList.remove('hidden');
      }
    }
  } catch (err) {
    if (errorEl) {
      errorEl.textContent = 'Erreur réseau lors de la connexion.';
      errorEl.classList.remove('hidden');
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Accéder à mon Espace Membre →';
    }
  }
}

async function handleReaderLogoutApp() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch (e) {}
  currentUser = null;
  localStorage.removeItem('ontario_admin_session_v2');
  localStorage.removeItem('ontario_reader_user');
  updateHeaderUserBadge();
  showToast('Déconnexion effectuée avec succès.', 'info');
  navigate('home');
}

// ÉCRAN 403 : REFUS D'ACCÈS AUX LECTEURS SUR L'ADMINISTRATION (/admin)
function renderAdminAccessDenied(container, user) {
  container.innerHTML = \`
    <div class="min-h-screen bg-zinc-50 dark:bg-[#071426] text-zinc-900 dark:text-white flex items-center justify-center p-4 font-sans">
      <div class="max-w-md w-full bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#28445E] rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-5">
        <div class="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center text-3xl mx-auto shadow-inner">
          🛡️
        </div>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-bold uppercase tracking-wider border border-amber-500/20">
          Refus d'Accès • Code 403
        </div>
        <h1 class="font-heading font-extrabold text-2xl text-zinc-900 dark:text-white">
          Accès Réservé à l'Équipe Éditoriale
        </h1>
        <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Vous êtes actuellement authentifié avec le compte <b>\${user.email}</b> disposant du rôle <b>Lecteur</b>. Ce rôle donne accès aux fonctionnalités de lecture, mais ne permet pas d'accéder à la console administrative du CMS.
        </p>
        <div class="pt-3 space-y-2.5">
          <button onclick="navigate('compte')" class="w-full py-3 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-md cursor-pointer">
            Accéder à mon Espace Lecteur (/compte) →
          </button>
          <button onclick="handleAdminLogout()" class="w-full py-2.5 rounded-xl bg-zinc-100 dark:bg-[#162F4D] hover:bg-zinc-200 dark:hover:bg-[#1E3752] text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all cursor-pointer">
            Se déconnecter pour changer de compte
          </button>
          <button onclick="navigate('home')" class="w-full py-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white text-xs font-medium cursor-pointer">
            Retourner au site public
          </button>
        </div>
      </div>
    </div>
  \`;
}

// ÉCRAN D'ERREUR DU CHARGEMENT DES PERMISSIONS SERVEUR
function renderAdminAuthError(container, err) {
  container.innerHTML = \`
    <div class="min-h-screen bg-zinc-50 dark:bg-[#071426] text-zinc-900 dark:text-white flex items-center justify-center p-4 font-sans">
      <div class="max-w-md w-full bg-white dark:bg-[#0E2137] border border-red-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-5">
        <div class="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center text-3xl mx-auto shadow-inner">
          ⚠️
        </div>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-[11px] font-bold uppercase tracking-wider border border-red-500/20">
          Erreur de Communication Serveur
        </div>
        <h1 class="font-heading font-extrabold text-xl text-zinc-900 dark:text-white">
          Impossible de Vérifier vos Permissions
        </h1>
        <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          La vérification de votre session administrative auprès de l'API serveur a échoué. Afin de garantir l'intégrité du média, l'accès ne peut être ouvert sans confirmation des droits.
        </p>
        <div class="pt-3 flex flex-col sm:flex-row items-center gap-2">
          <button onclick="handleHash()" class="w-full sm:flex-1 py-3 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold transition-all shadow-md cursor-pointer">
            Réessayer la vérification
          </button>
          <button onclick="navigate('home')" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-100 dark:bg-[#162F4D] text-zinc-800 dark:text-zinc-200 text-xs font-semibold cursor-pointer">
            Accueil
          </button>
        </div>
      </div>
    </div>
  \`;
}
`.trim().split('\n');

// Find line bounds for replacement
let rStart = -1, rEnd = -1;
let routStart = -1, routEnd = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function initRouting()')) routStart = i;
  if (lines[i].includes('function navigateArticle(slug)')) {
    // End is 2 lines after
    routEnd = i + 3;
  }
  if (lines[i].includes('function renderReaderPage(container)')) rStart = i - 4;
  if (lines[i].includes('function handleReaderLogoutApp()')) {
    rEnd = i + 5;
  }
}

console.log('Routing bounds:', routStart, 'to', routEnd);
console.log('Reader bounds:', rStart, 'to', rEnd);

// Splicing: replace reader first (higher index), then routing
lines.splice(rStart, rEnd - rStart, ...newReaderLines);
lines.splice(routStart, routEnd - routStart, ...newRoutingLines);

const updatedApp = lines.join('\n');
fs.writeFileSync('public/app.js', updatedApp, 'utf8');
console.log('Successfully spliced public/app.js! New lines count:', lines.length);
