const fs = require('fs');

let app = fs.readFileSync('public/app.js', 'utf8');

// 1. Add reader test button in quickFill
app = app.replace(
  `<button type="button" onclick="quickFillAdmin('editor@ontario.com','editor2026!')" class="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[11px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10">✏️ editor@ontario.com</button>`,
  `<button type="button" onclick="quickFillAdmin('editor@ontario.com','editor2026!')" class="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[11px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10">✏️ editor@ontario.com</button>
              <button type="button" onclick="quickFillAdmin('reader@ontario.com','reader2026!')" class="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[11px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/10">👤 reader@ontario.com (Test 403)</button>`
);

// 2. Add role guard in handleAdminLoginSubmit
app = app.replace(
  `    if (res.ok && data.success) {
      currentUser = data.user;
      localStorage.setItem('ontario_admin_session_v2', JSON.stringify({
        ...currentUser,
        fullName: currentUser.name,
        expiresAt: Date.now() + 24 * 3600 * 1000
      }));
      showToast('Connexion réussie ! Bienvenue sur Ontario CMS.', 'success');
      await loadServerData();
      navigate('admin', 'dashboard');
    }`,
  `    if (res.ok && data.success) {
      currentUser = data.user;
      updateHeaderUserBadge();
      const hasAdminRights = (data.user.role === 'admin' || data.user.role === 'editor' || data.user.role === 'author');
      if (hasAdminRights) {
        localStorage.setItem('ontario_admin_session_v2', JSON.stringify({
          ...currentUser,
          fullName: currentUser.name,
          expiresAt: Date.now() + 24 * 3600 * 1000
        }));
        showToast('Connexion réussie ! Bienvenue sur Ontario CMS.', 'success');
        await loadServerData();
        navigate('admin', 'dashboard');
      } else {
        showToast('Compte Lecteur détecté. Redirection vers votre espace...', 'info');
        navigate('compte');
      }
    }`
);

fs.writeFileSync('public/app.js', app, 'utf8');
console.log('Successfully updated handleAdminLoginSubmit in public/app.js');
