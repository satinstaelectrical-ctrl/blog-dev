const fs = require('fs');
const app = fs.readFileSync('public/app.js', 'utf8');
const lines = app.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('renderHeader') || l.includes('header-wrapper') || l.includes('header-floating-pill')) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
