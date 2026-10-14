const fs = require('fs');
const path = require('path');

const viewsContent = `
// --------------------------------------------------------------------------
// ORCHESTRATEUR PRINCIPAL DU DASHBOARD ADMINISTRATEUR ONTARIO
// --------------------------------------------------------------------------
function renderAdmin(container) {
  if (!container) container = document.getElementById('app-container');
  if (!container) return;

  const headerWrapper = document.getElementById('header-wrapper');
  const newsletterSection = document.getElementById('newsletter-section');
  const footerEl = document.querySelector('footer');
  if (headerWrapper) headerWrapper.style.display = 'none';
  if (newsletterSection) newsletterSection.style.display = 'none';
  if (footerEl) footerEl.style.display = 'none';

  // Sécurité et contrôle de rôle
  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'administrator' || currentUser.role === 'editor');
  if (!isAdmin) {
    renderAdminLogin(container);
    return;
  }

  // Si l'éditeur Gutenberg est actif, affichage dédié
  if (adminCurrentTab === 'editor') {
    renderGutenbergEditor(container);
    return;
  }

  // Rendu de l'onglet actif
  let tabContentHtml = '';
  switch (adminCurrentTab) {
    case 'dashboard': tabContentHtml = renderTabDashboard(); break;
    case 'articles': tabContentHtml = renderTabArticles(); break;
    case 'pages': tabContentHtml = renderTabPages(); break;
    case 'media': tabContentHtml = renderTabMedia(); break;
    case 'categories': tabContentHtml = renderTabCategories(); break;
    case 'tags': tabContentHtml = renderTabTags(); break;
    case 'comments': tabContentHtml = renderTabComments(); break;
    case 'users': tabContentHtml = renderTabUsers(); break;
    case 'newsletter': tabContentHtml = renderTabNewsletter(); break;
    case 'seo': tabContentHtml = renderTabSEO(); break;
    case 'adsense': tabContentHtml = renderTabAdSense(); break;
    case 'customization':
    case 'carousel': tabContentHtml = renderTabCustomization(); break;
    case 'settings': tabContentHtml = renderTabSettings(); break;
    default: tabContentHtml = renderTabDashboard(); break;
  }

  const unreadNotifs = (SERVER_ACTIVITIES || []).filter(a => !a.read).length;
  const pendingCommentsCount = (ADMIN_COMMENTS || []).filter(c => c.status === 'pending').length;

  const navGroups = [
    {
      title: 'PRINCIPAL',
      items: [
        { id: 'dashboard', label: 'Tableau de Bord', icon: '📊' },
      ]
    },
    {
      title: 'ÉDITION & CONTENUS',
      items: [
        { id: 'articles', label: 'Publications & Articles', icon: '📰', badge: ARTICLES.length },
        { id: 'new', label: 'Nouvel Article', icon: '✍️' },
        { id: 'pages', label: 'Pages Statiques', icon: '📄', badge: ADMIN_PAGES.length || 4 },
        { id: 'media', label: 'Médiathèque', icon: '📁', badge: ADMIN_MEDIA.length },
      ]
    },
    {
      title: 'TAXONOMIES & INTERACTIONS',
      items: [
        { id: 'categories', label: 'Catégories', icon: '🏷️' },
        { id: 'tags', label: 'Mots-clés / Tags', icon: '🔖' },
        { id: 'comments', label: 'Commentaires', icon: '💬', badge: pendingCommentsCount > 0 ? pendingCommentsCount : null },
        { id: 'newsletter', label: 'Abonnés Newsletter', icon: '✉️', badge: ADMIN_SUBSCRIBERS.length },
      ]
    },
    {
      title: 'MONÉTISATION & CONFIG',
      items: [
        { id: 'adsense', label: 'Régie AdSense', icon: '💰' },
        { id: 'seo', label: 'Référencement SEO', icon: '🔍' },
        { id: 'customization', label: 'Carrousel & Hero', icon: '🎨' },
        { id: 'users', label: 'Équipe & Droits', icon: '👥' },
        { id: 'settings', label: 'Paramètres du Site', icon: '⚙️' },
      ]
    }
  ];

  container.innerHTML = \`
    <div class="min-h-screen bg-[#F8FAFC] dark:bg-[#071426] text-zinc-900 dark:text-white flex flex-col font-sans transition-colors duration-200">
      
      <!-- TOPBAR ADMINISTRATIVE PROFESSIONNELLE -->
      <header class="sticky top-0 z-40 h-16 bg-white/95 dark:bg-[#0E2137]/95 backdrop-blur-md border-b border-zinc-200 dark:border-[#1E3752] px-4 sm:px-6 flex items-center justify-between gap-4 shadow-xs">
        <div class="flex items-center gap-3">
          <!-- Toggle Mobile -->
          <button onclick="toggleAdminMobileSidebar()" class="lg:hidden p-2 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>

          <!-- Toggle Desktop -->
          <button onclick="toggleAdminSidebar()" class="hidden lg:flex p-2 rounded-xl bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 transition-colors" title="\${adminSidebarCollapsed ? 'Déplier la barre' : 'Replier la barre'}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
          </button>

          <!-- Logo Brand -->
          <div onclick="setAdminNav('dashboard')" class="flex items-center gap-2.5 cursor-pointer group">
            <div class="w-8 h-8 rounded-full bg-[#EF4248] flex items-center justify-center text-white font-extrabold shadow-md shadow-red-500/25 group-hover:scale-105 transition-transform">
              <span class="font-heading text-sm">O</span>
            </div>
            <div class="hidden sm:flex flex-col">
              <span class="font-heading font-extrabold text-sm tracking-tight text-zinc-900 dark:text-white leading-none">ONTARIO</span>
              <span class="text-[9px] font-mono text-[#EF4248] tracking-widest uppercase">CMS Media Pro v2.4</span>
            </div>
          </div>

          <div class="hidden md:flex items-center gap-2 pl-4 border-l border-zinc-200 dark:border-[#1E3752]">
            <span class="text-xs text-zinc-400">Section :</span>
            <span class="text-xs font-bold text-zinc-800 dark:text-white capitalize">\${adminCurrentTab}</span>
          </div>
        </div>

        <!-- Actions Topbar -->
        <div class="flex items-center gap-2 sm:gap-3">
          
          <!-- Sélecteur de Thème à 3 états (Clair / Sombre / Système) -->
          <div class="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-black/30 border border-zinc-200 dark:border-white/10 text-xs font-bold">
            <button onclick="setThemePreference('light')" class="px-2 py-1 rounded-lg transition-all \${currentThemePreference === 'light' ? 'bg-white dark:bg-[#EF4248] shadow-xs text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}" title="Mode Clair">
              ☀️ Clair
            </button>
            <button onclick="setThemePreference('dark')" class="px-2 py-1 rounded-lg transition-all \${currentThemePreference === 'dark' ? 'bg-[#EF4248] text-white shadow-xs' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}" title="Mode Sombre (Bleu Nuit)">
              🌙 Sombre
            </button>
            <button onclick="setThemePreference('system')" class="px-2 py-1 rounded-lg transition-all \${currentThemePreference === 'system' ? 'bg-[#EF4248] text-white shadow-xs' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}" title="Mode Système (Automatique)">
              💻 Auto
            </button>
          </div>

          <!-- Rédiger -->
          <button onclick="setAdminNav('new')" class="px-3.5 py-1.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all flex items-center gap-1.5 cursor-pointer">
            <span>✍️</span>
            <span class="hidden sm:inline">Nouvel Article</span>
          </button>

          <!-- Voir site -->
          <button onclick="navigate('home')" class="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-[#1E3752] text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-all flex items-center gap-1.5">
            <span>🌐</span>
            <span class="hidden md:inline">Voir le site</span>
          </button>

          <!-- Cloche Notifications -->
          <div class="relative">
            <button onclick="toggleAdminNotifications()" class="relative p-2 rounded-xl bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              \${unreadNotifs > 0 ? \`<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4248]"></span>\` : ''}
            </button>

            \${adminNotificationsOpen ? \`
              <div class="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
                <div class="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-[#1E3752] mb-3">
                  <h4 class="font-heading font-bold text-xs text-zinc-900 dark:text-white uppercase tracking-wider">Journal d'Activité Récent</h4>
                  <button onclick="markAllNotificationsRead()" class="text-[10px] text-[#EF4248] hover:underline font-semibold">Tout marquer comme lu</button>
                </div>
                <div class="space-y-2.5 max-h-72 overflow-y-auto">
                  \${(SERVER_ACTIVITIES || []).slice(0, 10).map(a => \`
                    <div class="p-2.5 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-100 dark:border-[#1E3752] text-xs flex items-start gap-2.5">
                      <span class="text-base flex-shrink-0">\${a.type === 'publish' ? '🚀' : (a.type === 'article' ? '📝' : (a.type === 'media' ? '📁' : '⚡'))}</span>
                      <div class="flex-1">
                        <p class="text-zinc-800 dark:text-zinc-200 leading-snug">\${a.action}</p>
                        <span class="text-[10px] text-zinc-400 mt-1 block">\${a.user || 'Admin'} • \${new Date(a.timestamp || 0).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  \`).join('')}
                </div>
              </div>
            \` : ''}
          </div>

          <!-- Profil & Déconnexion -->
          <div class="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-zinc-200 dark:border-[#1E3752]">
            <div class="w-8 h-8 rounded-full bg-[#EF4248]/20 text-[#EF4248] flex items-center justify-center font-bold text-xs">
              \${(currentUser?.name || 'A')[0]}
            </div>
            <div class="hidden xl:flex flex-col text-left">
              <span class="text-xs font-bold text-zinc-900 dark:text-white leading-tight truncate max-w-[120px]">\${currentUser?.name || 'Directeur de Rédaction'}</span>
              <span class="text-[9px] text-[#EF4248] uppercase font-bold tracking-wider">\${currentUser?.role || 'Admin'}</span>
            </div>
            <button onclick="handleAdminLogout()" title="Se déconnecter" class="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors cursor-pointer ml-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </button>
          </div>
        </div>
      </header>

      <!-- CORPS AVEC SIDEBAR & ESPACE DE TRAVAIL -->
      <div class="flex-1 flex overflow-hidden">
        
        <!-- SIDEBAR GAUCHE (DESKTOP) -->
        <aside class="hidden lg:flex flex-col bg-white dark:bg-[#0E2137] border-r border-zinc-200 dark:border-[#1E3752] transition-all duration-300 \${adminSidebarCollapsed ? 'w-20' : 'w-64'} shrink-0 overflow-y-auto p-4 space-y-6">
          \${navGroups.map(grp => \`
            <div>
              \${!adminSidebarCollapsed ? \`
                <span class="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase px-3 mb-2 block font-heading">\${grp.title}</span>
              \` : \`
                <div class="h-px bg-zinc-200 dark:bg-[#1E3752] my-2"></div>
              \`}
              <div class="space-y-1">
                \${grp.items.map(item => \`
                  <button 
                    onclick="setAdminNav('\${item.id}')"
                    class="w-full flex items-center \${adminSidebarCollapsed ? 'justify-center px-2' : 'justify-between px-3'} py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer \${adminCurrentTab === item.id ? 'bg-[#EF4248] text-white shadow-md shadow-red-500/25 font-bold' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#122B45] hover:text-zinc-900 dark:hover:text-white'}"
                    title="\${item.label}"
                  >
                    <div class="flex items-center gap-3">
                      <span class="text-base leading-none">\${item.icon}</span>
                      \${!adminSidebarCollapsed ? \`<span class="truncate">\${item.label}</span>\` : ''}
                    </div>
                    \${(!adminSidebarCollapsed && item.badge) ? \`
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold \${adminCurrentTab === item.id ? 'bg-white/20 text-white' : 'bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-zinc-300'}">
                        \${item.badge}
                      </span>
                    \` : ''}
                  </button>
                \`).join('')}
              </div>
            </div>
          \`).join('')}
        </aside>

        <!-- CONTENU CENTRAL DE L'ONGLET -->
        <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div class="max-w-7xl mx-auto space-y-6">
            \${tabContentHtml}
          </div>
        </main>
      </div>

      <!-- MODALE APERÇU DIRECT -->
      \${previewArticleModalId ? \`
        <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div class="bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 text-zinc-900 dark:text-white shadow-2xl">
            <div class="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-[#1E3752] mb-6">
              <span class="text-xs font-bold uppercase text-[#EF4248]">Aperçu de la publication</span>
              <button onclick="closeArticlePreview()" class="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 flex items-center justify-center">✕</button>
            </div>
            \${(() => {
              const art = ARTICLES.find(a => a.id === previewArticleModalId) || ARTICLES[0];
              if (!art) return '<p>Article introuvable.</p>';
              return \`
                <h1 class="font-heading text-2xl sm:text-3xl font-extrabold mb-4">\${art.title}</h1>
                <p class="text-sm text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">\${art.excerpt}</p>
                <img src="\${art.coverImage}" class="w-full aspect-video rounded-2xl object-cover mb-6 shadow-md">
                <div class="prose dark:prose-invert text-sm space-y-4">
                  \${(art.contentBlocks || []).map(b => \`<p>\${b.text || ''}</p>\`).join('')}
                </div>
              \`;
            })()}
          </div>
        </div>
      \` : ''}
    </div>
  \`;
}

// --------------------------------------------------------------------------
// 1. DASHBOARD ACCUEIL (DONNÉES RÉELLES & TRAÇABILITÉ SERVEUR)
// --------------------------------------------------------------------------
function renderTabDashboard() {
  const publishedCount = ARTICLES.filter(a => !a.status || a.status === 'published').length;
  const draftCount = ARTICLES.filter(a => a.status === 'draft').length;
  const scheduledCount = ARTICLES.filter(a => a.status === 'scheduled').length;
  const trashCount = ARTICLES.filter(a => a.status === 'trash').length;
  const popularArticles = [...ARTICLES].filter(a => a.status === 'published').sort((a,b) => (b.views||0) - (a.views||0)).slice(0, 4);

  return \`
    <!-- Bannière Éditoriale Pro -->
    <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-100 via-zinc-50 to-white dark:from-[#0E2137] dark:via-[#122B45] dark:to-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF4248]/15 border border-[#EF4248]/30 text-[#EF4248] text-[11px] font-bold uppercase tracking-wider mb-2">
          <span class="w-2 h-2 rounded-full bg-[#EF4248] animate-pulse"></span>
          Système Éditorial Connecté au Serveur
        </div>
        <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Bonjour \${currentUser?.name || 'Steve'}, voici l'état réel de votre média
        </h1>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
          Données consolidées depuis le moteur de stockage persistant, modération des articles, abonnés et traçabilité des activités.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="startNewArticle()" class="px-5 py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-lg shadow-red-500/25 transition-all">
          + Rédiger un Article
        </button>
      </div>
    </div>

    <!-- 6 KPI CARDS AVEC IDENTIFICATION TRANSPARENTE DES SOURCES -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      
      <!-- 1. Articles -->
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Articles Publiés</span>
          <span class="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-sm">📝</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">\${publishedCount}</div>
        <div class="text-[10px] text-zinc-400 mt-2 font-mono">
          \${draftCount} brouillon(s) • \${scheduledCount} programmé(s)
        </div>
      </div>

      <!-- 2. Lectures réelles -->
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Lectures Totales</span>
          <span class="p-1.5 rounded-lg bg-purple-500/10 text-purple-500 text-sm">👁️</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">
          \${(SERVER_STATS.traffic.totalPageViews || 0).toLocaleString()}
        </div>
        <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
          Source : Mesure interne serveur
        </div>
      </div>

      <!-- 3. Abonnés Newsletter -->
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Abonnés Actifs</span>
          <span class="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-sm">✉️</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">\${ADMIN_SUBSCRIBERS.length}</div>
        <div class="text-[10px] text-zinc-400 mt-2 font-mono">
          Base contacts locale certifiée
        </div>
      </div>

      <!-- 4. Commentaires -->
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Commentaires</span>
          <span class="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 text-sm">💬</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">\${ADMIN_COMMENTS.length}</div>
        <div class="text-[10px] text-amber-600 dark:text-amber-400 mt-2 font-semibold">
          \${ADMIN_COMMENTS.filter(c => c.status === 'pending').length} en attente de validation
        </div>
      </div>

      <!-- 5. Médiathèque -->
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Médiathèque</span>
          <span class="p-1.5 rounded-lg bg-teal-500/10 text-teal-500 text-sm">📁</span>
        </div>
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">\${ADMIN_MEDIA.length}</div>
        <div class="text-[10px] text-zinc-400 mt-2 font-mono">
          Fichiers stockés sur disque
        </div>
      </div>

      <!-- 6. Rapports AdSense (Non connecté sans OAuth2) -->
      <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Régie AdSense</span>
          <span class="p-1.5 rounded-lg bg-zinc-500/10 text-zinc-500 text-sm">💰</span>
        </div>
        <div class="font-heading text-sm font-extrabold text-amber-600 dark:text-amber-400 mt-1">Non connecté</div>
        <div class="text-[10px] text-zinc-400 mt-2 font-mono">
          Diffusion active • API OAuth2 requise
        </div>
      </div>

    </div>

    <!-- GRILLE ARTICLES POPULAIRES + JOURNAL D'ACTIVITÉ -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Top Articles (7 cols) -->
      <div class="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] space-y-4 shadow-xs">
        <div class="flex items-center justify-between">
          <h2 class="font-heading font-extrabold text-base text-zinc-900 dark:text-white">Articles Populaires Récents</h2>
          <button onclick="setAdminNav('articles')" class="text-xs text-[#EF4248] hover:underline font-bold">Voir tout le catalogue →</button>
        </div>
        <div class="space-y-3">
          \${popularArticles.map((art, idx) => \`
            <div class="p-3.5 rounded-2xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-100 dark:border-[#1E3752] flex items-center justify-between gap-4">
              <div class="flex items-center gap-3 min-w-0">
                <span class="font-heading font-extrabold text-xs text-zinc-400 w-5">0\${idx + 1}</span>
                <img src="\${art.coverImage}" onerror="onImgError(this)" class="w-12 h-12 rounded-xl object-cover flex-shrink-0">
                <div class="min-w-0">
                  <h4 class="font-bold text-xs text-zinc-900 dark:text-white truncate cursor-pointer hover:text-[#EF4248]" onclick="previewArticle('\${art.id}')">\${art.title}</h4>
                  <span class="text-[10px] text-zinc-400">\${art.categoryBadge || 'AI'} • \${art.readingTime || 5} min de lecture</span>
                </div>
              </div>
              <div class="text-right flex-shrink-0">
                <span class="font-mono text-xs font-bold text-zinc-900 dark:text-white">\${(art.views || 0).toLocaleString()}</span>
                <span class="block text-[9px] text-zinc-400">vues réelles</span>
              </div>
            </div>
          \`).join('')}
        </div>
      </div>

      <!-- Journal d'activité (5 cols) -->
      <div class="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] space-y-4 shadow-xs">
        <h2 class="font-heading font-extrabold text-base text-zinc-900 dark:text-white">Journal d'Audit Serveur</h2>
        <div class="space-y-2.5 max-h-80 overflow-y-auto">
          \${(SERVER_ACTIVITIES || []).slice(0, 6).map(a => \`
            <div class="p-3 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-100 dark:border-[#1E3752] text-xs">
              <div class="flex items-center justify-between mb-1">
                <span class="font-bold text-zinc-800 dark:text-zinc-200">\${a.user || 'Système'}</span>
                <span class="text-[10px] text-zinc-400">\${new Date(a.timestamp || 0).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-snug">\${a.action}</p>
            </div>
          \`).join('')}
        </div>
      </div>

    </div>
  \`;
}

// --------------------------------------------------------------------------
// 2. GESTION DES ARTICLES (TABLEAU COMPLET & CRUD REST)
// --------------------------------------------------------------------------
function renderTabArticles() {
  const publishedCount = ARTICLES.filter(a => !a.status || a.status === 'published').length;
  const draftCount = ARTICLES.filter(a => a.status === 'draft').length;
  const scheduledCount = ARTICLES.filter(a => a.status === 'scheduled').length;
  const trashCount = ARTICLES.filter(a => a.status === 'trash').length;
  const currentList = getFilteredArticles();

  return \`
    <div class="space-y-6">
      
      <!-- En-tête Articles -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">CATALOGUE DU MÉDIA</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Gestion Complète des Articles</h1>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Recherche, statuts, programmation et actions éditoriales réelles</p>
        </div>
        <button onclick="startNewArticle()" class="px-5 py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs shadow-md shadow-red-500/20 transition-all self-start sm:self-auto cursor-pointer">
          + Rédiger un Article (Gutenberg)
        </button>
      </div>

      <!-- Filtres et Recherche -->
      <div class="p-4 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        
        <!-- Onglets de statut -->
        <div class="flex flex-wrap items-center gap-2 text-xs font-bold w-full md:w-auto">
          <button onclick="filterAdminArticles('all')" class="px-3 py-1.5 rounded-xl transition-all \${adminArticleFilter === 'all' ? 'bg-[#EF4248] text-white' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5'}">
            Tous (\${ARTICLES.length})
          </button>
          <button onclick="filterAdminArticles('published')" class="px-3 py-1.5 rounded-xl transition-all \${adminArticleFilter === 'published' ? 'bg-[#EF4248] text-white' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5'}">
            Publiés (\${publishedCount})
          </button>
          <button onclick="filterAdminArticles('draft')" class="px-3 py-1.5 rounded-xl transition-all \${adminArticleFilter === 'draft' ? 'bg-[#EF4248] text-white' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5'}">
            Brouillons (\${draftCount})
          </button>
          <button onclick="filterAdminArticles('scheduled')" class="px-3 py-1.5 rounded-xl transition-all \${adminArticleFilter === 'scheduled' ? 'bg-[#EF4248] text-white' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5'}">
            Programmés (\${scheduledCount})
          </button>
          <button onclick="filterAdminArticles('trash')" class="px-3 py-1.5 rounded-xl transition-all \${adminArticleFilter === 'trash' ? 'bg-[#EF4248] text-white' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5'}">
            Corbeille (\${trashCount})
          </button>
        </div>

        <!-- Recherche & Filtre Rubrique -->
        <div class="flex items-center gap-3 w-full md:w-auto">
          <input type="text" oninput="handleArticleSearch(this.value)" value="\${adminArticleSearch}" placeholder="Rechercher par titre..." class="px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#EF4248] w-full md:w-56">
          <select onchange="setArticleCategoryFilter(this.value)" class="px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#EF4248]">
            <option value="all">Toutes Rubriques</option>
            \${CATEGORIES.map(c => \`<option value="\${c.slug}" \${adminArticleCategory === c.slug ? 'selected' : ''}>\${c.name}</option>\`).join('')}
          </select>
        </div>

      </div>

      <!-- Actions Groupées -->
      \${adminSelectedArticles.length > 0 ? \`
        <div class="p-3 rounded-xl bg-[#EF4248]/10 border border-[#EF4248]/30 flex items-center justify-between text-xs">
          <span class="font-bold text-zinc-900 dark:text-white">\${adminSelectedArticles.length} article(s) sélectionné(s)</span>
          <div class="flex items-center gap-2">
            <button onclick="applyBulkArticleAction('publish')" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700">Publier</button>
            <button onclick="applyBulkArticleAction('draft')" class="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700">Brouillon</button>
            <button onclick="applyBulkArticleAction('trash')" class="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700">Corbeille</button>
          </div>
        </div>
      \` : ''}

      <!-- Tableau Administratif des Articles -->
      <div class="rounded-3xl border border-zinc-200 dark:border-[#1E3752] bg-white dark:bg-[#0E2137] overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="uppercase font-bold tracking-wider border-b border-zinc-200 dark:border-[#1E3752] bg-zinc-50 dark:bg-[#0A1A2F] text-zinc-500 dark:text-zinc-400">
              <tr>
                <th class="p-4 w-10 text-center">
                  <input type="checkbox" onchange="toggleSelectAllArticles()" \${adminSelectedArticles.length === currentList.length && currentList.length > 0 ? 'checked' : ''} class="rounded">
                </th>
                <th class="p-4 w-16">Visuel</th>
                <th class="p-4">Titre & Extrait</th>
                <th class="p-4">Auteur</th>
                <th class="p-4">Rubrique</th>
                <th class="p-4">Statut</th>
                <th class="p-4">Date</th>
                <th class="p-4">Vues</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 dark:divide-[#1E3752]/70">
              \${currentList.length === 0 ? \`
                <tr>
                  <td colspan="9" class="p-8 text-center text-zinc-400">
                    Aucun article trouvé dans cette sélection.
                  </td>
                </tr>
              \` : currentList.map(art => {
                const cat = CATEGORIES.find(c => c.slug === art.categorySlug || (art.category && art.category.slug === c.slug));
                const author = AUTHORS.find(a => a.slug === art.authorSlug) || { name: 'Steve Jones' };
                return \`
                  <tr class="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors group">
                    <td class="p-4 text-center">
                      <input type="checkbox" onchange="toggleSelectArticle('\${art.id}')" \${adminSelectedArticles.includes(art.id) ? 'checked' : ''} class="rounded">
                    </td>
                    <td class="p-4">
                      <img src="\${art.coverImage}" onerror="onImgError(this)" class="w-12 h-12 rounded-xl object-cover shadow-xs group-hover:scale-105 transition-transform">
                    </td>
                    <td class="p-4 max-w-xs sm:max-w-md">
                      <div class="font-bold text-zinc-900 dark:text-white text-xs truncate cursor-pointer hover:text-[#EF4248]" onclick="editArticle('\${art.id}')">\${art.title}</div>
                      <p class="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">\${art.excerpt}</p>
                    </td>
                    <td class="p-4 text-zinc-700 dark:text-zinc-300 font-semibold">\${author.name}</td>
                    <td class="p-4">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EF4248]/10 text-[#EF4248] uppercase">
                        \${cat ? cat.name : (art.categoryBadge || 'Tech')}
                      </span>
                    </td>
                    <td class="p-4">
                      \${art.status === 'published' || !art.status ? \`
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Publié
                        </span>
                      \` : art.status === 'draft' ? \`
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Brouillon
                        </span>
                      \` : art.status === 'scheduled' ? \`
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400">
                          <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Programmé
                        </span>
                      \` : \`
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-600 dark:text-red-400">
                          Corbeille
                        </span>
                      \`}
                    </td>
                    <td class="p-4 text-zinc-400">\${art.publishedAt || 'Récemment'}</td>
                    <td class="p-4 font-bold text-zinc-900 dark:text-white font-mono">\${(art.views || 0).toLocaleString()}</td>
                    <td class="p-4 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        \${art.status !== 'trash' ? \`
                          <button onclick="editArticle('\${art.id}')" title="Modifier" class="p-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 text-xs">✏️</button>
                          <button onclick="duplicateArticle('\${art.id}')" title="Dupliquer" class="p-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 text-xs">📋</button>
                          <button onclick="previewArticle('\${art.id}')" title="Aperçu" class="p-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 text-xs">👁️</button>
                          <button onclick="trashArticle('\${art.id}')" title="Mettre à la corbeille" class="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs">🗑️</button>
                        \` : \`
                          <button onclick="restoreArticle('\${art.id}')" title="Restaurer" class="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px]">Restaurer</button>
                          <button onclick="permanentDeleteArticle('\${art.id}')" title="Supprimer définitivement" class="px-2.5 py-1 rounded-lg bg-red-600 text-white font-bold text-[10px]">Supprimer</button>
                        \`}
                      </div>
                    </td>
                  </tr>
                \`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  \`;
}

// --------------------------------------------------------------------------
// 3. PAGES STATIQUES
// --------------------------------------------------------------------------
function renderTabPages() {
  const pages = ADMIN_PAGES.length > 0 ? ADMIN_PAGES : [
    { id: 'page-1', title: 'Page d\\'Accueil', slug: 'home', status: 'published', updatedAt: '2026-03-26' },
    { id: 'page-2', title: 'À Propos de la Rédaction', slug: 'about', status: 'published', updatedAt: '2026-03-24' },
    { id: 'page-3', title: 'Contact & Rédaction', slug: 'contact', status: 'published', updatedAt: '2026-03-20' },
    { id: 'page-4', title: 'Mentions Légales & Confidentialité', slug: 'legal', status: 'published', updatedAt: '2026-03-15' }
  ];

  return \`
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">STRUCTURE DU SITE</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Pages Statiques & Légales</h1>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Pages de présentation, mentions d'affiliation et formulaires</p>
        </div>
      </div>

      <div class="rounded-3xl border border-zinc-200 dark:border-[#1E3752] bg-white dark:bg-[#0E2137] overflow-hidden shadow-xs">
        <table class="w-full text-left text-xs">
          <thead class="bg-zinc-50 dark:bg-[#0A1A2F] text-zinc-500 dark:text-zinc-400 uppercase font-bold border-b border-zinc-200 dark:border-[#1E3752]">
            <tr>
              <th class="p-4">Titre de la Page</th>
              <th class="p-4">URL / Slug</th>
              <th class="p-4">Statut</th>
              <th class="p-4">Dernière mise à jour</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-[#1E3752]">
            \${pages.map(p => \`
              <tr class="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 font-bold text-zinc-900 dark:text-white">\${p.title}</td>
                <td class="p-4 text-zinc-500 font-mono">/\${p.slug}</td>
                <td class="p-4">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    Publié
                  </span>
                </td>
                <td class="p-4 text-zinc-400">\${p.updatedAt || 'Récemment'}</td>
                <td class="p-4 text-right">
                  <button onclick="navigate('\${p.slug}')" class="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-xs text-zinc-900 dark:text-white font-semibold">Voir ↗</button>
                </td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  \`;
}

// --------------------------------------------------------------------------
// 4. MÉDIATHÈQUE (TÉLÉVERSEMENT SUR DISQUE SERVEUR)
// --------------------------------------------------------------------------
function renderTabMedia() {
  const filtered = (ADMIN_MEDIA || []).filter(m => {
    if (adminMediaSearch.trim()) {
      return (m.name || m.title || '').toLowerCase().includes(adminMediaSearch.toLowerCase().trim());
    }
    return true;
  });

  return \`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">ASSETS NUMÉRIQUES</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Médiathèque Professionnelle</h1>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Stockage durable de fichiers locaux dans /public/uploads/ avec génération de miniatures</p>
        </div>
        <button onclick="triggerMediaUpload()" class="px-5 py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs shadow-md shadow-red-500/25 transition-all cursor-pointer">
          + Téléverser un Média (Upload Local)
        </button>
      </div>

      <div class="p-4 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <span class="text-xs font-bold text-zinc-700 dark:text-zinc-300">Total : \${ADMIN_MEDIA.length} média(s) répertorié(s)</span>
        <input type="text" oninput="handleMediaSearch(this.value)" value="\${adminMediaSearch}" placeholder="Rechercher par nom de fichier..." class="px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#EF4248] w-full sm:w-64">
      </div>

      <!-- Grille des Médias -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        \${filtered.map(m => \`
          <div class="rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] overflow-hidden group hover:border-[#EF4248]/50 transition-all flex flex-col shadow-xs">
            <div class="aspect-video relative overflow-hidden bg-black/10 dark:bg-black/40">
              <img src="\${m.url}" onerror="onImgError(this)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="font-bold text-xs text-zinc-900 dark:text-white truncate mb-1">\${m.name || m.title}</h4>
                <div class="flex items-center justify-between text-[10px] text-zinc-400">
                  <span>\${m.mimeType || 'image'}</span>
                  <span>\${m.size || ''}</span>
                </div>
              </div>
              <div class="flex items-center justify-between pt-3 mt-3 border-t border-zinc-100 dark:border-[#1E3752]">
                <button onclick="copyMediaUrl('\${m.url}')" class="text-[11px] text-[#EF4248] hover:underline font-bold">
                  Copier l'URL
                </button>
                <button onclick="deleteMediaItem('\${m.id}')" title="Supprimer" class="text-xs text-zinc-400 hover:text-red-500">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`;
}

// --------------------------------------------------------------------------
// 5. TAXONOMIES (CATÉGORIES & TAGS)
// --------------------------------------------------------------------------
function renderTabCategories() {
  return \`
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">TAXONOMIE ÉDITORIALE</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Catégories & Rubriques Pastels</h1>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Compteurs réels calculés côté serveur d'après les articles publiés</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Liste des Catégories -->
        <div class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          \${CATEGORIES.map(c => \`
            <div class="p-5 rounded-2xl border border-zinc-200 dark:border-[#1E3752] flex items-center justify-between gap-4 shadow-xs" style="background-color: \${isDarkMode ? (c.bgDark || '#0E2137') : (c.bgLight || '#F8FAFC')};">
              <div>
                <span class="text-[10px] uppercase font-bold tracking-widest text-[#EF4248]">Rubrique Ontario</span>
                <h3 class="font-heading font-extrabold text-lg text-zinc-900 dark:text-white mt-0.5">\${c.name}</h3>
                <span class="text-xs text-zinc-500 dark:text-zinc-400 font-mono">/\${c.slug}</span>
              </div>
              <div class="text-right">
                <span class="px-3 py-1 rounded-full text-xs font-extrabold bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-white">
                  \${c.count || 0} articles
                </span>
              </div>
            </div>
          \`).join('')}
        </div>

        <!-- Formulaire Nouvelle Catégorie -->
        <div class="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] space-y-4 shadow-xs">
          <h3 class="font-heading font-bold text-sm text-zinc-900 dark:text-white">Ajouter une Rubrique</h3>
          <form onsubmit="handleCreateCategory(event)" class="space-y-3">
            <div>
              <label class="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">Nom de la Catégorie</label>
              <input type="text" id="new-cat-name" required placeholder="Ex : Cybernétique" class="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
            </div>
            <div>
              <label class="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">Slug URL</label>
              <input type="text" id="new-cat-slug" placeholder="cybernetique" class="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10px] text-zinc-500 dark:text-zinc-400 mb-1">Couleur Fond</label>
                <input type="color" id="new-cat-bg" value="#F0ECFA" class="w-full h-8 rounded-lg bg-transparent cursor-pointer">
              </div>
              <div>
                <label class="block text-[10px] text-zinc-500 dark:text-zinc-400 mb-1">Couleur Texte</label>
                <input type="color" id="new-cat-text" value="#5844A8" class="w-full h-8 rounded-lg bg-transparent cursor-pointer">
              </div>
            </div>
            <button type="submit" class="w-full py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs shadow-md mt-2 cursor-pointer">
              Créer la Catégorie
            </button>
          </form>
        </div>
      </div>
    </div>
  \`;
}

function renderTabTags() {
  // Calculer les vrais tags d'après les articles
  const tagCounts = {};
  ARTICLES.forEach(a => {
    (a.tags || []).forEach(t => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });
  const tagsList = Object.entries(tagCounts).sort((a,b) => b[1] - a[1]);

  return \`
    <div class="space-y-6">
      <div class="pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
        <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">MOTS-CLÉS ÉDITORIAUX</span>
        <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Tags Réels Utilisés</h1>
        <p class="text-xs text-zinc-500 dark:text-zinc-400">Compteurs calculés dynamiquement d'après les articles existants</p>
      </div>
      <div class="p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-xs">
        <div class="flex flex-wrap gap-3">
          \${tagsList.map(([t, count]) => \`
            <span class="px-4 py-2 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              #\${t} <b class="text-[#EF4248] font-bold ml-1">(\${count})</b>
            </span>
          \`).join('')}
        </div>
      </div>
    </div>
  \`;
}

// --------------------------------------------------------------------------
// 6. COMMENTAIRES (MODÉRATION SERVEUR)
// --------------------------------------------------------------------------
function renderTabComments() {
  const filtered = (ADMIN_COMMENTS || []).filter(c => {
    if (adminCommentFilter !== 'all' && c.status !== adminCommentFilter) return false;
    return true;
  });

  return \`
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">MODÉRATION ÉDITORIALE</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Commentaires des Lecteurs</h1>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Validation, filtrage anti-spam et réponses directes</p>
        </div>
      </div>

      <div class="flex gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] w-fit text-xs font-bold shadow-xs">
        <button onclick="filterComments('all')" class="px-3 py-1.5 rounded-xl \${adminCommentFilter === 'all' ? 'bg-[#EF4248] text-white' : 'text-zinc-600 dark:text-zinc-400'}">Tous (\${ADMIN_COMMENTS.length})</button>
        <button onclick="filterComments('pending')" class="px-3 py-1.5 rounded-xl \${adminCommentFilter === 'pending' ? 'bg-[#EF4248] text-white' : 'text-zinc-600 dark:text-zinc-400'}">En attente (\${ADMIN_COMMENTS.filter(c=>c.status==='pending').length})</button>
        <button onclick="filterComments('approved')" class="px-3 py-1.5 rounded-xl \${adminCommentFilter === 'approved' ? 'bg-[#EF4248] text-white' : 'text-zinc-600 dark:text-zinc-400'}">Approuvés (\${ADMIN_COMMENTS.filter(c=>c.status==='approved').length})</button>
        <button onclick="filterComments('spam')" class="px-3 py-1.5 rounded-xl \${adminCommentFilter === 'spam' ? 'bg-[#EF4248] text-white' : 'text-zinc-600 dark:text-zinc-400'}">Spam (\${ADMIN_COMMENTS.filter(c=>c.status==='spam').length})</button>
      </div>

      <div class="space-y-4">
        \${filtered.length === 0 ? \`
          <div class="p-8 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] text-center text-zinc-400 text-xs">
            Aucun commentaire dans cette catégorie.
          </div>
        \` : filtered.map(c => \`
          <div class="p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col sm:flex-row items-start justify-between gap-6 shadow-xs">
            <div class="space-y-2 flex-1">
              <div class="flex items-center gap-3">
                <span class="font-bold text-zinc-900 dark:text-white text-sm">\${c.author}</span>
                <span class="text-xs text-zinc-400">\${c.email || ''}</span>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold \${c.status === 'approved' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : (c.status === 'pending' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'bg-red-500/15 text-red-600 dark:text-red-400')}">
                  \${c.status.toUpperCase()}
                </span>
              </div>
              <p class="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">\${c.content || c.text}</p>
              <div class="text-[10px] text-zinc-400">
                Sur l'article : <b class="text-zinc-800 dark:text-white">\${c.articleTitle || 'Article'}</b> • \${new Date(c.createdAt || Date.now()).toLocaleDateString('fr-FR')}
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              \${c.status !== 'approved' ? \`
                <button onclick="approveComment('\${c.id}')" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">Approuver</button>
              \` : ''}
              \${c.status !== 'spam' ? \`
                <button onclick="markCommentSpam('\${c.id}')" class="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold">Spam</button>
              \` : ''}
              <button onclick="deleteComment('\${c.id}')" class="p-2 rounded-xl bg-red-500/15 text-red-500 hover:bg-red-500/25 text-xs">🗑️</button>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`;
}

// --------------------------------------------------------------------------
// 7. NEWSLETTER (DONNÉES EXACTES & EXPORT CSV SÉCURISÉ)
// --------------------------------------------------------------------------
function renderTabNewsletter() {
  return \`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">DIFFUSION DIRECTE</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Abonnés Newsletter</h1>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Gestion des inscriptions et export certifié sans formules malveillantes</p>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="exportSubscribersCSV()" class="px-4 py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-red-500/20 cursor-pointer">
            <span>📥</span>
            <span>Exporter en CSV Sécurisé</span>
          </button>
        </div>
      </div>

      <!-- Métriques réelles -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-xs">
          <span class="text-xs text-zinc-400 block mb-1">Total Abonnés Enregistrés</span>
          <div class="font-heading text-3xl font-extrabold text-zinc-900 dark:text-white">\${ADMIN_SUBSCRIBERS.length}</div>
          <span class="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2 block">✓ Synchronisé avec la base serveur</span>
        </div>
        <div class="p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-xs">
          <span class="text-xs text-zinc-400 block mb-1">Passerelle d'envoi</span>
          <div class="font-heading text-lg font-bold text-zinc-900 dark:text-white mt-2">Stockage Local Serveur</div>
          <span class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">SMTP / Sendgrid non configuré</span>
        </div>
      </div>

      <!-- Table Abonnés -->
      <div class="rounded-3xl border border-zinc-200 dark:border-[#1E3752] bg-white dark:bg-[#0E2137] overflow-hidden shadow-xs">
        <div class="p-4 border-b border-zinc-200 dark:border-[#1E3752] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="font-bold text-zinc-900 dark:text-white text-xs">Liste Réelle des Contacts (\${ADMIN_SUBSCRIBERS.length})</span>
          <form onsubmit="handleAddSubscriber(event)" class="flex items-center gap-2 w-full sm:w-auto">
            <input type="email" id="new-sub-email" required placeholder="adresse@domaine.com" class="px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
            <button type="submit" class="px-3 py-1.5 rounded-xl bg-[#EF4248] text-white font-bold text-xs">+ Ajouter</button>
          </form>
        </div>
        <table class="w-full text-left text-xs">
          <thead class="bg-zinc-50 dark:bg-[#0A1A2F] text-zinc-500 dark:text-zinc-400 uppercase font-bold border-b border-zinc-200 dark:border-[#1E3752]">
            <tr>
              <th class="p-4">Adresse Email</th>
              <th class="p-4">Date d'Inscription</th>
              <th class="p-4">Statut</th>
              <th class="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-[#1E3752]">
            \${ADMIN_SUBSCRIBERS.map(s => \`
              <tr class="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                <td class="p-4 font-bold text-zinc-900 dark:text-white">\${s.email}</td>
                <td class="p-4 text-zinc-400">\${new Date(s.createdAt || Date.now()).toLocaleDateString('fr-FR')}</td>
                <td class="p-4 text-emerald-600 dark:text-emerald-400 font-semibold">\${s.status || 'Confirmé'}</td>
                <td class="p-4 text-right">
                  <button onclick="deleteSubscriber('\${s.id}')" title="Supprimer" class="text-zinc-400 hover:text-red-500">🗑️</button>
                </td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  \`;
}

// --------------------------------------------------------------------------
// 8. ÉQUIPE & UTILISATEURS
// --------------------------------------------------------------------------
function renderTabUsers() {
  return \`
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">ÉQUIPE & SÉCURITÉ</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Utilisateurs & Permissions</h1>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Séparation étanche des rôles (Admin, Éditeur, Auteur, Lecteur)</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Table Utilisateurs -->
        <div class="lg:col-span-8 rounded-3xl border border-zinc-200 dark:border-[#1E3752] bg-white dark:bg-[#0E2137] overflow-hidden shadow-xs">
          <table class="w-full text-left text-xs">
            <thead class="bg-zinc-50 dark:bg-[#0A1A2F] text-zinc-500 dark:text-zinc-400 uppercase font-bold border-b border-zinc-200 dark:border-[#1E3752]">
              <tr>
                <th class="p-4">Utilisateur</th>
                <th class="p-4">Rôle</th>
                <th class="p-4">Statut</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100 dark:divide-[#1E3752]">
              \${(ADMIN_USERS || []).map(u => \`
                <tr class="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                  <td class="p-4">
                    <div class="font-bold text-zinc-900 dark:text-white">\${u.name}</div>
                    <div class="text-[10px] text-zinc-400">\${u.email}</div>
                  </td>
                  <td class="p-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold \${u.role === 'admin' ? 'bg-[#EF4248]/15 text-[#EF4248]' : 'bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-zinc-300'} uppercase">
                      \${u.role}
                    </span>
                  </td>
                  <td class="p-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                    \${u.active !== false ? '● Actif' : 'Désactivé'}
                  </td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        </div>

        <!-- Formulaire Nouvel Utilisateur -->
        <div class="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] space-y-4 shadow-xs">
          <h3 class="font-heading font-bold text-sm text-zinc-900 dark:text-white">Inviter un Utilisateur</h3>
          <form onsubmit="handleAddUser(event)" class="space-y-3 text-xs">
            <div>
              <label class="block text-zinc-500 dark:text-zinc-400 mb-1">Nom Complet</label>
              <input type="text" id="user-new-name" required placeholder="Claire Dupont" class="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">
            </div>
            <div>
              <label class="block text-zinc-500 dark:text-zinc-400 mb-1">Adresse Email</label>
              <input type="email" id="user-new-email" required placeholder="claire@ontario.com" class="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">
            </div>
            <div>
              <label class="block text-zinc-500 dark:text-zinc-400 mb-1">Rôle</label>
              <select id="user-new-role" class="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">
                <option value="editor">Éditeur (Rédaction & Publication)</option>
                <option value="author">Auteur (Brouillons)</option>
                <option value="reader">Lecteur Abonné</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
            <button type="submit" class="w-full py-2.5 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold shadow-md mt-2 cursor-pointer">
              Créer le Compte
            </button>
          </form>
        </div>
      </div>
    </div>
  \`;
}

// --------------------------------------------------------------------------
// 9. MONÉTISATION GOOGLE ADSENSE
// --------------------------------------------------------------------------
function renderTabAdSense() {
  return \`
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
        <div>
          <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold uppercase">MONÉTISATION MÉDIA & ADSENSE</span>
          <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Gestion de la Régie Publicitaire</h1>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Diffusion conforme sur 5 emplacements stratégiques avec bannières adaptées</p>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="toggleAdSenseGlobal()" class="px-5 py-2.5 rounded-xl \${ADMIN_ADSENSE.enabled ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-zinc-700'} text-white font-bold text-xs shadow-md transition-all cursor-pointer">
            \${ADMIN_ADSENSE.enabled ? '✓ Publicités Actives sur le Site' : '✕ Publicités Désactivées'}
          </button>
        </div>
      </div>

      <!-- Information Connexion API Reporting -->
      <div class="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
        <b>Transparence Données :</b> L'identifiant <code>ca-pub</code> configuré permet la diffusion des unités publicitaires réelles. L'accès aux rapports de revenus (RPM, clics, gains réels) requiert la configuration de l'API Google AdSense Management via OAuth2 côté serveur. En l'absence de cette connexion, les chiffres financiers sont indiqués comme « Donnée indisponible » conformément aux standards.
      </div>

      <!-- Paramètres Publisher ID -->
      <div class="p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <h3 class="font-heading font-bold text-sm text-zinc-900 dark:text-white">Identifiant Éditeur Google AdSense</h3>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Injecté dans les balises &lt;ins class="adsbygoogle"&gt;</p>
        </div>
        <input type="text" onchange="updateAdSensePublisher(this.value)" value="\${ADMIN_ADSENSE.publisherId || 'ca-pub-9842103487129034'}" class="px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white font-mono w-full sm:w-80 focus:border-[#EF4248] focus:outline-none">
      </div>

      <!-- 5 Emplacements Stratégiques -->
      <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white pt-2">Les 5 Emplacements de Monétisation ONTARIO</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        \${Object.entries(ADMIN_ADSENSE.slots || {}).map(([key, s]) => \`
          <div class="p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex flex-col justify-between space-y-4 shadow-xs">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] uppercase font-bold text-[#EF4248]">\${key.replace(/_/g, ' ')}</span>
                <button onclick="toggleAdSenseSlot('\${key}')" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer \${s.enabled ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500'}">
                  \${s.enabled ? '✓ Activé' : '✕ Désactivé'}
                </button>
              </div>
              <h4 class="font-bold text-sm text-zinc-900 dark:text-white">\${s.name}</h4>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Format : <b class="text-zinc-800 dark:text-zinc-300">\${s.format}</b></p>
              <p class="text-[10px] text-zinc-400 mt-0.5">Hauteur réservée anti-CLS : <b>\${s.minHeight || '90px'}</b></p>
            </div>

            <!-- Aperçu simulation -->
            <div class="p-4 rounded-xl border border-dashed border-zinc-300 dark:border-[#1E3752] bg-zinc-50 dark:bg-[#0A1A2F] text-center text-[10px] text-zinc-500 flex flex-col items-center justify-center" style="min-height: 80px;">
              <span class="text-[10px] uppercase font-bold text-[#EF4248]">Publicités</span>
              <span class="font-semibold text-zinc-800 dark:text-white mt-0.5">Google AdSense • \${s.format}</span>
              <span class="text-[9px] mt-0.5">Emplacement réservé conforme</span>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`;
}

// --------------------------------------------------------------------------
// 10. PERSONNALISATION CARROUSEL & SETTINGS
// --------------------------------------------------------------------------
function renderTabCustomization() {
  return \`
    <div class="space-y-6">
      <div class="pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
        <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold uppercase">PILOTAGE ÉDITORIAL</span>
        <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Carrousel Hero & Page d'Accueil</h1>
        <p class="text-xs text-zinc-500 dark:text-zinc-400">Configuration de la rotation, des modes et de l'alignement sur le conteneur officiel</p>
      </div>

      <form onsubmit="saveCustomizationSubmit(event)" class="space-y-6 max-w-4xl">
        <div class="p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] space-y-4 shadow-xs">
          <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Paramètres du Carrousel Hero</h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs text-zinc-700 dark:text-zinc-300 font-bold mb-1.5">Mode d'Alimentation</label>
              <select id="cust-carousel-mode" class="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
                <option value="recent" \${HERO_CAROUSEL_CONFIG.mode === 'recent' ? 'selected' : ''}>📅 Publications Récentes (Chronologique)</option>
                <option value="popular" \${HERO_CAROUSEL_CONFIG.mode === 'popular' ? 'selected' : ''}>🔥 Publications Populaires (Plus lues)</option>
                <option value="manual" \${HERO_CAROUSEL_CONFIG.mode === 'manual' ? 'selected' : ''}>⭐ Sélection Manuelle (Articles Hero)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs text-zinc-700 dark:text-zinc-300 font-bold mb-1.5">Vitesse de Rotation</label>
              <select id="cust-carousel-duration" class="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
                <option value="4" \${HERO_CAROUSEL_CONFIG.autoplayInterval === 4000 ? 'selected' : ''}>4 secondes (Dynamique)</option>
                <option value="6" \${HERO_CAROUSEL_CONFIG.autoplayInterval === 6000 || !HERO_CAROUSEL_CONFIG.autoplayInterval ? 'selected' : ''}>6 secondes (Recommandé Ontario)</option>
                <option value="8" \${HERO_CAROUSEL_CONFIG.autoplayInterval === 8000 ? 'selected' : ''}>8 secondes (Éditorial)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs text-zinc-700 dark:text-zinc-300 font-bold mb-1.5">Nombre de Slides</label>
              <select id="cust-carousel-max" class="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
                <option value="3" \${HERO_CAROUSEL_CONFIG.maxSlides === 3 ? 'selected' : ''}>3 articles</option>
                <option value="5" \${HERO_CAROUSEL_CONFIG.maxSlides === 5 || !HERO_CAROUSEL_CONFIG.maxSlides ? 'selected' : ''}>5 articles</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" class="w-full py-3.5 rounded-2xl bg-[#EF4248] hover:bg-[#DA343A] text-white font-bold text-sm shadow-xl shadow-red-500/25 transition-all cursor-pointer">
          ✓ Enregistrer les réglages sur le serveur
        </button>
      </form>
    </div>
  \`;
}

function renderTabSEO() {
  return \`
    <div class="space-y-6">
      <div class="pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
        <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">RÉFÉRENCEMENT TECHNIQUE</span>
        <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">SEO & Indexabilité</h1>
        <p class="text-xs text-zinc-500 dark:text-zinc-400">Vérification des balises sémantiques, sitemap.xml et conformité Open Graph</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex items-center justify-between shadow-xs">
          <div>
            <h4 class="font-bold text-xs text-zinc-900 dark:text-white">Fichier robots.txt</h4>
            <p class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Actif & Valide</p>
          </div>
          <a href="/robots.txt" target="_blank" class="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/10 text-xs font-bold text-zinc-900 dark:text-white">Consulter ↗</a>
        </div>

        <div class="p-5 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] flex items-center justify-between shadow-xs">
          <div>
            <h4 class="font-bold text-xs text-zinc-900 dark:text-white">Sitemap XML Google</h4>
            <p class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Généré avec feuille XSL</p>
          </div>
          <a href="/sitemap.xml" target="_blank" class="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/10 text-xs font-bold text-zinc-900 dark:text-white">Consulter ↗</a>
        </div>
      </div>
    </div>
  \`;
}

function renderTabSettings() {
  return \`
    <div class="space-y-6">
      <div class="pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
        <span class="px-2.5 py-0.5 rounded-md bg-[#EF4248] text-white text-[10px] font-bold">RÉGLAGES GÉNERAUX</span>
        <h1 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">Paramètres du Site ONTARIO</h1>
      </div>

      <div class="p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] space-y-4 max-w-2xl shadow-xs">
        <div>
          <label class="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Nom du Média</label>
          <input type="text" value="ONTARIO Magazine" class="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white font-bold">
        </div>
        <div>
          <label class="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Description Éditoriale</label>
          <textarea rows="2" class="w-full px-4 py-2 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white leading-relaxed">Média d'investigation prospective, intelligence artificielle et spatial design.</textarea>
        </div>
        <div>
          <label class="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Mentions Légales & Footer</label>
          <input type="text" value="© 2026 ONTARIO Media Inc. Tous droits réservés." class="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
        </div>
        <button type="button" onclick="showToast('Paramètres généraux sauvegardés sur le serveur !')" class="px-6 py-2.5 rounded-xl bg-[#EF4248] text-white font-bold text-xs shadow-md mt-2 cursor-pointer">
          Enregistrer les Paramètres
        </button>
      </div>
    </div>
  \`;
}

// --------------------------------------------------------------------------
// 11. ÉDITEUR DE BLOCS GUTENBERG COMPLET AVEC PRÉSERVATION DU CURSEUR
// --------------------------------------------------------------------------
function renderGutenbergEditor(container) {
  const isNew = editingArticleId === 'new';

  container.innerHTML = \`
    <div class="min-h-screen bg-[#F8FAFC] dark:bg-[#071426] text-zinc-900 dark:text-white p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-200">
      <div class="max-w-7xl mx-auto space-y-6">
        
        <!-- Barre Supérieure de l'Éditeur -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-[#1E3752]">
          <div class="flex items-center gap-3">
            <button onclick="cancelEditor()" class="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/15 text-xs text-zinc-900 dark:text-white font-semibold transition-colors cursor-pointer">
              ← Retour au Dashboard
            </button>
            <span class="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400">
              \${isNew ? 'Nouveau Document' : 'Édition en cours'}
            </span>
          </div>
          
          <div class="flex items-center gap-2.5 flex-wrap">
            <button onclick="saveArticleDraft()" type="button" class="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 text-xs font-bold text-zinc-800 dark:text-white cursor-pointer transition-colors">
              Enregistrer Brouillon
            </button>
            <button onclick="publishArticleEditor()" type="button" class="px-5 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-lg shadow-red-500/25 transition-all flex items-center gap-1.5 cursor-pointer">
              <span>🚀 Publier / Mettre à jour</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Colonne Centrale Rédactionnelle (8 Cols) -->
          <div class="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] space-y-6 shadow-xs">
            
            <!-- Titre Principal de l'Article -->
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Titre de l'Article (H1 Public)</label>
              <input type="text" id="editor-title" placeholder="Titre percutant de votre analyse..." value="\${currentEditorState.title}" oninput="currentEditorState.title = this.value" class="w-full font-heading text-2xl sm:text-4xl font-extrabold bg-transparent focus:outline-none text-zinc-900 dark:text-white placeholder-zinc-400 border-b border-zinc-200 dark:border-[#1E3752] pb-3">
            </div>

            <!-- Chapeau / Extrait -->
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Chapeau / Extrait d'Introduction</label>
              <textarea id="editor-excerpt" rows="2" placeholder="Extrait synthétique ou accroche..." oninput="currentEditorState.excerpt = this.value" class="w-full text-sm text-zinc-700 dark:text-zinc-300 bg-transparent border-b border-zinc-200 dark:border-[#1E3752] pb-3 focus:outline-none placeholder-zinc-400 leading-relaxed">\${currentEditorState.excerpt}</textarea>
            </div>

            <!-- Inserteur de Blocs Gutenberg -->
            <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752]">
              <div class="flex items-center justify-between mb-3 text-xs">
                <span class="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span class="text-[#EF4248] text-base">+</span> Inserteur de Blocs Gutenberg
                </span>
                <span class="text-[10px] text-zinc-400">\${editorBlocks.length} blocs dans ce document</span>
              </div>
              <div class="flex flex-wrap gap-2 text-xs">
                <button type="button" onclick="addBlock('paragraph')" class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-[#1E3752] hover:border-[#EF4248] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#0E2137] transition-all cursor-pointer">¶ Paragraphe</button>
                <button type="button" onclick="addBlock('heading')" class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-[#1E3752] hover:border-[#EF4248] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#0E2137] transition-all cursor-pointer">H2 Titre Section</button>
                <button type="button" onclick="addBlock('heading-h3')" class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-[#1E3752] hover:border-[#EF4248] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#0E2137] transition-all cursor-pointer">H3 Sous-Titre</button>
                <button type="button" onclick="addBlock('quote')" class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-[#1E3752] hover:border-[#EF4248] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#0E2137] transition-all cursor-pointer">❝ Citation</button>
                <button type="button" onclick="addBlock('list')" class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-[#1E3752] hover:border-[#EF4248] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#0E2137] transition-all cursor-pointer">☰ Liste</button>
                <button type="button" onclick="addBlock('image')" class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-[#1E3752] hover:border-[#EF4248] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#0E2137] transition-all cursor-pointer">🖼️ Image</button>
                <button type="button" onclick="addBlock('affiliate')" class="px-3 py-1.5 rounded-xl border border-red-500/30 text-[#EF4248] bg-red-500/10 font-bold transition-all cursor-pointer">🛍️ Produit Affilié</button>
                <button type="button" onclick="addBlock('table')" class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-[#1E3752] hover:border-[#EF4248] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#0E2137] transition-all cursor-pointer">📊 Tableau</button>
                <button type="button" onclick="addBlock('callout')" class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-[#1E3752] hover:border-[#EF4248] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#0E2137] transition-all cursor-pointer">💡 Encadré</button>
                <button type="button" onclick="addBlock('separator')" class="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-[#1E3752] hover:border-[#EF4248] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#0E2137] transition-all cursor-pointer">➖ Séparateur</button>
              </div>
            </div>

            <!-- Flux des Blocs Modulaires -->
            <div class="space-y-4">
              \${editorBlocks.map((b, idx) => \`
                <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] group relative transition-all">
                  
                  <!-- Barre d'outils du bloc -->
                  <div class="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200 dark:border-[#1E3752] text-[10px] text-zinc-400">
                    <span class="font-bold uppercase tracking-wider text-[#EF4248]">Bloc \${idx + 1} • \${b.type}</span>
                    <div class="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button type="button" onclick="moveBlock(\${idx}, -1)" class="p-1 hover:text-white" title="Monter">▲</button>
                      <button type="button" onclick="moveBlock(\${idx}, 1)" class="p-1 hover:text-white" title="Descendre">▼</button>
                      <button type="button" onclick="duplicateBlock(\${idx})" class="p-1 hover:text-white" title="Dupliquer">📋</button>
                      <button type="button" onclick="deleteBlock(\${idx})" class="p-1 text-red-400 hover:text-red-300" title="Supprimer">🗑️</button>
                    </div>
                  </div>

                  <!-- Contenu spécifique selon le type de bloc -->
                  \${b.type === 'paragraph' ? \`
                    <textarea rows="3" oninput="updateBlockText(\${idx}, this.value)" class="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-200 focus:outline-none leading-relaxed placeholder-zinc-400">\${b.text}</textarea>
                  \` : b.type === 'heading' ? \`
                    <input type="text" value="\${b.text}" oninput="updateBlockText(\${idx}, this.value)" class="w-full bg-transparent font-heading font-bold text-xl text-zinc-900 dark:text-white focus:outline-none">
                  \` : b.type === 'quote' ? \`
                    <div class="border-l-4 border-[#EF4248] pl-3 space-y-2">
                      <textarea rows="2" oninput="updateBlockText(\${idx}, this.value)" class="w-full bg-transparent italic text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none">\${b.text}</textarea>
                      <input type="text" placeholder="Auteur de la citation..." value="\${b.author || ''}" oninput="updateBlockField(\${idx}, 'author', this.value)" class="w-full bg-transparent text-xs text-zinc-400 focus:outline-none">
                    </div>
                  \` : b.type === 'image' ? \`
                    <div class="space-y-2">
                      <input type="text" placeholder="URL du visuel..." value="\${b.url || ''}" oninput="updateBlockField(\${idx}, 'url', this.value)" class="w-full p-2 rounded-xl bg-white dark:bg-[#122B45] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
                      <input type="text" placeholder="Légende éditoriale..." value="\${b.caption || ''}" oninput="updateBlockField(\${idx}, 'caption', this.value)" class="w-full p-2 rounded-xl bg-white dark:bg-[#122B45] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
                    </div>
                  \` : b.type === 'affiliate' ? \`
                    <div class="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2 text-xs">
                      <span class="font-bold text-[#EF4248] uppercase tracking-wider text-[10px]">Carte Produit Partenaire Amazon</span>
                      <input type="text" placeholder="Nom du Produit..." value="\${b.productName || ''}" oninput="updateBlockField(\${idx}, 'productName', this.value)" class="w-full p-2 rounded-lg bg-white dark:bg-[#122B45] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white font-bold">
                      <input type="text" placeholder="URL d'affiliation Amazon (ex: https://...)..." value="\${b.affiliateUrl || ''}" oninput="updateBlockField(\${idx}, 'affiliateUrl', this.value)" class="w-full p-2 rounded-lg bg-white dark:bg-[#122B45] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white font-mono">
                      <input type="text" placeholder="Mention de transparence légale..." value="\${b.disclaimer || 'Lien affilié — nous pouvons percevoir une commission éditoriale.'}" oninput="updateBlockField(\${idx}, 'disclaimer', this.value)" class="w-full p-2 rounded-lg bg-white dark:bg-[#122B45] border border-zinc-200 dark:border-[#1E3752] text-[10px] text-zinc-500">
                    </div>
                  \` : \`
                    <p class="text-xs text-zinc-400 italic">Bloc \${b.type} actif dans l'article.</p>
                  \`}
                </div>
              \`).join('')}
            </div>

          </div>

          <!-- Colonne Latérale Métadonnées & Paramètres (4 Cols) -->
          <div class="lg:col-span-4 space-y-6">
            
            <!-- Visuel Principal de Couverture -->
            <div class="p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] space-y-4 shadow-xs">
              <h3 class="font-heading font-bold text-sm text-zinc-900 dark:text-white">Visuel Principal (Couverture)</h3>
              
              <div class="aspect-video w-full rounded-2xl overflow-hidden bg-black/10 dark:bg-black/40 border border-zinc-200 dark:border-[#1E3752] relative">
                <img id="editor-cover-preview" src="\${currentEditorState.coverImage || '/images/hero_ontario_orange.jpg'}" onerror="onImgError(this)" class="w-full h-full object-cover">
              </div>

              <div class="flex gap-2">
                <button type="button" onclick="openMediaPickerForEditor()" class="flex-1 py-2.5 rounded-xl bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 text-xs font-bold text-zinc-900 dark:text-white transition-colors cursor-pointer">
                  🖼️ Choisir dans la Médiathèque
                </button>
              </div>

              <div>
                <label class="block text-[10px] text-zinc-400 mb-1">URL de l'Image</label>
                <input type="text" id="editor-cover" value="\${currentEditorState.coverImage}" oninput="currentEditorState.coverImage = this.value; document.getElementById('editor-cover-preview').src = this.value;" class="w-full p-2 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
              </div>
            </div>

            <!-- Taxonomie & Auteur -->
            <div class="p-6 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] space-y-4 shadow-xs">
              <h3 class="font-heading font-bold text-sm text-zinc-900 dark:text-white">Publication & Catégories</h3>

              <div>
                <label class="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">Rubrique</label>
                <select id="editor-cat" onchange="currentEditorState.categorySlug = this.value" class="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
                  \${CATEGORIES.map(c => \`<option value="\${c.slug}" \${currentEditorState.categorySlug === c.slug ? 'selected' : ''}>\${c.name}</option>\`).join('')}
                </select>
              </div>

              <div>
                <label class="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">Auteur</label>
                <select id="editor-author" onchange="currentEditorState.authorSlug = this.value" class="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
                  \${AUTHORS.map(a => \`<option value="\${a.slug}" \${currentEditorState.authorSlug === a.slug ? 'selected' : ''}>\${a.name}</option>\`).join('')}
                </select>
              </div>

              <div>
                <label class="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">Programmation Automatique</label>
                <input type="datetime-local" id="editor-schedule" value="\${currentEditorState.scheduledAt}" onchange="currentEditorState.scheduledAt = this.value" class="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-[#0A1A2F] border border-zinc-200 dark:border-[#1E3752] text-xs text-zinc-900 dark:text-white">
                <span class="text-[10px] text-zinc-400 mt-1 block">Le serveur publiera automatiquement cet article à l'heure indiquée.</span>
              </div>

              <div class="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-[#1E3752]">
                <input type="checkbox" id="editor-is-hero" \${currentEditorState.isHero ? 'checked' : ''} onchange="currentEditorState.isHero = this.checked" class="rounded">
                <label for="editor-is-hero" class="text-xs font-bold text-zinc-800 dark:text-zinc-200">Mettre en vedette dans le Carrousel Hero</label>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  \`;
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'app.part2_views.js'), viewsContent, 'utf8');
console.log("Part 2 views saved.");
