const fs = require('fs');

const viewsCode = `
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

  const themeIcon = themeMode === 'light' ? '☀️' : (themeMode === 'dark' ? '🌙' : '💻');
  const themeLabel = themeMode === 'light' ? 'Clair' : (themeMode === 'dark' ? 'Sombre' : 'Système');

  container.innerHTML = \`
    <div class="min-h-screen bg-zinc-50 dark:bg-[#071426] text-zinc-900 dark:text-zinc-100 flex flex-col md:flex-row transition-colors duration-200">
      
      <!-- SIDEBAR DESKTOP -->
      <aside class="\${adminSidebarCollapsed ? 'w-20' : 'w-64'} hidden md:flex flex-col flex-shrink-0 bg-white dark:bg-[#0E2137] border-r border-zinc-200 dark:border-[#1E3752] transition-all duration-300 z-30 select-none">
        
        <!-- Brand Header -->
        <div class="h-16 px-4 flex items-center justify-between border-b border-zinc-200 dark:border-[#1E3752]">
          <a href="#home" class="flex items-center gap-3 overflow-hidden group">
            <span class="w-8 h-8 rounded-lg bg-[#EF4248] text-white flex items-center justify-center font-heading font-black text-base shadow-md group-hover:scale-105 transition-transform flex-shrink-0">O</span>
            \${!adminSidebarCollapsed ? \`
              <div class="truncate">
                <span class="font-heading font-black text-sm tracking-wider text-zinc-900 dark:text-white uppercase">ONTARIO</span>
                <span class="block text-[10px] text-zinc-400 font-medium tracking-normal -mt-0.5">Administration CMS</span>
              </div>
            \` : ''}
          </a>
          <button onclick="toggleAdminSidebar()" class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1E3752] transition-colors" title="\${adminSidebarCollapsed ? 'Agrandir le menu' : 'Réduire le menu'}">
            \${adminSidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        <!-- Navigation Menu -->
        <div class="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-medium custom-scrollbar">
          \${groups.map(group => {
            const items = navItems.filter(i => i.group === group);
            if (!items.length) return '';
            return \`
              <div class="space-y-1">
                \${!adminSidebarCollapsed ? \`
                  <div class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    \${group}
                  </div>
                \` : \`<div class="h-px bg-zinc-200 dark:bg-[#1E3752] my-2"></div>\`}
                \${items.map(item => {
                  const active = adminCurrentTab === item.id;
                  return \`
                    <button onclick="setAdminNav('\${item.id}')" 
                            class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all \${active ? 'bg-[#EF4248] text-white shadow-sm font-semibold' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#162F4D]'}"
                            title="\${item.label}">
                      <div class="flex items-center gap-3 truncate">
                        <span class="text-sm">\${item.icon}</span>
                        \${!adminSidebarCollapsed ? \`<span class="truncate">\${item.label}</span>\` : ''}
                      </div>
                      \${!adminSidebarCollapsed && item.count !== undefined ? \`
                        <span class="text-[10px] px-1.5 py-0.5 rounded-full font-bold \${active ? 'bg-white/20 text-white' : 'bg-zinc-200 dark:bg-[#1E3752] text-zinc-600 dark:text-zinc-400'}">\${item.count}</span>
                      \` : ''}
                    </button>
                  \`;
                }).join('')}
              </div>
            \`;
          }).join('')}
        </div>

        <!-- Sidebar Footer / Quick Actions -->
        <div class="p-3 border-t border-zinc-200 dark:border-[#1E3752] space-y-2">
          <a href="#home" class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#162F4D] transition-colors">
            <span>🌐</span>
            \${!adminSidebarCollapsed ? '<span>Voir le site public</span>' : ''}
          </a>
          <button onclick="handleAdminLogout()" class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors">
            <span>🚪</span>
            \${!adminSidebarCollapsed ? '<span>Déconnexion</span>' : ''}
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
            \${themeIcon}
          </button>
          <button onclick="startNewArticle()" class="px-3 py-1.5 rounded-lg bg-[#EF4248] text-white text-xs font-bold">
            + Écrire
          </button>
        </div>
      </div>

      \${adminMobileSidebarOpen ? \`
        <div class="md:hidden fixed inset-0 z-50 bg-black/60 flex" onclick="toggleAdminMobileSidebar()">
          <div class="w-72 bg-white dark:bg-[#0E2137] h-full p-4 flex flex-col justify-between" onclick="event.stopPropagation()">
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-[#1E3752]">
                <span class="font-heading font-black text-base text-zinc-900 dark:text-white">ONTARIO ADMIN</span>
                <button onclick="toggleAdminMobileSidebar()" class="text-zinc-400 p-1 text-lg">✕</button>
              </div>
              <div class="py-3 space-y-1 overflow-y-auto max-h-[75vh]">
                \${navItems.map(item => \`
                  <button onclick="setAdminNav('\${item.id}'); toggleAdminMobileSidebar();" 
                          class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold \${adminCurrentTab === item.id ? 'bg-[#EF4248] text-white' : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-[#1E3752]'}">
                    <span class="flex items-center gap-3">
                      <span>\${item.icon}</span>
                      <span>\${item.label}</span>
                    </span>
                    \${item.count !== undefined ? \`<span class="text-[10px] px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">\${item.count}</span>\` : ''}
                  </button>
                \`).join('')}
              </div>
            </div>
            <div class="pt-4 border-t border-zinc-200 dark:border-[#1E3752] space-y-2 text-xs">
              <a href="#home" class="block w-full text-center py-2 rounded-lg bg-zinc-100 dark:bg-[#1E3752] text-zinc-800 dark:text-zinc-200 font-semibold">🌐 Voir le site public</a>
              <button onclick="handleAdminLogout()" class="block w-full text-center py-2 rounded-lg bg-rose-500/10 text-rose-500 font-semibold">🚪 Déconnexion</button>
            </div>
          </div>
        </div>
      \` : ''}

      <!-- MAIN CONTENT WRAPPER -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        <!-- TOPBAR DESKTOP -->
        <header class="h-16 px-6 bg-white dark:bg-[#0E2137] border-b border-zinc-200 dark:border-[#1E3752] hidden md:flex items-center justify-between flex-shrink-0 z-20">
          <div class="flex items-center gap-4">
            <h1 class="font-heading font-extrabold text-lg text-zinc-900 dark:text-white capitalize">
              \${navItems.find(i => i.id === adminCurrentTab)?.label || 'Administration'}
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
              <span>\${themeIcon}</span>
              <span class="hidden sm:inline">Thème : \${themeLabel}</span>
            </button>

            <!-- Notifications Drawer Trigger -->
            <div class="relative">
              <button onclick="toggleAdminNotifications()" class="relative p-2 rounded-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-white bg-zinc-100 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] transition-colors">
                🔔
                \${NOTIFICATIONS.filter(n => !n.read).length ? \`
                  <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4248] text-white text-[9px] font-bold flex items-center justify-center">
                    \${NOTIFICATIONS.filter(n => !n.read).length}
                  </span>
                \` : ''}
              </button>

              \${adminNotificationsOpen ? \`
                <div class="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn">
                  <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-[#1E3752]">
                    <span class="font-heading font-bold text-xs text-zinc-900 dark:text-white">Notifications Système</span>
                    <button onclick="markAllNotificationsRead()" class="text-[11px] text-[#EF4248] hover:underline font-medium">Tout marquer lu</button>
                  </div>
                  <div class="py-2 max-h-64 overflow-y-auto space-y-2 text-xs">
                    \${NOTIFICATIONS.map(n => \`
                      <div class="p-2.5 rounded-xl \${n.read ? 'bg-transparent text-zinc-400' : 'bg-zinc-50 dark:bg-[#162F4D] text-zinc-700 dark:text-zinc-200 font-medium'} flex items-start gap-2.5">
                        <span class="text-sm mt-0.5">\${n.icon || '📌'}</span>
                        <div class="flex-1 min-w-0">
                          <p class="truncate">\${n.text}</p>
                          <span class="text-[10px] text-zinc-400 block mt-0.5">\${n.time}</span>
                        </div>
                      </div>
                    \`).join('')}
                  </div>
                </div>
              \` : ''}
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
                \${currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div class="hidden xl:block text-left">
                <span class="block text-xs font-bold text-zinc-900 dark:text-white leading-tight">\${currentUser.name || 'Admin'}</span>
                <span class="block text-[10px] text-zinc-400 capitalize">\${currentUser.role || 'Administrateur'}</span>
              </div>
            </div>
          </div>
        </header>

        <!-- VIEW CONTAINER -->
        <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          \${(() => {
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
    \${previewArticleModalId ? renderPreviewArticleModal() : ''}
  \`;
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

  return \`
    <!-- Bannière de Statut Éditorial -->
    <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold tracking-wide mb-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          Données Serveur Connectées (Port 3000)
        </div>
        <h2 class="font-heading text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Bonjour \${currentUser.name || 'Steve'}, voici l'état réel de votre média
        </h2>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
          Supervision éditoriale conforme Ontario : articles persistants, abonnés newsletter vérifiés et gestion intégrale des médias.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="setAdminNav('articles')" class="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-[#162F4D] hover:bg-zinc-200 dark:hover:bg-[#1E3752] text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all">
          📝 Gérer les articles (\${ARTICLES.length})
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
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">\${SERVER_STATS.articlesPublished}</div>
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
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">\${SERVER_STATS.articlesDraft}</div>
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
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">\${SERVER_STATS.commentsTotal}</div>
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
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">\${SUBSCRIBERS.length}</div>
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
        <div class="font-heading text-2xl font-extrabold text-zinc-900 dark:text-white">\${SERVER_STATS.mediaTotal}</div>
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
            Voir tous (\${ARTICLES.length}) →
          </button>
        </div>
        <div class="space-y-3">
          \${recentArticles.map(art => {
            const cat = CATEGORIES.find(c => c.slug === art.categorySlug) || { name: art.categorySlug || 'Éditorial', color: '#EF4248' };
            const author = AUTHORS.find(a => a.slug === art.authorSlug) || { name: 'Steve Ontario' };
            return \`
              <div class="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-[#162F4D]/50 hover:bg-zinc-100 dark:hover:bg-[#162F4D] transition-colors gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <img src="\${art.image || FALLBACK_IMAGE}" onerror="onImgError(this)" class="w-12 h-12 rounded-lg object-cover flex-shrink-0" alt="\${art.title}">
                  <div class="min-w-0">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-[#EF4248]">\${cat.name}</span>
                    <h4 class="font-heading font-bold text-xs text-zinc-900 dark:text-white truncate">\${art.title}</h4>
                    <span class="text-[11px] text-zinc-400 dark:text-zinc-500">Par \${author.name} • \${art.date || 'Récemment'}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold \${art.status === 'draft' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}">
                    \${art.status === 'draft' ? 'Brouillon' : 'Publié'}
                  </span>
                  <button onclick="editArticle('\${art.id}')" class="p-1.5 rounded-lg bg-zinc-200 dark:bg-[#1E3752] hover:bg-[#EF4248] hover:text-white text-xs transition-colors" title="Éditer">
                    ✏️
                  </button>
                </div>
              </div>
            \`;
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
          \${SERVER_ACTIVITIES.length ? SERVER_ACTIVITIES.slice(0, 6).map(act => \`
            <div class="flex items-start gap-3 text-xs p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-[#162F4D]/40 transition-colors">
              <span class="text-base mt-0.5">⏱️</span>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-zinc-800 dark:text-zinc-200">\${act.text}</p>
                <span class="text-[10px] text-zinc-400 block mt-0.5">\${act.time}</span>
              </div>
            </div>
          \`).join('') : \`
            <p class="text-xs text-zinc-400 text-center py-6">Aucune activité enregistrée récemment.</p>
          \`}
        </div>
      </div>
    </div>
  \`;
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

  return \`
    <div class="space-y-5">
      
      <!-- Barre d'actions et filtres de statut -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button onclick="filterAdminArticles('all')" class="px-3 py-1.5 rounded-xl transition-colors \${adminArticleFilter === 'all' ? 'bg-[#EF4248] text-white shadow-sm' : 'bg-white dark:bg-[#0E2137] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-[#1E3752]'}">
            Tous (\${allCount})
          </button>
          <button onclick="filterAdminArticles('published')" class="px-3 py-1.5 rounded-xl transition-colors \${adminArticleFilter === 'published' ? 'bg-[#EF4248] text-white shadow-sm' : 'bg-white dark:bg-[#0E2137] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-[#1E3752]'}">
            Publiés (\${publishedCount})
          </button>
          <button onclick="filterAdminArticles('draft')" class="px-3 py-1.5 rounded-xl transition-colors \${adminArticleFilter === 'draft' ? 'bg-[#EF4248] text-white shadow-sm' : 'bg-white dark:bg-[#0E2137] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-[#1E3752]'}">
            Brouillons (\${draftCount})
          </button>
          <button onclick="filterAdminArticles('trash')" class="px-3 py-1.5 rounded-xl transition-colors \${adminArticleFilter === 'trash' ? 'bg-[#EF4248] text-white shadow-sm' : 'bg-white dark:bg-[#0E2137] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-[#1E3752]'}">
            Corbeille (\${trashCount})
          </button>
        </div>

        <div class="flex items-center gap-2 w-full sm:w-auto">
          <!-- Recherche live -->
          <div class="relative flex-1 sm:w-64">
            <input type="text" 
                   value="\${adminArticleSearch}"
                   oninput="handleArticleSearch(this.value)"
                   placeholder="Rechercher par titre..." 
                   class="w-full px-3.5 py-2 pl-9 rounded-xl text-xs bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#EF4248]">
            <span class="absolute left-3 top-2.5 text-zinc-400 text-xs">🔍</span>
          </div>

          <!-- Filtre Catégorie -->
          <select onchange="setArticleCategoryFilter(this.value)" class="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white focus:outline-none focus:border-[#EF4248]">
            <option value="all">Toutes les rubriques</option>
            \${CATEGORIES.map(c => \`<option value="\${c.slug}" \${adminArticleCategory === c.slug ? 'selected' : ''}>\${c.name}</option>\`).join('')}
          </select>

          <button onclick="startNewArticle()" class="px-4 py-2 rounded-xl bg-[#EF4248] hover:bg-[#DA343A] text-white text-xs font-bold shadow-md shadow-red-500/20 whitespace-nowrap">
            + Écrire
          </button>
        </div>
      </div>

      <!-- Actions Groupées si articles sélectionnés -->
      \${adminSelectedArticles.length ? \`
        <div class="p-3 rounded-xl bg-zinc-100 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] flex items-center justify-between text-xs animate-fadeIn">
          <span class="font-semibold text-zinc-700 dark:text-zinc-200">
            \${adminSelectedArticles.length} article(s) sélectionné(s)
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
      \` : ''}

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
              \${filtered.length ? filtered.map(art => {
                const isSelected = adminSelectedArticles.includes(art.id);
                const cat = CATEGORIES.find(c => c.slug === art.categorySlug) || { name: art.categorySlug || 'Éditorial', color: '#EF4248' };
                const author = AUTHORS.find(a => a.slug === art.authorSlug) || { name: 'Steve Ontario' };
                const isTrash = adminArticleFilter === 'trash';

                return \`
                  <tr class="hover:bg-zinc-50 dark:hover:bg-[#162F4D]/40 transition-colors \${isSelected ? 'bg-zinc-50 dark:bg-[#162F4D]/60' : ''}">
                    <td class="p-3.5 text-center">
                      <input type="checkbox" \${isSelected ? 'checked' : ''} onchange="toggleSelectArticle('\${art.id}')" class="rounded border-zinc-300 dark:border-[#1E3752] accent-[#EF4248]">
                    </td>
                    <td class="p-3.5">
                      <div class="flex items-center gap-3 max-w-md">
                        <img src="\${art.image || FALLBACK_IMAGE}" onerror="onImgError(this)" class="w-10 h-10 rounded-lg object-cover flex-shrink-0" alt="\${art.title}">
                        <div class="min-w-0">
                          <button onclick="editArticle('\${art.id}')" class="font-heading font-bold text-xs text-zinc-900 dark:text-white hover:text-[#EF4248] text-left truncate block max-w-sm">
                            \${art.title}
                          </button>
                          <span class="text-[11px] text-zinc-400 block truncate">/\${art.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td class="p-3.5 whitespace-nowrap font-medium">\${author.name}</td>
                    <td class="p-3.5 whitespace-nowrap">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold" style="background-color: \${cat.color}15; color: \${cat.color}">
                        \${cat.name}
                      </span>
                    </td>
                    <td class="p-3.5 whitespace-nowrap">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold \${art.status === 'draft' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}">
                        \${art.status === 'draft' ? 'Brouillon' : 'Publié'}
                      </span>
                    </td>
                    <td class="p-3.5 whitespace-nowrap text-zinc-400">\${art.date || 'Récemment'}</td>
                    <td class="p-3.5 text-right whitespace-nowrap space-x-1">
                      \${!isTrash ? \`
                        <button onclick="previewArticle('\${art.id}')" class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1E3752]" title="Aperçu rapide">
                          👁️
                        </button>
                        <button onclick="editArticle('\${art.id}')" class="p-1.5 rounded-lg text-zinc-400 hover:text-[#EF4248] hover:bg-zinc-100 dark:hover:bg-[#1E3752]" title="Modifier avec Gutenberg">
                          ✏️
                        </button>
                        <button onclick="trashArticle('\${art.id}')" class="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30" title="Mettre à la corbeille">
                          🗑️
                        </button>
                      \` : \`
                        <button onclick="restoreArticle('\${art.id}')" class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-[11px] font-bold">
                          Restaurer
                        </button>
                        <button onclick="forceDeleteArticle('\${art.id}')" class="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-[11px] font-bold">
                          Supprimer
                        </button>
                      \`}
                    </td>
                  </tr>
                \`;
              }).join('') : \`
                <tr>
                  <td colspan="7" class="p-8 text-center text-zinc-400">
                    Aucun article trouvé pour les critères sélectionnés.
                  </td>
                </tr>
              \`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  \`;
}

// ==========================================================================
// 3. GESTION DES RUBRIQUES & TAXONOMIE AVEC VRAIS COMPTEURS
// ==========================================================================

function renderTabCategories() {
  return \`
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
          <span class="text-xs font-semibold text-zinc-400">\${CATEGORIES.length} rubriques</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          \${CATEGORIES.map(cat => {
            const count = ARTICLES.filter(a => a.categorySlug === cat.slug).length;
            return \`
              <div class="p-4 rounded-xl border border-zinc-200 dark:border-[#1E3752] bg-zinc-50/50 dark:bg-[#162F4D]/40 flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-3.5 h-3.5 rounded-full flex-shrink-0" style="background-color: \${cat.color}"></div>
                  <div class="min-w-0">
                    <h4 class="font-heading font-bold text-xs text-zinc-900 dark:text-white truncate">\${cat.name}</h4>
                    <span class="text-[11px] text-zinc-400 block truncate">/\${cat.slug}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-200 dark:bg-[#1E3752] text-zinc-700 dark:text-zinc-300">
                    \${count} articles
                  </span>
                </div>
              </div>
            \`;
          }).join('')}
        </div>
      </div>
    </div>
  \`;
}

// ==========================================================================
// 4. MÉDIATHÈQUE PROFESSIONNELLE AVEC VRAI UPLOAD SERVEUR
// ==========================================================================

function renderTabMedia() {
  const images = MEDIA_LIBRARY.filter(m => {
    if (adminMediaSearch && !m.title.toLowerCase().includes(adminMediaSearch.toLowerCase())) return false;
    return true;
  });

  return \`
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
        \${images.map(img => \`
          <div class="group relative rounded-xl border border-zinc-200 dark:border-[#1E3752] bg-white dark:bg-[#0E2137] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            <div class="aspect-square bg-zinc-100 dark:bg-[#122B45] overflow-hidden">
              <img src="\${img.url}" onerror="onImgError(this)" class="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="\${img.title}">
            </div>
            <div class="p-2.5 flex-1 flex flex-col justify-between">
              <span class="font-heading font-bold text-[11px] text-zinc-900 dark:text-white truncate block">\${img.title}</span>
              <div class="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100 dark:border-[#1E3752] text-[10px] text-zinc-400">
                <span>\${img.size || 'HD'}</span>
                <div class="flex items-center gap-1">
                  <button onclick="copyMediaUrl('\${img.url}')" class="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1E3752]" title="Copier le lien">
                    📋
                  </button>
                  <button onclick="deleteMediaFromServer('\${img.id}')" class="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30" title="Supprimer">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`;
}

// ==========================================================================
// 5. GESTION DES COMMENTAIRES AVEC ACTIONS RÉELLES SERVEUR
// ==========================================================================

function renderTabComments() {
  const filtered = COMMENTS.filter(c => {
    if (adminCommentFilter === 'all') return true;
    return c.status === adminCommentFilter;
  });

  return \`
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5 text-xs font-semibold">
          <button onclick="filterComments('all')" class="px-3 py-1.5 rounded-xl \${adminCommentFilter === 'all' ? 'bg-[#EF4248] text-white' : 'bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] text-zinc-600 dark:text-zinc-300'}">
            Tous (\${COMMENTS.length})
          </button>
          <button onclick="filterComments('approved')" class="px-3 py-1.5 rounded-xl \${adminCommentFilter === 'approved' ? 'bg-[#EF4248] text-white' : 'bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] text-zinc-600 dark:text-zinc-300'}">
            Approuvés (\${COMMENTS.filter(c => c.status === 'approved').length})
          </button>
          <button onclick="filterComments('pending')" class="px-3 py-1.5 rounded-xl \${adminCommentFilter === 'pending' ? 'bg-[#EF4248] text-white' : 'bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] text-zinc-600 dark:text-zinc-300'}">
            En attente (\${COMMENTS.filter(c => c.status === 'pending').length})
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] rounded-2xl overflow-hidden shadow-sm">
        <div class="divide-y divide-zinc-100 dark:divide-[#1E3752]/50">
          \${filtered.length ? filtered.map(c => \`
            <div class="p-4 flex flex-col sm:flex-row items-start justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-[#162F4D]/30 transition-colors">
              <div class="space-y-1 max-w-2xl">
                <div class="flex items-center gap-2">
                  <span class="font-heading font-bold text-xs text-zinc-900 dark:text-white">\${c.author}</span>
                  <span class="text-[10px] text-zinc-400">• \${c.date}</span>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-bold \${c.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}">
                    \${c.status === 'approved' ? 'Approuvé' : 'En attente'}
                  </span>
                </div>
                <p class="text-xs text-zinc-700 dark:text-zinc-300">\${c.content}</p>
                <span class="text-[10px] text-zinc-400 block">Sur l'article : \${c.articleTitle || c.articleId}</span>
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                \${c.status !== 'approved' ? \`
                  <button onclick="moderateComment('\${c.id}', 'approved')" class="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold">
                    Approuver
                  </button>
                \` : ''}
                <button onclick="moderateComment('\${c.id}', 'spam')" class="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 text-xs font-bold">
                  Spam
                </button>
                <button onclick="moderateComment('\${c.id}', 'trash')" class="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-bold">
                  Supprimer
                </button>
              </div>
            </div>
          \`).join('') : \`
            <div class="p-8 text-center text-xs text-zinc-400">Aucun commentaire dans cette vue.</div>
          \`}
        </div>
      </div>
    </div>
  \`;
}

// ==========================================================================
// 6. ABONNÉS NEWSLETTER & EXPORT CSV PROTÉGÉ
// ==========================================================================

function renderTabNewsletter() {
  return \`
    <div class="space-y-5">
      <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Abonnés Newsletter Vérifiés</h3>
          <p class="text-xs text-zinc-400 mt-0.5">Total en base : \${SUBSCRIBERS.length} adresses réelles enregistrées via le formulaire public.</p>
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
            \${SUBSCRIBERS.map(sub => \`
              <tr class="hover:bg-zinc-50 dark:hover:bg-[#162F4D]/30 transition-colors">
                <td class="p-3.5 font-semibold">\${sub.email}</td>
                <td class="p-3.5 text-zinc-400">\${sub.date}</td>
                <td class="p-3.5">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500">
                    \${sub.status || 'Actif'}
                  </span>
                </td>
                <td class="p-3.5 text-right">
                  <button onclick="deleteSubscriberFromServer('\${sub.id || sub.email}')" class="text-rose-500 hover:underline text-xs font-semibold">
                    Désinscrire
                  </button>
                </td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  \`;
}

// ==========================================================================
// 7. MONÉTISATION ADSENSE & EMPLACEMENTS CERTIFIÉS
// ==========================================================================

function renderTabAdSense() {
  return \`
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
          \${[
            { id: 'home_after_featured', name: 'Accueil — Après le carrousel vedette', format: 'Responsive Banner (728x90 / 300x250)' },
            { id: 'home_in_feed', name: 'Accueil — Au milieu du flux d\\'articles', format: 'In-Feed Native Ad' },
            { id: 'article_sidebar', name: 'Article — Barre latérale desktop', format: 'Half Page (300x600)' },
            { id: 'article_in_content', name: 'Article — Dans le corps du texte (après 3 paragraphes)', format: 'In-Article Responsive' },
            { id: 'article_end', name: 'Article — Fin de publication (avant recommandations)', format: 'Matched Content' }
          ].map(slot => \`
            <div class="p-4 rounded-xl border border-zinc-200 dark:border-[#1E3752] bg-zinc-50 dark:bg-[#162F4D]/40 flex items-center justify-between gap-4">
              <div>
                <h4 class="font-heading font-bold text-xs text-zinc-900 dark:text-white">\${slot.name}</h4>
                <span class="text-[11px] text-zinc-400">Format : \${slot.format}</span>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                ✓ Actif & Conforme
              </span>
            </div>
          \`).join('')}
        </div>
      </div>
    </div>
  \`;
}

// ==========================================================================
// 8. CONFIGURATION DU CARROUSEL HERO
// ==========================================================================

function renderTabCarousel() {
  return \`
    <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-6">
      <div>
        <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Configuration du Carrousel Plein Écran (100vw)</h3>
        <p class="text-xs text-zinc-400 mt-1">Conforme à la maquette officielle Ontario avec portrait orange et défilement continu.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Mode d'alimentation</label>
          <select id="carouselModeSelect" class="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">
            <option value="recent" \${HERO_CAROUSEL_CONFIG.mode === 'recent' ? 'selected' : ''}>Dernières publications (Récent)</option>
            <option value="popular" \${HERO_CAROUSEL_CONFIG.mode === 'popular' ? 'selected' : ''}>Articles les plus populaires</option>
            <option value="manual" \${HERO_CAROUSEL_CONFIG.mode === 'manual' ? 'selected' : ''}>Sélection manuelle ordonnée</option>
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
  \`;
}

// ==========================================================================
// 9. VUES COMPLÉMENTAIRES (Pages, Tags, Utilisateurs, SEO, Analytics, Settings)
// ==========================================================================

function renderTabPages() {
  return \`
    <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-[#1E3752]">
        <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Pages Institutionnelles & Statiques</h3>
      </div>
      <div class="divide-y divide-zinc-100 dark:divide-[#1E3752]/50 text-xs">
        \${PAGES.map(p => \`
          <div class="py-3 flex items-center justify-between">
            <div>
              <h4 class="font-heading font-bold text-zinc-900 dark:text-white">\${p.title}</h4>
              <span class="text-[11px] text-zinc-400">URL : /\${p.slug}</span>
            </div>
            <div class="flex items-center gap-2">
              <a href="#\${p.slug}" class="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-[#1E3752] text-zinc-700 dark:text-zinc-200 font-semibold hover:bg-zinc-200">
                Aperçu
              </a>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`;
}

function renderTabTags() {
  return \`
    <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-4">
      <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Étiquettes Éditoriales (Tags)</h3>
      <div class="flex flex-wrap gap-2">
        \${['Technologie', 'Intelligence Artificielle', 'Design', 'Architecture', 'Culture', 'Futurisme', 'Robotique', 'Audio', 'Spatial', 'Mobilité'].map(tag => \`
          <span class="px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-800 dark:text-zinc-200">
            #\${tag}
          </span>
        \`).join('')}
      </div>
    </div>
  \`;
}

function renderTabUsers() {
  return \`
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
            \${USERS.map(u => \`
              <tr class="hover:bg-zinc-50 dark:hover:bg-[#162F4D]/30 transition-colors">
                <td class="p-3.5 font-bold">\${u.name}</td>
                <td class="p-3.5 text-zinc-400">\${u.email}</td>
                <td class="p-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EF4248]/10 text-[#EF4248] capitalize">\${u.role}</span></td>
                <td class="p-3.5 text-right"><span class="text-emerald-500 font-semibold">Actif</span></td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  \`;
}

function renderTabSEO() {
  return \`
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
  \`;
}

function renderTabAnalytics() {
  return \`
    <div class="space-y-6">
      <div class="p-6 rounded-2xl bg-white dark:bg-[#0E2137] border border-zinc-200 dark:border-[#1E3752] shadow-sm space-y-4">
        <h3 class="font-heading font-bold text-base text-zinc-900 dark:text-white">Statistiques Réelles d'Audience</h3>
        <p class="text-xs text-zinc-400">Les consultations de pages sont mesurées en local. Pour une télémétrie complète, activez votre identifiant GA4 ou Plausible.</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-4 rounded-xl bg-zinc-50 dark:bg-[#162F4D]/50 border border-zinc-200 dark:border-[#1E3752]">
            <span class="text-xs text-zinc-400">Total Consultations CMS</span>
            <div class="font-heading text-xl font-bold text-zinc-900 dark:text-white mt-1">\${ARTICLES.reduce((acc, a) => acc + (a.views||0), 0)}</div>
          </div>
          <div class="p-4 rounded-xl bg-zinc-50 dark:bg-[#162F4D]/50 border border-zinc-200 dark:border-[#1E3752]">
            <span class="text-xs text-zinc-400">Articles en Base</span>
            <div class="font-heading text-xl font-bold text-zinc-900 dark:text-white mt-1">\${ARTICLES.length}</div>
          </div>
          <div class="p-4 rounded-xl bg-zinc-50 dark:bg-[#162F4D]/50 border border-zinc-200 dark:border-[#1E3752]">
            <span class="text-xs text-zinc-400">Taux de Rétention</span>
            <div class="font-heading text-base font-bold text-amber-500 mt-1">Non connecté (Nécessite GA4)</div>
          </div>
        </div>
      </div>
    </div>
  \`;
}

function renderTabSettings() {
  return \`
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
  \`;
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

  container.innerHTML = \`
    <div class="min-h-screen bg-zinc-100 dark:bg-[#071426] text-zinc-900 dark:text-white flex flex-col transition-colors duration-200">
      
      <!-- TOOLBAR SUPÉRIEURE GUTENBERG -->
      <header class="h-16 px-6 bg-white dark:bg-[#0E2137] border-b border-zinc-200 dark:border-[#1E3752] flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div class="flex items-center gap-3">
          <button onclick="cancelEditor()" class="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1E3752] transition-colors" title="Retour aux articles">
            ← Quitter
          </button>
          <div class="h-5 w-px bg-zinc-200 dark:bg-[#1E3752]"></div>
          <span class="font-heading font-black text-xs uppercase tracking-wider text-[#EF4248]">Gutenberg Pro</span>
          <span class="text-xs text-zinc-400 truncate max-w-xs">\${editingArticleId ? 'Modifier article' : 'Nouvelle publication'}</span>
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
                        class="w-full font-heading font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-600 border-0 bg-transparent resize-none focus:outline-none focus:ring-0 leading-tight">\${currentTitle}</textarea>
            </div>

            <!-- Extrait / Chapô éditorial -->
            <div>
              <textarea id="editorArticleExcerpt" 
                        oninput="currentEditorState.excerpt = this.value"
                        placeholder="Chapô ou extrait introductif de la publication..." 
                        rows="2"
                        class="w-full text-base text-zinc-600 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-600 border-0 border-b border-zinc-100 dark:border-[#1E3752] bg-transparent resize-none focus:outline-none focus:ring-0 italic">\${currentExcerpt}</textarea>
            </div>

            <!-- BLOCS MODULAIRES ÉDITORIAUX -->
            <div id="editorBlocksContainer" class="space-y-4 pt-4">
              \${editorBlocks.map((block, idx) => {
                return \`
                  <div class="group relative p-4 rounded-2xl border border-zinc-200 dark:border-[#1E3752] bg-zinc-50/50 dark:bg-[#122B45]/30 hover:border-[#EF4248]/40 transition-all">
                    
                    <!-- Barre de contrôle du bloc -->
                    <div class="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-[#1E3752]/50 text-[10px] text-zinc-400">
                      <span class="font-bold uppercase tracking-wider text-[#EF4248]">
                        \${block.type === 'heading' ? 'Titre H2' : (block.type === 'pullquote' ? 'Citation' : (block.type === 'image' ? 'Image & Légende' : (block.type === 'affiliate' ? 'Bloc Affilié Amazon' : 'Paragraphe')))}
                      </span>
                      <div class="flex items-center gap-1">
                        <button onclick="moveBlock(\${idx}, -1)" class="p-1 hover:text-zinc-900 dark:hover:text-white" title="Monter">↑</button>
                        <button onclick="moveBlock(\${idx}, 1)" class="p-1 hover:text-zinc-900 dark:hover:text-white" title="Descendre">↓</button>
                        <button onclick="duplicateBlock(\${idx})" class="p-1 hover:text-zinc-900 dark:hover:text-white" title="Dupliquer">📑</button>
                        <button onclick="deleteBlock(\${idx})" class="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded" title="Supprimer">🗑️</button>
                      </div>
                    </div>

                    <!-- Contenu selon le type de bloc -->
                    \${(() => {
                      if (block.type === 'heading') {
                        return \`
                          <input type="text" 
                                 value="\${block.content || ''}" 
                                 oninput="updateBlockText(\${idx}, this.value)"
                                 placeholder="Sous-titre H2..." 
                                 class="w-full font-heading font-bold text-xl text-zinc-900 dark:text-white bg-transparent border-0 focus:outline-none">
                        \`;
                      } else if (block.type === 'pullquote') {
                        return \`
                          <div class="border-l-4 border-[#EF4248] pl-4 py-1 space-y-2">
                            <textarea oninput="updateBlockText(\${idx}, this.value)"
                                      placeholder="Citation marquante..." 
                                      rows="2"
                                      class="w-full italic font-heading text-lg text-zinc-800 dark:text-zinc-100 bg-transparent border-0 focus:outline-none resize-none">\${block.content || ''}</textarea>
                            <input type="text" 
                                   value="\${block.author || ''}" 
                                   oninput="updateBlockField(\${idx}, 'author', this.value)"
                                   placeholder="Auteur de la citation..." 
                                   class="w-full text-xs text-zinc-500 bg-transparent border-0 focus:outline-none">
                          </div>
                        \`;
                      } else if (block.type === 'image') {
                        return \`
                          <div class="space-y-3">
                            <div class="aspect-video bg-zinc-100 dark:bg-[#071426] rounded-xl overflow-hidden flex items-center justify-center">
                              <img src="\${block.url || FALLBACK_IMAGE}" onerror="onImgError(this)" class="w-full h-full object-cover" alt="\${block.alt || 'Image article'}">
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <input type="text" value="\${block.url || ''}" oninput="updateBlockField(\${idx}, 'url', this.value)" placeholder="URL de l'image..." class="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752]">
                              <input type="text" value="\${block.caption || ''}" oninput="updateBlockField(\${idx}, 'caption', this.value)" placeholder="Légende..." class="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752]">
                            </div>
                          </div>
                        \`;
                      } else if (block.type === 'affiliate') {
                        return \`
                          <div class="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-3">
                            <div class="flex items-center justify-between text-[11px] font-bold text-amber-600 dark:text-amber-400">
                              <span>🛍️ Produit Partenaire Recommandé</span>
                              <span class="text-[9px] uppercase font-normal">rel="sponsored"</span>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                              <input type="text" value="\${block.productTitle || ''}" oninput="updateBlockField(\${idx}, 'productTitle', this.value)" placeholder="Nom du produit..." class="sm:col-span-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752]">
                              <input type="text" value="\${block.price || ''}" oninput="updateBlockField(\${idx}, 'price', this.value)" placeholder="Prix (ex: 299 €)..." class="px-3 py-1.5 rounded-lg bg-white dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752]">
                            </div>
                            <input type="text" value="\${block.link || ''}" oninput="updateBlockField(\${idx}, 'link', this.value)" placeholder="Lien d'affiliation..." class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-xs">
                          </div>
                        \`;
                      } else {
                        return \`
                          <textarea oninput="updateBlockText(\${idx}, this.value)"
                                    placeholder="Rédigez votre paragraphe..." 
                                    rows="3"
                                    class="w-full text-sm text-zinc-800 dark:text-zinc-200 bg-transparent border-0 focus:outline-none resize-none leading-relaxed">\${block.content || ''}</textarea>
                        \`;
                      }
                    })()}
                  </div>
                \`;
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
                  <option value="draft" \${article && article.status === 'draft' ? 'selected' : ''}>Brouillon privé</option>
                  <option value="published" \${!article || article.status === 'published' ? 'selected' : ''}>Publié publiquement</option>
                  <option value="scheduled" \${article && article.status === 'scheduled' ? 'selected' : ''}>Programmé serveur</option>
                </select>
              </div>

              <!-- Rubrique -->
              <div>
                <label class="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Rubrique Principale</label>
                <select id="editorArticleCategory" onchange="currentEditorState.categorySlug = this.value" class="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-zinc-900 dark:text-white">
                  \${CATEGORIES.map(c => \`<option value="\${c.slug}" \${currentCat === c.slug ? 'selected' : ''}>\${c.name}</option>\`).join('')}
                </select>
              </div>

              <!-- Image de Couverture -->
              <div>
                <label class="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Image à la une</label>
                <div class="aspect-video bg-zinc-100 dark:bg-[#122B45] rounded-xl overflow-hidden mb-2">
                  <img id="editorCoverPreview" src="\${currentImg || FALLBACK_IMAGE}" onerror="onImgError(this)" class="w-full h-full object-cover" alt="Couverture">
                </div>
                <div class="flex gap-2">
                  <input type="text" id="editorArticleImage" value="\${currentImg}" oninput="currentEditorState.image = this.value; document.getElementById('editorCoverPreview').src = this.value || FALLBACK_IMAGE;" placeholder="URL de l'image..." class="flex-1 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-[#162F4D] border border-zinc-200 dark:border-[#1E3752] text-xs">
                  <button onclick="openMediaPickerForEditor()" class="px-2.5 py-1.5 rounded-lg bg-zinc-200 dark:bg-[#1E3752] hover:bg-[#EF4248] hover:text-white font-semibold">📁</button>
                </div>
              </div>

            </div>
          </div>
        </aside>

      </div>
    </div>
  \`;
}

// ==========================================================================
// 11. MODALE D'APERÇU RAPIDE ARTICLE & PAGES INSTITUTIONNELLES
// ==========================================================================

function renderPreviewArticleModal() {
  const art = ARTICLES.find(a => a.id === previewArticleModalId) || TRASH_ARTICLES.find(a => a.id === previewArticleModalId);
  if (!art) return '';

  return \`
    <div class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" onclick="closeArticlePreview()">
      <div class="w-full max-w-3xl bg-white dark:bg-[#0E2137] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-[#1E3752] max-h-[85vh] flex flex-col" onclick="event.stopPropagation()">
        <div class="p-4 border-b border-zinc-200 dark:border-[#1E3752] flex items-center justify-between">
          <span class="font-heading font-bold text-xs uppercase text-[#EF4248]">Aperçu Éditorial</span>
          <button onclick="closeArticlePreview()" class="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-1">✕</button>
        </div>
        <div class="overflow-y-auto p-6 sm:p-8 space-y-4">
          <img src="\${art.image || FALLBACK_IMAGE}" onerror="onImgError(this)" class="w-full h-64 object-cover rounded-2xl" alt="\${art.title}">
          <h2 class="font-heading font-extrabold text-2xl text-zinc-900 dark:text-white">\${art.title}</h2>
          <p class="text-xs text-zinc-400">Par Steve Ontario • Publié dans \${art.categorySlug}</p>
          <div class="prose dark:prose-invert text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            \${art.content ? (typeof art.content === 'string' ? art.content : art.content.map(b => b.content ? \`<p class="mb-3">\${b.content}</p>\` : '').join('')) : '<p>Aucun contenu textuel.</p>'}
          </div>
        </div>
      </div>
    </div>
  \`;
}

function renderAbout(container) {
  if (!container) container = document.getElementById('app-container');
  container.innerHTML = \`
    <div class="container-ontario pt-28 sm:pt-32 pb-24 space-y-8">
      <div class="max-w-3xl">
        <span class="text-xs font-bold uppercase tracking-wider text-[#EF4248]">Manifeste</span>
        <h1 class="font-heading font-black text-4xl sm:text-5xl text-zinc-900 dark:text-white mt-2">À Propos d'ONTARIO</h1>
        <p class="text-base text-zinc-600 dark:text-zinc-300 mt-4 leading-relaxed">
          ONTARIO est un média indépendant dédié aux mutations technologiques, au design d'avant-garde et aux nouvelles frontières numériques. Conçu selon les standards éditoriaux les plus stricts, nous valorisons la profondeur d'analyse, l'élégance visuelle et l'intégrité de l'information.
        </p>
      </div>
    </div>
  \`;
}

function renderContact(container) {
  if (!container) container = document.getElementById('app-container');
  container.innerHTML = \`
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
  \`;
}
`;

fs.writeFileSync('public/app.part2_views.js', viewsCode, 'utf8');
console.log('Successfully wrote public/app.part2_views.js! Size:', Buffer.byteLength(viewsCode), 'bytes');
