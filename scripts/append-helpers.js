const fs = require('fs');

const helpersCode = `
// ==========================================================================
// COMPATIBILITÉ ET ALIAS D'INTERACTIONS ADMINISTRATEUR SERVEUR
// ==========================================================================

function cycleTheme() {
  const modes = ['system', 'light', 'dark'];
  const cur = typeof currentThemePreference !== 'undefined' ? currentThemePreference : 'system';
  const next = modes[(modes.indexOf(cur) + 1) % modes.length];
  setThemePreference(next);
  if (typeof renderAdmin === 'function' && document.getElementById('app-container')) {
    renderAdmin(document.getElementById('app-container'));
  }
}

function moderateComment(id, action) {
  if (action === 'approved') return approveComment(id);
  if (action === 'spam') return markCommentSpam(id);
  if (action === 'trash') return deleteComment(id);
}

function deleteMediaFromServer(id) {
  return deleteMediaItem(id);
}

function deleteSubscriberFromServer(id) {
  return deleteSubscriber(id);
}

async function createNewCategory() {
  const nameInput = document.getElementById('newCatName');
  const slugInput = document.getElementById('newCatSlug');
  const colorInput = document.getElementById('newCatColor');

  if (!nameInput || !nameInput.value.trim()) {
    showToast('Veuillez saisir un nom de rubrique.', 'error');
    return;
  }

  const name = nameInput.value.trim();
  const slug = slugInput && slugInput.value.trim() ? slugInput.value.trim().toLowerCase() : name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const color = colorInput ? colorInput.value : '#EF4248';

  try {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug, color, description: 'Rubrique éditoriale ' + name })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('✓ Rubrique créée avec succès !', 'success');
      await loadServerData();
      renderAdmin(document.getElementById('app-container'));
    } else {
      alert(data.error || 'Erreur lors de la création de la rubrique');
    }
  } catch (e) {
    showToast('Erreur serveur lors de la création de rubrique', 'error');
  }
}

async function saveCarouselSettings() {
  const modeSelect = document.getElementById('carouselModeSelect');
  const durSelect = document.getElementById('carouselDurationSelect');

  const mode = modeSelect ? modeSelect.value : 'recent';
  const duration = durSelect ? parseInt(durSelect.value, 10) : 6000;

  HERO_CAROUSEL_CONFIG.mode = mode;
  HERO_CAROUSEL_CONFIG.intervalMs = duration;

  try {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        heroCarousel: {
          mode,
          intervalMs: duration
        }
      })
    });
    if (res.ok) {
      showToast('✓ Paramètres du carrousel enregistrés avec succès !', 'success');
    }
  } catch (e) {
    showToast('Erreur enregistrement carrousel', 'error');
  }
}
`;

fs.appendFileSync('public/app.part2_helpers.js', helpersCode, 'utf8');
console.log('Appended aliases and helpers to public/app.part2_helpers.js');
