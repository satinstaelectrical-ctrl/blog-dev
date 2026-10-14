const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Replace navigate('login') with navigate('compte') on user-btn
html = html.replace(
  `<button onclick="navigate('login')" id="user-btn" aria-label="Compte lecteur"`,
  `<button onclick="navigate('compte')" id="user-btn" aria-label="Compte personnel"`
);

// In mobile menu: replace navigate('login') with navigate('compte')
html = html.replace(
  `<button onclick="navigate('login'); toggleMobileMenu();" class="w-full text-center py-2.5 rounded-full text-xs font-bold border" style="border-color: var(--border-color);">`,
  `<button onclick="navigate('compte'); toggleMobileMenu();" class="w-full text-center py-2.5 rounded-full text-xs font-bold border" style="border-color: var(--border-color);">\n            Espace Membre (/compte)\n          </button>\n          <button onclick="navigate('admin'); toggleMobileMenu();" class="w-full text-center py-2.5 rounded-full text-xs font-bold bg-[#EF4248]/20 border border-[#EF4248]/40 text-white mt-2">`
);

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Successfully patched public/index.html navigation buttons!');
