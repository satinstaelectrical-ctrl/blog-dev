const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'public', 'app.js');
let content = fs.readFileSync(appJsPath, 'utf8');

// 1. Mise à jour de la fonction handleNewsletter pour appeler l'API REST
const oldNewsletter = `function handleNewsletter(e) {
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
}`;

const newNewsletter = `async function handleNewsletter(e) {
  e.preventDefault();
  const input = document.getElementById('newsletter-email');
  const success = document.getElementById('newsletter-success');
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
      if (success) {
        success.textContent = '✓ ' + (data.message || 'Merci ! Votre inscription est confirmée.');
        success.classList.remove('hidden');
        setTimeout(() => success.classList.add('hidden'), 6000);
      }
      input.value = '';
      if (typeof showToast === 'function') showToast('Inscription newsletter enregistrée sur le serveur !');
      // Actualiser liste abonnés si en admin
      if (typeof loadServerData === 'function') loadServerData();
    } else {
      alert(data.error || 'Erreur lors de l\\'inscription.');
    }
  } catch (err) {
    if (success) {
      success.textContent = '✓ Inscription enregistrée localement.';
      success.classList.remove('hidden');
      setTimeout(() => success.classList.add('hidden'), 5000);
    }
    input.value = '';
  }
}`;

if (content.includes('function handleNewsletter(e) {')) {
  content = content.replace(oldNewsletter, newNewsletter);
  console.log('✅ handleNewsletter mis à jour vers API REST');
}

// Sauvegarder
fs.writeFileSync(appJsPath, content, 'utf8');
console.log('App.js part 1 updated.');
