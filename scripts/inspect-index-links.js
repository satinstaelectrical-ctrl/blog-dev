const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const lines = html.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('<header') || l.includes('header-wrapper') || l.includes('href="#') || l.includes('admin') || l.includes('login')) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
