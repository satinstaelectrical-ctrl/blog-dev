const fs = require('fs');

const app = fs.readFileSync('public/app.js', 'utf8');
const lines = app.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('function initRouting') ||
      l.includes('function handleHash') ||
      l.includes('function navigateArticle') ||
      l.includes('function renderReaderPage') ||
      l.includes('function handleReaderLogoutApp') ||
      l.includes('function renderHome')) {
    console.log(`Line ${idx + 1}: ${l}`);
  }
});
