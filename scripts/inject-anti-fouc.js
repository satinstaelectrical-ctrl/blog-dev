const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

const antiFouc = `  <!-- Anti-FOUC Theme Initialization (Exécuté immédiatement avant le premier rendu) -->
  <script>
    (function() {
      try {
        var pref = localStorage.getItem('ontario-theme-preference') || localStorage.getItem('ontario-theme') || 'system';
        var isDark = pref === 'dark' || (pref === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        var root = document.documentElement;
        if (isDark) {
          root.classList.add('dark');
          root.setAttribute('data-theme', 'dark');
        } else {
          root.classList.remove('dark');
          root.setAttribute('data-theme', 'light');
        }
      } catch (e) {}
    })();
  </script>
`;

if (!html.includes('Anti-FOUC Theme Initialization')) {
  html = html.replace('<meta name="description"', antiFouc + '  <meta name="description"');
  fs.writeFileSync('public/index.html', html, 'utf8');
  console.log('Successfully injected anti-FOUC script into public/index.html');
} else {
  console.log('Anti-FOUC script already present');
}
