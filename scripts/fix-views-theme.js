const fs = require('fs');

let views = fs.readFileSync('public/app.part2_views.js', 'utf8');

// Replace themeMode check with safe check
views = views.replace(
  "const themeIcon = themeMode === 'light' ? '☀️' : (themeMode === 'dark' ? '🌙' : '💻');",
  "const themeMode = typeof currentThemePreference !== 'undefined' ? currentThemePreference : 'system';\n  const themeIcon = themeMode === 'light' ? '☀️' : (themeMode === 'dark' ? '🌙' : '💻');"
);

fs.writeFileSync('public/app.part2_views.js', views, 'utf8');
console.log('Updated themeMode in app.part2_views.js');
