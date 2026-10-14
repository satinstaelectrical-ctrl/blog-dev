const fs = require('fs');

const code = fs.readFileSync('public/app.js', 'utf8');
const lines = code.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('editingArticleId') && (l.includes('let ') || l.includes('var ') || l.includes('const '))) {
    console.log(`Line ${idx + 1}: ${l}`);
  }
});
